"use client";

import { Box, Container, Paper, Typography, Link as MuiLink } from "@mui/material";
import { CadastroForm } from "@/components/CadastroForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CadastroPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CadastroForm />

          <Typography variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
            Já tem uma conta?{" "}
            <Link href="/login" style={{ textDecoration: "none" }}>
              <MuiLink
                component="span"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Fazer login
              </MuiLink>
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
