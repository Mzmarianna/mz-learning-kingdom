
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import Avatar from '../components/Avatar';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUser(user);
          setAvatar(userDoc.data().avatar);
        } else {
          // Handle case where user is authenticated but no user document exists
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAvatarChange = (newAvatar: any) => {
    setAvatar(newAvatar);
  };

  const handleSave = async () => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { avatar }, { merge: true });
      alert('Avatar saved!');
    }
  };

  if (!user || !avatar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Customize Your Avatar</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        <div className="w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center">
          <Avatar avatar={avatar} />
        </div>
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {Object.keys(avatar).map((part) => (
              <div key={part}>
                <label className="capitalize block text-gray-400 mb-2">{part}</label>
                <select
                  value={avatar[part]}
                  onChange={(e) => handleAvatarChange({ ...avatar, [part]: e.target.value })}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                >
                  {/* Add options for each avatar part here */}
                  <option value={`${part}1`}>{part} 1</option>
                  <option value={`${part}2`}>{part} 2</option>
                  <option value={`${part}3`}>{part} 3</option>
                </select>
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Save Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

