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

import { useState, useEffect } from 'react';
import { StyledTextareaAutosize } from '../style/index.style';
import { useToggleContext } from '../context/toggle-context';
import { useThemeContext } from '../context/theme-context';
import { useAuth } from '../context/auth-context';
import axios from './../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const EditPostDialog = ({ post, open, setOpen }) => {
    const { isDarkMode } = useThemeContext();
    const { setRerender } = useToggleContext();
    const { member } = useAuth();
    const [form, setForm] = useState(post);
    const [tempImage, setTempImage] = useState(form.image);

    useEffect(() => setForm(post), [open])

    const handleFormChange = e => {
        const value = e.target.files ? e.target.files[0] : e.target.value;

        setForm(prev => ({
            ...prev, [e.target.name]: value
        }));

        if(e.target.type === 'file') setTempImage(null)
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log("form", form);
        const formData = new FormData();
        for (const key in form) formData.append(key, form[key]);

        console.log(form);

        axios.patch(`/post/${post._id}`, formData)
            .then(resp => {
                setOpen(false);
                toast.success(resp.data.msg);
                setRerender(Date.now());
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
            open={open}
            onClose={() => setOpen(false)}
            maxWidth='sm'
            sx={{ "& .MuiPaper-root": { width: "100%" } }}
        >
            <Toaster />
            <DialogTitle className='flex justify-between items-center p-4'>
                <Typography variant='span'> Edit Post </Typography>
                <IconButton
                    size='small'
                    sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5', mx: .5 }}
                    // onClick={() => setIsEditPostDialogOpen(false)}
                    onClick={() => setOpen(false)}
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
                        <input onChange={handleFormChange} name='image' hidden type='file' accept='image/*' />
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
                        {/* <img src={URL.createObjectURL(form.image)} className='fit-img rounded-lg' /> */}
                        <img
                            src={
                                tempImage ?
                                `${import.meta.env.VITE_SERVER_API}/${form.image}`
                                :
                                form.image ?
                                    URL.createObjectURL(form.image)
                                    :
                                    'https://via.pladceholder.com/500'
                            }
                            className='fit-img rounded-lg'
                        />
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
                    Edit Post
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default EditPostDialog