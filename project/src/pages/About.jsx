import { motion } from 'framer-motion';
import { Award, Shield, Target } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Precise Recommendations',
    description: 'Our algorithm considers multiple factors to provide accurate breed recommendations tailored to your needs.',
  },
  {
    icon: Shield,
    title: 'Expert-Backed System',
    description: 'Developed in collaboration with veterinarians and agricultural experts to ensure reliable results.',
  },
  {
    icon: Award,
    title: 'Proven Success',
    description: 'Helping farmers make informed decisions about their livestock since 2025.',
  },
];

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Cow Breed Advisor
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We help farmers make informed decisions about their cattle breeding programs
          through advanced analytics and expert knowledge.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <feature.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
