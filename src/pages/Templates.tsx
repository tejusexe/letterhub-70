import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import LetterCard from '@/components/LetterCard';
import { letterTemplates, searchLetters } from '@/data/letterTemplates';
import { Badge } from '@/components/ui/badge';

const Templates = () => {
  const [searchResults, setSearchResults] = useState(letterTemplates);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    let results = searchLetters(query);
    
    if (selectedCategory) {
      results = results.filter(letter => letter.category === selectedCategory);
    }
    
    setSearchResults(results);
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    
    let results = letterTemplates;
    if (category) {
      results = letterTemplates.filter(letter => letter.category === category);
    }
    
    setSearchResults(results);
  };

  const categories = [...new Set(letterTemplates.map(letter => letter.category))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Letter Templates</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse our complete collection of professional letter templates
          </p>
          
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2"
              onClick={() => handleCategoryFilter(null)}
            >
              All Categories
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2"
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedCategory 
              ? `${selectedCategory} Templates (${searchResults.length})`
              : `All Templates (${searchResults.length})`
            }
          </h2>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((letter) => (
                <LetterCard key={letter.id} letter={letter} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No templates found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;