import { useState } from 'react';

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

const RegisterDialog = ({ isDialogOpen, setIsDialogOpen }) => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordConfirmShow, setIsPasswordConfirmShow] = useState(false);
    const [form, setForm] = useState({});

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFormSubmit = e => {
        console.log('rwar');
        e.preventDefault()
        console.log(form);
    }

    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth='xs'>
            <DialogTitle className='flex items-center justify-between' component='div'>
                <Typography variant='h5' className='font-bold'> Register </Typography>
                <IconButton onClick={() => setIsDialogOpen(false)}> <CloseIcon /> </IconButton>
            </DialogTitle>
            <Divider className='mx-4' />
            <DialogContent>
                <Grid onSubmit={handleFormSubmit} component='form' container spacing={2} className='py-4'>
                    <Grid item xs={12} md={6}>
                        <TextField onChange={handleFormChange} name='firstName' label='First Name' fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField onChange={handleFormChange} name='lastName' label='Last Name' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField onChange={handleFormChange} name='email' label='Email' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            onChange={handleFormChange}
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
                        <TextField onChange={handleFormChange} name='birthDate' label='Birth Date' fullWidth />
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
                <Button type='submit' variant='contained'> SUBMIT </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RegisterDialog