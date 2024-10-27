import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // console.log('middleware called for URL:', req.url);

  // Defina o caminho de login
  const loginUrl = new URL('/login', req.url);
  // console.log('loginUrl', loginUrl);

  // Obtenha o token JWT do usuário
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // console.log('token', token);
  
  // Se o token não estiver presente e a rota precisar de autenticação, redirecionar para login
  if (!token) {
    loginUrl.searchParams.set('returnUrl', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Se o usuário estiver autenticado, continuar com a requisição
  return NextResponse.next();
}

// Configura o middleware para proteger rotas específicas
export const config = {
  matcher: ['/reviews/create'],  // Protege a rota /reviews/create
};