import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const displayName =
    session.user.name?.trim() || session.user.email || session.user.id;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Dashboard
            </h1>
            <p className="text-sm text-zinc-600">
              Olá, <span className="font-medium">{displayName}</span>.
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <p className="text-sm font-medium text-zinc-900">Sessão</p>
          <pre className="mt-3 overflow-auto rounded-xl bg-zinc-950 p-4 text-xs text-zinc-100">
            {JSON.stringify(
              {
                user: session.user,
                accessTokenPreview: session.accessToken
                  ? `${session.accessToken.slice(0, 24)}...`
                  : null,
              },
              null,
              2,
            )}
          </pre>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard/users"
            className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:bg-zinc-50"
          >
            <p className="text-sm font-medium text-zinc-900">Usuários</p>
            <p className="text-xs text-zinc-600">
              Ver e gerenciar usuários cadastrados.
            </p>
          </Link>

          <Link
            href="/dashboard/bots"
            className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:bg-zinc-50"
          >
            <p className="text-sm font-medium text-zinc-900">Bots Telegram</p>
            <p className="text-xs text-zinc-600">
              Configure seus bots do Telegram para postagens.
            </p>
          </Link>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 opacity-60">
            <p className="text-sm font-medium text-zinc-900">Configurações</p>
            <p className="text-xs text-zinc-600">
              Gerencie suas preferências de conta.
            </p>
          </div>
        </div>

        <div className="text-sm text-zinc-600">
          <Link className="underline underline-offset-4" href="/">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}


