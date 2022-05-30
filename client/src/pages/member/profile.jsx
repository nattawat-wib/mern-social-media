import { useState } from 'react';

import Container from '@mui/material/Container';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AvatarGroup from '@mui/material/AvatarGroup';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { CreatePostCard, CreatePostDialog } from "../../components/create-post";
import PostItem from '../../components/post-item';
import EditProfileDialog from '../../components/edit-profile-dialog';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TransgenderIcon from '@mui/icons-material/Transgender';
import CakeIcon from '@mui/icons-material/Cake';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
    const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);

    return (
        <>
            <CreatePostDialog />
            <EditProfileDialog
                isEditProfileDialogOpen={isEditProfileDialogOpen}
                setIsEditProfileDialogOpen={setIsEditProfileDialogOpen}
            />
            <header>
                <Container>
                    <figure className='relative pt-[40%]'>
                        <img className='fit-img rounded-b-lg' src='http://wallup.net/wp-content/uploads/2017/03/29/486048-photography-animals-dog-landscape.jpg' />
                    </figure>
                    <div className='flex items-center'>
                        <Avatar
                            sx={{ width: '160px', height: '160px', border: '5px white solid', margin: '-60px 30px 0 40px' }}
                            src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                        />
                        <div className='mt-2'>
                            <Typography variant='h5' className='font-bold'> nutella tester </Typography>
                            <Typography variant='inline' color='gray'> 141 friends </Typography>
                            <AvatarGroup
                                max={8}
                                sx={{ mt: 1, '& .MuiAvatar-circular': { width: '30px', height: '30px', fontSize: '12px' } }}
                            >
                                {
                                    Array(10).fill(1).map((friend, i) => {
                                        return (
                                            <Avatar
                                                key={i}
                                                sx={{ width: '30px', height: '30px' }}
                                                src='http://wallup.net/wp-content/uploads/2017/03/29/486048-photography-animals-dog-landscape.jpg'
                                            />
                                        )
                                    })
                                }
                            </AvatarGroup>
                        </div>
                        <div className='ml-auto'>
                            <Button
                                onClick={() => setIsEditProfileDialogOpen(true)}
                                variant='contained'
                                startIcon={<EditIcon />}
                            > Edit Profile </Button>
                        </div>
                    </div>
                </Container>
            </header>
            <Box sx={{ bgcolor: '#f0f2f5', mt: 4 }}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Paper className='p-4'>
                                <Typography variant='h6' className='font-bold'> About Me </Typography>
                                <List dense={true}>
                                    <ListItem >
                                        <ListItemIcon > <AccountCircleIcon color='primary' /> </ListItemIcon>
                                        <ListItemText primary='this is me, work hard play hard eat hardest.' />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon > <TransgenderIcon color='primary' /> </ListItemIcon>
                                        <ListItemText primary='Male' />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon > <CakeIcon color='primary' /> </ListItemIcon>
                                        <ListItemText primary='11/12/2022' />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon > <BusinessIcon color='primary' /> </ListItemIcon>
                                        <ListItemText primary='Bangkok, Thailand' />
                                    </ListItem>
                                </List>
                            </Paper>
                            <Paper className='sticky top-20 h-fit p-4 mt-4'>
                                <header className='flex justify-between items-start mb-4'>
                                    <div>
                                        <Typography variant='h6' className='font-bold'> Friends </Typography>
                                        <Typography variant='inline' color='gray'> 141 friends </Typography>
                                    </div>
                                    <Button component={Link} to='/' size='small' > See All Friends </Button>
                                </header>
                                <Grid container spacing={2}>
                                    {
                                        Array(9).fill(1).map((friend, i) => {
                                            return (
                                                <Grid item xs={4} key={i}>
                                                    <figure className='relative pt-[100%]'>
                                                        <img
                                                            className='fit-img rounded-lg'
                                                            src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                                                        />
                                                    </figure>
                                                    <Typography align='center'> nutella tester </Typography>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={7} >
                            <CreatePostCard />
                            {
                                Array(5).fill(1).map((item, i) => {
                                    return (<PostItem key={i} />)
                                })
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Profile

