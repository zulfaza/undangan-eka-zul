import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from 'next/font/google'
import "./globals.css";
import "./typefaces.css";

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: [
    "400",
    "500",
    "600"
  ]
})

export const metadata: Metadata = {
  title: "The Wedding of Zul & Eka",
  description: "The Wedding of Zul & Eka - 18 Februari 2024, Gedung Islamic Center Cirebon, Tuparev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto_mono.variable}`}>{children}</body>
    </html>
  );
}
