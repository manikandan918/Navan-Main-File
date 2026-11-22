const fs = require('fs');
const path = require('path');
const https = require('https');

// Downloads the Unsplash images already used by this project into public/images.
// Run from the project root: node download_images.js
const imageIds = [
  "photo-1497366754035-f200968a6e72",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1600607687939-ce8a6c25118c",
  "photo-1474487548417-781cb71495f3",
  "photo-1503387762-592deb58ef4e",
  "photo-1487958449943-2429e8be8625",
  "photo-1581092160607-ee22621dd758",
  "photo-1600210492486-724fe5c67fb0",
  "photo-1449158743715-0a90ebb6d2d8",
  "photo-1497366811353-6870744d04b2",
  "photo-1454165804606-c3d57bc86b40",
  "photo-1521737711867-e3b97375f902",
  "photo-1541888946425-d81bb19240f5"
];
const outputDir = path.join(__dirname, 'public', 'images');
fs.mkdirSync(outputDir, { recursive: true });

function download(url, destination, redirects = 5) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, response => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location && redirects > 0) {
        response.resume();
        return resolve(download(response.headers.location, destination, redirects - 1));
      }
      if (response.statusCode !== 200) {
        response.resume();
        return reject(new Error(`HTTP ${response.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(destination);
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', err => { fs.unlink(destination, () => reject(err)); });
    });
    request.setTimeout(30000, () => request.destroy(new Error('Download timed out')));
    request.on('error', reject);
  });
}

(async () => {
  let failed = 0;
  for (const id of imageIds) {
    const destination = path.join(outputDir, `${id}.jpg`);
    if (fs.existsSync(destination) && fs.statSync(destination).size > 0) {
      console.log(`Already exists: ${id}.jpg`);
      continue;
    }
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85`;
    try {
      await download(url, destination);
      console.log(`Downloaded: ${id}.jpg`);
    } catch (error) {
      failed++;
      console.error(`Failed: ${id}.jpg — ${error.message}`);
    }
  }
  if (failed) {
    console.error(`\n${failed} image(s) could not be downloaded. Check your internet connection and run this script again.`);
    process.exitCode = 1;
  } else {
    console.log('\nAll images are ready in public/images.');
  }
})();
