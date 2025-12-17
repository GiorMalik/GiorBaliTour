import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: Implement user lookup in database
        // const user = await getUserByEmail(credentials.email);
        // if (!user) return null;

        // const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        // if (!isPasswordValid) return null;

        // For now, return dummy user
        return {
          id: '1',
          email: credentials.email,
          name: 'Test User',
          role: 'user'
        };
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
};

export const handler = NextAuth(authOptions);