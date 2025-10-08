
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { QuizData } from '../quiz/page'; // Assuming you export this type
import Link from 'next/link';

const generateRecommendation = (data: QuizData) => {
  let plan = {
    title: "Customized Learning Blueprint",
    program: "General Academic Excellence",
    description: "A balanced approach to improve overall grades and study habits.",
    outcomes: [
      "Increased confidence in all subjects",
      "Improved grades and test scores",
      "Stronger executive functioning skills",
      "A newfound love for learning"
    ],
    pricing: [
      { tier: "Core", price: "$150/week", features: ["2 sessions/week", "Personalized curriculum", "Weekly progress reports"] },
      { tier: "Plus", price: "$250/week", features: ["4 sessions/week", "Core features", "Priority support"] },
      { tier: "Premier", price: "$400/week", features: ["Unlimited sessions", "Plus features", "Direct access to Mz. Marianna"] },
    ]
  };

  const grade = parseInt(data.grade, 10);

  if (data.subjects.includes("Reading") && grade <= 5) {
    plan.program = "Early Reading Mastery";
    plan.description = "A foundational program to build strong reading and comprehension skills.";
  } else if (data.subjects.includes("Math") && grade >= 7) {
    plan.program = "Advanced Math & Geometry Prep";
    plan.description = "Tackle complex math concepts and prepare for advanced high school topics.";
  } else if (data.subjects.includes("Executive Functions")) {
    plan.program = "Executive Function & Study Skills Overhaul";
    plan.description = "Develop the critical organizational, planning, and time-management skills for academic success.";
  }

  return plan;
};

export default function ResultsPage() {
  const [results, setResults] = useState<QuizData | null>(null);
  const [plan, setPlan] = useState<ReturnType<typeof generateRecommendation> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const resultsData = localStorage.getItem('quizResults');
    if (resultsData) {
      const parsedData = JSON.parse(resultsData);
      setResults(parsedData);
      setPlan(generateRecommendation(parsedData));
    } else {
      // Redirect to quiz if no data is found
      router.push('/quiz');
    }
  }, [router]);

  if (!results || !plan) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading your plan...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
       <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 text-center">
          <h1 className="text-3xl font-bold text-purple-700">Your Personalized Learning Plan for {results.childName}</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended Program: <span className='text-purple-600'>{plan.program}</span></h2>
          <p className="text-gray-600 mb-6">{plan.description}</p>

          <h3 className="text-xl font-semibold mb-4">Expected Outcomes:</h3>
          <ul className="list-disc list-inside space-y-2 mb-8">
            {plan.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}
          </ul>
        </div>

        <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-center mb-8">Investment Options</h2>
             <p className='text-gray-600 mb-2'>ESA/Scholarships are accepted.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plan.pricing.map(tier => (
            <div key={tier.tier} className={`p-8 border-4 rounded-lg shadow-xl text-center flex flex-col ${tier.tier === 'Plus' ? 'border-purple-500' : 'border-gray-200'}`}>
              <h3 className="text-2xl font-bold mb-4">{tier.tier}</h3>
              <p className="text-4xl font-extrabold mb-6">{tier.price}</p>
              <ul className="space-y-3 text-left mb-8 flex-grow">
                {tier.features.map(feature => <li key={feature} className='flex items-center'><span className='text-green-500 mr-2'>&#10003;</span> {feature}</li>)}
              </ul>
               <Link href="#" className={`w-full mt-auto text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 ${tier.tier === 'Plus' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-800'}`}>
                Schedule Free Consultation
              </Link>
            </div>
          ))}
        </div>

         <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">The first step is a free, no-obligation consultation with Mz. Marianna to finalize your plan and ensure a perfect fit.</p>
          <Link href="#" className="bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-500 transition-transform duration-300 inline-block shadow-lg transform hover:scale-105">
            Book Your Free Consultation Now
          </Link>
        </div>
      </main>

       <footer className="text-center py-8 mt-8">
           <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Mz. Marianna. All Rights Reserved.</p>
       </footer>
    </div>
  );
}
