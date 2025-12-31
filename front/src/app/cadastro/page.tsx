import Link from "next/link";
import { CadastroForm } from "@/components/CadastroForm";

export default function CadastroPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Criar conta
          </h1>
          <p className="text-sm text-zinc-600">
            Cadastro via <code>POST /users</code> no backend.
          </p>
        </div>

        <CadastroForm />

        <div className="mt-6 flex items-center justify-between text-sm text-zinc-600">
          <Link className="underline underline-offset-4" href="/login">
            Já tenho conta
          </Link>
          <Link className="underline underline-offset-4" href="/">
            Início
          </Link>
        </div>
      </div>
    </div>
  );
}


