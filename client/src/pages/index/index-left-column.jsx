import { ListItemButton, ListItemText, ListItemIcon, Typography, Divider, Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';

import { Link } from 'react-router-dom';
import { StyledLeftColumnWrapper } from './../../style/index.style';
import { useAuth } from '../../context/auth-context';

const LeftColumn = () => {
    const { member } = useAuth();

    return (
        <StyledLeftColumnWrapper dense={true}>
            <ListItemButton
                component={Link}
                to='/user/username'
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
            <ListItemButton  component={Link} to='/user/username'>
                <ListItemIcon> <AssignmentIcon /> </ListItemIcon>
                <ListItemText primary='Your Post' />
            </ListItemButton>
            <ListItemButton component={Link} to='/user/username?tab=friends'>
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
                [1, 2, 3, 4].map((member, i) => {
                    return (
                        <ListItemButton key={i} component={Link} to='/user/username'>
                            <ListItemIcon>
                                <Avatar src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200' />
                            </ListItemIcon>
                            <ListItemText primary='John China' />
                        </ListItemButton>
                    )
                })
            }
        </StyledLeftColumnWrapper>
    )
}

export default LeftColumn;