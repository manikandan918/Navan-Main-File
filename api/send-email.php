<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

/** Return a JSON response and stop execution. */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/** Read one complete SMTP response, including multiline responses. */
function smtpRead($socket): string
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        // A space after the three-digit SMTP code marks the final response line.
        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }

    if ($response === '') {
        throw new RuntimeException('No response received from SMTP server.');
    }

    return $response;
}

/** Send an SMTP command and validate its response code. */
function smtpCommand($socket, string $command, array $acceptedCodes): string
{
    if (fwrite($socket, $command . "\r\n") === false) {
        throw new RuntimeException('Could not write to SMTP server.');
    }

    $response = smtpRead($socket);
    $code = (int) substr($response, 0, 3);

    if (!in_array($code, $acceptedCodes, true)) {
        throw new RuntimeException('SMTP command rejected with response ' . $code . '.');
    }

    return $response;
}

/** Send an email through Gmail SMTP using implicit TLS and AUTH LOGIN. */
function sendViaGmailSmtp(
    string $smtpHost,
    int $smtpPort,
    string $username,
    string $appPassword,
    string $senderEmail,
    string $senderName,
    string $recipientEmail,
    string $replyToEmail,
    string $replyToName,
    string $subject,
    string $htmlBody,
    string $textBody
): void {
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'peer_name' => $smtpHost,
            'SNI_enabled' => true,
        ],
    ]);

    $socket = @stream_socket_client(
        'ssl://' . $smtpHost . ':' . $smtpPort,
        $errno,
        $errstr,
        20,
        STREAM_CLIENT_CONNECT,
        $context
    );

    if (!$socket) {
        throw new RuntimeException('Could not connect to the SMTP server.');
    }

    stream_set_timeout($socket, 20);

    try {
        $greeting = smtpRead($socket);
        if ((int) substr($greeting, 0, 3) !== 220) {
            throw new RuntimeException('SMTP server did not accept the connection.');
        }

        $heloName = preg_replace('/[^a-zA-Z0-9.-]/', '', (string) ($_SERVER['HTTP_HOST'] ?? 'localhost'));
        if ($heloName === '') {
            $heloName = 'localhost';
        }

        smtpCommand($socket, 'EHLO ' . $heloName, [250]);
        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($username), [334]);
        smtpCommand($socket, base64_encode($appPassword), [235]);
        smtpCommand($socket, 'MAIL FROM:<' . $senderEmail . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . $recipientEmail . '>', [250, 251]);
        smtpCommand($socket, 'DATA', [354]);

        $boundary = 'navan_' . bin2hex(random_bytes(16));
        $encodedSenderName = '=?UTF-8?B?' . base64_encode($senderName) . '?=';
        $encodedReplyName = '=?UTF-8?B?' . base64_encode($replyToName) . '?=';
        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'From: ' . $encodedSenderName . ' <' . $senderEmail . '>',
            'To: <' . $recipientEmail . '>',
            'Reply-To: ' . $encodedReplyName . ' <' . $replyToEmail . '>',
            'Subject: ' . $encodedSubject,
            'MIME-Version: 1.0',
            'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        ];

        $body = '--' . $boundary . "\r\n"
            . "Content-Type: text/plain; charset=UTF-8\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($textBody))
            . '--' . $boundary . "\r\n"
            . "Content-Type: text/html; charset=UTF-8\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($htmlBody))
            . '--' . $boundary . "--\r\n";

        $message = implode("\r\n", $headers) . "\r\n\r\n" . $body;
        // SMTP DATA requires every line beginning with a dot to be dot-stuffed.
        $message = preg_replace('/(^|\r\n)\./', '$1..', $message);
        $message = rtrim((string) $message, "\r\n") . "\r\n.\r\n";

        if (fwrite($socket, $message) === false) {
            throw new RuntimeException('Could not transmit the email message.');
        }

        $dataResponse = smtpRead($socket);
        if ((int) substr($dataResponse, 0, 3) !== 250) {
            throw new RuntimeException('SMTP server did not accept the email message.');
        }

        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        if (is_resource($socket)) {
            fclose($socket);
        }
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
if (strpos($contentType, 'application/json') === false) {
    respond(415, ['success' => false, 'message' => 'Unsupported request format.']);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(400, ['success' => false, 'message' => 'Invalid form submission.']);
}

