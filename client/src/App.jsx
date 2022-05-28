import './App.scss'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './style/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
export default App
