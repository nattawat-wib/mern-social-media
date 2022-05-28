import { useState } from 'react';
import { Link } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styled from 'styled-components';
import theme from './../style/theme';


const Login = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    return (
        <LoginPageWrapper>
            <Container>
                <Grid container spacing={4} alignItems='center' justifyContent='space-between'>
                    <Grid item xs={12} md={6} lg={5} >
                        <Typography component="h2" color='primary' className='text-5xl font-bold mb-4'> Friend Ster :) </Typography>
                        <Typography className='text-2xl'> Friend Ster helps you connect and share with the people in your life. </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}  className='text-center'>
                        <LoginFormWrapper>
                            <form>
                                <TextField autoFocus className='mb-4' label="Email" variant='outlined' fullWidth />
                                <TextField
                                    type={isPasswordShow ? "text" : "password"}
                                    className='mb-4'
                                    label="Password"
                                    variant='outlined'
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setIsPasswordShow(prev => prev ? false : true)}>
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
                                <Button className='mb-4' variant='contained' color='primary' size='large' fullWidth> LOGIN </Button>
                            </form>

                            <Button variant='text' component={Link} to="/"> Forget Password ? </Button>
                            <Divider className='my-8' />

                            <Button variant='contained' color='secondary'> REGISTER </Button>

                        </LoginFormWrapper>
                    </Grid>
                </Grid>
            </Container>
        </LoginPageWrapper>
    )
}

export default Login;

const LoginPageWrapper = styled.main`
    height: calc(100vh - 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #f0f2f5;
`

const LoginFormWrapper = styled(Paper)`
    padding: 2rem;
    border-radius: .7rem;
    box-shadow: 0 5px 24px rgba(0, 0, 0, .15)
`