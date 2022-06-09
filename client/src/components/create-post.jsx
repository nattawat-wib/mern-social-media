import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { useState } from 'react';
import { StyledCreatePostCard, CreatePostModalToggle, StyledTextareaAutosize } from '../style/index.style';
import { useToggleContext } from '../context/toggle-context';
import { useThemeContext } from '../context/theme-context';
import { useAuth } from '../context/auth-context';
import axios from './../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

export const CreatePostCard = () => {
    const { setIsCreatePostDialogOpen } = useToggleContext();
    const { member } = useAuth();

    return (
        <StyledCreatePostCard>
            <Box className='flex items-center'>
                <figure className='relative rounded-full overflow-hidden mr-3' style={{ height: "40px", width: "40px" }}>
                    <img
                        className='fit-img'
                        src={member.avatar ? `${import.meta.env.VITE_SERVER_API}/${member.avatar}` : 'https://via.placeholder.com/500'}
                    />
                </figure>
                <CreatePostModalToggle
                    onClick={() => setIsCreatePostDialogOpen(true)}
                >
                    What do you thing ? {member?.firstName}
                </CreatePostModalToggle>
            </Box>
            <Divider className='my-4' />
            <Box className='flex items-center justify-between'>
                <Box>
                    <Button
                        onClick={() => setIsCreatePostDialogOpen(true)}
                        variant='outlined'
                        size='small'
                        className='rounded-full'
                        startIcon={<EmojiEmotionsIcon />}
                    >
                        Feeling / Activity
                    </Button>
                    <Button
                        onClick={() => setIsCreatePostDialogOpen(true)}
                        variant='outlined'
                        size='small'
                        className='rounded-full
                    ml-2'
                        startIcon={<AddPhotoAlternateIcon />}
                    >
                        Add Photo
                    </Button>
                </Box>
                <Button
                    onClick={() => setIsCreatePostDialogOpen(true)}
                    variant='contained'
                    size='small'
                    className='rounded-full'
                    startIcon={<AddIcon />}
                >
                    CREATE POST
                </Button>
            </Box>
        </StyledCreatePostCard>
    )
}

export const CreatePostDialog = () => {
    const { isCreatePostDialogOpen, setIsCreatePostDialogOpen, setRerender } = useToggleContext();
    const { isDarkMode } = useThemeContext();
    const { member } = useAuth();
    const [form, setForm] = useState({});

    const handleFormChange = e => {
        const value = e.target.files ? e.target.files[0] : e.target.value;

        setForm(prev => ({
            ...prev, [e.target.name]: value
        }));
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in form) formData.append(key, form[key]);

        axios.post('/post', formData)
            .then(resp => {
                console.log(resp);
                setIsCreatePostDialogOpen(false);
                toast.success(resp.data.msg);
                setRerender(Date.now())
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.msg)
            })
    }

    return (
        <Dialog
            component='form'
            onSubmit={handleFormSubmit}
            onClose={() => setIsCreatePostDialogOpen(false)}
            open={isCreatePostDialogOpen}
            maxWidth='sm'
            sx={{ "& .MuiPaper-root": { width: "100%" } }}
        >
            <Toaster />
            <DialogTitle className='flex justify-between items-center p-4'>
                <Typography variant='span'> Create Post </Typography>
                <IconButton
                    size='small'
                    sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5', mx: .5 }}
                    onClick={() => setIsCreatePostDialogOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider className='mx-4' />
            <DialogContent className='p-4'>
                <div className='flex items-center'>
                    <>
                        <Avatar
                            sx={{ mr: 1 }}
                            src={member.avatar ? `${import.meta.env.VITE_SERVER_API}/${member.avatar}` : 'https://via.placeholder.com/500'}
                        />
                    </>
                    <Typography color='primary.dark' className='font-bold'>
                        {member?.firstName} {member?.lastName}
                    </Typography>
                    <IconButton
                        component='label'
                        className='ml-auto'
                        name='image'
                        sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5' }}
                    >
                        <AddPhotoAlternateIcon color='primary' />
                        <input
                            onChange={handleFormChange}
                            name='image'
                            hidden
                            type='file'
                            accept='image/*'
                        />
                    </IconButton>
                </div>
                <StyledTextareaAutosize
                    onChange={handleFormChange}
                    value={form.content}
                    name='content'
                    minRows={5}
                    maxRows={10}
                    className='mt-4'
                    placeholder={`What's on your mind, ${member?.firstName} ?`}
                />
                {
                    form.image &&
                    <figure className='relative pt-[50%]'>
                        <IconButton
                            onClick={() => setForm(prev => ({ ...prev, image: null }))}
                            className='top-1 right-1 absolute z-10'
                            sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5' }}
                        >
                            <CloseIcon color='primary' />
                        </IconButton>
                        <img src={URL.createObjectURL(form.image)} className='fit-img rounded-lg' />
                    </figure>
                }
            </DialogContent>
            <Divider className='mx-4' />
            <DialogActions className='p-4'>
                <Button
                    fullWidth
                    variant='contained'
                    type='submit'
                >
                    Post
                </Button>
            </DialogActions>
        </Dialog >
    )
}
