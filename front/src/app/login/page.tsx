import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Entrar
          </h1>
          <p className="text-sm text-zinc-600">
            Use seu email e senha cadastrados no backend.
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 flex items-center justify-between text-sm text-zinc-600">
          <Link className="underline underline-offset-4" href="/cadastro">
            Criar conta
          </Link>
          <Link className="underline underline-offset-4" href="/">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}


