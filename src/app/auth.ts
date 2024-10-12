import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { z } from 'zod';
import clientPromise from '@/app/lib/mongodb';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { WithId, Document } from 'mongodb'; // Tipos do MongoDB
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const client = await clientPromise;
    const db = client.db('yourDatabaseName'); // Change to your database name
    const user = await db.collection('users').findOne<WithId<Document>>({ email: email });
    if (!user) {
      return undefined;
    } else {
      // map the document MongoDB returns to a `User` object
      const mappedUser: User = {
        id: user._id.toString(), // User uses a string ID
        name: user.name as string,
        email: user.email as string,
        password: user.password as string,
      };
      return mappedUser;
    }
} catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});