// Honeypot: legitimate visitors leave this hidden field empty.
if (!empty($data['website'])) {
    respond(200, ['success' => true, 'message' => 'Enquiry sent successfully.']);
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$company = trim((string) ($data['company'] ?? ''));
$service = trim((string) ($data['service'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    respond(400, ['success' => false, 'message' => 'Name, email and message are required.']);
}

if (
    strlen($name) > 480 ||
    strlen($email) > 254 ||
    strlen($company) > 720 ||
    strlen($service) > 720 ||
    strlen($message) > 32000
) {
    respond(400, ['success' => false, 'message' => 'One or more fields are too long.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) {
    respond(400, ['success' => false, 'message' => 'Please provide a valid email address.']);
}

// File-based rate limit: maximum 5 attempts per IP per 15 minutes.
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
    . DIRECTORY_SEPARATOR . 'navan-contact-' . hash('sha256', $ip) . '.json';
$now = time();
$times = [];

if (is_file($rateFile)) {
    $saved = json_decode((string) @file_get_contents($rateFile), true);
    if (is_array($saved)) {
        $times = $saved;
    }
}

$times = array_values(array_filter(
    $times,
    static fn ($time): bool => is_numeric($time) && (int) $time > $now - 900
));

if (count($times) >= 5) {
    respond(429, ['success' => false, 'message' => 'Too many enquiries were submitted. Please try again in 15 minutes.']);
}

$times[] = $now;
@file_put_contents($rateFile, json_encode($times), LOCK_EX);

// --------------------------------------------------
// EMAIL CONFIGURATION — EDIT THE APP PASSWORD ONLY.
// Sender must be a Google Workspace/Gmail account
// that can authenticate with this Gmail SMTP login.
// --------------------------------------------------
$smtpHost = 'smtp.gmail.com';
$smtpPort = 465;
$smtpUsername = 'toni@design-365.com';
$smtpPassword = 'tzii jweq hxss tqav';
$smtpPassword = preg_replace('/\s+/', '', $smtpPassword) ?? $smtpPassword;

$senderEmail = 'toni@design-365.com';
$senderName = 'Navan Quantity Surveyors';
$recipientEmail = 'Saravana.s.sudhan@gmail.com';

$escape = static function (string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$html = '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#222;line-height:1.5">'
    . '<h2>New Navan Website Enquiry</h2>'
    . '<table cellpadding="7" cellspacing="0" style="border-collapse:collapse">'
    . '<tr><td><strong>Name</strong></td><td>' . $escape($name) . '</td></tr>'
    . '<tr><td><strong>Email</strong></td><td>' . $escape($email) . '</td></tr>'
    . '<tr><td><strong>Company</strong></td><td>' . $escape($company !== '' ? $company : '—') . '</td></tr>'
    . '<tr><td><strong>Service</strong></td><td>' . $escape($service !== '' ? $service : '—') . '</td></tr>'
    . '</table><h3>Project details</h3><p style="white-space:pre-wrap">' . $escape($message) . '</p>'
    . '<hr><p style="font-size:12px;color:#666">Sent from the Navan Quantity Surveyors website contact form.</p>'
    . '</body></html>';

$subject = 'Navan website enquiry from ' . preg_replace('/[\r\n]+/', ' ', $name);
$textBody = "New Navan Website Enquiry\n\n"
    . "Name: {$name}\nEmail: {$email}\nCompany: {$company}\nService: {$service}\n\n"
    . "Project details:\n{$message}\n";

try {
    if (
        $smtpPassword === 'PASTE_YOUR_16_CHARACTER_GOOGLE_APP_PASSWORD_HERE' ||
        trim($smtpPassword) === ''
    ) {
        throw new RuntimeException('Gmail App Password has not been configured.');
    }

    sendViaGmailSmtp(
        $smtpHost,
        $smtpPort,
        $smtpUsername,
        $smtpPassword,
        $senderEmail,
        $senderName,
        $recipientEmail,
        $email,
        $name,
        $subject,
        $html,
        $textBody
    );

    respond(200, ['success' => true, 'message' => 'Your enquiry has been submitted successfully.']);
} catch (Throwable $error) {
    // Log only a generic message; never log SMTP credentials or submitted message content.
    error_log('Navan contact form SMTP delivery failed: ' . $error->getMessage());
    respond(500, ['success' => false, 'message' => 'We could not send your enquiry right now. Please try again later.']);
}
