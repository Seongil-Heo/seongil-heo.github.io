import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseTsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.trim().split('\n');
  if (lines.length < 2) {
    console.error(`No data found in TSV file: ${filePath}`);
    process.exit(1);
  }
  const headers = lines[0].split('\t').map(h => h.trim());
  const data = lines.slice(1).map(line => {
    const values = line.split('\t').map(v => v.trim());
    const item = {};
    headers.forEach((h, i) => {
      const raw = values[i] ?? '';
      let parsed;
      
      // Semicolon-separated list detection
      if (raw.includes(';')) {
        parsed = raw.split(';').map(s => s.trim());
      }
      // JSON array detection: values like "[a,b]" or '["a","b"]'
      else if (/^\s*\[.*\]\s*$/.test(raw)) {
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = raw;
        }
      }
      // Boolean detection
      else if (/^(true|false)$/i.test(raw)) {
        parsed = raw.toLowerCase() === 'true';
      }
      // Number detection
      else {
        const num = Number(raw);
        parsed = !isNaN(num) && raw !== '' ? num : raw;
      }
      item[h] = parsed;
    });
    return item;
  });
  return data;
}

function writeJson(outPath, payload) {
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');
  if (Array.isArray(payload)) {
    console.log(`Wrote ${payload.length} records to ${outPath}`);
  } else if (payload && Array.isArray(payload.data)) {
    console.log(`Wrote ${payload.data.length} records to ${outPath}`);
  } else {
    console.log(`Wrote JSON to ${outPath}`);
  }
}

function preResearch(allRecords) {
  // Extract description and data records
  const descRec = allRecords.find(r => Number(r.Id) === 0) || {};
  const description = descRec.Description || descRec.description || '';

  const items = allRecords
    .filter(r => Number(r.Id) !== 0)
    .map(record => {
      // Handle Current Project fields
      if (Array.isArray(record['Current Project'])) {
        const titles = record['Current Project'];
        const details = {};
        titles.forEach((title, idx) => {
          const key = `Current Project ${idx + 1}`;
          if (record[key] != null && record[key] !== '') {
            details[title] = record[key];
          }
        });
        record['Current Project'] = details;
        // Remove numbered Current Project fields 1, 2, and 3
        delete record['Current Project 1'];
        delete record['Current Project 2'];
        delete record['Current Project 3'];
      }
      return record;
    });

  return { description, data: items };
}

function processHome() {
  const tsvPath = path.resolve(__dirname, '../home.tsv');
  const outPath = path.resolve(__dirname, '../src/data/home.json');
  const url = process.env.HOME_SHEET;
  if (!url) {
    console.error('Environment variable HOME_SHEET not set');
    process.exit(1);
  }
  execSync(`curl -L "${url}" -o "${tsvPath}"`, { stdio: 'inherit' });
  const data = parseTsv(tsvPath);
  writeJson(outPath, data[0]);
  fs.unlinkSync(tsvPath);
  console.log(`Deleted TSV file: ${tsvPath}`);
}

function processPeople() {
  const tsvPath = path.resolve(__dirname, '../people.tsv');
  const outPath = path.resolve(__dirname, '../src/data/people.json');
  const url = process.env.PEOPLE_SHEET;
  if (!url) {
    console.error('Environment variable PEOPLE_SHEET not set');
    process.exit(1);
  }
  execSync(`curl -L "${url}" -o "${tsvPath}"`, { stdio: 'inherit' });
  const data = parseTsv(tsvPath);
  writeJson(outPath, data);
  fs.unlinkSync(tsvPath);
  console.log(`Deleted TSV file: ${tsvPath}`);
}

function processResearch() {
  const tsvPath = path.resolve(__dirname, '../research.tsv');
  const outPath = path.resolve(__dirname, '../src/data/research.json');
  const url = process.env.RESEARCH_SHEET;
  if (!url) {
    console.error('Environment variable RESEARCH_SHEET not set');
    process.exit(1);
  }
  execSync(`curl -L "${url}" -o "${tsvPath}"`, { stdio: 'inherit' });
  const allRecords = parseTsv(tsvPath);
  const { description, data: items } = preResearch(allRecords);
  writeJson(outPath, { description, data: items });
  fs.unlinkSync(tsvPath);
  console.log(`Deleted TSV file: ${tsvPath}`);  
}


function processVideos() {
  const tsvPath = path.resolve(__dirname, '../videos.tsv');
  const outPath = path.resolve(__dirname, '../src/data/videos.json');
  const url = process.env.VIDEOS_SHEET;
  if (!url) {
    console.error('Environment variable VIDEOS_SHEET not set');
    process.exit(1);
  }
  execSync(`curl -L "${url}" -o "${tsvPath}"`, { stdio: 'inherit' });
  const data = parseTsv(tsvPath);
  writeJson(outPath, data);
  fs.unlinkSync(tsvPath);
  console.log(`Deleted TSV file: ${tsvPath}`);
}

function processPublications() {
  const tsvPath = path.resolve(__dirname, '../publications.tsv');
  const outPath = path.resolve(__dirname, '../src/data/publications.json');
  const url = process.env.PUBLICATIONS_SHEET;
  if (!url) {
    console.error('Environment variable PUBLICATIONS_SHEET not set');
    process.exit(1);
  }
  execSync(`curl -L "${url}" -o "${tsvPath}"`, { stdio: 'inherit' });
  const data = parseTsv(tsvPath);
  writeJson(outPath, data);
  fs.unlinkSync(tsvPath);
  console.log(`Deleted TSV file: ${tsvPath}`);
}

function processNews() {
  const tsvPath = path.resolve(__dirname, '../news.tsv');
  const outPath = path.resolve(__dirname, '../src/data/news.json');
  const url = process.env.NEWS_SHEET;
  if (!url) {
    console.error('Environment variable NEWS_SHEET not set');
    process.exit(1);
  }
  execSync(`curl -L "${url}" -o "${tsvPath}"`, { stdio: 'inherit' });
  const data = parseTsv(tsvPath);
  writeJson(outPath, data);
  fs.unlinkSync(tsvPath);
  console.log(`Deleted TSV file: ${tsvPath}`);
}

function main() {
  processHome();
  processPeople();
  processResearch();
  processVideos();
  processPublications();
  processNews();
}

main();