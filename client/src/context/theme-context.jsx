import { useState, createContext, useContext } from 'react';
import theme from './../style/theme.style';

export const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('light');

    theme.palette.mode = themeMode

    // console.log(themeMode);

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
            {children}
        </ThemeContext.Provider >
    )
}