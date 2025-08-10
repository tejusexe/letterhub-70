import jsPDF from 'jspdf';

export const generatePDF = (content: string, filename: string = 'letter.pdf') => {
  // Create new jsPDF instance
  const doc = new jsPDF();
  
  // Set font and font size
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  // Split content into lines
  const lines = content.split('\n');
  let yPosition = 20;
  const lineHeight = 6;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  
  lines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Handle long lines by splitting them
    const splitLines = doc.splitTextToSize(line, 170);
    
    splitLines.forEach((splitLine: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(splitLine, margin, yPosition);
      yPosition += lineHeight;
    });
    
    // Add extra space for empty lines
    if (line.trim() === '') {
      yPosition += lineHeight * 0.5;
    }
  });
  
  // Save the PDF
  doc.save(filename);
};