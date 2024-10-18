// app/lib/clientActions.ts
export async function register(name: string, email: string, password: string): Promise<void> {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to register');
    }
  }