"use client";

import { useSession } from "next-auth/react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Paper,
  Divider,
} from "@mui/material";
import {
  People as PeopleIcon,
  SmartToy as BotIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const displayName = session?.user?.name || session?.user?.email || "Usuário";

  const cards = [
    {
      title: "Usuários",
      description: "Ver e gerenciar usuários cadastrados.",
      icon: <PeopleIcon sx={{ fontSize: 40, mb: 2, color: "primary.main" }} />,
      path: "/dashboard/users",
    },
    {
      title: "Bots Telegram",
      description: "Configure seus bots do Telegram para postagens.",
      icon: <BotIcon sx={{ fontSize: 40, mb: 2, color: "primary.main" }} />,
      path: "/dashboard/bots",
    },
    {
      title: "Configurações",
      description: "Gerencie suas preferências de conta.",
      icon: <SettingsIcon sx={{ fontSize: 40, mb: 2, color: "text.disabled" }} />,
      path: "#",
      disabled: true,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Olá, <strong>{displayName}</strong>. Bem-vindo de volta ao seu painel.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
            <Card
              sx={{
                height: "100%",
                opacity: card.disabled ? 0.6 : 1,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: card.disabled ? "none" : "translateY(-4px)",
                },
              }}
            >
              <CardActionArea
                disabled={card.disabled}
                onClick={() => router.push(card.path)}
                sx={{ height: "100%", p: 2 }}
              >
                <CardContent>
                  {card.icon}
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Sessão Atual
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "#09090b",
            color: "#fafafa",
            borderRadius: 3,
            overflow: "auto",
          }}
        >
          <pre style={{ margin: 0, fontSize: "0.8rem", fontFamily: "var(--font-geist-mono)" }}>
            {JSON.stringify(
              {
                user: session?.user,
                accessTokenPreview: session?.accessToken
                  ? `${session.accessToken.slice(0, 32)}...`
                  : null,
              },
              null,
              2,
            )}
          </pre>
        </Paper>
      </Box>
    </Box>
  );
}
