import { readFileSync, readdirSync } from 'node:fs';

const files = ['package.json', 'pages.json', 'manifest.json'];
const schemaFiles = readdirSync('uniCloud-tcb/database')
  .filter(file => file.endsWith('.schema.json'))
  .map(file => `uniCloud-tcb/database/${file}`);
let failed = false;

for (const file of [...files, ...schemaFiles]) {
  try {
    JSON.parse(readFileSync(file, 'utf8'));
    console.log(`OK ${file}`);
  } catch (error) {
    failed = true;
    console.error(`Invalid JSON in ${file}: ${error.message}`);
  }
}

process.exit(failed ? 1 : 0);
