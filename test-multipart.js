const latex = `\\documentclass{article}
\\begin{document}
Hello PDF
\\end{document}`;

const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

let body = '';
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="filecontents[]"; filename="document.tex"\r\n`;
body += `Content-Type: application/octet-stream\r\n\r\n`;
body += `${latex}\r\n`;
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="filename"\r\n\r\n`;
body += `document.tex\r\n`;
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="engine"\r\n\r\n`;
body += `pdflatex\r\n`;
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="return"\r\n\r\n`;
body += `pdf\r\n`;
body += `--${boundary}--\r\n`;

fetch('https://texlive.net/cgi-bin/latexcgi', {
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
  },
  body: body,
}).then(res => res.arrayBuffer()).then(buf => {
  const arr = new Uint8Array(buf);
  console.log('Size:', buf.byteLength);
  console.log('Magic:', arr.slice(0, 4));
});
