import { GoogleGenerativeAI } from '@google/generative-ai';


// const genAI = new GoogleGenerativeAI("AIzaSyBADA4B7gfQPWheKtDvVdYEIlUgXATgd4E");
const genAI = new GoogleGenerativeAI("AIzaSyBADA4B7gfQPWheKtDvVdYEIlUgXATgd4E");

export const generateBreedingRecommendation = async (cowData) => {
  try {
    // const model = genAI.getGenerativeModel({ model: "Gemini 2.0 Flash" });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const prompt = `
      As an AI cattle breeding expert, analyze this cow's data and provide breeding recommendations:
      
      Cow Details:
      - Name: ${cowData.name}
      - Breed: ${cowData.breed}
      - Age: ${cowData.physical.age} years
      - Weight: ${cowData.physical.weight} kg
      - Genetic Score: ${cowData.genetic.geneticDiversityScore}/100
      - Health Status: ${cowData.health.reporoductiveHealth}
      - Milk Yield: ${cowData.health.milkYield} L/day

      Please provide:
      1. A recommended breed for breeding
      2. 4 key reasoning points for this recommendation
      3. Expected benefits in terms of milk production, disease resistance, and growth
      4. 4 important health considerations
      5. An AI confidence score (0-100)

      Format the response as a JSON object with these exact keys:
      {
        "confidenceScore": number,
        "recommendedBreed": string,
        "reasoningPoints": string[],
        "expectedBenefits": {
          "milkProduction": string,
          "diseaseResistance": string,
          "growth": string
        },
        "healthConsiderations": string[]
      }
    `

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Remove any triple backticks and format markers (if present)
    const cleanedText = text.replace(/^```json|```$/g, '').trim();
    
    return JSON.parse(cleanedText);
    
  } catch (error) {
    console.error('Error generating breeding recommendation:', error);
    throw new Error('Failed to generate breeding recommendation');
  }
};