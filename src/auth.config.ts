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


// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       console.log('authorized callback', nextUrl.pathname);
//       const isLoggedIn = !!auth?.user;
//       const isOnReviews = nextUrl.pathname.startsWith('/reviews');
//       if (isOnReviews) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;
