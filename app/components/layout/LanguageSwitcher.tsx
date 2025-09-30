
'use client';

import { i18n } from '../../i18n-config';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    if (!pathname) return;
    const newPath = pathname.replace(/^\/[^\/]+/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center">
      <select
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="bg-transparent text-white border-none text-sm"
        defaultValue={pathname.split('/')[1]}
      >
        {i18n.locales.map((locale) => (
          <option key={locale} value={locale} className="bg-background-end">
            {locale.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
