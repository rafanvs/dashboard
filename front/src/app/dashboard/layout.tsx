"use client";

import { Box } from "@mui/material";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 3, md: 6 },
                    width: { md: `calc(100% - 280px)` },
                    mt: { xs: 8, md: 0 }, // Espaço para o botão do menu no mobile
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
