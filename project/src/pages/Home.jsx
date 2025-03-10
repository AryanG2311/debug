import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Home = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80)',
          filter: 'brightness(0.7)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Find Your Perfect Cow Breed
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Get personalized recommendations based on genetic factors, physical characteristics,
            and health parameters.
          </p>
          <Link to="/form">
            <Button className="text-lg px-8 py-3">
              Start Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;