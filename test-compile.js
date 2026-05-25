const https = require('https');

const latex = `\\documentclass{article}
\\begin{document}
Hello PDF
\\end{document}`;

const postData = new URLSearchParams({
  text: latex,
  command: 'pdflatex'
}).toString();

const options = {
  hostname: 'latexonline.cc',
  path: '/compile',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => process.stdout.write(chunk.toString().substring(0, 50)));
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();
