
import type { Metadata } from "next";
import { Inter, MedievalSharp } from "next/font/google";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const medievalSharp = MedievalSharp({ subsets: ["latin"], weight: "400", variable: '--font-medieval-sharp' });

export const metadata: Metadata = {
  title: "Kingdom of Learning",
  description: "A gamified learning adventure",
  icons: {
    icon: "/wowl.png",
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${inter.variable} ${medievalSharp.variable} font-sans`}>
        <div className="bg-gradient-to-b from-background-start to-background-end text-foreground min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
