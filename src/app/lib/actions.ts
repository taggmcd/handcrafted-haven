'use server';

import { signIn } from '../auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // console.log('Authenticating with:', Object.fromEntries(formData));
    const user = await signIn('credentials', formData);
    // console.log('User:', user);
    // await signIn('credentials', formData);
    return user;
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

