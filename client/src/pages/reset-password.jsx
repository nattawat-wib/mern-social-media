import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { PageWrapper, FormWrapper } from '../style/form.style';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [form, setForm] = useState({});

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        console.log(form);
    }

    return (
        <PageWrapper>
            <FormWrapper>
                <form onSubmit={handleFormSubmit}>
                    <Typography variant='h5' className='font-bold'> Reset Password </Typography>
                    <Divider className='my-4' />
                    <Typography variant='body1'> Create Your Password Below. </Typography>

                    <TextField
                        onChange={handleFormChange}
                        value={form.password || ""}
                        label='password'
                        name='password'
                        variant='outlined'
                        fullWidth
                        autoFocus
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        onChange={handleFormChange}
                        value={form.passwordConfirm || ""}
                        label='password confirm'
                        name='passwordConfirm'
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

export default ResetPassword;

