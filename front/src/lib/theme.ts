import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#18181b", // zinc-900
        },
        secondary: {
            main: "#71717a", // zinc-500
        },
        background: {
            default: "#fafafa", // zinc-50
            paper: "#ffffff",
        },
        text: {
            primary: "#09090b", // zinc-950
            secondary: "#52525b", // zinc-600
        },
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
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: "1px solid #e4e4e7", // zinc-200
                    boxShadow: "none",
                },
            },
        },
    },
});
