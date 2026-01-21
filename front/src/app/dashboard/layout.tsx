"use client";

import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Sidebar, DRAWER_WIDTH, COLLAPSED_DRAWER_WIDTH } from "@/components/Sidebar";
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ 
                        position: "fixed", 
                        top: 16, 
                        left: 24, 
                        zIndex: 1100, 
                        bgcolor: "background.paper", 
                        boxShadow: 1,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        "&:hover": { bgcolor: "background.paper" }
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Sidebar 
                collapsed={collapsed} 
                onToggle={handleToggleSidebar} 
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />
            
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 3, md: 6 },
                    width: { 
                        md: `calc(100% - ${collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH}px)` 
                    },
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    mt: { xs: 8, md: 0 },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
