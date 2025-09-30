
import { getDictionary } from '../../../lib/get-dictionary';
import { Locale } from '../../../i18n-config';

export default async function ProfilePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white">Profile</h1>
      {/* Avatar customization and progress tracking will go here */}
    </div>
  );
}
