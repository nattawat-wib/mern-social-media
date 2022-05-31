import './App.scss'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { useState } from 'react'
import theme from './style/theme.style';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToggleContextProvider } from './context/toggle-context';
import { ThemeContextProvider } from './context/theme-context';
import CssBaseline from '@mui/material/CssBaseline';

import Login from './pages/auth/login';
import ForgetPassword from './pages/auth/forget-password';
import ResetPassword from './pages/auth/reset-password';
import Index from './pages/index';
import Profile from './pages/member/profile';

import PublicLayout from './layout/public';
import MemberLayout from './layout/member';

function App() {
    console.log(theme);
    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <ToggleContextProvider>
                    <ThemeContextProvider>
                        <BrowserRouter>
                            <Routes>

                                <Route element={<PublicLayout />} >
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/forget-password' element={<ForgetPassword />} />
                                    <Route path='/reset-password' element={<ResetPassword />} />
                                </Route>

                                <Route element={<MemberLayout />} >
                                    <Route index element={<Index />} />
                                    <Route path='/user/username' element={<Profile />} />
                                </Route>

                            </Routes>
                        </BrowserRouter>

                    </ThemeContextProvider>
                </ToggleContextProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
export default App
