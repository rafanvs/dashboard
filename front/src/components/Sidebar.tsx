"use client";

import React, { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Divider,
    useMediaQuery,
    useTheme,
    Button,
} from "@mui/material";
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    SmartToy as BotIcon,
    Menu as MenuIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const drawerWidth = 280;

const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Usuários", icon: <PeopleIcon />, path: "/dashboard/users" },
    { text: "Bots Telegram", icon: <BotIcon />, path: "/dashboard/bots" },
];

export const Sidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "primary.main",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <BotIcon sx={{ color: "white", fontSize: 20 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}>
                    Antigravity
                </Typography>
            </Box>

            <Divider sx={{ mx: 2, mb: 2 }} />

            <List sx={{ px: 2, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => {
                                    router.push(item.path);
                                    if (isMobile) setMobileOpen(false);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? "rgba(24, 24, 27, 0.04)" : "transparent",
                                    color: isActive ? "primary.main" : "text.secondary",
                                    "& .MuiListItemIcon-root": {
                                        color: isActive ? "primary.main" : "inherit",
                                    },
                                    "&:hover": {
                                        bgcolor: "rgba(24, 24, 27, 0.04)",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "0.875rem",
                                        fontWeight: isActive ? 600 : 500,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    sx={{
                        borderRadius: 2,
                        justifyContent: "flex-start",
                        color: "text.secondary",
                        borderColor: "zinc.200",
                        px: 2,
                    }}
                >
                    Sair
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ position: "fixed", top: 16, left: 24, zIndex: 1200, bgcolor: "white", boxShadow: 1 }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            borderRight: "1px solid",
                            borderColor: "divider",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};
