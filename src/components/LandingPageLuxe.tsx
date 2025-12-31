import { CheckCircle, ArrowRight, Calendar, Sparkles, Zap, Heart, Brain, Star, Award, Shield, TrendingUp, Eye, Palette, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import wowlLogo from 'figma:asset/64d5bb1a100e68b30321f1f4e7826d3c45d21e17.png';
import { SEOHead, SEO_PRESETS } from './common/SEOHead';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

// 3D Icon Wrapper Component
const Icon3D = ({ icon: Icon, className = "", animate = false }: any) => (
  <motion.div
    animate={animate ? { 
      rotateY: [0, 10, -10, 0],
      rotateX: [0, 5, -5, 0],
    } : {}}
    transition={animate ? { 
      duration: 3,
      repeat: Infinity,
      repeatDelay: 2,
    } : {}}
    style={{
      transformStyle: 'preserve-3d',
    }}
  >
    <Icon 
      className={className}
      style={{
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
      }}
    />
  </motion.div>
);

// Badge Component with Animation
const Badge = ({ icon: Icon, label, gradient }: any) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className={`relative group`}
  >
    <div className={`${gradient} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20`}>
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <Icon className="w-12 h-12 text-white mx-auto mb-3" />
      </motion.div>
      <p className="text-white text-center text-sm">{label}</p>
    </div>
    
    {/* Sparkle effect */}
    <motion.div
      className="absolute -top-2 -right-2"
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Sparkles className="w-6 h-6 text-amber-400" />
    </motion.div>
  </motion.div>
);

