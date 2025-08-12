import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';
import { getLetterById } from '@/data/letterTemplates';
import { generateLetter, formatDate } from '@/utils/letterGenerator';
import { generatePDF } from '@/utils/pdfGenerator';
import { LetterData } from '@/types/letter';
import { ArrowLeft, Download, Eye, Bold, Italic, Underline } from 'lucide-react';

const LetterGenerator = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LetterData>({});
  const [previewContent, setPreviewContent] = useState('');
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
const [customTemplate, setCustomTemplate] = useState<string>('');
const [fontFamily, setFontFamily] = useState<'helvetica' | 'times' | 'courier'>('helvetica');
const [fontSize, setFontSize] = useState<number>(11);
const [bold, setBold] = useState<boolean>(false);
const [italic, setItalic] = useState<boolean>(false);
const [underline, setUnderline] = useState<boolean>(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const applyFormat = (command: 'bold' | 'italic' | 'underline') => {
    editorRef.current?.focus();
    document.execCommand(command, false);
    updateToolbarState();
    const html = editorRef.current?.innerHTML || '';
    setCustomTemplate(html);
  };

  // Sync toolbar button states with current selection formatting
  const updateToolbarState = () => {
    const editor = editorRef.current;
    const sel = window.getSelection();
    if (!editor || !sel || sel.rangeCount === 0) {
      setBold(false);
      setItalic(false);
      setUnderline(false);
      return;
    }
    const anchorNode = sel.anchorNode as Node | null;
    if (!anchorNode || !editor.contains(anchorNode)) {
      setBold(false);
      setItalic(false);
      setUnderline(false);
      return;
    }
    try {
      setBold(document.queryCommandState('bold'));
      setItalic(document.queryCommandState('italic'));
      setUnderline(document.queryCommandState('underline'));
    } catch {
      // no-op
    }
  };

  const letterTemplate = id ? getLetterById(id) : null;
  useEffect(() => {
    if (letterTemplate) {
      // Initialize form with today's date
      const today = new Date().toISOString().split('T')[0];
      setFormData({ date: today });
    }
  }, [letterTemplate]);

  useEffect(() => {
    if (letterTemplate) {
      // Format date fields for display
      const processedData = { ...formData };
      Object.keys(processedData).forEach(key => {
        if (letterTemplate.fields.find(field => field.id === key && field.type === 'date') && processedData[key]) {
          processedData[key] = formatDate(processedData[key]);
        }
      });

      const templateToUse = customTemplate || letterTemplate.template;
      const content = generateLetter(templateToUse, processedData);
      const htmlContent = /<\/?[a-z][\s\S]*>/i.test(content) ? content : content.replace(/\n/g, '<br/>');
      setPreviewContent(htmlContent);
    }
  }, [formData, letterTemplate, customTemplate]);

  // Update toolbar highlight based on selection inside the editor
  useEffect(() => {
    if (!isEditingTemplate) return;
    const handleSelectionChange = () => updateToolbarState();
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [isEditingTemplate]);
  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleDownloadPDF = () => {
    if (!letterTemplate || !previewContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in the required fields before downloading.",
        variant: "destructive",
      });
      return;
    }

    try {
      const filename = `${letterTemplate.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      generatePDF(previewContent, filename, {
        fontFamily,
        fontSize,
        fontStyle: bold && italic ? 'bolditalic' : bold ? 'bold' : italic ? 'italic' : 'normal',
        underline,
      });
      
      toast({
        title: "Success",
        description: "Your letter has been downloaded as PDF.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!letterTemplate) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Letter template not found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const requiredFields = letterTemplate.fields.filter(field => field.required);
  const requiredFieldsCount = requiredFields.length;
  const filledRequiredFields = requiredFields.filter(field => formData[field.id]?.trim()).length;
  const isFormValid = filledRequiredFields === requiredFieldsCount;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{letterTemplate.title}</h1>
                <Badge variant="secondary">{letterTemplate.category}</Badge>
              </div>
              <p className="text-muted-foreground">{letterTemplate.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Fill Your Details
                </CardTitle>
                <CardDescription>
                  Complete the form below to generate your personalized letter
                  ({filledRequiredFields}/{requiredFieldsCount} required fields completed)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {letterTemplate.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="min-h-[80px]"
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button 
                    onClick={handleDownloadPDF}
                    disabled={!isFormValid}
                    size="lg"
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  
                  {!isFormValid && (
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      Please fill in all required fields to download
                    </p>
                  )}


                </div>

              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Letter Preview</CardTitle>
                <CardDescription>
                  Preview of your generated letter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => setIsEditingTemplate((v) => !v)}>
                        {isEditingTemplate ? 'Preview' : 'Edit Template'}
                      </Button>
                      {isEditingTemplate && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => setCustomTemplate('')}>
                          Reset to Default
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="min-w-[180px]">
                        <Label className="text-xs text-muted-foreground">Font</Label>
                        <Select value={fontFamily} onValueChange={(v) => setFontFamily(v as 'helvetica' | 'times' | 'courier')}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="helvetica">Helvetica</SelectItem>
                            <SelectItem value="times">Times New Roman</SelectItem>
                            <SelectItem value="courier">Courier New</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-[120px]">
                        <Label className="text-xs text-muted-foreground">Size (px)</Label>
                        <Input type="number" min={8} max={32} value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value) || 11)} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Toggle pressed={bold} onPressedChange={() => { applyFormat('bold'); }} aria-label="Toggle bold">
                          <Bold className="h-4 w-4" />
                        </Toggle>
                        <Toggle pressed={italic} onPressedChange={() => { applyFormat('italic'); }} aria-label="Toggle italic">
                          <Italic className="h-4 w-4" />
                        </Toggle>
                        <Toggle pressed={underline} onPressedChange={() => { applyFormat('underline'); }} aria-label="Toggle underline">
                          <Underline className="h-4 w-4" />
                        </Toggle>
                      </div>
                    </div>
                  </div>

                    {isEditingTemplate ? (
                    <div
                      id="template-editor"
                      ref={editorRef}
                      contentEditable
                      className="bg-muted/20 p-6 rounded-lg border-2 border-dashed border-muted-foreground/20 min-h-[600px] whitespace-pre-wrap focus:outline-none"
                      suppressContentEditableWarning
                      onInput={(e) => setCustomTemplate((e.currentTarget as HTMLDivElement).innerHTML)}
                      onKeyUp={updateToolbarState}
                      onMouseUp={updateToolbarState}
                      style={{
                        fontFamily:
                          fontFamily === 'helvetica'
                            ? 'Helvetica, Arial, sans-serif'
                            : fontFamily === 'times'
                            ? '"Times New Roman", Times, serif'
                            : '"Courier New", Courier, monospace',
                        fontSize: fontSize,
                        lineHeight: 1.6,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: customTemplate || (letterTemplate.template || '').replace(/\n/g, '<br/>'),
                      }}
                    />
                  ) : (
                    <div className="bg-muted/20 p-6 rounded-lg border-2 border-dashed border-muted-foreground/20 min-h-[600px]">
                      <div
                        className="leading-relaxed whitespace-pre-wrap text-foreground"
                        style={{
                          fontFamily:
                            fontFamily === 'helvetica'
                              ? 'Helvetica, Arial, sans-serif'
                              : fontFamily === 'times'
                              ? '"Times New Roman", Times, serif'
                              : '"Courier New", Courier, monospace',
                          fontSize: fontSize,
                        }}
                        dangerouslySetInnerHTML={{ __html: previewContent || 'Start filling the form to see your letter preview...' }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterGenerator;