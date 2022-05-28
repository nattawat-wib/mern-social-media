import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import styled from 'styled-components';

const Login = () => {
    return (
        <LoginPageWrapper>
            <Paper>
                <h1> Login Page </h1>
            </Paper>
        </LoginPageWrapper>
    )
}

export default Login;

const LoginPageWrapper = styled(Container)`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
`   