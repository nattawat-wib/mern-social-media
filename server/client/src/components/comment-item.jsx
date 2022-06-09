import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledCommentInput } from '../style/index.style';
import { useThemeContext } from '../context/theme-context';
import axios from '../utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/auth-context';
import { useToggleContext } from '../context/toggle-context';

export const CommentInput = ({ postId }) => {
    const { member } = useAuth();
    const { setRerender } = useToggleContext();
    const [form, setContent] = useState({
        content: '',
        postId,
    });

    const handleFormSubmit = e => {
        e.preventDefault();
        axios.post(`/comment/`, form)
            .then(resp => {
                setContent(prev => ({ ...prev, content: '' }));
                toast.success(resp.data.msg);
                setRerender(Date.now())
            })
            .catch(err => toast.error(err.response.data.msg))
    }

    return (
        <Box className='pt-4 flex items-center'>
            <Toaster />
            <Avatar src={`${import.meta.env.VITE_SERVER_API}/${member.avatar}`} />

            <form onSubmit={handleFormSubmit} className='ml-2 w-[calc(100%-50px)]'>
                <StyledCommentInput
                    onChange={e => setContent(prev => ({ ...prev, content: e.target.value }))}
                    value={form.content || ''}
                    size='small'
                    placeholder='Write a public comment'
                />
            </form>
        </Box>
    )
}

export const CommentItem = ({ comment }) => {
    const { member } = useAuth();
    const { isDarkMode } = useThemeContext();

    return (
        <>
            <Box className='pt-2 flex items-start'>
                <Avatar
                    component={Link}
                    to={`/user/${comment.author.username}`}
                    src={`${import.meta.env.VITE_SERVER_API}/${comment.author.avatar}`}
                />
                <Box sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5' }} className='rounded-2xl w-full ml-2 py-1 px-4'>
                    <Typography
                        component={Link}
                        to={`/user/${comment.author.username}`}
                        className='font-bold'
                        color='primary.dark'
                    >
                        {comment.author.firstName} {comment.author.lastName}
                    </Typography>
                    <Typography> {comment.content} </Typography>
                </Box>
            </Box>
            <Typography components='body2' className='mt-1 ml-12 text-xs' color='gray'> { comment.createdAtDateTime } </Typography>
        </>

    )
}