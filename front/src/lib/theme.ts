import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#ffffff",
        },
        secondary: {
            main: "#a1a1aa", // zinc-400
        },
        background: {
            default: "#09090b", // zinc-950
            paper: "#09090b",
        },
        text: {
            primary: "#fafafa", // zinc-50
            secondary: "#a1a1aa", // zinc-400
        },
        divider: "rgba(255, 255, 255, 0.12)",
    },
    typography: {
        fontFamily: "var(--font-geist-sans), Inter, sans-serif",
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    borderRadius: "8px",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
                containedPrimary: {
                    backgroundColor: "#fafafa",
                    color: "#09090b",
                    "&:hover": {
                        backgroundColor: "#e4e4e7",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "none",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#09090b",
                    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                },
            },
        },
    },
});
