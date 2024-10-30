import type { Metadata } from "next";
import { roboto } from '@/app/ui/fonts';
import "./ui/globals.css";
import Navbar from "./ui/navbar";
import Footer from "./ui/footer";

export const metadata: Metadata = {   title: {     default: 'Handcrafted Haven',     template: '%s - Handcrafted Haven',   },  description: 'Where you can find all your handcrafted needs',   openGraph: {     type: 'website',     siteName: 'Handcrafted Haven',   }, };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased bg-white`}
      >
        <Navbar />
        {children}
      <Footer />
      </body>
    </html>
  );
}