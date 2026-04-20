import fs from 'fs';
import html_to_pdf from 'html-pdf-node';

const docs = {
  documentation: fs.readFileSync('DOCUMENTATION.md', 'utf8'),
  proposal: '## DocVerifier Proposal\n\n**Status:** Production Ready\n\nPure client-side SHA-256 verification.\nFree. Private. Instant.',
  userManual: fs.readFileSync('USER-MANUAL.md', 'utf8'),
  installation: fs.readFileSync('INSTALLATION.md', 'utf8')
};

const html = `
<!DOCTYPE html>
<html>
<head><title>DocVerifier Docs</title>
<style>body{font-family:Arial;padding:40px;background:#f8f9fa;}
h1{color:#2563eb;font-size:2.5em;}
h2{color:#1e40af;font-size:1.8em;}
pre{background:#e0e7ff;padding:1em;border-radius:8px;}</style>
</head>
<body>
${Object.entries(docs).map(([title, content]) => 
  `<h1>${title.toUpperCase()}</h1><pre>${content.replace(/\n/g, '<br>')}</pre>`
).join('')}
</body>
</html>`;

(async () => {
  const pdfOptions = { format: 'A4', margin: '20mm' };
  await html_to_pdf.generatePdf(html, pdfOptions).then(pdfBuffer => {
    require('fs').writeFileSync('DocVerifier-Documentation.pdf', pdfBuffer);
    console.log('✅ PDFs created: DocVerifier-Documentation.pdf');
  });
})();

