
import Link from 'next/link';
import { ShieldCheck, BookOpen, Star, MessageSquare, Calendar } from 'lucide-react';

// Main Component for the Kingdom of Learning Homepage
export default function KingdomOfLearningHome() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-kingdom-background-start to-kingdom-background-end text-kingdom-foreground font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-kingdom-background-start/80 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold font-serif text-kingdom-accent-gold tracking-wider">
            Kingdom of Learning
          </h1>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-6 py-2 text-lg font-semibold rounded-full text-kingdom-background-start bg-kingdom-accent-gold hover:bg-yellow-300 transition-all duration-300 shadow-glow-gold hover:shadow-lg">
              Login
            </Link>
            <Link href="/register" className="px-6 py-2 text-lg font-semibold rounded-full border-2 border-kingdom-accent-teal text-kingdom-accent-teal hover:bg-kingdom-accent-teal hover:text-kingdom-background-start transition-all duration-300 shadow-glow-teal hover:shadow-lg">
              Register
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[url('/img/holographic-city.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-kingdom-background-end via-transparent to-transparent"></div>
          
          <div className="relative z-10 container mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold font-serif tracking-tight text-white mb-4">
              Your Adventure in Knowledge Awaits
            </h2>
            <p className="text-xl md:text-2xl text-kingdom-foreground max-w-3xl mx-auto mb-8">
              Journey through mystical realms, conquer challenges, and become a legendary warrior of wisdom.
            </p>
            <Link href="/register" className="inline-block px-10 py-4 text-xl font-bold rounded-full text-kingdom-background-start bg-kingdom-accent-purple hover:bg-purple-500 transition-all duration-300 shadow-glow-purple transform hover:scale-105">
              Begin Your Quest
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-kingdom-background-end/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold font-serif text-kingdom-accent-teal">The Tools of a True Explorer</h3>
              <p className="text-lg text-kingdom-muted mt-2">Everything you need to succeed in your quest.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
              <FeatureCard icon={<BookOpen size={40} />} title="Personalized Quests" description="Wowl the Owl delivers unique quests with 16 challenges tailored to your learning path." />
              <FeatureCard icon={<ShieldCheck size={40} />} title="Become a Warrior" description="Start as an Explorer, rise to a Challenger, and become a legendary Warrior of knowledge." />
              <FeatureCard icon={<Star size={40} />} title="Earn XP & Badges" description="Complete lessons to earn badges, and get bonus XP from your tutor for great work." />
              <FeatureCard icon={<MessageSquare size={40} />} title="Tutor Messaging" description="Stay connected with your tutor, ask questions, and get the help you need to succeed." />
              <FeatureCard icon={<Calendar size={40} />} title="Track Your Journey" description="Your personalized map shows your progress, challenges, and upcoming meetings." />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-kingdom-background-start py-6 text-center">
        <p className="text-kingdom-muted">&copy; {new Date().getFullYear()} Kingdom of Learning. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

// Sub-component for Feature Cards
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) {
  return (
    <div className="bg-kingdom-background-start/50 p-6 rounded-lg border border-kingdom-muted/20 hover:border-kingdom-accent-purple hover:-translate-y-2 transition-transform duration-300">
      <div className="text-kingdom-accent-purple inline-block mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-bold font-serif mb-2">{title}</h4>
      <p className="text-kingdom-muted">{description}</p>
    </div>
  );
}
