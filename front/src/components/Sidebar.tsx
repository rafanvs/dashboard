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
    Tooltip,
} from "@mui/material";
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    SmartToy as BotIcon,
    Menu as MenuIcon,
    Logout as LogoutIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export const DRAWER_WIDTH = 280;
export const COLLAPSED_DRAWER_WIDTH = 88;

const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Usuários", icon: <PeopleIcon />, path: "/dashboard/users" },
    { text: "Bots Telegram", icon: <BotIcon />, path: "/dashboard/bots" },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
}

export const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const pathname = usePathname();
    const router = useRouter();

    const drawerContent = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "background.paper" }}>
            <Box 
                sx={{ 
                    p: collapsed && !isMobile ? 2 : 3, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: collapsed && !isMobile ? "center" : "space-between",
                    minHeight: 80 
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "primary.main",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <BotIcon sx={{ color: "background.default", fontSize: 24 }} />
                    </Box>
                    {(!collapsed || isMobile) && (
                        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.5px", color: "text.primary" }}>
                            Antigravity
                        </Typography>
                    )}
                </Box>
                
                {!isMobile && (
                    <IconButton 
                        onClick={onToggle}
                        sx={{ 
                            display: { xs: 'none', md: 'flex' },
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                        }}
                    >
                        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                )}
            </Box>

            <Divider sx={{ mx: 2, mb: 2, opacity: 0.1 }} />

            <List sx={{ px: 2, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <Tooltip title={collapsed && !isMobile ? item.text : ""} placement="right">
                                <ListItemButton
                                    onClick={() => {
                                        router.push(item.path);
                                        if (isMobile) onMobileClose();
                                    }}
                                    sx={{
                                        borderRadius: 2,
                                        justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                                        px: collapsed && !isMobile ? 1 : 2,
                                        bgcolor: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
                                        color: isActive ? "text.primary" : "text.secondary",
                                        "& .MuiListItemIcon-root": {
                                            color: isActive ? "text.primary" : "inherit",
                                            minWidth: collapsed && !isMobile ? 0 : 40,
                                        },
                                        "&:hover": {
                                            bgcolor: "rgba(255, 255, 255, 0.12)",
                                        },
                                    }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    {(!collapsed || isMobile) && (
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontSize: "0.875rem",
                                                fontWeight: isActive ? 600 : 500,
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 2 }}>
                <Divider sx={{ mb: 2, opacity: 0.1 }} />
                <Button
                    fullWidth
                    variant="text"
                    color="inherit"
                    startIcon={<LogoutIcon sx={{ mr: collapsed && !isMobile ? 0 : 1 }} />}
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    sx={{
                        borderRadius: 2,
                        justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                        color: "text.secondary",
                        px: collapsed && !isMobile ? 0 : 2,
                        minWidth: 0,
                        "& .MuiButton-startIcon": {
                            margin: collapsed && !isMobile ? 0 : undefined,
                        }
                    }}
                >
                    {(!collapsed || isMobile) && "Sair"}
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ 
                width: { md: collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH }, 
                flexShrink: { md: 0 },
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }}
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        overflowX: 'hidden',
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};
