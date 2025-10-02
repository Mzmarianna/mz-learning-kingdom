import type { Metadata } from "next";
import { Inter, MedievalSharp } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const medievalSharp = MedievalSharp({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-medieval-sharp",
});

export const metadata: Metadata = {
  title: "Kingdom of Learning",
  description: "An enchanting learning adventure!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${medievalSharp.variable} antialiased font-sans bg-kingdom-background-start text-kingdom-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
