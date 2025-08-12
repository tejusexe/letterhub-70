export type Country = 'US' | 'UK' | 'INDIA';

export interface LetterTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: LetterField[];
  templates: Record<Country, string>;
}

export interface LetterField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'textarea';
  placeholder: string;
  required: boolean;
}

export interface LetterData {
  [key: string]: string;
}