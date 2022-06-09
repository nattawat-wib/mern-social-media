import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CakeIcon from '@mui/icons-material/Cake';

import { StyledLeftColumnWrapper } from '../../style/index.style';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const RightColumn = () => {
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {

        axios.get('/member/follow')
            .then(resp => {
                setFollowingList(resp.data.data.member.followingList)
            })
            .catch(err => console.log)

    }, [])

    return (
        <StyledLeftColumnWrapper>
            <Box sx={{ m: 2, mt: 1 }}>
                <Typography color='gray'> Sponsored </Typography>
                <figure className='relative my-2 rounded-lg overflow-hidden' style={{ paddingTop: "100%" }}>
                    <img
                        className='fit-img'
                        src='https://cdn5.vectorstock.com/i/1000x1000/12/59/coffee-to-go-advertisement-composition-vector-20771259.jpg'
                    />
                </figure>
                <br />
                {/* <Typography color='gray'> Birthdays </Typography>
                <Typography color='gray' className='ml-4 mt-1'>
                    <CakeIcon />
                    <Link style={{ color: '#14C38E' }} to="/user/username" className='font-bold'> nutella </Link>
                    have a birthday to day
                </Typography>
                <Typography color='gray' className='ml-4 mt-1'>
                    <CakeIcon />
                    <Link style={{ color: '#14C38E' }} to="/user/username" className='font-bold'> nutella </Link>
                    have a birthday to day
                </Typography> */}
            </Box>
            <Divider className='m-4' />
            <Typography align='center' variant='h6' color='primary' className='font-bold mb-2'> Following </Typography>
            {
                followingList.map(member => {
                    return (
                        <ListItemButton key={member.username} component={Link} to={`/user/${member.username}`}>
                            <ListItemIcon>
                                <Avatar src={member.avatar ? `${import.meta.env.VITE_SERVER_API}/${member.avatar}` : 'https://via.placeholder.com/500'} />
                            </ListItemIcon>
                            <ListItemText primary={`${member.firstName} ${member.lastName}`} />
                        </ListItemButton>
                    )
                })
            }
        </StyledLeftColumnWrapper>
    )
}

export default RightColumn;