import jsPDF from 'jspdf';

export type PdfOptions = {
  fontFamily?: 'helvetica' | 'times' | 'courier';
  fontSize?: number;
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  underline?: boolean;
};

export const generatePDF = (
  content: string,
  filename: string = 'letter.pdf',
  options: PdfOptions = {}
) => {
  // Create new jsPDF instance
  const doc = new jsPDF();

  // Resolve options with defaults
  const fontFamily = options.fontFamily ?? 'helvetica';
  const fontStyle = options.fontStyle ?? 'normal';
  const fontSize = options.fontSize ?? 11;
  const underline = options.underline ?? false;

  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const maxWidth = pageWidth - margin * 2;

  // Detect if content contains HTML tags (rich text)
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(content);

  if (isHTML) {
    // Wrap content to apply base font settings while preserving inline styles like <b>, <i>, <u>
    const cssFontFamily =
      fontFamily === 'helvetica'
        ? 'Helvetica, Arial, sans-serif'
        : fontFamily === 'times'
        ? '"Times New Roman", Times, serif'
        : '"Courier New", Courier, monospace';

    const wrapped = `<div style="font-family:${cssFontFamily}; font-size:${fontSize}px; line-height:1.6;">${content}</div>`;

    // Render HTML content to PDF and then save
    // Note: html rendering is async; we'll save in the callback
    // @ts-ignore - html typings may vary depending on jspdf version
    doc.html(wrapped, {
      x: margin,
      y: margin,
      width: maxWidth,
      html2canvas: { scale: 1 },
      callback: () => {
        doc.save(filename);
      },
    });

    return;
  }

  // Plain text rendering (no HTML) - original behavior
  doc.setFont(fontFamily, fontStyle);
  doc.setFontSize(fontSize);

  // Split content into lines
  const lines = content.split('\n');
  let yPosition = margin;
  const lineHeight = Math.max(6, Math.round(fontSize * 1.3));

  lines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    // Handle long lines by splitting them
    const splitLines = doc.splitTextToSize(line, maxWidth);

    splitLines.forEach((splitLine: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }

      doc.text(splitLine, margin, yPosition);

      // Draw underline if enabled (applies to entire document)
      if (underline && splitLine.trim().length > 0) {
        const textWidth = doc.getTextWidth(splitLine);
        // Slight offset below baseline for underline
        const underlineY = yPosition + 1;
        doc.line(margin, underlineY, margin + textWidth, underlineY);
      }

      yPosition += lineHeight;
    });

  // Add extra space for empty lines
    if (line.trim() === '') {
      yPosition += Math.round(lineHeight * 0.5);
    }
  });

  // Save the PDF
  doc.save(filename);
};