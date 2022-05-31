import { useState, createContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/system';
import { LightTheme, DarkTheme } from './../style/theme.style';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

const styledComponentsThemeList = {
    light: {
        bg: '#f0f2f5',
        textColor: '#1b1b1b',
        paperBg: '#f0f2f5',
    },
    dark: {
        bg: '#121212',
        textColor: '#fff',
        paperBg: '#121212',
    }
};

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode'));

    useEffect(() => {
        if (isDarkMode) {
            localStorage.setItem('isDarkMode', true);
        } else {
            localStorage.removeItem('isDarkMode');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <MuiThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
                <StyledComponentsThemeProvider theme={styledComponentsThemeList[isDarkMode ? 'dark' : 'light']}>
                    {children}
                </StyledComponentsThemeProvider>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}