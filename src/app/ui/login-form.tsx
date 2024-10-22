'use client';

import { roboto } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useState } from 'react'; // Import useState to manage state
import { authenticate } from '@/app/lib/actions'; // Import your authenticate function
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [isPending, setIsPending] = useState(false); // State for pending status
  const [prevState, setPrevState] = useState<string | undefined>(undefined); // State to track the previous state
  const router = useRouter(); // Initialize the router hook for redirection

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setIsPending(true); // Set pending state to true while authenticating

    const formData = new FormData(event.currentTarget); // Collect form data
    console.log('Form data:', Object.fromEntries(formData)); // Log form data

    try {
      // Call authenticate, passing the prevState and formData
      const result = await authenticate(prevState, formData);
      console.log('Result:', result);

      if (typeof result === 'string') {
        setErrorMessage(result); // Set error message if authentication fails
      } else {
        // Handle successful authentication (e.g., redirect, update state, etc.)
        setErrorMessage(null); // Clear any previous error messages
        console.log('Authenticated successfully:', result);
        router.push('/'); // Redirect to the root route upon successful authentication
      }

      setPrevState(result); // Update the prevState if needed
    } catch (error) {
      console.error('Failed to authenticate:', error); // Log any errors
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsPending(false); // Reset pending state
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${roboto.className} mb-3 text-2xl text-gray-800`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />

              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </a>
          </p>
        </div>

        <div 
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >            
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
