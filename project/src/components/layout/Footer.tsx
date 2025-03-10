import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="flex items-center text-gray-600">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for farmers
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Cow Breed Advisor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;