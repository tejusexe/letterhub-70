import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { LetterTemplate } from '@/types/letter';

interface LetterCardProps {
  letter: LetterTemplate;
}

const LetterCard = ({ letter }: LetterCardProps) => {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <Link to={`/letter/${letter.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <FileText className="h-4 w-4" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {letter.category}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {letter.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {letter.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{letter.fields.length} fields to fill</span>
            <span className="text-primary font-medium group-hover:underline">
              Generate →
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default LetterCard;