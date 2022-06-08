import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';

import { Link } from 'react-router-dom';
import { StyledLeftColumnWrapper } from './../../style/index.style';
import { useAuth } from '../../context/auth-context';
import { useState, useEffect } from 'react';
import axios from './../../utils/axios';
import { PageLoader } from '../../components/loader'

const LeftColumn = () => {
    const { member } = useAuth();
    const [unfollowMember, setUnfollowMember] = useState([]);
    const [ isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get('/member/unfollow')
            .then(resp => {
                setUnfollowMember(resp.data.data.unfollowMember);
                setIsLoading(false)
            })
            .catch(err => console.log)
    }, [])

    return (
        <StyledLeftColumnWrapper dense={true}>
            <PageLoader loading={isLoading.toString()} />
            <ListItemButton
                component={Link}
                to={`/user/${member.username}`}
            >
                <ListItemIcon>
                    <Avatar src={member.avatar ? `${import.meta.env.VITE_SERVER_API}/${member.avatar}` : 'https://via.placeholder.com/500'} />
                </ListItemIcon>
                <Typography
                    variant='h6'
                    className='font-bold'
                    color='primary.dark'
                >
                    {member.firstName} {member.lastName}
                </Typography>
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/${member.username}`}>
                <ListItemIcon> <AssignmentIcon /> </ListItemIcon>
                <ListItemText primary='Your Post' />
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/${member.username}?tab=follower`}>
                <ListItemIcon> <PeopleAltIcon /> </ListItemIcon>
                <ListItemText primary='Your Follower' />
            </ListItemButton>
            <ListItemButton disabled={true}>
                <ListItemIcon> <GroupsIcon /> </ListItemIcon>
                <ListItemText primary='Your Group' />
            </ListItemButton>
            <Divider className='m-4' />
            <Typography align='center' variant='h6' color='primary' className='font-bold mb-2'> People You May Know </Typography>
            {
                unfollowMember.map(member => {
                    return (
                        <ListItemButton key={member._id} component={Link} to={`/user/${member.username}`} className='flex justify-between items-center'>
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

export default LeftColumn;