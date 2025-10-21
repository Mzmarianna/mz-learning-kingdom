
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '../../lib/get-dictionary';
import { Locale } from '../../i18n-config';

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="relative overflow-hidden bg-background-end">
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background-end to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif">
                {dictionary.page.home.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {dictionary.page.home.description}
              </p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                <Link
                  href={`/${lang}/register`}
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {dictionary.page.home.cta}
                </Link>
                <Link href={`/${lang}/quests`} className="text-sm font-semibold leading-6 text-white">
                  {dictionary.page.home.learnMore} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <Image
                src="/wowl.png"
                alt="Wowl the Owl"
                width={400}
                height={400}
                className="z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
