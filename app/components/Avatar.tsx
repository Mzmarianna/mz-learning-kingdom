
import React from 'react';

interface AvatarProps {
  avatar: {
    hair: string;
    eyes: string;
    mouth: string;
    skin: string;
  };
}

const Avatar: React.FC<AvatarProps> = ({ avatar }) => {
  // In a real application, you would have a library of SVG parts
  // and you would load them based on the avatar properties.
  // For this example, we'll just display the names of the parts.

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-lg">Hair: {avatar.hair}</div>
      <div className="text-lg">Eyes: {avatar.eyes}</div>
      <div className="text-lg">Mouth: {avatar.mouth}</div>
      <div className="text-lg">Skin: {avatar.skin}</div>
    </div>
  );
};

export default Avatar;
