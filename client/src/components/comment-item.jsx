import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { StyledCommentInput } from './../style/index.style';

export const CommentItem = () => {
    return (
        <>
            <Box className='pt-2 flex items-start'>
                <Link to="/user/username" className='relative mr-3' style={{ width: "35px", height: "35px" }}>
                    <img
                        className='rounded-full fit-img'
                        src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                    />
                </Link>
                <Box sx={{ bgcolor: "#f0f2f5", maxWidth: 'calc(100% - 100px)' }} className='rounded-2xl py-1 px-4'>
                    <Typography component={Link} to="/user/username" className='font-bold' color='primary.dark'> nutella tester </Typography>
                    <Typography> i like this post. i like this post so much.  </Typography>
                </Box>
            </Box>
            <Typography components='body2' className='mt-1 ml-12 text-xs' color='gray'> 10/12/2022 </Typography>
        </>

    )
}

export const CommentInput = () => {
    return (
        <Box className='pt-4 flex items-center'>
            <figure className='relative mr-3' style={{ width: "35px", height: "35px" }}>
                <img
                    className='rounded-full fit-img'
                    src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                />
            </figure>

            <StyledCommentInput size='small' placeholder='Write a public comment' />
        </Box>
    )
}