const https = require('https');
const latex = `\\documentclass{article}\\begin{document}Hello\\end{document}`;
const url = 'https://latexonline.cc/compile?text=' + encodeURIComponent(latex);

https.get(url, (res) => {
  console.log('STATUS:', res.statusCode);
  let data = [];
  res.on('data', chunk => data.push(chunk));
  res.on('end', () => {
    const buf = Buffer.concat(data);
    console.log('Size:', buf.length);
  });
});
