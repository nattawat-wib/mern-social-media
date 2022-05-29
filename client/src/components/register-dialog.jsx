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

import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const RegisterDialog = ({ isDialogOpen, setIsDialogOpen }) => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordConfirmShow, setIsPasswordConfirmShow] = useState(false);

    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth='xs'>
            <DialogTitle className='flex items-center justify-between' component='div'>
                <Typography variant='h5'> Register </Typography>
                <IconButton onClick={() => setIsDialogOpen(false)}> <CloseIcon /> </IconButton>
            </DialogTitle>
            <Divider className='mx-4' />
            <DialogContent>
                <Grid component='form' container spacing={2} className='py-4'>
                    <Grid item xs={12} md={6}>
                        <TextField label='First Name' fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField label='Last Name' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Email' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Birth Date' fullWidth />
                    </Grid>                    
                    <Grid item xs={12}>
                        <TextField
                            label='Password'
                            type={isPasswordShow ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setIsPasswordShow(prev => prev ? false : true)} color='primary'>
                                            {isPasswordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Password Confirm'
                            type={isPasswordConfirmShow ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setIsPasswordConfirmShow(prev => prev ? false : true)} color='primary'>
                                            {isPasswordConfirmShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
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