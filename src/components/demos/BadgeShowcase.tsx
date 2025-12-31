import { useState } from 'react';
import BadgeSVG, { BADGE_CONFIGS } from '../common/BadgeSVG';
import { ArrowLeft, Download, Sparkles } from 'lucide-react';

interface BadgeShowcaseProps {
  onBack?: () => void;
}

export default function BadgeShowcase({ onBack }: BadgeShowcaseProps) {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<number | 'all'>('all');

  const badges = Object.values(BADGE_CONFIGS);
  const filteredBadges = filterLevel === 'all' 
    ? badges 
    : badges.filter(b => b.level === filterLevel);

  const levelCounts = {
    1: badges.filter(b => b.level === 1).length,
    2: badges.filter(b => b.level === 2).length,
    3: badges.filter(b => b.level === 3).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-purple-50 to-pink-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}
          
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2">
              🎨 Badge Showcase
            </h1>
            <p className="text-gray-600">
              All 48 SVG badges - Ready to use or replace with AI-generated images
            </p>
          </div>

          <div className="w-[120px]" /> {/* Spacer for centering */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-cyan-600">{badges.length}</div>
            <div className="text-sm text-gray-600">Total Badges</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600">{levelCounts[1]}</div>
            <div className="text-sm text-gray-600">Level 1</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600">{levelCounts[2]}</div>
            <div className="text-sm text-gray-600">Level 2</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-pink-600">{levelCounts[3]}</div>
            <div className="text-sm text-gray-600">Level 3</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl p-4 shadow-lg mb-8">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">Filter by Level:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterLevel('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterLevel === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({badges.length})
              </button>
              <button
                onClick={() => setFilterLevel(1)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterLevel === 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Level 1 ({levelCounts[1]})
              </button>
              <button
                onClick={() => setFilterLevel(2)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterLevel === 2
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Level 2 ({levelCounts[2]})
              </button>
              <button
                onClick={() => setFilterLevel(3)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterLevel === 3
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Level 3 ({levelCounts[3]})
              </button>
            </div>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge.id)}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all cursor-pointer badge-hover group"
            >
              <div className="relative">
                <BadgeSVG badgeId={badge.id} size={120} animated={true} className="mx-auto" />
                <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  L{badge.level}
                </div>
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-semibold text-sm text-gray-800 leading-tight">
                  {badge.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {badge.id}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-cyan-500 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ✨ How to Use These Badges
              </h2>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Option 1: Use SVG Badges (Current)</h3>
                  <p className="mb-2">
                    These badges are already integrated into your app! They're:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>✅ Scalable to any size (SVG format)</li>
                    <li>✅ Animated with pulse effects</li>
                    <li>✅ Color-coded by level</li>
                    <li>✅ Lightweight and fast</li>
                    <li>✅ Working everywhere badges are displayed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Option 2: Replace with AI-Generated Images</h3>
                  <p className="mb-2">
                    When you're ready to upgrade with custom artwork:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      <strong>Generate badges</strong> using DALL-E, Midjourney, or Leonardo.ai
                      <br />
                      <span className="text-sm text-gray-600">
                        (See /GRAPHICS_NEEDED_GUIDE.md for detailed prompts)
                      </span>
                    </li>
                    <li>
                      <strong>Save images</strong> as 512x512px PNG files with transparency
                    </li>
                    <li>
                      <strong>Name files</strong> exactly as the badge ID (e.g., "badge-count-10.png")
                    </li>
                    <li>
                      <strong>Import</strong> and use instead of BadgeSVG component
                    </li>
                  </ol>
                </div>

                <div className="bg-cyan-50 rounded-lg p-4 border-2 border-cyan-200">
                  <h3 className="font-semibold text-lg mb-2 text-cyan-800">
                    💡 Pro Tip: Hybrid Approach
                  </h3>
                  <p className="text-sm text-cyan-700">
                    You can replace badges gradually! Use SVGs as placeholders and swap them out
                    one level at a time. Start with Level 1 badges (students see these first),
                    then Level 2, then Level 3.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Using BadgeSVG Component</h3>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <code className="text-purple-600">
                      {`import BadgeSVG from './components/common/BadgeSVG';`}
                    </code>
                    <br /><br />
                    <code className="text-gray-700">
                      {`<BadgeSVG`}<br />
                      {`  badgeId="badge-count-10"`}<br />
                      {`  size={128}`}<br />
                      {`  animated={true}`}<br />
                      {`/>`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badge Detail Modal */}
        {selectedBadge && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-8 z-50"
            onClick={() => setSelectedBadge(null)}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <BadgeSVG badgeId={selectedBadge} size={256} animated={true} className="mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {BADGE_CONFIGS[selectedBadge].name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Level {BADGE_CONFIGS[selectedBadge].level} • {selectedBadge}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-left space-y-2 text-sm">
                    <div>
                      <strong>Gradient:</strong>
                      <div className="flex gap-2 mt-1">
                        <div
                          className="w-12 h-12 rounded border-2 border-gray-300"
                          style={{ backgroundColor: BADGE_CONFIGS[selectedBadge].gradientStart }}
                        />
                        <div
                          className="w-12 h-12 rounded border-2 border-gray-300"
                          style={{ backgroundColor: BADGE_CONFIGS[selectedBadge].gradientEnd }}
                        />
                      </div>
                    </div>
                    <div>
                      <strong>Icon Type:</strong> {BADGE_CONFIGS[selectedBadge].iconType}
                    </div>
                    {BADGE_CONFIGS[selectedBadge].displayText && (
                      <div>
                        <strong>Display Text:</strong> {BADGE_CONFIGS[selectedBadge].displayText}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-shadow"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
