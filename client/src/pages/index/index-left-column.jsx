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
    const [allMember, setAllMember] = useState([]);
    const [ isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get('/member')
            .then(resp => {
                // console.log(resp.data.data.allMember);
                setAllMember(resp.data.data.allMember);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <StyledLeftColumnWrapper dense={true}>
            <PageLoader loading={isLoading.toString()} />
            <ListItemButton
                component={Link}
                to={`/user/${member.username}`}
            >
                <ListItemIcon>
                    <Avatar src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200' />
                </ListItemIcon>
                <Typography
                    variant='h6'
                    className='font-bold'
                    color='primary.dark'
                >
                    {member?.firstName} {member?.lastName}
                </Typography>
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/${member.username}`}>
                <ListItemIcon> <AssignmentIcon /> </ListItemIcon>
                <ListItemText primary='Your Post' />
            </ListItemButton>
            <ListItemButton component={Link} to={`/user/${member.username}?tab=friends`}>
                <ListItemIcon> <PeopleAltIcon /> </ListItemIcon>
                <ListItemText primary='Your Friends' />
            </ListItemButton>
            <ListItemButton disabled={true}>
                <ListItemIcon> <GroupsIcon /> </ListItemIcon>
                <ListItemText primary='Your Group' />
            </ListItemButton>
            <Divider className='m-4' />
            <Typography align='center' variant='h6' color='primary' className='font-bold mb-2'> People You May Know </Typography>
            {
                allMember.map((member, i) => {
                    return (
                        <ListItemButton key={i} component={Link} to={`/user/${member.username}`}>
                            <ListItemIcon>
                                <Avatar src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200' />
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