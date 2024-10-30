import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sellers Profile Page',
  description: 'Seller profile page for Handcrafted Haven',
};

export default function SellerListLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
