import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { StyledPostItem } from '../style/index.style';
import EditPostDialog from './edit-post-dialog';
import { CommentInput, CommentItem } from './comment-item';
import axios from '../utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { useToggleContext } from '../context/toggle-context';

const PostItem = ({ post }) => {
    const [isCommentSectionShow, setIsCommentSectionShow] = useState(false);
    const { member } = useAuth();
    const [postMenuAnchor, setPostMenuAnchor] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { setRerender } = useToggleContext();

    const isLike = post.memberWhoLike.find(({ username }) => username === member.username);

    const handleDeletePost = () => {
        axios.delete(`/post/${post._id}`)
            .then(resp => {
                toast.success(resp.data.msg);
                setRerender(Date.now())
            })
            .catch(err => toast.error(err.response.data.msg))
    };

    const handleLikePost = () => {
        axios.patch(`/post/${post._id}/like/${member.username}`)
            .then(resp => {
                toast.success(resp.data.msg);
                setRerender(Date.now())
            })
            .catch(err => toast.error(err.response.data.msg))
    }

    return (
        <StyledPostItem>
            <Toaster />
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
                        <AccessTimeIcon color='primary' className='text-sm mr-1' />
                        <Typography variant='inline' className=' text-xs'>
                            { post.createdAtDateTime }
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
            <section className='mt-4'>
                {post.content}
                {
                    post.image &&
                    <img
                        className='w-full rounded-md mt-3'
                        src={`${import.meta.env.VITE_SERVER_API}/${post.image}`}
                    />
                }

            </section>

            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <ThumbUpIcon color='primary' sx={{ fontSize: '16px', mr: 1 }} />
                    <small> {post.memberWhoLike.length} </small>
                </div>
                <div className='flex items-center'>
                    <ModeCommentIcon color='primary' sx={{ fontSize: '16px', mr: 1 }} />
                    <small> {post.commentList.length} </small>
                </div>
            </div>

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
                        <Button disabled={true} size='small' className='flex items-center' fullWidth >
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
                    <CommentInput postId={post._id} />
                    {
                        !!post.commentList.length &&
                        post.commentList.map(comment => <CommentItem key={comment._id} comment={comment} />)
                    }

                </Box>
            }
        </StyledPostItem>
    )
}

export default PostItem