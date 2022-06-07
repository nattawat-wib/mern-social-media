import Container from '@mui/material/Container';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TransgenderIcon from '@mui/icons-material/Transgender';
import CakeIcon from '@mui/icons-material/Cake';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { useState, useContext, useEffect } from 'react';
import { CreatePostCard, CreatePostDialog } from "../../components/create-post";
import PostItem from '../../components/post-item';
import EditProfileDialog from '../../components/edit-profile-dialog';
import { Link, useSearchParams, useLocation, useParams } from 'react-router-dom';
import { useToggleContext } from '../../context/toggle-context';
import { useThemeContext } from '../../context/theme-context';
import { useAuth } from './../../context/auth-context';
import axios from './../../utils/axios';
import { PageLoader } from './../../components/loader';
import toast, { Toaster } from 'react-hot-toast';

const TabContent = ({ children, content, tabvalue }) => {
    return (
        <section hidden={tabvalue !== content}>
            <Container>
                {children}
            </Container>
        </section>
    )
}

const Profile = () => {
    const [searchPrams] = useSearchParams();
    const location = useLocation();
    const queryStrTab = searchPrams.get('tab');
    const { member } = useAuth();
    const { username } = useParams();

    const [profile, setProfile] = useState({});
    const [friendList, setFriendList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [tabValue, setTabValue] = useState('posts');
    const [friendStatus, setFriendStatus] = useState('unfriend');

    const { isEditProfileDialogOpen, setIsEditProfileDialogOpen } = useToggleContext();
    const { isDarkMode } = useThemeContext();

    useEffect(() => {
        setIsLoading(true);
        setTabValue(queryStrTab || 'posts');

        axios.get(`/member/${username}`)
            .then(resp => {
                setProfile(resp.data.data.member)
                setFriendStatus(resp.data.data.friendStatus);
            })
            .catch(console.error)

        axios.get(`/member/${username}/friend`)
            .then(resp => {
                setFriendList(resp.data.data.allMember)
            })
            .catch(console.error)

        axios.get(`member/${username}/post`)
            .then(resp => {
                setPostList(resp.data.data.post)
                setIsLoading(false)
            })
            .catch(console.error)

    }, [location]);

    const handleAddFriend = () => {
        console.log('add friend');
        axios.patch(`/member/request-friend/${profile.username}`)
            .then(resp => {
                toast.success(resp.data.msg);
                // setProfile(resp.data.data.member);
                setFriendStatus(resp.data.data.friendStatus);
            })
            .catch(err => toast.error(err.response.data.msg))
    }

    return (
        <main>
            <CreatePostDialog />
            <EditProfileDialog
                isEditProfileDialogOpen={isEditProfileDialogOpen}
                setIsEditProfileDialogOpen={setIsEditProfileDialogOpen}
            />
            <Toaster />
            <PageLoader loading={isLoading.toString()} />
            <header>
                <Container>
                    <figure className='relative pt-[30%]'>
                        <img className='fit-img rounded-b-lg' src={profile.cover ? `${import.meta.env.VITE_SERVER_API}/${profile.cover}` : 'https://via.placeholder.com/500'} />
                    </figure>
                    <div className='flex items-center'>
                        <Avatar
                            sx={{ width: '160px', height: '160px', border: '5px white solid', margin: '-60px 30px 0 40px' }}
                            src={profile.avatar ? `${import.meta.env.VITE_SERVER_API}/${profile.avatar}` : 'https://via.placeholder.com/500'}
                        />
                        <div className='mt-2'>
                            <Typography variant='h5' className='font-bold'> {profile?.firstName} {profile?.lastName} </Typography>
                            <Typography variant='inline' color='gray'> 141 friends </Typography>
                            <AvatarGroup
                                max={8}
                                sx={{ mt: 1, '& .MuiAvatar-circular': { width: '30px', height: '30px', fontSize: '12px' } }}
                                className='justify-end'
                            >
                                {
                                    friendList.map((friend, i) => {
                                        return (
                                            <Avatar
                                                key={i}
                                                sx={{ width: '30px', height: '30px' }}
                                                src={friend.avatar ? `${import.meta.env.VITE_SERVER_API}/${friend.avatar}` : 'https://via.placeholder.com/500'}
                                            />
                                        )
                                    })
                                }
                            </AvatarGroup>
                        </div>
                        <div className='ml-auto'>
                            {
                                profile?.username === member?.username ?
                                    <Button
                                        onClick={() => setIsEditProfileDialogOpen(true)}
                                        variant='contained'
                                        startIcon={<EditIcon />}
                                    >
                                        Edit Profile
                                    </Button>
                                    :
                                    friendStatus === 'unfriend' ?
                                        <Button onClick={handleAddFriend} variant='contained' startIcon={<AddIcon />} >
                                            Add Friend
                                        </Button>
                                        :
                                        friendStatus === 'requested' ?
                                            <Button variant='outlined' >
                                                Request sent
                                            </Button>
                                            :
                                            friendStatus === 'friend' ?
                                                <Button onClick={handleAddFriend} variant='contained' startIcon={<AddIcon />} >
                                                    Unfriend
                                                </Button>
                                                : ''
                            }
                        </div>
                    </div>
                    <Divider className='my-4' />
                    <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
                        <Tab label='Posts' value='posts' />
                        <Tab label='Friends' value='friends' />
                    </Tabs>
                </Container>
            </header>
            <Box sx={{ bgcolor: isDarkMode ? '#090909' : '#f0f2f5', mt: 4 }}>
                <TabContent content='posts' tabvalue={tabValue}>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Paper className='p-4'>
                                <Typography variant='h6' className='font-bold'> About Me </Typography>
                                <List dense={true}>
                                    <ListItem >
                                        <ListItemIcon > <AccountCircleIcon color='primary' /> </ListItemIcon>
                                        <ListItemText primary={profile?.aboutMe || '-'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon > <TransgenderIcon color='primary' /> </ListItemIcon>
                                        <ListItemText primary={profile?.gender} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon > <CakeIcon color='primary' /> </ListItemIcon>
                                        <ListItemText primary={profile?.birthDate?.split('-').reverse().join('/')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon > <BusinessIcon color='primary' /> </ListItemIcon>
                                        <ListItemText primary={profile?.address || '-'} />
                                    </ListItem>
                                </List>
                            </Paper>
                            <Paper className='sticky top-20 h-fit p-4 my-4'>
                                <header className='flex justify-between items-start mb-4'>
                                    <div>
                                        <Typography variant='h6' className='font-bold'> Friends </Typography>
                                        <Typography variant='inline' color='gray'> 141 friends </Typography>
                                    </div>
                                    <Button
                                        onClick={() => setTabValue('friends')}
                                        size='small'
                                    >
                                        See All Friends
                                    </Button>
                                </header>
                                <Grid container spacing={2}>
                                    {
                                        friendList.map((friend, i) => {
                                            return (
                                                <Grid item xs={4} key={i}>
                                                    <Link to={`/user/${friend.username}`}>
                                                        <figure className='relative pt-[100%]'>
                                                            <img
                                                                className='fit-img rounded-lg'
                                                                src={friend.avatar ? `${import.meta.env.VITE_SERVER_API}/${friend.avatar}` : 'https://via.placeholder.com/500'}
                                                            />
                                                        </figure>
                                                    </Link>
                                                    <Typography className='truncate' align='center'> {friend.firstName} {friend.lastName} </Typography>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={7} >
                            {
                                profile?.username === member?.username &&
                                <CreatePostCard />
                            }
                            {
                                postList.length ?
                                    postList.map(post => {
                                        return (<PostItem key={post._id} post={post} />)
                                    })
                                    :
                                    <Typography align='center'> This member have no post yet !!! </Typography>
                            }
                        </Grid>
                    </Grid>
                </TabContent>

                <TabContent content='friends' tabvalue={tabValue}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className='sticky top-20 h-fit p-4 my-4'>
                                <header className='flex justify-between items-start mb-4'>
                                    <div>
                                        <Typography variant='h6' className='font-bold'> Friends </Typography>
                                        <Typography variant='inline' color='gray'> 141 friends </Typography>
                                    </div>
                                </header>
                                <Grid container spacing={2}>
                                    {
                                        Array(9).fill(1).map((friend, i) => {
                                            return (
                                                <Grid item xs={2} key={i}>
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
                    </Grid>
                </TabContent>
            </Box>
        </main>
    )
}

export default Profile

