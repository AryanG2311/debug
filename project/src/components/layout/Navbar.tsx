import { Link } from 'react-router-dom';
import { Cog as Cow } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Cow className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">
                Cow Breed Advisor
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/allcows"
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              View-All
            </Link>
            <Link
              to="/form"
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              Get Recommendation
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;