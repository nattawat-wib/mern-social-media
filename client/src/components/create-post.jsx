import { useState, useContext } from 'react';

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

import { StyledCreatePostCard, CreatePostModalToggle, StyledTextareaAutosize } from '../style/index.style';
import { CreatePostContext } from '../context/create-post-context';

export const CreatePostCard = () => {
    const { setIsCreatePostDialogOpen } = useContext(CreatePostContext)

    return (
        <StyledCreatePostCard>
            <Box className='flex items-center'>
                <figure className='relative rounded-full overflow-hidden mr-3' style={{ height: "40px", width: "40px" }}>
                    <img
                        className='fit-img'
                        src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                    />
                </figure>
                <CreatePostModalToggle
                    onClick={() => setIsCreatePostDialogOpen(true)}
                >
                    What do you thing ? nutella
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
    const { isCreatePostDialogOpen, setIsCreatePostDialogOpen } = useContext(CreatePostContext)

    return (
        <Dialog
            onClose={() => setIsCreatePostDialogOpen(false)}
            open={isCreatePostDialogOpen}
            maxWidth='sm'
            sx={{ "& .MuiPaper-root": { width: "100%" } }}
        >
            <DialogTitle className='flex justify-between items-center p-4'>
                <Typography variant='span'> Create Post </Typography>
                <IconButton
                    size='small'
                    sx={{ bgcolor: "#f0f2f5", mx: .5 }}
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
                            src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                        />
                    </>
                    <Typography color='primary.dark' className='font-bold'>
                        nutella tester
                    </Typography>
                    <IconButton className='ml-auto' sx={{bgcolor: '#f0f2f5'}}>
                        <AddPhotoAlternateIcon color='primary' />
                    </IconButton>
                </div>
                <StyledTextareaAutosize
                    minRows={5}
                    maxRows={10}
                    className='mt-4'
                    placeholder="What's on your mind, nutella ?"
                />
            </DialogContent>
            <Divider className='mx-4' />
            <DialogActions className='p-4'>
                <Button
                    fullWidth
                    variant='contained'
                >
                    Post
                </Button>
            </DialogActions>
        </Dialog>
    )
}
