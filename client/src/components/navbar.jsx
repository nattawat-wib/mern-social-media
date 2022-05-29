import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { ProfileButton, AppBarAvatar, AppBarContainer, AppBarSearch } from './../style/navbar.style';

import SearchIcon from '@mui/icons-material/Search';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';

import { Link } from 'react-router-dom';

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