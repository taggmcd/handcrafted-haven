import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seller Profile Page',
  description: 'Seller profile page for Handcrafted Haven',
};

export default function SellerProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
