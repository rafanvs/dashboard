import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type BackendLoginResponse = {
  access_token: string;
};

type BackendProfileResponse = {
  userId: number;
  email: string;
  name?: string | null;
  role: string;
};

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        const loginRes = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) return null;

        const loginData = (await loginRes.json()) as BackendLoginResponse;
        if (!loginData?.access_token) return null;

        const profileRes = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${loginData.access_token}` },
        });

        if (!profileRes.ok) return null;

        const profile = (await profileRes.json()) as BackendProfileResponse;
        if (!profile?.userId || !profile?.email) return null;

        return {
          id: String(profile.userId),
          email: profile.email,
          name: profile.name ?? undefined,
          role: profile.role,
          accessToken: loginData.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId ?? session.user.id;
        session.user.role = (token.role as string) ?? session.user.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};


