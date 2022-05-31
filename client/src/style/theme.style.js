import { createTheme } from "@mui/material/styles";

export const LightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#14C38E",
            light: "#B8F1B0",
            dark: "#2F8F9D",
            contrastText: "#fff"
        },
        secondary: {
            main: "#FF8D29",
            light: "#FFDAAF",
            dark: "#FFCC8F",
            contrastText: "#fff"
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, .6)',
                    backdropFilter: 'blur(2.5px)',
                },
            },
        },
    }
});

export const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#14C38E",
            light: "#B8F1B0",
            dark: "#2F8F9D",
            contrastText: "#fff"
        },
        secondary: {
            main: "#FF8D29",
            light: "#FFDAAF",
            dark: "#FFCC8F",
            contrastText: "#fff"
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, .6)',
                    backdropFilter: 'blur(2.5px)',
                },
            },
        },
    }
});