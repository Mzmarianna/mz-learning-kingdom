
import React from 'react';
import Hair1 from './avatar/hair/Hair1';
import Hair2 from './avatar/hair/Hair2';
import Hair3 from './avatar/hair/Hair3';
import Eyes1 from './avatar/eyes/Eyes1';
import Eyes2 from './avatar/eyes/Eyes2';
import Mouth1 from './avatar/mouth/Mouth1';
import Mouth2 from './avatar/mouth/Mouth2';

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

const eyesComponents: { [key: string]: React.ComponentType } = {
  'eyes-1': Eyes1,
  'eyes-2': Eyes2,
};

const mouthComponents: { [key: string]: React.ComponentType } = {
  'mouth-1': Mouth1,
  'mouth-2': Mouth2,
};

const Avatar: React.FC<AvatarProps> = ({ hair, eyes, mouth, skin }) => {
  const HairComponent = hairComponents[hair];
  const EyesComponent = eyesComponents[eyes];
  const MouthComponent = mouthComponents[mouth];

  return (
    <div className="w-64 h-64 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill={skin} stroke="#a07c57" strokeWidth="2" />
        {EyesComponent && <EyesComponent />}
        {MouthComponent && <MouthComponent />}
        {HairComponent && <HairComponent />}
      </svg>
    </div>
  );
};

export default Avatar;
