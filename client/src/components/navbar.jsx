import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

import theme from './../style/theme.style';

import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import { Box } from '@mui/material';

const Navbar = () => {

    return (
        <AppBar position="sticky" color='common'>
            <AppBarContainer>
                <Box className='flex items-center'>
                    <Link to='/'>
                        <Typography variant='h5' color='primary' className='font-black mr-4'> FuckBook </Typography>
                    </Link>
                    <AppBarSearch
                        size='small'

                        placeholder='search member'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                {/* <Box className='flex items-center'>
                    <IconButton sx={{mx: 1}}> <HomeIcon /> </IconButton>
                    <IconButton sx={{mx: 1}}> <PeopleAltIcon /> </IconButton>
                </Box> */}

                <Box className='flex items-center'>
                    <ProfileButton to="/">
                        <figure className='relative mr-2' style={{ height: '33px', width: '33px' }}>
                            <AppBarAvatar src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200' />
                        </figure>
                        <Typography className='font-bold' color='primary.dark'> nutella </Typography>
                    </ProfileButton>
                    <IconButton color='primary' sx={{ backgroundColor: "#f0f2f5", mx: .5 }}>
                        <ExpandCircleDownRoundedIcon />
                    </IconButton>
                    <IconButton color='primary' sx={{ backgroundColor: "#f0f2f5", mx: .5 }}>
                        {false ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                    </IconButton>
                </Box>
            </AppBarContainer>
        </AppBar>
    )
}

export default Navbar

const ProfileButton = styled(Link)`
    background-color: ${theme.palette.primary.light};
    text-decoration: none;
    padding: 5px 10px 5px 5px;
    border-radius: 99px;
    display: flex;
    align-items: center;
`

const AppBarAvatar = styled.img`
    border-radius: 99%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

const AppBarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1rem;
`

const AppBarSearch = styled(TextField)`
    background-color: #f0f2f5;
    border-radius: 99px;
    overflow: hidden;

    & fieldset {
        border: none;
    }
`

