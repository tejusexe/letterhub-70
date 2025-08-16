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

  // Convert HTML content to plain text for consistent PDF rendering
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(content);
  
  if (isHTML) {
    // Strip HTML tags and convert to plain text
    content = content
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/div>/gi, '\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
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