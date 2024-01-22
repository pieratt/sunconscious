import type { Metadata } from "next";

import "./globals.css";
import { Inconsolata } from "next/font/google";

export const metadata: Metadata = {
  title: "Sunconscious",
  description:
    "Open the heavy door and fall down a rabbit hole into beautiful darkness",
};

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inconsolata.variable} ${inconsolata.variable}`}
    >
      <body className="bg-stone-800">{children}</body>
    </html>
  );
}
