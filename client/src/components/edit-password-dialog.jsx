import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import axios from './../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const EditPasswordDialog = ({ isEditPasswordDialogOpen, setIsEditPasswordDialogOpen }) => {
    const [form, setForm] = useState({});
    const [isPasswordHidden, setIsPasswordHidden] = useState({
        oldPassword: true,
        newPassword: true,
        newPasswordConfirm: true
    })

    const endInputIcon = controlFor => {
        return ({
            endAdornment: (
                <InputAdornment position='end'>
                    <IconButton onClick={() => {
                        setIsPasswordHidden(prev => ({ ...prev, [controlFor]: !prev[controlFor] }))
                    }}>
                        {
                            isPasswordHidden[controlFor] ?
                                <VisibilityOffIcon color='primary' />
                                :
                                <VisibilityIcon color='primary' />
                        }
                    </IconButton>
                </InputAdornment>
            )
        })
    }

    const handleFormChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = async e => {
        e.preventDefault()

        await axios.patch('/member/edit-password', form)
            .then(resp => {
                setForm({});
                setIsEditPasswordDialogOpen(false)
                toast.success(resp.data.msg);
                toast.loading('loging out your account');

                setTimeout(() => { location.reload() }, 2000)
            })
            .catch(err => toast.error(err.response.data.msg))
    }

    return (
        <Dialog
            component='form'
            onSubmit={handleFormSubmit}
            open={isEditPasswordDialogOpen}
            onClose={() => setIsEditPasswordDialogOpen(false)}
        >
            <Toaster />
            <DialogTitle className='flex justify-between items-center'>
                Edit Password
                <IconButton onClick={() => setIsEditPasswordDialogOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 5 }}>
                <TextField
                    onChange={handleFormChange}
                    value={form.oldPassword || ''}
                    variant='outlined'
                    size='small'
                    name='oldPassword'
                    label='old password'
                    type={isPasswordHidden.oldPassword ? 'password' : 'text'}
                    fullWidth
                    sx={{ my: 1 }}
                    InputProps={endInputIcon('oldPassword')}
                />
                <TextField
                    onChange={handleFormChange}
                    value={form.newPassword || ''}
                    variant='outlined'
                    size='small'
                    name='newPassword'
                    label='new password'
                    type={isPasswordHidden.newPassword ? 'password' : 'text'}
                    fullWidth
                    sx={{ my: 1 }}
                    InputProps={endInputIcon('newPassword')}
                />
                <TextField
                    onChange={handleFormChange}
                    value={form.newPasswordConfirm || ''}
                    variant='outlined'
                    size='small'
                    name='newPasswordConfirm'
                    label='new password confirm'
                    type={isPasswordHidden.newPasswordConfirm ? 'password' : 'text'}
                    fullWidth
                    sx={{ mt: 1 }}
                    InputProps={endInputIcon('newPasswordConfirm')}
                />
                <small> * after password changed successfully you will be logout </small>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' size='small' type='submit'> SUBMIT </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditPasswordDialog