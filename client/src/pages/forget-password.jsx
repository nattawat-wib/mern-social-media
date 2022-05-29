import { useState } from 'react';

import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';

const ForgetPassword = () => {
    const [form, setForm] = useState({});

    const handleFormSubmit = e => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <PageWrapper>
            <Container maxWidth='sm'>
                <FormWrapper>
                    <form onSubmit={handleFormSubmit}>
                        <Typography variant='h5' className='font-bold'> Find Your Account </Typography>
                        <Divider className='my-4' />
                        <Typography variant='body1'> Please enter your email address you register to search for your account. </Typography>

                        <TextField
                            onChange={e => setForm({ password: e.target.value })}
                            value={form.password || ""}
                            label='email address'
                            name='email'
                            variant='outlined'
                            fullWidth
                            autoFocus
                            sx={{ mt: 2 }}
                        />

                        <Divider className='my-6' />

                        <div className='flex justify-end items-center mt-4'>
                            <Button
                                component={Link}
                                to='/login'
                                variant='outlined'
                                color='secondary'
                                className='ml-4'
                            >
                                BACK TO LOGIN
                            </Button>
                            <Button
                                type='submit'
                                variant='contained'
                                className='ml-4'
                            >
                                SUBMIT
                            </Button>
                        </div>
                    </form>
                </FormWrapper>
            </Container>
        </PageWrapper>
    )
}

export default ForgetPassword;

const PageWrapper = styled.div`
    height: calc(100vh - 3rem);
    padding: 1.5rem;
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const FormWrapper = styled(Paper)`
    border-radius: 7px;
    padding: 1rem;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1)
`