import type { Metadata } from "next";
import { roboto } from '@/app/ui/fonts';
import "./ui/globals.css";
import Nabar from "./ui/navbar";
import Footer from "./ui/footer";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Where you can find all your handcrafted needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Nabar />
        {children}
      <Footer />
      </body>
    </html>
  );
}