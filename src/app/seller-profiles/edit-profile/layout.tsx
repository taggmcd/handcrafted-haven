import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seller Profile Edit Page',
  description: 'Seller profile edit page for Handcrafted Haven',
};

export default function SellerEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
