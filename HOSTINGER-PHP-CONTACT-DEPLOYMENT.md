# Navan Quantity Surveyors — Hostinger deployment

This project keeps the existing React website and uses a PHP contact endpoint at `/api/send-email.php`.

## Email setup

The API sends mail directly through Gmail SMTP over SSL (port 465). It does not use Composer, PHPMailer, a `vendor` folder, Node.js, Render, or a separate backend host.

Configured addresses:
- SMTP login / sender: `toni@design-365.com`
- Recipient: `xaa6090@gmail.com`
- SMTP server: `smtp.gmail.com`
- Port: `465` (implicit SSL/TLS)

Before deployment, open `api/send-email.php` and replace:

`PASTE_YOUR_16_CHARACTER_GOOGLE_APP_PASSWORD_HERE`

with the Google App Password for the Google account that owns or is authorised to send as `toni@design-365.com`. Do not use the normal Google account password. Do not put the App Password in React, `.env`, GitHub, or any client-side file.

Important: `toni@design-365.com` must be a Google Workspace/Gmail mailbox (or a sender alias authorised by that Google account). If it is hosted by another email provider, this Gmail SMTP configuration will not authenticate.

Google App Passwords require 2-Step Verification. If the App Password option is unavailable, check the account's Workspace administrator policy or account security restrictions.

## Local project

1. Install Node.js dependencies with `npm install`.
2. Build the React site with `npm run build`.
3. PHP is not executed by the React development server. To test the PHP endpoint locally, use a PHP-enabled local server and configure the React development proxy if needed. SMTP testing also requires outbound connectivity to `smtp.gmail.com:465`.

## Hostinger deployment

1. Back up the current contents of `public_html`.
2. Run `npm install` and `npm run build` in the project root.
3. Upload the **contents** of the generated `build/` folder to `public_html/` (not the `build` folder itself). This includes `index.html`, `static/`, image assets, and `.htaccess` copied from `public/`.
4. Upload the project's `api/` folder to `public_html/api/`. The PHP endpoint must be at `public_html/api/send-email.php`.
5. Confirm PHP is enabled for the domain and that PHP's OpenSSL extension is enabled.
6. Submit a test enquiry. Check the recipient Inbox and Spam folders.

Final relevant structure:

```text
public_html/
├── index.html
├── .htaccess
├── static/
├── images/
└── api/
    └── send-email.php
```

The React contact form already calls `/api/send-email.php`; no React API URL or `.env` change is required for this same-domain deployment.

## Notes

- SMTP credentials stay in the server-side PHP file. Restrict access to Hostinger File Manager and do not publish the real App Password in a public repository.
- A successful response means Gmail SMTP accepted the message; it does not guarantee that the recipient's inbox will display it rather than Spam.
- The API validates required fields, applies a honeypot and a basic per-IP rate limit, escapes user input in the HTML email, and sets the visitor's email as Reply-To.
- If your Hostinger plan blocks outbound connections to port 465, contact Hostinger support or use an email provider/endpoint supported by the hosting plan.
