import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { PageWrapper, FormWrapper } from '../../style/form.style';
import { Link } from 'react-router-dom';
import axios from './../../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = e => {
        e.preventDefault();
        toast.loading('processing...')
        setIsLoading(true)

        axios.patch('/auth/forget-password', { email })
            .then(resp => {
                toast.dismiss()
                toast.success(resp.data.msg)
                setIsLoading(false)
                setEmail('')
            }).catch(err => {
                toast.dismiss()
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }

    return (
        <PageWrapper>
            <Toaster />
            <FormWrapper>
                <form onSubmit={handleFormSubmit}>
                    <Typography variant='h5' className='font-bold'> Find Your Account </Typography>
                    <Divider className='my-4' />
                    <Typography variant='body1'> Please enter your email address you register to search for your account. </Typography>

                    <TextField
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        label='email address'
                        variant='outlined'
                        fullWidth
                        autoFocus
                        sx={{ mt: 2 }}
                    />

                    <Divider className='my-6' />

                    <div className='flex justify-end items-center mt-4'>
                        <Button
                            disabled={isLoading}
                            loading_btn={isLoading ? 'true' : 'false'}
                            component={Link}
                            to='/login'
                            variant='outlined'
                            color='secondary'
                            className='ml-4'
                        >
                            BACK TO LOGIN
                        </Button>
                        <Button
                            disabled={isLoading}
                            loading_btn={isLoading ? 'true' : 'false'}
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