export default function LandingPageLuxe({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-purple-50 overflow-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header - Sticky with Glass Effect */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="border-b bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Trust Badges Row - Animated */}
          <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-cyan-100 to-cyan-50 border border-cyan-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
            >
              <Brain className="w-4 h-4 text-cyan-600" />
              <span className="text-xs text-cyan-700">Neurodivergent Friendly</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
            >
              <Heart className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-purple-700">Homeschool</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-pink-100 to-pink-50 border border-pink-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
            >
              <CheckCircle className="w-4 h-4 text-pink-600" />
              <span className="text-xs text-pink-700">ESA & Microgrants Accepted</span>
            </motion.div>
          </div>
          
          {/* Main Header */}
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              {/* Wowl the Owl Mascot */}
              <motion.div
                animate={{ 
                  rotate: [0, -5, 5, 0],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-14 h-14 relative"
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(6, 182, 212, 0.3))'
                }}
              >
                <img 
                  src={wowlLogo} 
                  alt="Wowl the Owl - Academy Mascot" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <div>
                <h1 className="text-2xl leading-tight">Mz. Marianna's Academy</h1>
              </div>
            </motion.div>
            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogin}
                className="text-cyan-600 hover:text-cyan-700 px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-xl shadow-md transition-all"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-cyan-100 to-purple-100 px-5 py-2.5 rounded-full border-2 border-purple-300"
            >
              <p className="text-sm tracking-wide">Neurodivergent-First Learning Platform</p>
            </motion.div>
            
            <h2 className="text-5xl leading-tight">
              Play is a child's language.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600">
                We developed our entire program around it.
              </span>
            </h2>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
              Through <span className="font-semibold text-purple-600">Roblox development</span>, <span className="font-semibold text-cyan-600">creative building</span>, and <span className="font-semibold text-pink-600">real coding</span>, 
              kids develop skills while playing with friends. Guided by <span className="font-semibold text-purple-600">Wowl, our AI learning companion</span>, every child gets personalized support exactly when they need it.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <span className="text-lg">Start Playing & Learning</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={onLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-800 px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-purple-400 transition-all"
              >
                <span className="text-lg">Sign In</span>
              </motion.button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-8 text-sm text-gray-600 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Live weekly classes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
                <span className="font-medium">AI-guided learning</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse" />
                <span className="font-medium">Play with peers</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Animated Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-cyan-100 relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
            
            <h3 className="text-2xl mb-6 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-cyan-600" />
              This Week's Progress
            </h3>
            
            <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium">Weekly Quests</span>
                <span className="text-cyan-600 font-semibold">3 of 5 Complete</span>
              </div>
              <div className="h-4 bg-white/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border border-cyan-200 shadow-sm text-center"
              >
                <div className="text-3xl mb-2 bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">420 XP</div>
                <div className="text-xs text-gray-600 mb-3">Earned This Week</div>
                <Zap className="w-8 h-8 text-cyan-500 mx-auto" />
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-sm text-center"
              >
                <div className="text-3xl mb-2 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">2 Badges</div>
                <div className="text-xs text-gray-600 mb-3">Unlocked</div>
                <Award className="w-8 h-8 text-purple-500 mx-auto" />
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 shadow-sm text-center"
              >
                <div className="text-3xl mb-2 bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">1 Quest</div>
                <div className="text-xs text-amber-700 mb-3">Needs Attention</div>
                <Eye className="w-8 h-8 text-amber-500 mx-auto" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Neurodivergent-First Design Section */}
      <section className="bg-gradient-to-br from-cyan-500 via-purple-500 to-purple-600 py-20 md:py-28 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              Neurodivergent-First Design
            </h2>
            <p className="text-2xl text-white/90">
              Built Different. On Purpose.
            </p>
            <p className="text-xl text-white/80 mt-3 max-w-3xl mx-auto">
              Every detail designed for ADHD & dyslexic brains—from instant dopamine rewards to calming colors that never punish
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Badge 
              icon={Zap}
              label="XP Never Goes Down"
              gradient="bg-gradient-to-br from-cyan-400 to-cyan-600"
            />
            <Badge 
              icon={Heart}
              label="Instant Dopamine Rewards"
              gradient="bg-gradient-to-br from-purple-400 to-purple-600"
            />
            <Badge 
              icon={Palette}
              label="No Red = No Shame"
              gradient="bg-gradient-to-br from-pink-400 to-pink-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2">Visual Progress = Motivation</h3>
                  <p className="text-white/80">
                    A Quest Map like Candy Crush or Mario—watch your path light up with every win!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2">Tutor-Approved Mastery</h3>
                  <p className="text-white/80">
                    Real humans review work and give encouraging feedback—not just algorithms.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <Shield className="w-12 h-12 text-white flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-2xl text-white mb-3">Every Step Forward is Celebrated</h3>
                  <p className="text-lg text-white/90">
                    Mistakes are learning opportunities—not penalties. Calm teal backgrounds and purple rewards. "Needs revision" is gentle amber—because failure isn't a thing here.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Animated Steps */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl text-center mb-16"
          >
            How It Works
          </motion.h2>
          
          <div className="space-y-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-6 items-start"
            >
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"
              >
                1
              </motion.div>
              <div className="flex-1">
                <h3 className="text-3xl mb-3">One Predictable Weekly Rhythm</h3>
                <p className="text-xl text-gray-700 mb-5">Same days. Same subjects. No guessing.</p>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border border-cyan-200 shadow-lg">
                  <div className="space-y-3">
                    {['Monday - Roblox Math', 'Tuesday - Reading', 'Wednesday - Writing', 'Thursday - STEAM / Projects', 'Friday - Executive Functioning'].map((day, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 10, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                      >
                        <Calendar className="w-5 h-5 text-cyan-600" />
                        <span className="text-lg text-gray-700">{day}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-6 items-start"
            >
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"
              >
                2
              </motion.div>
              <div className="flex-1">
                <h3 className="text-3xl mb-3">Quests + Challenges</h3>
                <p className="text-xl text-gray-700 mb-5">Each subject is a quest. Each quest has clear challenges. XP and badges reward effort.</p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl mb-2 flex items-center gap-2">
                        <Star className="w-6 h-6 text-purple-600" />
                        Reading Quest: Chapter 3
                      </div>
                      <div className="text-gray-600">4 challenges • 120 XP available</div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Award className="w-16 h-16 text-purple-500" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-6 items-start"
            >
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"
              >
                3
              </motion.div>
              <div className="flex-1">
                <h3 className="text-3xl mb-3">Visible Progress</h3>
                <p className="text-xl text-gray-700 mb-5">Parents see weekly summaries. Students see completion, not comparison. Mastery is clear.</p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="w-12 h-12 text-purple-600" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-2xl mb-2">Weekly Summary</div>
                      <div className="text-gray-600">Track progress, effort, and growth—not grades</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing - Weekly Model */}
      <section className="bg-gradient-to-b from-cyan-50 via-purple-50 to-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Simple Weekly Pricing</h2>
            <p className="text-xl text-gray-700 mb-2">
              No big price tags. No scary commitments.
            </p>
            <p className="text-lg text-gray-600">
              Includes Math, Reading, Writing, STEAM, and Executive Functioning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {/* 1x Weekly */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-cyan-200 relative"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl mb-4">1x Weekly</h3>
                <div className="text-5xl mb-2 bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">$30</div>
                <p className="text-gray-600">per week</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">One live class per week</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Weekly quests & challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">XP, badges, rewards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Parent dashboard</span>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* 4x Weekly - Most Popular */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(147,51,234,0.2)" }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 shadow-2xl border-2 border-purple-400 relative transform scale-105"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-400 text-amber-900 px-6 py-2 rounded-full text-sm shadow-lg">
                Most Popular
              </div>
              
              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl text-white mb-4">4x Weekly</h3>
                <div className="text-5xl mb-2 text-white">$80</div>
                <p className="text-white/90">per week</p>
              </div>
              
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Four live classes per week</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>All subjects covered</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Weekly progress reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Recorded sessions</span>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="w-full bg-white text-purple-600 py-3 rounded-xl"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* VIP Weekly */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-200 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm shadow-lg">
                VIP
              </div>
              
              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl mb-4">VIP Weekly</h3>
                <div className="text-5xl mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">$99</div>
                <p className="text-gray-600">per week</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Everything in 4x Weekly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">1-on-1 tutor sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Personalized learning path</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Direct tutor messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority placement</span>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl"
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>

          {/* ESA Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-3xl p-8 border-2 border-cyan-200 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl mb-3">ESA & Microgrants Accepted</h3>
                <p className="text-lg text-gray-700 mb-4">
                  I'm a direct vendor. Submit an invoice to your ESA for payment. If you choose ESA payment, you can pay the whole amount up front and we'll provide all required documentation.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>Attendance/hours tracking for ESA requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>Progress reports aligned to state standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>Complete scope & sequence documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof with Animation - Real Parent Testimonials */}
      <section className="bg-gradient-to-b from-white via-purple-50/30 to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-50 px-6 py-3 rounded-full border border-amber-200 mb-6">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="ml-2 text-amber-700 font-semibold">Verified Parent Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4">
              Real Parents. Real Results.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what parents are saying about their children's transformations
            </p>
          </motion.div>

          {/* Featured Testimonial - The Math One */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl overflow-hidden shadow-2xl mb-12 max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-80 md:h-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1698993081947-8a3654303904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwYm95JTIwc3R1ZHlpbmclMjBtYXRofGVufDF8fHx8MTc2NzE5NjgxNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Student learning math"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Level 5 Graduate</span>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="p-8 md:p-12 text-white flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm">
                    Roblox Math • Level 2 → 5
                  </div>
                </div>
                
                <blockquote className="text-xl md:text-2xl mb-6 leading-relaxed">
                  "My son has never been a big fan of math, but he actually <span className="font-bold underline decoration-amber-400">loves this class</span>. He's having fun while learning, which honestly means everything to me. Watching him build his skills little by little and understand each math topic has been amazing to see."
                </blockquote>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
                  <p className="text-lg mb-2">
                    <span className="font-semibold">His favorite part?</span> Earning Robux for completing his work 😄
                  </p>
                  <p className="text-white/90">
                    He started at <span className="font-bold text-cyan-300">Level 2</span> and is now already at <span className="font-bold text-pink-300">Level 5</span>. This class turns learning into something enjoyable for him every time.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div>
                    <p className="font-semibold text-lg">Parent of 3rd Grader</p>
                    <p className="text-white/80 text-sm">Enrolled: Oct 2024</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid of Additional Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Testimonial 1 - Writing Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-cyan-100"
            >
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758598738113-86c0f874c85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhcmVudCUyMGNoaWxkJTIwbGVhcm5pbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NjcxOTY4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Parent and child learning together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-md flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                    1-on-1 Tutoring
                  </div>
                </div>
                
                <blockquote className="text-gray-800 mb-4 leading-relaxed">
                  "This class has helped and encouraged my son to become more comfortable with his <span className="font-semibold text-purple-600">writing and spelling</span>. He has shown great improvement, and I am looking forward to seeing how much he will continue to progress."
                </blockquote>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-sm">Christina T.</p>
                    <p className="text-gray-500 text-xs">K-8th Private Tutoring</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 - ASD/ADHD Success Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-purple-200"
            >
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761208662441-9ba3264ca7fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGNvbmZpZGVuY2UlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjcxOTY4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Confident child learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1 shadow-md text-xs font-bold">
                  ⭐ FEATURED
                </div>
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-md flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <div className="bg-purple-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                    ASD/PDA Profile
                  </div>
                  <div className="bg-pink-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                    Severe ADHD
                  </div>
                </div>
                
                <blockquote className="text-gray-800 mb-4 leading-relaxed">
                  "This class was the <span className="font-bold text-purple-600">perfect blend of learning and fun</span>. My son's math skills significantly increased through the accessible and trauma-informed way Mz. Marianna designed it. My son has <span className="font-semibold">ASD/PDA profile, severe ADHD, and school refusal</span>. He made it through the <span className="font-bold text-pink-600">full session</span> and is <span className="font-bold text-cyan-600">excited for the next level</span>."
                </blockquote>
                
                <div className="flex items-center justify-between pt-4 border-t border-purple-200">
                  <div>
                    <p className="font-semibold text-sm">Chandell N.</p>
                    <p className="text-gray-500 text-xs">Roblox Math Level 2</p>
                  </div>
                  <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 - 5 Month Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-cyan-100"
            >
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1659080914827-85ce7868939f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBzb24lMjBlZHVjYXRpb24lMjBzdWNjZXNzfGVufDF8fHx8MTc2NzE5NjgxNnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Mother and child success"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-md flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                    5 Months Progress
                  </div>
                </div>
                
                <blockquote className="text-gray-800 mb-4 leading-relaxed">
                  "Mz. Marianna is an <span className="font-bold text-purple-600">absolutely amazing person</span> to work with. My kiddo had been really resistant to working with a tutor. She's been attending for <span className="font-semibold">nearly 5 months</span> and we've seen her <span className="font-bold text-cyan-600">confidence and skills grow</span>—she's also <span className="font-bold text-pink-600">excited to attend class</span>."
                </blockquote>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-sm">Danielle A.</p>
                    <p className="text-gray-500 text-xs">1-on-1 Private Tutoring</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row - 3 More Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 4 - Reading Improvement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Great course, my son is learning so much to improve his <span className="font-semibold text-cyan-600">reading and writing</span>!"
              </blockquote>
              <div className="pt-3 border-t border-gray-200">
                <p className="font-semibold text-sm">Danielle A.</p>
                <p className="text-gray-500 text-xs">Reading Comprehension Course</p>
              </div>
            </motion.div>

            {/* Testimonial 5 - Multiplication Success */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "<span className="font-bold text-purple-600">Best class ever</span>, my 10 yo has always struggled with multiplication. Ms Katelyn made it fun, was always patient and supported each student individually."
              </blockquote>
              <div className="pt-3 border-t border-gray-200">
                <p className="font-semibold text-sm">Barbara B.</p>
                <p className="text-gray-500 text-xs">Master Multiplication Course</p>
              </div>
            </motion.div>

            {/* Testimonial 6 - Personalized Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "Mz. Marianna goes out of her way to make every session <span className="font-semibold text-purple-600">engaging</span> and utilizes my child's <span className="font-semibold text-cyan-600">interests to find new ways to learn</span>. She is also great about communicating and provides excellent feedback."
              </blockquote>
              <div className="pt-3 border-t border-purple-200">
                <p className="font-semibold text-sm">Christina T.</p>
                <p className="text-gray-500 text-xs">Private 1-on-1 Tutoring</p>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl px-8 py-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-700">50+ Verified Reviews</span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-gray-700">5.0 Average Rating</span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
                <span className="font-semibold text-gray-700">Neurodivergent-First</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-cyan-50 to-purple-100 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-8">
              This is a system, not a collection of classes
            </h2>
            <div className="space-y-3 mb-10 text-xl text-gray-700">
              <p>No more daily battles over homework.</p>
              <p>Stop the tears and frustration.</p>
              <p>End the chaos of guessing what's next.</p>
            </div>

            <motion.button
              onClick={onGetStarted}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(6, 182, 212, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white px-16 py-6 rounded-2xl text-2xl inline-flex items-center gap-4 shadow-2xl mb-4"
            >
              <Sparkles className="w-8 h-8" />
              Join the Academy
              <ArrowRight className="w-8 h-8" />
            </motion.button>

            <p className="text-gray-600">
              Placement, dashboard access, and support included • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-2">Mz. Marianna's Academy</p>
          <p className="text-sm text-gray-500">
            Helping neurodivergent children find joy in learning
          </p>
        </div>
      </footer>
    </div>
  );
}