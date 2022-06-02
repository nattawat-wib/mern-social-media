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
import HomeIcon from '@mui/icons-material/Home';

import { ProfileButton, AppBarAvatar, AppBarContainer, AppBarSearch } from './../style/navbar.style';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { ToggleContext } from '../context/toggle-context';
import { ThemeContext } from '../context/theme-context';
import EditProfileDialog from './edit-profile-dialog';
import { useAuth } from '../context/auth-context';
import axios from './../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
    const [DropdownAnchor, setDropdownAnchor] = useState(null);
    const { isEditProfileDialogOpen, setIsEditProfileDialogOpen } = useContext(ToggleContext);
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    const { member, authDispatch } = useAuth();

    const handleLogout = () => {
        axios.get('/member/logout')
            .then(resp => {
                setDropdownAnchor(null);
                authDispatch({ type: 'logout' });
                toast.success(resp.data.msg);
            })
            .catch(err => {
                console.err(err);
                toast.error(err.response.data.msg);
            })
    }

    return (
        <AppBar position="sticky" color='common'>
            <Toaster />
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
                    <ProfileButton to={`/user/${member.username}`}>
                        <figure className='relative mr-2' style={{ height: '33px', width: '33px' }}>
                            <AppBarAvatar src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200' />
                        </figure>
                        <Typography className='font-bold' color='primary.dark'> { member?.firstName } </Typography>
                    </ProfileButton>
                    <IconButton
                        color='primary'
                        sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5', mx: .5 }}
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
                                to={`/user/${member.username}`}
                                onClick={() => setDropdownAnchor(null)}
                                sx={{ bgcolor: 'primary.light' }}
                            >
                                <Chip
                                    avatar={<Avatar src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200' />}
                                    label={`${member?.firstName} ${member?.lastName}`}
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
                                to={`/user/${member.username}?tab=friends`}
                                onClick={() => setDropdownAnchor(null)}
                            >
                                <ListItemIcon> <PeopleAltIcon /> </ListItemIcon>
                                <ListItemText primary='Your Friends' />
                            </ListItemButton>

                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon> <LogoutIcon /> </ListItemIcon>
                                <ListItemText primary='Logout' />
                            </ListItemButton>
                        </List>
                    </Menu>
                    <IconButton component={Link} to="/" color='primary' sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5', mx: .5 }}>
                        <HomeIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        color='primary'
                        sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5', mx: .5 }}
                    >
                        {isDarkMode ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
                    </IconButton>
                </Box>
            </AppBarContainer>
        </AppBar >
    )
}

export default Navbar