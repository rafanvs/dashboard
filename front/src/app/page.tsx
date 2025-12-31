import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <main className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Front + NextAuth
          </h1>
          <p className="text-sm text-zinc-600">
            Autenticação via <span className="font-medium">Credentials</span>{" "}
            consumindo o backend NestJS em <code>BACKEND_URL</code>.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white"
          >
            Ir para login
          </Link>
          <Link
            href="/cadastro"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Criar conta
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Dashboard (protegida)
          </Link>
        </div>

        <p className="mt-6 text-sm text-zinc-600">
          Dica: se você ainda não criou um usuário, use <code>POST /users</code>{" "}
          no backend e depois autentique aqui.
        </p>
      </main>
    </div>
  );
}
