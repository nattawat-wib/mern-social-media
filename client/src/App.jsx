import './App.scss'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './style/theme';

import Login from './pages/login';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Login />
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
export default App
