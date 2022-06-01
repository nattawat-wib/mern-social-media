import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../../context/auth-context';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RegisterDialog from '../../components/register-dialog';

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper, LoginFormWrapper } from '../../style/form.style';
import axios from './../../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({});
    const { auth, authDispatch } = useAuth();

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        if (Object.keys(form).length < 2) return toast.error('Please enter email and password');

        setIsLoading(true);

        await axios.post('/member/login', form)
            .then(resp => {                
                toast.loading('redirecting you to news feed');
                toast.success(resp.data.msg);
                setTimeout(() => {
                    authDispatch({ type: 'login', payload: resp })
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.response.data.msg);
            })
        setIsLoading(false)
    }

    return (
        <PageWrapper>
            <Toaster />
            <RegisterDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            <Container>
                <Grid container spacing={4} alignItems='center' justifyContent='space-between'>
                    <Grid item xs={12} md={6} lg={5} >
                        <Typography variant='h2' color='primary' className='font-bold'> fuckbook </Typography>
                        <Typography variant='h6' component='p'> Friend Ster helps you connect and share with the people in your life. </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={5} className='text-center'>
                        <LoginFormWrapper>
                            <form onSubmit={handleFormSubmit}>
                                <TextField
                                    onChange={handleFormChange}
                                    value={form.email || ''}
                                    name='email'
                                    autoFocus
                                    className='mb-4'
                                    label="Email"
                                    fullWidth
                                />
                                <TextField
                                    onChange={handleFormChange}
                                    value={form.password || ''}
                                    type={isPasswordShow ? "text" : "password"}
                                    name='password'
                                    className='mb-4'
                                    label="Password"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setIsPasswordShow(prev => !prev)}>
                                                    {isPasswordShow ?
                                                        <VisibilityIcon color='primary' />
                                                        :
                                                        <VisibilityOffIcon color='primary' />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Button
                                    disabled={isLoading}
                                    loading_btn={isLoading ? 'true' : 'false'}
                                    type='submit'
                                    className='mb-4'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    fullWidth
                                >
                                    LOGIN
                                </Button>
                            </form>

                            <Button variant='text' component={Link} to="/forget-password"> Forget Password ? </Button>
                            <Divider className='my-8' />

                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                variant='contained'
                                color='secondary'
                            >
                                REGISTER
                            </Button>

                        </LoginFormWrapper>
                    </Grid>
                </Grid>
            </Container>
        </PageWrapper>
    )
}

export default Login;