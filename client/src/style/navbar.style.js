import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import theme from './theme.style'

export const ProfileButton = styled(Link)`
    background-color: ${theme.palette.primary.light};
    text-decoration: none;
    padding: 5px 10px 5px 5px;
    border-radius: 99px;
    display: flex;
    align-items: center;
`

export const AppBarAvatar = styled.img`
    border-radius: 99%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

export const AppBarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1rem;
`

export const AppBarSearch = styled(TextField)`
    background-color: #f0f2f5;
    border-radius: 99px;
    overflow: hidden;

    & fieldset {
        border: none;
    }
`