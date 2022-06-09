import styled from 'styled-components';
import Paper from '@mui/material/Paper';

export const PageWrapper = styled.main`
    height: calc(100vh - 3rem);
    padding: 1.5rem;
    background-color: ${prop => prop.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FormWrapper = styled(Paper)`
    border-radius: 7px;
    padding: 1rem;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1)
    max-width: 100%;
    width: 450px;
`

export const LoginFormWrapper = styled(Paper)`
    border-radius: 7px;
    padding: 1.5rem;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1)
`