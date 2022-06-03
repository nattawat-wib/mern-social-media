import Dialog from "@mui/material/Dialog";
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme-context';
import { useAuth } from './../context/auth-context';
import axios from './../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const EditProfileDialog = ({ isEditProfileDialogOpen, setIsEditProfileDialogOpen }) => {
    const { isDarkMode } = useContext(ThemeContext)
    const { member, authDispatch } = useAuth();
    const [form, setForm] = useState(member);
    const [formImage, setFromImage] = useState({
        avatar: member.avatar,
        cover: member.cover
    });

    const handleFormChange = e => {
        const value = e.target.files ? e.target.files[0] : e.target.value
        setForm(prev => ({ ...prev, [e.target.name]: value }))

        if (e.target.type === 'file') {
            delete formImage[e.target.name]
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault();

        form.birthDate = form.birthDate.split('-').reverse().join('/');
        console.log("form", form);

        const fromData = new FormData();
        for (const key in form) {
            fromData.append(key, form[key])
        }

        axios.patch('/member/update-me', fromData)
            .then(resp => {
                setIsEditProfileDialogOpen(false);
                authDispatch({ type: 'update auth', payload: resp });
                toast.success(resp.data.msg);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.response.data.msg);
            })
    }

    return (
        <Dialog
            open={isEditProfileDialogOpen}
            onClose={() => setIsEditProfileDialogOpen(false)}
            onSubmit={handleFormSubmit}
            component='form'
            maxWidth="md"
            sx={{ "& .MuiPaper-root": { width: "100%" } }}
        >
            <Toaster />
            <DialogTitle className="flex items-center justify-between">
                <Typography> Edit Your Profile </Typography>
                <IconButton sx={{ bgcolor: isDarkMode ? '#121212' : '#f0f2f5' }} onClick={() => setIsEditProfileDialogOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider className="mx-4" />
            <DialogContent>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={4}>
                        <Avatar
                            sx={{ width: '160px', height: '160px', m: 'auto' }}
                            src={
                                formImage.avatar ?
                                    `${import.meta.env.VITE_SERVER_API}/${formImage.avatar}`
                                    :
                                    form.avatar ?
                                        URL.createObjectURL(form.avatar)
                                        :
                                        'https://via.placeholder.com/500'
                            }
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <figure className='relative pt-[30%]'>
                            <img
                                className='fit-img rounded-lg'
                                src={
                                    formImage.cover ?
                                        `${import.meta.env.VITE_SERVER_API}/${formImage.cover}`
                                        :
                                        form.cover ?
                                            URL.createObjectURL(form.cover)
                                            :
                                            'http://via.placeholder.com/500'
                                }
                            />
                        </figure>
                    </Grid>
                    <Grid item xs={4}>
                        <Box textAlign='center'>
                            <Button
                                component='label'
                                variant='outlined'
                                startIcon={<FileUploadIcon />}
                            >
                                Profile
                                <input
                                    onChange={handleFormChange}
                                    name='avatar'
                                    hidden
                                    type='file'
                                    accept="image/*"
                                />
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box textAlign='center'>
                            <Button
                                component='label'
                                variant='outlined'
                                startIcon={<FileUploadIcon />}
                            >
                                Cover
                                <input
                                    onChange={handleFormChange}
                                    name='cover'
                                    hidden
                                    type='file'
                                    accept="image/*"
                                />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={6}>
                        <TextField
                            value={form.firstName}
                            onChange={handleFormChange}
                            name='firstName'
                            variant='outlined'
                            label='first name'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={form.lastName}
                            onChange={handleFormChange}
                            name='lastName'
                            variant='outlined'
                            label='last name'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={form.aboutMe || ''}
                            onChange={handleFormChange}
                            name='aboutMe'
                            variant='outlined'
                            label='About Me'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={form.gender}
                            onChange={handleFormChange}
                            name='gender'
                            select
                            variant='outlined'
                            label='Gender'
                            size='small'
                            fullWidth
                        >
                            <MenuItem value='male'> Male </MenuItem>
                            <MenuItem value='female'> Female </MenuItem>
                            <MenuItem value='other'> Other </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={form?.birthDate?.split('/').reverse().join('-')}
                            onChange={handleFormChange}
                            name='birthDate'
                            type='date'
                            variant='outlined'
                            label='Birth Date'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={form.address || ''}
                            onChange={handleFormChange}
                            name='address'
                            variant='outlined'
                            label='Address'
                            size='small'
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider className="mx-4" />

            <DialogActions className='p-4'>
                <Box textAlign='center'>
                    <Button variant='contained' type="submit" startIcon={<SaveIcon />}> SAVE </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default EditProfileDialog;