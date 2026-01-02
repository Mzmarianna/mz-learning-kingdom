import { CheckCircle, ArrowRight, Calendar, Target, BarChart3, Sparkles, Zap, Heart, Brain, Star, Award, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-50">
      {/* Header - Simple & Calm */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Trust Badges - Always Visible */}
          <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <div className="bg-cyan-100/50 border border-cyan-200 px-3 py-1.5 rounded-full">
              <span className="text-xs text-cyan-700">Neurodivergent Friendly</span>
            </div>
            <div className="bg-purple-100/50 border border-purple-200 px-3 py-1.5 rounded-full">
              <span className="text-xs text-purple-700">Homeschool</span>
            </div>
            <div className="bg-pink-100/50 border border-pink-200 px-3 py-1.5 rounded-full">
              <span className="text-xs text-pink-700">ESA & Microgrants Accepted</span>
            </div>
          </div>
          
          {/* Main Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl">Mz. Marianna's Academy</h1>
            </div>
            <button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-5 py-2 rounded-lg hover:shadow-md transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Above-the-Fold Section - First 5 Seconds */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          {/* Hero Headline - Trust First */}
          <h2 className="text-4xl md:text-5xl mb-4 max-w-3xl mx-auto leading-tight">
            Learning that finally makes sense—for kids who learn differently
          </h2>
          
          {/* Subheadline - Reduce Fear */}
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Live instruction, predictable weekly structure, and gamified learning that rewards effort—not perfection.
          </p>

          {/* CTA - Soft but Confident */}
          <div className="inline-block">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all text-lg inline-flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-600 mt-2">Placement + dashboard access included</p>
          </div>
        </div>

        {/* Dashboard Preview - Visual Calm */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-cyan-100">
          <div className="mb-4">
            <h3 className="text-lg mb-2">This Week's Progress</h3>
            <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Weekly Quests</span>
                <span className="text-sm text-cyan-600">3 of 5 Complete</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-100">
              <div className="text-2xl mb-1">420 XP</div>
              <div className="text-sm text-gray-600">Earned This Week</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="text-2xl mb-1">2 Badges</div>
              <div className="text-sm text-gray-600">Unlocked</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="text-2xl mb-1">1 Quest</div>
              <div className="text-sm text-amber-700">Needs Attention</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Cognitive Load Reduction */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-center mb-12">How It Works</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xl">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl mb-2">One Predictable Weekly Rhythm</h3>
                <p className="text-lg text-gray-700 mb-4">Same days. Same subjects. No guessing.</p>
                <div className="bg-cyan-50 rounded-xl p-5 border border-cyan-100">
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-cyan-600" />
                      <div className="flex-1 flex justify-between">
                        <span>Monday</span>
                        <span className="text-cyan-600">Roblox Math</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-cyan-600" />
                      <div className="flex-1 flex justify-between">
                        <span>Tuesday</span>
                        <span className="text-cyan-600">Reading</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-cyan-600" />
                      <div className="flex-1 flex justify-between">
                        <span>Wednesday</span>
                        <span className="text-cyan-600">Writing</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-cyan-600" />
                      <div className="flex-1 flex justify-between">
                        <span>Thursday</span>
                        <span className="text-cyan-600">STEAM / Projects</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-cyan-600" />
                      <div className="flex-1 flex justify-between">
                        <span>Friday</span>
                        <span className="text-cyan-600">Executive Functioning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl mb-2">Quests + Challenges</h3>
                <p className="text-lg text-gray-700 mb-4">Each subject is a quest. Each quest has clear challenges. XP and badges reward effort.</p>
                <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg mb-1">Reading Quest: Chapter 3</div>
                      <div className="text-sm text-gray-600">4 challenges • 120 XP available</div>
                    </div>
                    <div className="text-purple-600">
                      <Target className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl mb-2">Visible Progress</h3>
                <p className="text-lg text-gray-700 mb-4">Parents see weekly summaries. Students see completion, not comparison. Mastery is clear.</p>
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-5 border border-purple-100">
                  <div className="flex items-center gap-4">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    <div className="flex-1">
                      <div className="text-lg mb-1">Weekly Summary</div>
                      <div className="text-sm text-gray-600">Track progress, effort, and growth—not grades</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Blocks - Why Parents Say Yes */}
      <section className="bg-gradient-to-b from-cyan-50 to-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Block 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
              <h3 className="text-xl mb-3">Predictable, Not Overwhelming</h3>
              <p className="text-gray-700 mb-4">
                Same weekly rhythm. Same expectations. No guessing, no chaos.
              </p>
              <p className="text-sm text-gray-600 italic">
                Predictability calms ADHD brains and reduces daily battles.
              </p>
            </div>

            {/* Block 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-xl mb-3">Motivation Without Shame</h3>
              <p className="text-gray-700 mb-4">
                XP, badges, and rewards tied to effort and growth—not grades or speed.
              </p>
              <p className="text-sm text-gray-600 italic">
                Removes fear of failure and keeps kids trying.
              </p>
            </div>

            {/* Block 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
              <h3 className="text-xl mb-3">Flexible but Accountable</h3>
              <p className="text-gray-700 mb-4">
                Join live or watch the recording. Complete challenges by Friday.
              </p>
              <p className="text-sm text-gray-600 italic">
                Flexibility without permissiveness builds trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Low Pressure */}
      <section className="bg-white py-12 md:py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
              <p className="text-lg text-gray-800">"My child finally starts work without tears."</p>
              <p className="text-sm text-gray-600 mt-2">— Parent of 3rd grader with ADHD</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <p className="text-lg text-gray-800">"We stopped fighting over school."</p>
              <p className="text-sm text-gray-600 mt-2">— Homeschool parent</p>
            </div>

            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
              <p className="text-lg text-gray-800">"The structure changed everything."</p>
              <p className="text-sm text-gray-600 mt-2">— Parent of dyslexic learner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Clarity = Trust */}
      <section className="bg-gradient-to-b from-cyan-50 via-white to-purple-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3">Academy Membership</h2>
            <p className="text-lg text-gray-700">
              Includes Math, Reading, Writing, STEAM, and Executive Functioning
            </p>
            <p className="text-gray-600 mt-1">
              This is a system, not a collection of classes.
            </p>
          </div>

          {/* Family Pricing */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Monthly */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <div className="mb-6">
                <h3 className="text-2xl mb-2">Monthly</h3>
                <div className="text-4xl mb-2">$399<span className="text-lg text-gray-600">/month</span></div>
                <p className="text-gray-600">per student</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Live instruction (Mon–Fri)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Weekly quests & challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">XP, badges, and rewards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Parent weekly summaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Recorded sessions</span>
                </li>
              </ul>

              <p className="text-sm text-gray-600">Best for families who want flexibility.</p>
            </div>

            {/* Semester - Recommended */}
            <div className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-2xl p-8 shadow-2xl border-2 border-purple-400 relative">
              <div className="absolute -top-3 right-8 bg-amber-400 text-amber-900 px-4 py-1 rounded-full text-sm">
                Best Value
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl mb-2">Semester (16 weeks)</h3>
                <div className="text-4xl mb-2">$1,499<span className="text-lg opacity-90">/semester</span></div>
                <p className="opacity-90">per student</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Everything in Monthly, plus:</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Priority placement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Semester progress report</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Homeschool / ESA documentation support</span>
                </li>
              </ul>

              <p className="text-sm opacity-90">Signals commitment and saves $880/semester.</p>
            </div>
          </div>

          {/* ESA Pricing */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-cyan-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl mb-2">ESA / Scholarship</h3>
                <div className="text-4xl mb-2">$1,500<span className="text-lg text-gray-600">/semester</span></div>
                <p className="text-gray-600">per student</p>
              </div>
              <div className="bg-cyan-50 rounded-xl px-4 py-2 border border-cyan-200">
                <p className="text-sm text-cyan-700">ESA Approved</p>
              </div>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Scope & sequence documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Attendance/hours tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Progress reports</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Documentation aligned to state requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Schools & Professional Development */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3">For Schools & Microschools</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We're accepting applications for professional development. Teaching schools how to use this student-first strategy to help their students LOVE learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Per-Student Partnership */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 border border-cyan-200">
              <h3 className="text-2xl mb-4">Per-Student Partnership</h3>
              <div className="text-3xl mb-4">$175–$225<span className="text-lg text-gray-700">/student/month</span></div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Standards-aligned curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Live instruction or co-teaching</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Student dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Progress documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Admin summary reports</span>
                </li>
              </ul>

              <p className="text-sm text-gray-600">Pricing depends on size and reporting needs</p>
            </div>

            {/* Professional Development */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <h3 className="text-2xl mb-4">Professional Development</h3>
              <div className="text-3xl mb-4">$3,500–$6,500<span className="text-lg text-gray-700">/semester</span></div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Teacher training & support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Implementation guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Full curriculum access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dashboard-based progress system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Relationship-building strategies</span>
                </li>
              </ul>

              <p className="text-sm text-gray-600">Similar to Alpha Schools & 2-Hour Homeschool approach</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-700 mb-4">
              Structure without rigidity. Engagement without chaos. Documentation without pressure.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              Apply for School Partnership
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA - Belonging, Not Urgency */}
      <section className="bg-gradient-to-b from-cyan-50 to-cyan-100 py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            This is a system, not a collection of classes
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            No more daily battles over homework.
          </p>
          <p className="text-xl text-gray-700 mb-4">
            Stop the tears and frustration.
          </p>
          <p className="text-xl text-gray-700 mb-8">
            End the chaos of guessing what's next.
          </p>

          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-5 rounded-2xl hover:shadow-2xl transition-all text-xl inline-flex items-center gap-3 mb-4"
          >
            Join the Academy
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-sm text-gray-600 mb-2">
            Placement, dashboard access, and support included.
          </p>
          <p className="text-sm text-gray-600">
            Weekly enrollments and self-paced options available. Cancel at any time.
          </p>
        </div>
      </section>

      {/* Footer - Calm & Simple */}
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