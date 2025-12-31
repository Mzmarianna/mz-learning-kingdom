import { motion } from 'motion/react';
import { User, Sparkles } from 'lucide-react';
import { SEOHead, SEO_PRESETS } from './common/SEOHead';

interface KingdomEntryProps {
  onStartAdventure: () => void;
  onNewUser: () => void;
}

export default function KingdomEntry({ onStartAdventure, onNewUser }: KingdomEntryProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      {/* SEO Meta Tags */}
      <SEOHead {...SEO_PRESETS.home} />

      {/* Multi-layer Background for depth */}
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #2d1b4e 100%)',
        }}
      />

      {/* Aurora/Northern Lights layer */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1561987570-26d2f7f93fe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYSUyMHNreXxlbnwxfHx8fDE3NjcxMDk3NzR8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Abstract gradient overlay for magical effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1676269098834-1be05c64b828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBibHVlJTIwZ3JhZGllbnQlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjcxMDk3NzR8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Vignette effect for text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />

      {/* Top and bottom darkening for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-4 py-8 md:py-12">
        {/* Title Area - positioned in upper third */}
        <div className="w-full flex-shrink-0 pt-8 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-6xl mx-auto px-4"
          >
            <div className="text-center space-y-2 md:space-y-4">
              {/* Decorative top accent */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center mb-4"
              >
                <div className="relative">
                  <Sparkles 
                    className="w-12 h-12 md:w-16 md:h-16 text-cyan-400" 
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.9))',
                    }} 
                  />
                  {/* Pulsing glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: 'radial-gradient(circle, rgba(0, 229, 255, 0.6) 0%, transparent 70%)',
                    }}
                  />
                </div>
              </motion.div>

              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
                style={{
                  background: 'linear-gradient(180deg, #00E5FF 0%, #00B8D4 50%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(0, 229, 255, 0.5))',
                  letterSpacing: '0.02em',
                }}
              >
                WELCOME TO THE
              </h1>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                style={{
                  background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #FF6B00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.5))',
                  letterSpacing: '0.05em',
                }}
              >
                KINGDOM OF LEARNING
              </h2>

              {/* Tagline with better contrast */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="pt-4"
              >
                <div 
                  className="inline-block px-6 py-3 rounded-full"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(0, 229, 255, 0.3)',
                  }}
                >
                  <p 
                    className="text-white text-base md:text-xl font-medium"
                    style={{
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    Where Play Becomes Learning & Every Child Thrives
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Buttons - positioned in lower third */}
        <div className="w-full max-w-5xl mx-auto px-4 pb-20 md:pb-24">
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {/* Start My Adventure Button */}
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartAdventure}
              className="group relative overflow-hidden rounded-3xl p-1 w-full"
              style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFB800 100%)',
                boxShadow: '0 0 40px rgba(255, 107, 0, 0.6), 0 20px 50px rgba(255, 140, 0, 0.4)',
              }}
            >
              <div className="relative bg-gradient-to-br from-orange-600 to-orange-700 rounded-3xl px-6 py-8 md:px-10 md:py-10 transition-all duration-300 group-hover:from-orange-500 group-hover:to-orange-600">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
                
                {/* Content - matched structure with green button */}
                <div className="relative flex flex-col items-center justify-center gap-2 md:gap-3 text-center min-h-[120px] md:min-h-[140px]">
                  {/* 3D Sparkles Icon */}
                  <div className="relative" style={{ perspective: '1000px' }}>
                    {/* Shadow layers for 3D depth */}
                    <Sparkles 
                      className="absolute w-10 h-10 md:w-12 md:h-12 blur-sm opacity-40" 
                      style={{
                        color: '#000000',
                        transform: 'translate(3px, 6px)',
                      }}
                    />
                    <Sparkles 
                      className="absolute w-10 h-10 md:w-12 md:h-12 blur-md opacity-30" 
                      style={{
                        color: '#FF6B00',
                        transform: 'translate(1px, 3px)',
                      }}
                    />
                    
                    {/* Base icon with gradient */}
                    <Sparkles 
                      className="relative w-10 h-10 md:w-12 md:h-12" 
                      style={{
                        color: '#FFFFFF',
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
                      }}
                    />
                    
                    {/* Highlight overlay for shine */}
                    <Sparkles 
                      className="absolute top-0 left-0 w-10 h-10 md:w-12 md:h-12 opacity-60" 
                      style={{
                        color: '#FFEB3B',
                        transform: 'translate(-1px, -1px)',
                        filter: 'drop-shadow(0 0 10px rgba(255, 235, 59, 0.9))',
                      }}
                    />
                    
                    {/* Animated glow pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                  
                  <span 
                    className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-tight"
                    style={{
                      textTransform: 'uppercase',
                      color: '#FFE5B4',
                      textShadow: '0 3px 15px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 184, 0, 0.4)',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontWeight: 900,
                      letterSpacing: '0.05em',
                    }}
                  >
                    START MY
                    <br />
                    ADVENTURE
                  </span>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl" />
                </div>
              </div>
            </motion.button>

            {/* I'm New Here Button */}
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNewUser}
              className="group relative overflow-hidden rounded-3xl p-1 w-full"
              style={{
                background: 'linear-gradient(135deg, #00FF88 0%, #00DD77 50%, #00BB66 100%)',
                boxShadow: '0 0 40px rgba(0, 255, 136, 0.6), 0 20px 50px rgba(0, 221, 119, 0.4)',
              }}
            >
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-3xl px-6 py-8 md:px-10 md:py-10 transition-all duration-300 group-hover:from-green-400 group-hover:to-green-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
                
                {/* Content */}
                <div className="relative flex flex-col items-center justify-center gap-2 md:gap-3 text-center min-h-[120px] md:min-h-[140px]">
                  {/* 3D User Icon */}
                  <div className="relative" style={{ perspective: '1000px' }}>
                    {/* Shadow layers for 3D depth */}
                    <User 
                      className="absolute w-10 h-10 md:w-12 md:h-12 blur-sm opacity-40" 
                      style={{
                        color: '#000000',
                        transform: 'translate(3px, 6px)',
                      }}
                    />
                    <User 
                      className="absolute w-10 h-10 md:w-12 md:h-12 blur-md opacity-30" 
                      style={{
                        color: '#00BB66',
                        transform: 'translate(1px, 3px)',
                      }}
                    />
                    
                    {/* Base icon with gradient effect */}
                    <User 
                      className="relative w-10 h-10 md:w-12 md:h-12" 
                      style={{
                        color: '#FFFFFF',
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 20px rgba(0, 255, 136, 0.8))',
                      }}
                    />
                    
                    {/* Highlight overlay for shine */}
                    <User 
                      className="absolute top-0 left-0 w-10 h-10 md:w-12 md:h-12 opacity-60" 
                      style={{
                        color: '#B2FF59',
                        transform: 'translate(-1px, -1px)',
                        filter: 'drop-shadow(0 0 10px rgba(178, 255, 89, 0.9))',
                      }}
                    />
                    
                    {/* Animated glow pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(0, 255, 136, 0.8) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                  
                  <span 
                    className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-tight"
                    style={{
                      textTransform: 'uppercase',
                      color: '#E0FFE0',
                      textShadow: '0 3px 15px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 255, 136, 0.4)',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontWeight: 900,
                      letterSpacing: '0.05em',
                    }}
                  >
                    I'M NEW
                    <br />
                    HERE
                  </span>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl" />
                </div>
              </div>
            </motion.button>
          </div>

          {/* Hint text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-6 md:mt-8"
          >
            <p className="text-cyan-200/70 text-sm md:text-base text-center font-medium tracking-wide">
              Choose your path to begin your learning adventure
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: i % 3 === 0 
                ? 'rgba(0, 229, 255, 0.8)' 
                : i % 3 === 1 
                ? 'rgba(168, 85, 247, 0.6)'
                : 'rgba(236, 72, 153, 0.6)',
              boxShadow: i % 3 === 0 
                ? '0 0 15px rgba(0, 229, 255, 0.9)' 
                : i % 3 === 1
                ? '0 0 15px rgba(168, 85, 247, 0.8)'
                : '0 0 15px rgba(236, 72, 153, 0.8)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(0, 229, 255, 0.2) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
          }}
        />
      </div>
    </div>
  );
}