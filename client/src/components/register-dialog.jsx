import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useState, useRef, useId } from 'react';
import axios from './../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const RegisterDialog = ({ isDialogOpen, setIsDialogOpen }) => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordConfirmShow, setIsPasswordConfirmShow] = useState(false);
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const DatePickerRef = useRef(null);

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFormSubmit = async e => {
        e.preventDefault();

        if(Object.keys(form).length < 6) return toast.error('Please Enter All Input')
        
        const birthDate = form.birthDate.split('-');
        const formatDateForm = { 
            ...form, 
            birthDate: `${birthDate[2]}/${birthDate[1]}/${birthDate[0]}`
        }
        
        setIsLoading(true);
        await axios.post('/member/register', formatDateForm)
            .then(resp => {
                setIsDialogOpen(false)
                setForm({})
                DatePickerRef.current.querySelector('input').type = 'text'
                toast.success(resp.data.msg)
            })
            .catch(err => {
                toast.error(err.response.data.msg)
            })
        setIsLoading(false)
    }

    return (
        <Dialog
            component='form'
            onSubmit={handleFormSubmit}
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            maxWidth='xs'
        >
            <Toaster />
            <DialogTitle className='flex items-center justify-between' component='div'>
                <Typography variant='h5' className='font-bold'> Register </Typography>
                <IconButton onClick={() => setIsDialogOpen(false)}> <CloseIcon /> </IconButton>
            </DialogTitle>
            <Divider className='mx-4' />
            <DialogContent>
                <Grid container spacing={2} className='py-4'>
                    <Grid item xs={12} md={6}>
                        <TextField onChange={handleFormChange} value={form.firstName || ''} name='firstName' label='First Name' fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField onChange={handleFormChange} value={form.lastName || ''} name='lastName' label='Last Name' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField onChange={handleFormChange} value={form.email || ''} name='email' label='Email' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={handleFormChange}
                            value={form.password || ''}
                            name='password'
                            label='Password'
                            type={isPasswordShow ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setIsPasswordShow(prev => !prev)} color='primary'>
                                            {isPasswordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={handleFormChange}
                            value={form.passwordConfirm || ''}
                            name='passwordConfirm'
                            label='Password Confirm'
                            type={isPasswordConfirmShow ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setIsPasswordConfirmShow(prev => !prev)} color='primary'>
                                            {isPasswordConfirmShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onFocus={e => e.target.type = 'date'}
                            onBlur={e => { if (!e.target.value) e.target.type = 'text' }}
                            value={form.birthDate || ''}
                            onChange={handleFormChange}
                            name='birthDate'
                            label='Birth Date'
                            fullWidth
                            ref={DatePickerRef}
                        />
                        {/* <TextField onChange={handleFormChange} name='birthDate' label='Birth Date' fullWidth /> */}
                    </Grid>
                    <Grid item xs={12} className='flex items-center'>
                        <Typography sx={{ mr: 1 }} className='font-bold' > Gender : </Typography>
                        <RadioGroup
                            row
                            value={form.gender || "male"}
                            onChange={handleFormChange}
                            name='gender'
                        >
                            <FormControlLabel value="male" label="male" control={<Radio />} />
                            <FormControlLabel value="female" label="female" control={<Radio />} />
                            <FormControlLabel value="other" label="other" control={<Radio />} />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider className='mx-4' />
            <DialogActions className='py-4 flex justify-center'>
                <Button type='submit' variant='contained' disabled={isLoading}> SUBMIT </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RegisterDialog