import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { PageWrapper, FormWrapper } from '../style/form.style';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [form, setForm] = useState({});

    const handleFormSubmit = e => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <PageWrapper>
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
        </PageWrapper>
    )
}

export default ForgetPassword;