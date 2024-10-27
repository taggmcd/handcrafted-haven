// app/signup/page.tsx
'use client';

import { roboto } from '@/app/ui/fonts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/ui/button';
import { register } from '@/app/lib/clientActions'; // Importe a função de registro

export default function SignupForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        // console.log('Sending request to register user...');
        await register(name, email, password); // Chame a função de registro
        // console.log('User registered successfully');
        router.push('/login'); // Redirecione para a página de login após o registro bem-sucedido
      } catch (error) {
        console.error('Error registering user:', error);
        setErrorMessage((error as Error).message);
      } finally {
        setIsPending(false);
      }
    };

  return (
    <div className={`${roboto.className} flex flex-col items-center justify-center min-h-screen`}>
      <form onSubmit={handleSignup} className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
}