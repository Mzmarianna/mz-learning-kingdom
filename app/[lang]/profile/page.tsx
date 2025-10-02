'use client';

import React, { useState } from 'react';
import Avatar from '../../components/profile/Avatar';
import AvatarCustomizer from '../../components/profile/AvatarCustomizer';

export default function ProfilePage() {
  const [hair, setHair] = useState('hair-1');
  const [eyes, setEyes] = useState('eyes-1');
  const [mouth, setMouth] = useState('mouth-1');
  const [skin] = useState('#f2d5a6');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Customize Your Avatar</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex justify-center">
          <Avatar hair={hair} eyes={eyes} mouth={mouth} skin={skin} />
        </div>
        <div className="lg:col-span-2">
          <AvatarCustomizer
            onHairChange={setHair}
            onEyesChange={setEyes}
            onMouthChange={setMouth}
          />
        </div>
      </div>
    </div>
  );
}
