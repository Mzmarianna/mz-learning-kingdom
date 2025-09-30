
import React from 'react';

interface AvatarCustomizerProps {
  onHairChange: (hair: string) => void;
  onEyesChange: (eyes: string) => void;
  onMouthChange: (mouth: string) => void;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({
  onHairChange,
  onEyesChange,
  onMouthChange,
}) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4">Customize Your Avatar</h3>
      {/* Hair options */}
      <div className="mb-4">
        <label className="block text-white mb-2">Hair</label>
        {/* Hair options will go here */}
      </div>
      {/* Eyes options */}
      <div className="mb-4">
        <label className="block text-white mb-2">Eyes</label>
        {/* Eyes options will go here */}
      </div>
      {/* Mouth options */}
      <div>
        <label className="block text-white mb-2">Mouth</label>
        {/* Mouth options will go here */}
      </div>
    </div>
  );
};

export default AvatarCustomizer;
