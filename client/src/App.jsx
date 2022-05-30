import './App.scss'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './style/theme.style';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/auth/login';
import ForgetPassword from './pages/auth/forget-password';
import ResetPassword from './pages/auth/reset-password';
import Index from './pages/index';

import PublicLayout from './layout/public';
import MemberLayout from './layout/member';

import { CreatePostContextProvider } from './context/create-post-context';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CreatePostContextProvider>
                    <BrowserRouter>
                        <Routes>

                            <Route element={<PublicLayout />} >
                                <Route path='/login' element={<Login />} />
                                <Route path='/forget-password' element={<ForgetPassword />} />
                                <Route path='/reset-password' element={<ResetPassword />} />
                            </Route>

                            <Route element={<MemberLayout />} >
                                <Route index element={<Index />} />
                            </Route>

                        </Routes>
                    </BrowserRouter>
                </CreatePostContextProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
export default App
