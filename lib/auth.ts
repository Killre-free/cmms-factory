import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const users = [
  { id: '1', username: 'admin', password: 'Admin@123', role: 'ADMIN', name: 'Administrator' },
  { id: '2', username: 'manager', password: 'Manager@123', role: 'MANAGER', name: 'Manager' },
  { id: '3', username: 'tech1', password: 'Tech@123', role: 'TECHNICIAN', name: 'Technician' },
  { id: '4', username: 'operator', password: 'Operator@123', role: 'OPERATOR', name: 'Operator' },
];

export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) => u.username === credentials?.username && u.password === credentials?.password
        );
        if (user) {
          return { id: user.id, name: user.name, email: user.username, role: user.role };
        }
        throw new Error('Invalid credentials');
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.role = token.role;
      return session;
    },
  },
};

export const handler = NextAuth(authConfig);
