import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import axios from 'axios';



const RecommendationForm = () => {
  const [currentStep, setCurrentStep] = useState('genetic');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  // Maintain form data in a state hook with proper structure
  const [formData, setFormData] = useState({
    genetic: {
      breedType: '',
      pedigreeInfo: '',
      geneticDiversityScore: 0,
      climaticSuitability: '', // New field
      feedingPlan: '' // New field
    },
    physical: {
      age: 0,
      bodyConditionScore: 0,
      weight: 0,
      height: 0
    },
    health: {
      reproductiveHealth: '',
      diseaseResistance: 0,
      milkYield: 0,
      milkFat: 0,
      milkProtein: 0,
      lastBreedingDate: '', // New field
      expectedCalvingDate: '' // New field
    }
  });

  // Watch for form changes
  const formValues = watch();

  // Update form data when values change
  const updateFormData = (step) => {
    const relevantFields = {
      genetic: ['breedType', 'pedigreeInfo', 'geneticDiversityScore', 'climaticSuitability', 'feedingPlan'],
      physical: ['age', 'bodyConditionScore', 'weight', 'height'],
      health: ['reproductiveHealth', 'diseaseResistance', 'milkYield', 'milkFat', 'milkProtein', 'lastBreedingDate', 'expectedCalvingDate']
    };

    const newData = {};
    relevantFields[step].forEach(field => {
      if (formValues[field] !== undefined) {
        newData[field] = formValues[field];
      }
    });

    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...newData
      }
    }));
  };

  const breedOptions = [
    { value: 'holstein', label: 'Holstein' },
    { value: 'jersey', label: 'Jersey' },
    { value: 'angus', label: 'Angus' },
    { value: 'hereford', label: 'Hereford' },
    { value: 'brahman', label: 'Brahman' },
  ];

  const reproductiveHealthOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
  ];

  const climaticSuitabilityOptions = [
    { value: 'tropical', label: 'Tropical' },
    { value: 'subtropical', label: 'Subtropical' },
    { value: 'temperate', label: 'Temperate' },
    { value: 'continental', label: 'Continental' },
    { value: 'arid', label: 'Arid' },
  ];

  const feedingPlanOptions = [
    { value: 'pasture', label: 'Pasture-based' },
    { value: 'grainFed', label: 'Grain-fed' },
    { value: 'mixed', label: 'Mixed feeding' },
    { value: 'organic', label: 'Organic' },
    { value: 'silage', label: 'Silage-based' },
  ];

  const onSubmit = async (data) => {
    try {
      updateFormData(currentStep);
  
      const response =  axios.post(
        "http://localhost:4200/api/cows/add",
        {
          ownerId: "67cea83ff2074d36eff08c10",
          name: "cow5",
          tagNumber: "43344",
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  // Ensure cookies are included if needed
        }
      );
  
      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error("Form submission error:", error);
    }
  };
  

  const renderGeneticFactors = () => (
    <div className="space-y-6">
      <Select
        label="Breed Type"
        options={breedOptions}
        error={errors.breedType?.message}
        {...register('breedType', { 
          required: 'Breed type is required',
          onChange: () => updateFormData('genetic')
        })}
      />
      <Input
        label="Pedigree Information"
        type="text"
        error={errors.pedigreeInfo?.message}
        {...register('pedigreeInfo', { 
          required: 'Pedigree information is required',
          onChange: () => updateFormData('genetic')
        })}
      />
      <Input
        label="Genetic Diversity Score (1-10)"
        type="number"
        min="1"
        max="10"
        error={errors.geneticDiversityScore?.message}
        {...register('geneticDiversityScore', {
          required: 'Genetic diversity score is required',
          min: { value: 1, message: 'Score must be between 1 and 10' },
          max: { value: 10, message: 'Score must be between 1 and 10' },
          onChange: () => updateFormData('genetic')
        })}
      />
      <Select
        label="Climatic Suitability"
        options={climaticSuitabilityOptions}
        error={errors.climaticSuitability?.message}
        {...register('climaticSuitability', { 
          required: 'Climatic suitability is required',
          onChange: () => updateFormData('genetic')
        })}
      />
      <Select
        label="Feeding Plan"
        options={feedingPlanOptions}
        error={errors.feedingPlan?.message}
        {...register('feedingPlan', { 
          required: 'Feeding plan is required',
          onChange: () => updateFormData('genetic')
        })}
      />
    </div>
  );

  const renderPhysicalCharacteristics = () => (
    <div className="space-y-6">
      <Input
        label="Age (years)"
        type="number"
        min="0"
        error={errors.age?.message}
        {...register('age', { 
          required: 'Age is required',
          onChange: () => updateFormData('physical')
        })}
      />
      <Input
        label="Body Condition Score (1-9)"
        type="number"
        min="1"
        max="9"
        error={errors.bodyConditionScore?.message}
        {...register('bodyConditionScore', {
          required: 'Body condition score is required',
          min: { value: 1, message: 'Score must be between 1 and 9' },
          max: { value: 9, message: 'Score must be between 1 and 9' },
          onChange: () => updateFormData('physical')
        })}
      />
      <Input
        label="Weight (kg)"
        type="number"
        min="0"
        error={errors.weight?.message}
        {...register('weight', { 
          required: 'Weight is required',
          onChange: () => updateFormData('physical')
        })}
      />
      <Input
        label="Height (cm)"
        type="number"
        min="0"
        error={errors.height?.message}
        {...register('height', { 
          required: 'Height is required',
          onChange: () => updateFormData('physical')
        })}
      />
    </div>
  );

  const renderHealthParameters = () => (
    <div className="space-y-6">
      <Select
        label="Reproductive Health Status"
        options={reproductiveHealthOptions}
        error={errors.reproductiveHealth?.message}
        {...register('reproductiveHealth', { 
          required: 'Reproductive health status is required',
          onChange: () => updateFormData('health')
        })}
      />
      <Input
        label="Disease Resistance Rating (1-10)"
        type="number"
        min="1"
        max="10"
        error={errors.diseaseResistance?.message}
        {...register('diseaseResistance', {
          required: 'Disease resistance rating is required',
          min: { value: 1, message: 'Rating must be between 1 and 10' },
          max: { value: 10, message: 'Rating must be between 1 and 10' },
          onChange: () => updateFormData('health')
        })}
      />
      <Input
        label="Milk Yield (liters/day)"
        type="number"
        min="0"
        error={errors.milkYield?.message}
        {...register('milkYield', { 
          required: 'Milk yield is required',
          onChange: () => updateFormData('health')
        })}
      />
      <Input
        label="Milk Fat Percentage"
        type="number"
        min="0"
        max="100"
        step="0.1"
        error={errors.milkFat?.message}
        {...register('milkFat', { 
          required: 'Milk fat percentage is required',
          onChange: () => updateFormData('health')
        })}
      />
      <Input
        label="Milk Protein Percentage"
        type="number"
        min="0"
        max="100"
        step="0.1"
        error={errors.milkProtein?.message}
        {...register('milkProtein', { 
          required: 'Milk protein percentage is required',
          onChange: () => updateFormData('health')
        })}
      />
      <Input
        label="Last Breeding Date"
        type="date"
        error={errors.lastBreedingDate?.message}
        {...register('lastBreedingDate', { 
          required: 'Last breeding date is required',
          onChange: () => updateFormData('health')
        })}
      />
      <Input
        label="Expected Calving Date"
        type="date"
        error={errors.expectedCalvingDate?.message}
        {...register('expectedCalvingDate', { 
          required: 'Expected calving date is required',
          onChange: () => updateFormData('health')
        })}
      />
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'genetic':
        return renderGeneticFactors();
      case 'physical':
        return renderPhysicalCharacteristics();
      case 'health':
        return renderHealthParameters();
      default:
        return null;
    }
  };

  const handleNext = () => {
    updateFormData(currentStep);
    if (currentStep === 'genetic') setCurrentStep('physical');
    else if (currentStep === 'physical') setCurrentStep('health');
  };

  const handlePrevious = () => {
    updateFormData(currentStep);
    if (currentStep === 'physical') setCurrentStep('genetic');
    else if (currentStep === 'health') setCurrentStep('physical');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Cow Breed Recommendation Form
        </h1>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`h-1 w-1/3 rounded ${currentStep === 'genetic' ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`h-1 w-1/3 rounded ${currentStep === 'physical' ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`h-1 w-1/3 rounded ${currentStep === 'health' ? 'bg-primary' : 'bg-gray-200'}`} />
          </div>
          <div className="flex justify-between text-sm">
            <span className={currentStep === 'genetic' ? 'text-primary' : 'text-gray-500'}>
              Genetic Factors
            </span>
            <span className={currentStep === 'physical' ? 'text-primary' : 'text-gray-500'}>
              Physical Characteristics
            </span>
            <span className={currentStep === 'health' ? 'text-primary' : 'text-gray-500'}>
              Health Parameters
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderCurrentStep()}
          
          <div className="flex justify-between mt-8">
            {currentStep !== 'genetic' && (
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
            {currentStep !== 'health' ? (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RecommendationForm;