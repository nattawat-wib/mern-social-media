import { ProfileButton, AppBarAvatar, AppBarContainer, AppBarSearch } from './../style/navbar.style';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ToggleContext } from '../context/toggle-context';
import EditProfileDialog from './edit-profile-dialog';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import SearchIcon from '@mui/icons-material/Search';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const [DropdownAnchor, setDropdownAnchor] = useState(null);
    const { isEditProfileDialogOpen, setIsEditProfileDialogOpen } = useContext(ToggleContext);

    return (
        <AppBar position="sticky" color='common'>
            <EditProfileDialog
                isEditProfileDialogOpen={isEditProfileDialogOpen}
                setIsEditProfileDialogOpen={setIsEditProfileDialogOpen}
            />
            <AppBarContainer>
                <Box className='flex items-center'>
                    <Link to='/'>
                        <Typography variant='h5' color='primary' className='font-black mr-4'> fuckbook </Typography>
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
                    <ProfileButton to="/user/username">
                        <figure className='relative mr-2' style={{ height: '33px', width: '33px' }}>
                            <AppBarAvatar src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200' />
                        </figure>
                        <Typography className='font-bold' color='primary.dark'> nutella </Typography>
                    </ProfileButton>
                    <IconButton
                        color='primary'
                        sx={{ bgcolor: "#f0f2f5", mx: .5 }}
                        onClick={e => setDropdownAnchor(e.target)}
                    >
                        <ExpandCircleDownRoundedIcon />
                    </IconButton>
                    <Menu
                        onClose={() => setDropdownAnchor(null)}
                        open={!!DropdownAnchor}
                        anchorEl={DropdownAnchor}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <List dense={true} disablePadding={true}>

                            <ListItemButton
                                component={Link}
                                to="/user/username"
                                onClick={() => setDropdownAnchor(null)}
                                sx={{ bgcolor: 'primary.light' }}
                            >
                                <Chip
                                    avatar={<Avatar src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200' />}
                                    label='nutella tester'
                                    color='primary'
                                />
                            </ListItemButton>

                            <ListItemButton
                                onClick={
                                    () => {
                                        setDropdownAnchor(null)
                                        setIsEditProfileDialogOpen(true)
                                    }
                                }
                            >
                                <ListItemIcon> <EditIcon /> </ListItemIcon>
                                <ListItemText primary='Edit Profile' />
                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/"
                                onClick={() => setDropdownAnchor(null)}
                            >
                                <ListItemIcon> <PeopleAltIcon /> </ListItemIcon>
                                <ListItemText primary='Your Friends' />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon> <LogoutIcon /> </ListItemIcon>
                                <ListItemText primary='Logout' />
                            </ListItemButton>
                        </List>
                    </Menu>
                    <IconButton color='primary' sx={{ bgcolor: "#f0f2f5", mx: .5 }}>
                        {false ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                    </IconButton>
                </Box>
            </AppBarContainer>
        </AppBar>
    )
}

export default Navbar