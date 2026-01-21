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
    Chip,
    CircularProgress,
    Alert,
    Tooltip,
} from "@mui/material";
import {
    Refresh as RefreshIcon,
    Delete as DeleteIcon,
    People as PeopleIcon,
} from "@mui/icons-material";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function UsersPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isAdmin = session?.user?.role === "ADMIN";

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

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao excluir usuário");
            }
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao excluir");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const renderTableContent = () => {
        if (loading) {
            return (
                <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                        <CircularProgress size={32} thickness={5} />
                        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                            Carregando usuários...
                        </Typography>
                    </TableCell>
                </TableRow>
            );
        }

        if (users.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                        <Typography variant="body1" color="text.secondary">
                            Nenhum usuário encontrado.
                        </Typography>
                    </TableCell>
                </TableRow>
            );
        }

        return users.map((user) => (
            <TableRow key={user.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell color="text.secondary">{user.email}</TableCell>
                <TableCell>
                    <Chip
                        label={user.role}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            bgcolor: "surface.secondary",
                            color: user.role === "ADMIN" ? "white" : "text.primary",
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Typography variant="caption" sx={{ fontFamily: "var(--font-geist-mono)", color: "text.disabled" }}>
                        {user.id}
                    </Typography>
                </TableCell>
                <TableCell sx={{ color: "text.secondary" }}>
                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
                {isAdmin && (
                    <TableCell align="right">
                        <Tooltip title={session?.user?.id === user.id ? "Você não pode se excluir" : "Excluir usuário"}>
                            <span>
                                <IconButton
                                    onClick={() => handleDelete(user.id)}
                                    disabled={session?.user?.id === user.id}
                                    color="error"
                                    size="small"
                                    sx={{
                                        opacity: session?.user?.id === user.id ? 0 : 0.6,
                                        "&:hover": { opacity: 1, bgcolor: "error.lighter" },
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </TableCell>
                )}
            </TableRow>
        ));
    };

    return (
        <Box>
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, color: "text.secondary" }}>
                        <PeopleIcon sx={{ fontSize: 18 }} />
                        <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.2 }}>
                            Administração
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Usuários Cadastrados
                    </Typography>
                </Box>

                <Button
                    startIcon={<RefreshIcon />}
                    onClick={fetchUsers}
                    disabled={loading}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                >
                    Atualizar
                </Button>
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
                            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Papel</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Cadastro</TableCell>
                            {isAdmin && <TableCell align="right" sx={{ fontWeight: 600 }}>Ações</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableContent()}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
