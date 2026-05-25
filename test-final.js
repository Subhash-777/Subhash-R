const latex = `\\documentclass{article}
\\begin{document}
Hello PDF
\\end{document}`;

const formData = new FormData();
const blob = new Blob([latex], { type: 'text/plain' });
formData.append('filecontents[]', blob, 'document.tex');
formData.append('filename[]', 'document.tex');
formData.append('engine', 'pdflatex');
formData.append('return', 'pdf');

fetch('https://texlive.net/cgi-bin/latexcgi', {
  method: 'POST',
  body: formData
}).then(res => res.arrayBuffer()).then(buf => {
  const arr = new Uint8Array(buf);
  console.log('Size:', buf.byteLength);
  console.log('Magic:', arr.slice(0, 4));
});
