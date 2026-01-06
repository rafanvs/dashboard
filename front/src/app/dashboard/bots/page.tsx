"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowLeft, Bot, RefreshCcw, Trash2, Plus, X } from "lucide-react";

interface TelegramBot {
    id: number;
    name: string;
    token: string;
    createdAt: string;
}

export default function BotsPage() {
    const { data: session } = useSession();
    const [bots, setBots] = useState<TelegramBot[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBot, setNewBot] = useState({ name: "", token: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBots = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/telegram-bots");
            if (!response.ok) {
                throw new Error("Falha ao carregar bots");
            }
            const data = await response.json();
            setBots(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/telegram-bots", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBot),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao criar bot");
            }

            const createdBot = await response.json();
            setBots((prev) => [...prev, createdBot]);
            setIsModalOpen(false);
            setNewBot({ name: "", token: "" });
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao criar");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja remover este bot?")) return;

        try {
            const response = await fetch(`/api/telegram-bots/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao remover bot");
            }
            setBots((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao remover");
        }
    };

    useEffect(() => {
        fetchBots();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 px-6 py-10">
            <div className="mx-auto w-full max-w-4xl space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500">
                            <Bot size={20} />
                            <h2 className="text-sm font-medium uppercase tracking-wider">Configurações</h2>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                            Meus Bots do Telegram
                        </h1>
                        <p className="text-zinc-600">
                            Gerencie seus bots do Telegram para postagens automáticas.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={fetchBots}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition-all hover:bg-zinc-50 disabled:opacity-50"
                        >
                            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-zinc-800"
                        >
                            <Plus size={16} />
                            Novo Bot
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    {loading && bots.length === 0 ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-600" />
                                <p className="text-sm text-zinc-500">Carregando bots...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="text-center">
                                <p className="text-sm font-medium text-red-600">{error}</p>
                                <button
                                    onClick={fetchBots}
                                    className="mt-4 text-sm font-medium text-zinc-900 underline underline-offset-4"
                                >
                                    Tentar novamente
                                </button>
                            </div>
                        </div>
                    ) : bots.length === 0 ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="text-center space-y-2">
                                <p className="text-sm text-zinc-500">Nenhum bot cadastrado.</p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-sm font-medium text-zinc-900 underline underline-offset-4"
                                >
                                    Cadastrar meu primeiro bot
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-zinc-100 bg-zinc-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900">Nome</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900">Token</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900">Data</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {bots.map((bot) => (
                                        <tr key={bot.id} className="transition-colors hover:bg-zinc-50/50">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900">
                                                {bot.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-zinc-400">
                                                {bot.token.substring(0, 10)}...{bot.token.substring(bot.token.length - 4)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600">
                                                {new Date(bot.createdAt).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(bot.id)}
                                                    className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                                    title="Excluir bot"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
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

            {/* Modal para Novo Bot */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-zinc-900">Cadastrar Novo Bot</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-700">
                                    Nome do Bot (Para sua referência)
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="Ex: Bot de Descontos"
                                    value={newBot.name}
                                    onChange={(e) => setNewBot({ ...newBot, name: e.target.value })}
                                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-900 transition-all focus:ring-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="token" className="text-sm font-medium text-zinc-700">
                                    Token do Telegram
                                </label>
                                <input
                                    id="token"
                                    type="text"
                                    required
                                    placeholder="Ex: 123456:ABC-DEF..."
                                    value={newBot.token}
                                    onChange={(e) => setNewBot({ ...newBot, token: e.target.value })}
                                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-900 transition-all focus:ring-2"
                                />
                                <p className="text-[10px] text-zinc-400 italic">
                                    Você obtém este token conversando com o @BotFather no Telegram.
                                </p>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Cadastrando..." : "Confirmar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
