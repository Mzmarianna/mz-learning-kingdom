
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-background-end/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif font-bold text-primary">
              Kingdom of Learning
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-background-start'}`}>
                Home
              </Link>
              <Link href="/quests" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/quests' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-background-start'}`}>
                Quests
              </Link>
              <Link href="/profile" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/profile' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-background-start'}`}>
                Profile
              </Link>
            </div>
          </nav>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90">
                Login
              </Link>
              <Link href="/register" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-secondary hover:bg-secondary/90">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
