import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../context/auth-context';
import { useToggleContext } from '../context/toggle-context';
import { StyledPostItem } from '../style/index.style';
import EditPostDialog from './edit-post-dialog';
import { CommentInput, CommentItem } from './comment-item';
import axios from './../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const PostItem = ({ post }) => {
    const [isCommentSectionShow, setIsCommentSectionShow] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const { member } = useAuth();
    const [postMenuAnchor, setPostMenuAnchor] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const isLike = post.memberWhoLike.find(({ username }) => username === member.username);
    console.log(post);

    const handleDeletePost = () => {
        axios.delete(`/post/${post._id}`)
            .then(resp => {
                toast.success(resp.data.msg);
                location.reload()
            })
            .catch(err => toast.error(err.response.data.msg))
    };

    const handleLikePost = () => {
        axios.patch(`/post/${post._id}/like/${member.username}`)
            .then(resp => {
                toast.success(resp.data.msg);
                location.reload()
            })
            .catch(err => toast.error(err.response.data.msg))
    }

    return (
        <StyledPostItem>
            <header className='flex items-center'>
                <Link to={`/user/${post.author.username}`} className='relative mr-3' style={{ width: "50px", height: "50px" }}>
                    <img
                        className='rounded-full fit-img'
                        src={post.author.avatar ? `${import.meta.env.VITE_SERVER_API}/${post.author.avatar}` : 'https://via.placeholder.com/500'}
                    />
                </Link>
                <div>
                    <Typography
                        variant='inline'
                        component={Link}
                        to={`/user/${post.author.username}`}
                        color='primary.dark'
                        className='block font-bold'
                    >
                        {post.author.firstName} {post.author.lastName}
                    </Typography>
                    <Box className='flex items-center'>
                        <AccessTimeFilledIcon color='primary' className='text-sm' />
                        <Typography variant='inline' className=' text-xs'>
                            11/12/2022 13:12
                        </Typography>
                    </Box>
                </div>
                {
                    post.author.username === member.username &&
                    <>
                        <IconButton
                            onClick={e => setPostMenuAnchor(e.target)}
                            sx={{ ml: 'auto', alignSelf: 'start' }}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            open={!!postMenuAnchor}
                            anchorEl={postMenuAnchor}
                            onClose={() => setPostMenuAnchor(null)}
                        >
                            <MenuItem
                                onClick={() => {
                                    setPostMenuAnchor(null);
                                    setIsEditDialogOpen(true);
                                }}
                                dense={true}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setPostMenuAnchor(null);
                                    handleDeletePost();
                                }}
                                dense={true}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                        <EditPostDialog
                            post={post}
                            open={isEditDialogOpen}
                            setOpen={setIsEditDialogOpen}
                        />
                    </>
                }
            </header>
            <section className='my-4'>
                {post.content}
                {
                    post.image &&
                    <img
                        className='w-full rounded-md mt-3'
                        src={`${import.meta.env.VITE_SERVER_API}/${post.image}`}
                    />
                }

            </section>
            <Divider />
            <footer>
                <Grid container className='my-2'>
                    <Grid item xs={4}>
                        <Button
                            onClick={handleLikePost}
                            size='small'
                            className='flex items-center'
                            fullWidth
                        >
                            {isLike ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                            <Typography className='font-bold ml-2' >
                                {isLike ? 'liked' : 'like'}
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            onClick={() => setIsCommentSectionShow(prev => !prev)}
                            size='small'
                            className='flex items-center'
                            fullWidth
                        >
                            <ModeCommentOutlinedIcon />
                            <Typography className='font-bold ml-2' > Comment </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button size='small' className='flex items-center' fullWidth >
                            <ReplyIcon />
                            <Typography className='font-bold ml-2' > Share </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </footer>
            <Divider />

            {/* //* comment  */}
            {
                isCommentSectionShow &&
                <Box>
                    <CommentInput />
                    {
                        // commentList &&
                        [1, 2, 3].map((comment, i) => <CommentItem key={i} />)

                    }

                </Box>
            }
        </StyledPostItem>
    )
}

export default PostItem