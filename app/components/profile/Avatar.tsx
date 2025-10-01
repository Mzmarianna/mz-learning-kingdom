
import React from 'react';
import Hair1 from './avatar/hair/Hair1';
import Hair2 from './avatar/hair/Hair2';
import Hair3 from './avatar/hair/Hair3';

interface AvatarProps {
  hair: string;
  eyes: string;
  mouth: string;
  skin: string;
}

const hairComponents: { [key: string]: React.ComponentType } = {
  'hair-1': Hair1,
  'hair-2': Hair2,
  'hair-3': Hair3,
};

const Avatar: React.FC<AvatarProps> = ({ hair, eyes, mouth, skin }) => {
  const HairComponent = hairComponents[hair];

  return (
    <div className="w-64 h-64 rounded-full flex items-center justify-center" style={{ backgroundColor: skin }}>
      <div className="relative w-full h-full">
        {HairComponent && <HairComponent />}
        {/* Eyes and mouth components will be added here */}
      </div>
    </div>
  );
};

export default Avatar;
