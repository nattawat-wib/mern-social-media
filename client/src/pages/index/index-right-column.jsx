import { ListItemButton, ListItemText, ListItemIcon, Typography, Divider, Avatar, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { StyledLeftColumnWrapper } from './../../style/index.style';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { Link } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';

const RightColumn = () => {
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
                <Typography color='gray'> Birthdays </Typography>

                {/* friends's birthday list */}
                <Typography color='gray' className='ml-4 mt-1'>
                    <CakeIcon />
                    <Link to="/user/username" className='font-bold'> nutella </Link>
                    have a birthday to day
                </Typography>
                <Typography color='gray' className='ml-4 mt-1'>
                    <CakeIcon />
                    <Link to="/user/username" className='font-bold'> nutella </Link>
                    have a birthday to day
                </Typography>
            </Box>
            <Divider className='m-4' />
            <Typography align='center' variant='h6' color='primary' className='font-bold mb-2'> Contacts </Typography>
            {
                [1, 2, 3, 4].map((member, i) => {
                    return (
                        <ListItemButton key={i} component={Link} to="/user/username">
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

export default RightColumn;