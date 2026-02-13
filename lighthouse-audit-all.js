const { execSync } = require('child_process');
const fs = require('fs');

const BASE_URL = 'https://mi-clinica-medical-center.vercel.app';

// All pages to test
const pages = [
  { path: '/es', name: 'Homepage ES' },
  { path: '/en', name: 'Homepage EN' },
  { path: '/es/services', name: 'Services ES' },
  { path: '/en/services', name: 'Services EN' },
  // Spanish services
  { path: '/es/services/medicina-familiar', name: 'Medicina Familiar' },
  { path: '/es/services/examenes-inmigracion', name: 'Exámenes Inmigración' },
  { path: '/es/services/servicios-ginecologia', name: 'Ginecología' },
  { path: '/es/services/laboratorio-clinico', name: 'Laboratorio' },
  // English services
  { path: '/en/services/family-medicine', name: 'Family Medicine' },
  { path: '/en/services/immigration-exams', name: 'Immigration Exams' },
  { path: '/en/services/gynecology-services', name: 'Gynecology' },
  { path: '/en/services/clinical-laboratory', name: 'Clinical Laboratory' },
];

const results = [];

console.log('🔍 Running Lighthouse audits on all pages...\n');

for (const page of pages) {
  const url = `${BASE_URL}${page.path}`;
  const reportName = page.path.replace(/\//g, '-').replace(/^-/, '') || 'home';
  
  try {
    console.log(`📊 Auditing: ${page.name} (${url})`);
    
    execSync(
      `npx lighthouse "${url}" --output=json --output-path=./lighthouse-reports/${reportName}.json --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices --preset=desktop 2>/dev/null`,
      { timeout: 120000 }
    );
    
    const report = JSON.parse(fs.readFileSync(`./lighthouse-reports/${reportName}.json`, 'utf8'));
    
    const scores = {
      name: page.name,
      path: page.path,
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      bestPractices: Math.round(report.categories['best-practices'].score * 100),
    };
    
    results.push(scores);
    console.log(`   ✅ P:${scores.performance} A:${scores.accessibility} BP:${scores.bestPractices}\n`);
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
    results.push({
      name: page.name,
      path: page.path,
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      error: true,
    });
  }
}

console.log('\n' + '='.repeat(80));
console.log('📈 LIGHTHOUSE AUDIT SUMMARY');
console.log('='.repeat(80) + '\n');

// Calculate averages
const validResults = results.filter(r => !r.error);
const avgPerf = Math.round(validResults.reduce((a, b) => a + b.performance, 0) / validResults.length);
const avgA11y = Math.round(validResults.reduce((a, b) => a + b.accessibility, 0) / validResults.length);
const avgBP = Math.round(validResults.reduce((a, b) => a + b.bestPractices, 0) / validResults.length);

console.log('AVERAGES ACROSS ALL PAGES:');
console.log(`  Performance:    ${avgPerf}%`);
console.log(`  Accessibility:  ${avgA11y}%`);
console.log(`  Best Practices: ${avgBP}%\n`);

console.log('DETAILED RESULTS:');
console.log('-'.repeat(80));
console.log(`${'Page'.padEnd(30)} | ${'Perf'.padStart(5)} | ${'A11y'.padStart(5)} | ${'BP'.padStart(5)}`);
console.log('-'.repeat(80));

for (const result of results) {
  if (result.error) {
    console.log(`${result.name.padEnd(30)} | ERROR`);
  } else {
    console.log(`${result.name.padEnd(30)} | ${String(result.performance).padStart(5)} | ${String(result.accessibility).padStart(5)} | ${String(result.bestPractices).padStart(5)}`);
  }
}

console.log('-'.repeat(80));

// Save summary
fs.writeFileSync('./lighthouse-reports/summary.json', JSON.stringify({ averages: { avgPerf, avgA11y, avgBP }, results }, null, 2));
console.log('\n✅ Full report saved to lighthouse-reports/summary.json');
