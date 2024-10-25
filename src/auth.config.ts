import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,  // Mova o secret para o nível superior
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && typeof token === 'object' && 'id' in token && 'email' in token) {
        const { id, email } = token as { id: string; email: string }; // Verificação e asserção
        session.user.id = id;
        session.user.email = email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  providers: [],  // Adicione provedores aqui, se necessário
};

