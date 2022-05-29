import './App.scss'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './style/theme.style';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import ForgetPassword from './pages/forget-password';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route index path='/login' element={<Login />} />
                        <Route path='/forget-password' element={<ForgetPassword />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
export default App
