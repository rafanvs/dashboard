"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CreateUserResponse =
  | { id: number; email: string; name: string | null; createdAt: string }
  | { message?: string | string[] };

export function CadastroForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() ? name.trim() : undefined,
          email,
          password,
          role,
        }),
      });

      const data = (await res.json()) as CreateUserResponse;

      if (!res.ok) {
        const msg =
          typeof (data as any)?.message === "string"
            ? (data as any).message
            : Array.isArray((data as any)?.message)
              ? (data as any).message.join(", ")
              : "Não foi possível criar a conta.";
        setError(msg);
        return;
      }

      setSuccess(true);
      router.push("/login");
    } catch {
      setError("Erro de rede ao cadastrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-900">Nome</label>
        <input
          className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-zinc-900 outline-none focus:border-zinc-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="Seu nome (opcional)"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-900">Email</label>
        <input
          className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-zinc-900 outline-none focus:border-zinc-400"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="voce@exemplo.com"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-900">Senha</label>
        <input
          className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-zinc-900 outline-none focus:border-zinc-400"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="••••••••"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-zinc-900">Papel (Role)</label>
        <select
          className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-zinc-900 outline-none focus:border-zinc-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="USER">Usuário</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Conta criada. Redirecionando para o login...
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? "Criando..." : "Criar conta"}
      </button>

      <p className="text-xs text-zinc-500">
        Ao criar a conta, você poderá entrar em{" "}
        <Link className="underline underline-offset-4" href="/login">
          /login
        </Link>
        .
      </p>
    </form>
  );
}


