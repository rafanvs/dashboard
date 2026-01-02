"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, RefreshCcw } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/users");
            if (!response.ok) {
                throw new Error("Falha ao carregar usuários");
            }
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 px-6 py-10">
            <div className="mx-auto w-full max-w-4xl space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500">
                            <Users size={20} />
                            <h2 className="text-sm font-medium uppercase tracking-wider">Administração</h2>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                            Usuários Cadastrados
                        </h1>
                        <p className="text-zinc-600">
                            Gerencie e visualize todos os usuários do sistema.
                        </p>
                    </div>

                    <button
                        onClick={fetchUsers}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition-all hover:bg-zinc-50 disabled:opacity-50"
                    >
                        <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                        Atualizar
                    </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    {loading && users.length === 0 ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-600" />
                                <p className="text-sm text-zinc-500">Carregando usuários...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="text-center">
                                <p className="text-sm font-medium text-red-600">{error}</p>
                                <button
                                    onClick={fetchUsers}
                                    className="mt-4 text-sm font-medium text-zinc-900 underline underline-offset-4"
                                >
                                    Tentar novamente
                                </button>
                            </div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="flex h-64 items-center justify-center">
                            <p className="text-sm text-zinc-500">Nenhum usuário encontrado.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-zinc-100 bg-zinc-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900">Nome</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900">Email</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900">ID</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900">Data de Cadastro</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {users.map((user) => (
                                        <tr key={user.id} className="transition-colors hover:bg-zinc-50/50">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900">
                                                {user.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600">
                                                {user.email}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-xs font-mono text-zinc-400">
                                                {user.id}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600">
                                                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                        <ArrowLeft size={16} />
                        Voltar para o Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
