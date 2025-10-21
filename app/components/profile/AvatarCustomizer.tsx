
import React from 'react';
import Hair1 from './avatar/hair/Hair1';
import Hair2 from './avatar/hair/Hair2';
import Hair3 from './avatar/hair/Hair3';
import Eyes1 from './avatar/eyes/Eyes1';
import Eyes2 from './avatar/eyes/Eyes2';
import Mouth1 from './avatar/mouth/Mouth1';
import Mouth2 from './avatar/mouth/Mouth2';

interface AvatarCustomizerProps {
  onHairChange: (hair: string) => void;
  onEyesChange: (eyes: string) => void;
  onMouthChange: (mouth: string) => void;
  // Add skin color change later
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({
  onHairChange,
  onEyesChange,
  onMouthChange,
}) => {
  const hairOptions = [
    { id: 'hair-1', component: <Hair1 /> },
    { id: 'hair-2', component: <Hair2 /> },
    { id: 'hair-3', component: <Hair3 /> },
  ];

  const eyesOptions = [
    { id: 'eyes-1', component: <Eyes1 /> },
    { id: 'eyes-2', component: <Eyes2 /> },
  ];

  const mouthOptions = [
    { id: 'mouth-1', component: <Mouth1 /> },
    { id: 'mouth-2', component: <Mouth2 /> },
  ];

  return (
    <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6 font-medieval">Customize Your Hero</h3>

      {/* Hair Section */}
      <div className="mb-8">
        <label className="block text-xl text-yellow-300 mb-4 font-medieval">Hair Style</label>
        <div className="flex space-x-4">
          {hairOptions.map((hair) => (
            <button
              key={hair.id}
              onClick={() => onHairChange(hair.id)}
              className="w-24 h-24 p-2 bg-gray-800 rounded-lg border-2 border-transparent hover:border-yellow-400 focus:border-yellow-500 focus:outline-none transition-all duration-200"
            >
              <div className="w-full h-full">
                {hair.component}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Eyes Section */}
      <div className="mb-8">
        <label className="block text-xl text-yellow-300 mb-4 font-medieval">Eyes</label>
        <div className="flex space-x-4">
          {eyesOptions.map((eyes) => (
            <button
              key={eyes.id}
              onClick={() => onEyesChange(eyes.id)}
              className="w-24 h-24 p-2 bg-gray-800 rounded-lg border-2 border-transparent hover:border-yellow-400 focus:border-yellow-500 focus:outline-none transition-all duration-200"
            >
              <div className="w-full h-full">
                {eyes.component}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mouth Section */}
      <div>
        <label className="block text-xl text-yellow-300 mb-4 font-medieval">Mouth</label>
        <div className="flex space-x-4">
          {mouthOptions.map((mouth) => (
            <button
              key={mouth.id}
              onClick={() => onMouthChange(mouth.id)}
              className="w-24 h-24 p-2 bg-gray-800 rounded-lg border-2 border-transparent hover:border-yellow-400 focus:border-yellow-500 focus:outline-none transition-all duration-200"
            >
              <div className="w-full h-full">
                {mouth.component}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizer;
