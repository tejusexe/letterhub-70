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

  // Set font and font size
  doc.setFont(fontFamily, fontStyle);
  doc.setFontSize(fontSize);

  // Split content into lines
  const lines = content.split('\n');
  let yPosition = 20;
  const lineHeight = Math.max(6, Math.round(fontSize * 1.3));
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;

  lines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = 20;
    }

    // Handle long lines by splitting them
    const maxWidth = doc.internal.pageSize.width - margin * 2;
    const splitLines = doc.splitTextToSize(line, maxWidth);

    splitLines.forEach((splitLine: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
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