import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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
    }
});

export default theme;