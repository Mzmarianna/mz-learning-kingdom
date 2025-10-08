
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/navigation';

import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { Step4 } from "./components/Step4";
import { Step5 } from "./components/Step5";
import { Step6 } from "./components/Step6";
import { Step7 } from "./components/Step7";
import { Step8 } from "./components/Step8";

// Define the structure of your quiz data
export interface QuizData {
  childName: string;
  grade: string;
  subjects: string[];
  learningStyle: string;
  motivation: string;
  availability: string;
  challenges: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

const initialData: QuizData = {
  childName: "",
  grade: "",
  subjects: [],
  learningStyle: "",
  motivation: "",
  availability: "",
  challenges: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
};

export default function QuizPage() {
  const [data, setData] = useState<QuizData>(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  
  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log(data);
    // We'll store it in localStorage for now to pass to the results page
    localStorage.setItem('quizResults', JSON.stringify(data));
    router.push('/results');
  };

  const steps = [
    <Step1 key={0} data={data} setData={setData} />,
    <Step2 key={1} data={data} setData={setData} />,
    <Step3 key={2} data={data} setData={setData} />,
    <Step4 key={3} data={data} setData={setData} />,
    <Step5 key={4} data={data} setData={setData} />,
    <Step6 key={5} data={data} setData={setData} />,
    <Step7 key={6} data={data} setData={setData} />,
    <Step8 key={7} data={data} />,
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-8 relative">
         <div className="absolute top-4 right-8 text-sm text-gray-500">
          Step {currentStep + 1} / {steps.length}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between items-center">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
            >
              Back
            </button>
          ) : <div />}
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
            >
              Next
            </button>
          )}
           {currentStep === steps.length - 1 && (
            <button
              onClick={handleSubmit}
              className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
              Get My Plan!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
