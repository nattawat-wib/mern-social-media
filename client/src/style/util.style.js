import styled from "styled-components";
import Paper from '@mui/material/Paper';

export const StyledPageLoader = styled.section`
    display: ${({ loading }) => JSON.parse(loading) ? 'flex' : 'none'} ;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.2);
    z-index: 9999;
`