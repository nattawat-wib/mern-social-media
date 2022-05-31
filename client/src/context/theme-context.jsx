import { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/system';
import { LightTheme, DarkTheme } from './../style/theme.style';

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode'));

    useEffect(() => {
        if(isDarkMode) {
            localStorage.setItem('isDarkMode', true);
        } else {
            localStorage.removeItem('isDarkMode');
        }
    }, [isDarkMode])

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <ThemeProvider theme={isDarkMode ?  DarkTheme : LightTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider >
    )
}