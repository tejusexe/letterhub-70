import { LetterData } from '@/types/letter';

export const generateLetter = (template: string, data: LetterData): string => {
  let result = template;

  // Simple template replacement using handlebars-like syntax
  Object.entries(data).forEach(([key, value]) => {
    // Replace {{key}} with value
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value || '');
  });

  // Handle conditional blocks {{#if key}}content{{/if}}
  result = result.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/gs, (match, key, content) => {
    return data[key] ? content : '';
  });

  // Clean up extra whitespace and empty lines
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return result;
};

export const formatDate = (date: string): string => {
  if (!date) return '';
  
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return d.toLocaleDateString('en-US', options);
};