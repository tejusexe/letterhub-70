import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LetterGen</h1>
              <p className="text-xs text-muted-foreground">Professional Letter Templates</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/templates" className="text-foreground hover:text-primary transition-colors">
              All Templates
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;