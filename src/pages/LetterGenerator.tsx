import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getLetterById } from '@/data/letterTemplates';
import { generateLetter, formatDate } from '@/utils/letterGenerator';
import { generatePDF } from '@/utils/pdfGenerator';
import { LetterData } from '@/types/letter';
import { ArrowLeft, Download, Eye } from 'lucide-react';

const LetterGenerator = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LetterData>({});
  const [previewContent, setPreviewContent] = useState('');
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [customTemplate, setCustomTemplate] = useState<string>('');

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
      setPreviewContent(content);
    }
  }, [formData, letterTemplate, customTemplate]);

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
      generatePDF(previewContent, filename);
      
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

                  {/* Template Editor */}
                  <div className="mt-6 space-y-2">
                    <Label htmlFor="template-editor" className="text-sm font-medium">
                      Customize Template (use placeholders like {"{{name}}"})
                    </Label>
                    <Textarea
                      id="template-editor"
                      className="min-h-[200px]"
                      value={customTemplate || letterTemplate.template}
                      onChange={(e) => setCustomTemplate(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button type="button" variant="outline" size="sm" onClick={() => setCustomTemplate('')}>
                        Reset to Default
                      </Button>
                    </div>
                  </div>
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
                <div className="bg-muted/20 p-6 rounded-lg border-2 border-dashed border-muted-foreground/20 min-h-[600px]">
                  <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-foreground">
                    {previewContent || "Start filling the form to see your letter preview..."}
                  </pre>
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