import { readFileSync } from 'node:fs';

const files = ['package.json', 'pages.json', 'manifest.json'];
let failed = false;

for (const file of files) {
  try {
    JSON.parse(readFileSync(file, 'utf8'));
    console.log(`OK ${file}`);
  } catch (error) {
    failed = true;
    console.error(`Invalid JSON in ${file}: ${error.message}`);
  }
}

process.exit(failed ? 1 : 0);
