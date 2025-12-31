
import type { Metadata } from "next";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import "../globals.css";

export const metadata: Metadata = {
  title: "Kingdom of Learning",
  description: "A gamified learning adventure",
  icons: {
    icon: "/wowl.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=MedievalSharp&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans" suppressHydrationWarning style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="bg-gradient-to-b from-background-start to-background-end text-foreground min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
