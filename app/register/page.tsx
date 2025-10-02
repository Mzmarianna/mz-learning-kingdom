
import Link from 'next/link';
import { UserPlus, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-kingdom-background-start to-kingdom-background-end text-kingdom-foreground">
      <div className="relative w-full max-w-md m-4 p-8 bg-kingdom-background-start/80 backdrop-blur-sm rounded-2xl border border-kingdom-muted/20 shadow-2xl shadow-kingdom-accent-teal/10">
        
        {/* Decorative Glow */}
        <div className="absolute -top-1 -right-1 w-24 h-24 bg-kingdom-accent-teal/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-24 h-24 bg-kingdom-accent-purple/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold font-serif text-kingdom-accent-gold mb-2 tracking-wider">
            Join the Kingdom
          </h1>
          <p className="text-kingdom-muted mb-8">Begin your epic adventure in learning.</p>
        </div>

        <form className="relative z-10 space-y-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-kingdom-background-end border-2 border-kingdom-muted/30 rounded-lg focus:outline-none focus:border-kingdom-accent-teal transition-colors duration-300 peer"
            />
            <label className="absolute left-4 -top-2.5 text-sm text-kingdom-muted bg-kingdom-background-end px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm transition-all duration-300">Full Name</label>
          </div>

          <div className="relative">
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-kingdom-background-end border-2 border-kingdom-muted/30 rounded-lg focus:outline-none focus:border-kingdom-accent-teal transition-colors duration-300 peer"
            />
            <label className="absolute left-4 -top-2.5 text-sm text-kingdom-muted bg-kingdom-background-end px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm transition-all duration-300">Email Address</label>
          </div>
          
          <div className="relative">
            <input 
              type="password" 
              placeholder="Create a Password"
              className="w-full px-4 py-3 bg-kingdom-background-end border-2 border-kingdom-muted/30 rounded-lg focus:outline-none focus:border-kingdom-accent-purple transition-colors duration-300 peer"
            />
            <label className="absolute left-4 -top-2.5 text-sm text-kingdom-muted bg-kingdom-background-end px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm transition-all duration-300">Create a Password</label>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full text-kingdom-background-start bg-kingdom-accent-teal hover:bg-teal-300 transition-all duration-300 shadow-glow-teal transform hover:scale-105">
            <UserPlus size={20} />
            <span>Create My Account</span>
          </button>
        </form>

        <div className="relative z-10 text-center mt-6">
          <p className="text-kingdom-muted">Already have a key? <Link href="/login" className="font-bold text-kingdom-accent-purple hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}
