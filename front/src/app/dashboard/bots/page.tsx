"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Tooltip,
} from "@mui/material";
import {
    Refresh as RefreshIcon,
    Delete as DeleteIcon,
    SmartToy as BotIcon,
    Add as AddIcon,
} from "@mui/icons-material";

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
            handleCloseModal();
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewBot({ name: "", token: "" });
    };

    useEffect(() => {
        fetchBots();
    }, []);

    return (
        <>
            <Box>
                <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, color: "text.secondary" }}>
                            <BotIcon sx={{ fontSize: 18 }} />
                            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.2 }}>
                                Configurações
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Meus Bots do Telegram
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <IconButton onClick={fetchBots} disabled={loading} sx={{ border: "1px solid", borderColor: "zinc.200", borderRadius: 2 }}>
                            <RefreshIcon fontSize="small" className={loading ? "animate-spin" : ""} />
                        </IconButton>
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={() => setIsModalOpen(true)}
                            sx={{ borderRadius: 2 }}
                        >
                            Novo Bot
                        </Button>
                    </Box>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ bgcolor: "background.default" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Token</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600 }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && bots.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                                        <CircularProgress size={32} thickness={5} />
                                        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                                            Carregando bots...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : bots.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Nenhum bot cadastrado.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                bots.map((bot) => (
                                    <TableRow key={bot.id} hover>
                                        <TableCell sx={{ fontWeight: 500 }}>{bot.name}</TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontFamily: "var(--font-geist-mono)",
                                                    color: "text.disabled",
                                                    bgcolor: "grey.50",
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                }}
                                            >
                                                {bot.token.substring(0, 8)}••••••••{bot.token.substring(bot.token.length - 4)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ color: "text.secondary" }}>
                                            {new Date(bot.createdAt).toLocaleDateString("pt-BR")}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Excluir bot">
                                                <IconButton
                                                    onClick={() => handleDelete(bot.id)}
                                                    color="error"
                                                    size="small"
                                                    sx={{ opacity: 0.6, "&:hover": { opacity: 1 } }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Modal para Novo Bot */}
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
                fullWidth
                maxWidth="xs"
                disableRestoreFocus // Pode ajudar com o erro de aria-hidden
            >
                <DialogTitle sx={{ fontWeight: 700 }}>Cadastrar Novo Bot</DialogTitle>
                <Box component="form" onSubmit={handleCreate}>
                    <DialogContent sx={{ pt: 1 }}>
                        <TextField
                            fullWidth
                            label="Nome do Bot"
                            placeholder="Ex: Bot de Promoções"
                            margin="normal"
                            required
                            value={newBot.name}
                            onChange={(e) => setNewBot({ ...newBot, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Token do Telegram"
                            placeholder="Ex: 123456:ABC-DEF..."
                            margin="normal"
                            required
                            multiline
                            rows={2}
                            value={newBot.token}
                            onChange={(e) => setNewBot({ ...newBot, token: e.target.value })}
                            helperText="Obtenha o token com o @BotFather no Telegram"
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 1 }}>
                        <Button onClick={handleCloseModal} color="inherit">
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{ minWidth: 100 }}
                        >
                            {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Confirmar"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}
