import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type BackendLoginResponse = {
  access_token: string;
};

type BackendProfileResponse = {
  userId: number;
  email: string;
  name?: string | null;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente ${name} não definida`);
  return value;
}

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
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;

        const backendUrl = requireEnv("BACKEND_URL").replace(/\/$/, "");

        const loginRes = await fetch(`${backendUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) return null;

        const loginData = (await loginRes.json()) as BackendLoginResponse;
        if (!loginData?.access_token) return null;

        const profileRes = await fetch(`${backendUrl}/auth/profile`, {
          headers: { Authorization: `Bearer ${loginData.access_token}` },
        });

        if (!profileRes.ok) return null;

        const profile = (await profileRes.json()) as BackendProfileResponse;
        if (!profile?.userId || !profile?.email) return null;

        return {
          id: String(profile.userId),
          email: profile.email,
          name: profile.name ?? undefined,
          accessToken: loginData.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).id;
        token.email = (user as any).email;
        token.name = (user as any).name;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.userId as string) ?? session.user.id;
        session.user.email = (token.email as string) ?? session.user.email;
        session.user.name = (token.name as string) ?? session.user.name;
      }
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
};


