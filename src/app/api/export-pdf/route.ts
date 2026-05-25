import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { latex, filename } = await req.json();

    if (!latex) {
      return NextResponse.json({ error: 'No LaTeX source provided' }, { status: 400 });
    }

    const formData = new FormData();
    const blob = new Blob([latex], { type: 'text/plain' });
    formData.append('filecontents[]', blob, 'document.tex');
    formData.append('filename[]', 'document.tex');
    formData.append('engine', 'pdflatex');
    formData.append('return', 'pdf');

    // Compile using texlive.net's public API
    const response = await fetch('https://texlive.net/cgi-bin/latexcgi', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to compile PDF: ${response.statusText}`);
    }

    const pdfBuffer = await response.arrayBuffer();
    
    // Sometimes the API returns an HTML log file if compilation fails, 
    // but the content-type usually helps identify it. Or we check the magic number.
    const arr = new Uint8Array(pdfBuffer);
    if (arr.length > 4 && arr[0] === 0x25 && arr[1] === 0x50 && arr[2] === 0x44 && arr[3] === 0x46) {
      // It's a valid PDF (%PDF)
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename || 'Resume.pdf'}"`,
        },
      });
    } else {
      // Compilation failed, probably returned a log
      const text = new TextDecoder().decode(pdfBuffer);
      console.error('LaTeX compilation failed:', text);
      return NextResponse.json({ error: 'LaTeX compilation failed. Ensure the LaTeX code is valid.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
