import { LetterTemplate } from '@/types/letter';

export const letterTemplates: LetterTemplate[] = [
  {
    id: 'bank-account-closure',
    title: 'Bank Account Closure Request',
    description: 'Request to close your bank account permanently',
    category: 'Banking',
    fields: [
      { id: 'date', label: 'Date', type: 'date', placeholder: '', required: true },
      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { id: 'address', label: 'Address', type: 'textarea', placeholder: 'Your complete address', required: true },
      { id: 'accountNumber', label: 'Account Number', type: 'text', placeholder: 'Your account number', required: true },
      { id: 'branchName', label: 'Branch Name', type: 'text', placeholder: 'Your branch name', required: true },
      { id: 'reason', label: 'Reason for Closure', type: 'text', placeholder: 'Reason for closing account', required: false },
    ],
    templates: {
      US: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Bank Account Closure

Dear Sir/Madam,

I am writing to formally request the closure of my bank account held with your branch. Below are my account details:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}
Address: {{address}}

{{#if reason}}Reason for Closure: {{reason}}{{/if}}

I understand that upon closure, any remaining balance will be transferred to me via demand draft or check after deducting applicable charges. I also acknowledge that all linked services (cards, online banking, etc.) will be terminated.

Please process this request at your earliest convenience and confirm the closure in writing.

Thank you for your assistance.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`,
      UK: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Bank Account Closure

Dear Sir/Madam,

I am writing to formally request the closure of my bank account held with your branch. Below are my account details:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}
Address: {{address}}

{{#if reason}}Reason for Closure: {{reason}}{{/if}}

I understand that upon closure, any remaining balance will be transferred to me via demand draft or cheque after deducting applicable charges. I also acknowledge that all linked services (cards, online banking, etc.) will be terminated.

Please process this request at your earliest convenience and confirm the closure in writing.

Thank you for your assistance.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`,
      INDIA: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Bank Account Closure

Dear Sir/Madam,

I am writing to formally request the closure of my bank account held with your branch. Below are my account details:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}
Address: {{address}}

{{#if reason}}Reason for Closure: {{reason}}{{/if}}

I understand that upon closure, any remaining balance will be transferred to me via demand draft or cheque after deducting applicable charges. I also acknowledge that all linked services (cards, online banking, etc.) will be terminated.

Please process this request at your earliest convenience and confirm the closure in writing.

Thank you for your assistance.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`
    }
  },
  {
    id: 'address-change',
    title: 'Address Change Request',
    description: 'Update your address in bank records',
    category: 'Banking',
    fields: [
      { id: 'date', label: 'Date', type: 'date', placeholder: '', required: true },
      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { id: 'accountNumber', label: 'Account Number', type: 'text', placeholder: 'Your account number', required: true },
      { id: 'oldAddress', label: 'Current Address', type: 'textarea', placeholder: 'Your current address on record', required: true },
      { id: 'newAddress', label: 'New Address', type: 'textarea', placeholder: 'Your new address', required: true },
      { id: 'branchName', label: 'Branch Name', type: 'text', placeholder: 'Your branch name', required: true },
    ],
    templates: {
      US: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Change of Address

Dear Sir/Madam,

I am writing to request an update to my address in your bank records. My account details are as follows:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

Current Address on Record:
{{oldAddress}}

New Address:
{{newAddress}}

I request you to update my address in all your records and correspondence. I am attaching the required address proof documents as per your bank's policy.

Please confirm the address change in writing once completed.

Thank you for your prompt attention to this matter.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`,
      UK: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Change of Address

Dear Sir/Madam,

I am writing to request an update to my address in your bank records. My account details are as follows:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

Current Address on Record:
{{oldAddress}}

New Address:
{{newAddress}}

I request you to update my address in all your records and correspondence. I am attaching the required address proof documents as per your bank's policy.

Please confirm the address change in writing once completed.

Thank you for your prompt attention to this matter.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`,
      INDIA: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Change of Address

Dear Sir/Madam,

I am writing to request an update to my address in your bank records. My account details are as follows:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

Current Address on Record:
{{oldAddress}}

New Address:
{{newAddress}}

I request you to update my address in all your records and correspondence. I am attaching the required address proof documents as per your bank's policy.

Please confirm the address change in writing once completed.

Thank you for your prompt attention to this matter.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`
    }
  },
  {
    id: 'cheque-book-request',
    title: 'Cheque Book Request',
    description: 'Request a new cheque book for your account',
    category: 'Banking',
    fields: [
      { id: 'date', label: 'Date', type: 'date', placeholder: '', required: true },
      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { id: 'accountNumber', label: 'Account Number', type: 'text', placeholder: 'Your account number', required: true },
      { id: 'branchName', label: 'Branch Name', type: 'text', placeholder: 'Your branch name', required: true },
      { id: 'chequeType', label: 'Cheque Type', type: 'text', placeholder: 'e.g., Bearer, Account Payee', required: false },
      { id: 'pages', label: 'Number of Pages', type: 'text', placeholder: 'e.g., 25, 50, 100', required: false },
    ],
    templates: {
      US: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for New Cheque Book

Dear Sir/Madam,

I would like to request a new cheque book for my account. My details are as follows:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

{{#if chequeType}}Cheque Type Required: {{chequeType}}{{/if}}
{{#if pages}}Number of Pages: {{pages}}{{/if}}

Please issue the cheque book and inform me once it is ready for collection. I am willing to pay the applicable charges as per your bank's policy.

Thank you for your assistance.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`,
      UK: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for New Cheque Book

Dear Sir/Madam,

I would like to request a new cheque book for my account. My details are as follows:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

{{#if chequeType}}Cheque Type Required: {{chequeType}}{{/if}}
{{#if pages}}Number of Pages: {{pages}}{{/if}}

Please issue the cheque book and inform me once it is ready for collection. I am willing to pay the applicable charges as per your bank's policy.

Thank you for your assistance.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`,
      INDIA: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for New Cheque Book

Dear Sir/Madam,

I would like to request a new cheque book for my account. My details are as follows:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

{{#if chequeType}}Cheque Type Required: {{chequeType}}{{/if}}
{{#if pages}}Number of Pages: {{pages}}{{/if}}

Please issue the cheque book and inform me once it is ready for collection. I am willing to pay the applicable charges as per your bank's policy.

Thank you for your assistance.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`
    }
  },
  {
    id: 'bank-statement-request',
    title: 'Bank Statement Request',
    description: 'Request bank statements for specific periods',
    category: 'Banking',
    fields: [
      { id: 'date', label: 'Date', type: 'date', placeholder: '', required: true },
      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
      { id: 'accountNumber', label: 'Account Number', type: 'text', placeholder: 'Your account number', required: true },
      { id: 'branchName', label: 'Branch Name', type: 'text', placeholder: 'Your branch name', required: true },
      { id: 'fromDate', label: 'From Date', type: 'date', placeholder: '', required: true },
      { id: 'toDate', label: 'To Date', type: 'date', placeholder: '', required: true },
      { id: 'purpose', label: 'Purpose', type: 'text', placeholder: 'Reason for statement request', required: false },
    ],
    templates: {
      US: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Bank Statement

Dear Sir/Madam,

I am writing to request a bank statement for my account. Please find my details below:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

Statement Period Required:
From: {{fromDate}}
To: {{toDate}}

{{#if purpose}}Purpose: {{purpose}}{{/if}}

Please provide the statement in hard copy format. I am willing to pay the applicable charges as per your bank's policy.

Kindly process this request at your earliest convenience.

Thank you for your cooperation.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`,
      UK: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Bank Statement

Dear Sir/Madam,

I am writing to request a bank statement for my account. Please find my details below:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

Statement Period Required:
From: {{fromDate}}
To: {{toDate}}

{{#if purpose}}Purpose: {{purpose}}{{/if}}

Please provide the statement in hard copy format. I am willing to pay the applicable charges as per your bank's policy.

Kindly process this request at your earliest convenience.

Thank you for your cooperation.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`,
      INDIA: `Date: {{date}}

To,
The Branch Manager
{{branchName}}

Subject: Request for Bank Statement

Dear Sir/Madam,

I am writing to request a bank statement for my account. Please find my details below:

Account Holder Name: {{name}}
Account Number: {{accountNumber}}

Statement Period Required:
From: {{fromDate}}
To: {{toDate}}

{{#if purpose}}Purpose: {{purpose}}{{/if}}

Please provide the statement in hard copy format. I am willing to pay the applicable charges as per your bank's policy.

Kindly process this request at your earliest convenience.

Thank you for your cooperation.

Yours faithfully,
{{name}}

Signature: _______________
Date: {{date}}`
    }
  }
];

export const getLetterById = (id: string): LetterTemplate | undefined => {
  return letterTemplates.find(letter => letter.id === id);
};

export const searchLetters = (query: string): LetterTemplate[] => {
  if (!query.trim()) return letterTemplates;
  
  const lowercaseQuery = query.toLowerCase();
  return letterTemplates.filter(letter => 
    letter.title.toLowerCase().includes(lowercaseQuery) ||
    letter.description.toLowerCase().includes(lowercaseQuery) ||
    letter.category.toLowerCase().includes(lowercaseQuery)
  );
};