import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import LetterCard from '@/components/LetterCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { letterTemplates, searchLetters } from '@/data/letterTemplates';
import { FileText, Download, Search, Zap } from 'lucide-react';

const Index = () => {
  const [searchResults, setSearchResults] = useState(letterTemplates);

  const handleSearch = (query: string) => {
    setSearchResults(searchLetters(query));
  };

  const popularTemplates = letterTemplates.slice(0, 4);
  const categories = [...new Set(letterTemplates.map(letter => letter.category))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <FileText className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Professional Letter Templates
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate ready-to-use request letters for banking and personal account needs. 
            Simply fill in your details and download instantly.
          </p>
          
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Instant Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-primary" />
              <span>PDF & Word Download</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <span>Professional Templates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="px-4 py-2">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Templates */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Templates</h2>
            <p className="text-muted-foreground">Most commonly used letter templates</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {popularTemplates.map((letter) => (
              <LetterCard key={letter.id} letter={letter} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/templates">
              <Button size="lg" variant="outline">
                View All Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchResults.length < letterTemplates.length && (
        <section className="py-12 px-4 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Search Results ({searchResults.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((letter) => (
                <LetterCard key={letter.id} letter={letter} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 LetterGen. Professional letter templates for your needs.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
