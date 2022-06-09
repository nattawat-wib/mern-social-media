import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { PageWrapper, FormWrapper } from '../../style/form.style';
import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from './../../utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
    const [form, setForm] = useState({});
    const [query] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFormChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        toast.loading('processing...')
        setIsLoading(true)

        axios.patch('/auth/reset-password', {
            token: query.get('token'),
            ...form
        })
            .then(resp => {
                console.log(resp);
                toast.dismiss()
                toast.success(resp.data.msg)
                toast.loading('routing you to news feed')
                setIsLoading(false)
                setForm({})

                setTimeout(() => location.reload(), 2000)

            }).catch(err => {
                console.log(err);
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
                    <Typography variant='h5' className='font-bold'> Reset Password </Typography>
                    <Divider className='my-4' />
                    <Typography variant='body1'> Create Your Password Below. </Typography>

                    <TextField
                        onChange={handleFormChange}
                        value={form.password || ""}
                        label='password'
                        name='password'
                        variant='outlined'
                        type='password'
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
                        type='password'
                        fullWidth
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

export default ResetPassword;