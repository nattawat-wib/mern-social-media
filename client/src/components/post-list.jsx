import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid'

import { StyledPostList, StyledCommentInput } from './../style/index.style';
import { Link } from 'react-router-dom';

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ReplyIcon from '@mui/icons-material/Reply';
import TextField from '@mui/material/TextField';

const PostList = () => {
    const [isCommentSectionShow, setIsCommentSectionShow] = useState(false);

    return (
        <StyledPostList>
            <header className='flex items-center'>
                <figure className='relative mr-3' style={{ width: "50px", height: "50px" }}>
                    <img
                        className='rounded-full fit-img'
                        src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                    />
                </figure>
                <div>
                    <Typography
                        variant='inline'
                        component={Link}
                        to="/"
                        color='primary.dark'
                        className='block font-bold'
                    >
                        nutella tester
                    </Typography>
                    <Box className='flex items-center'>
                        <AccessTimeFilledIcon color='primary' className='text-sm' />
                        <Typography variant='inline' className=' text-xs'>
                            11/12/2022 13:12
                        </Typography>
                    </Box>
                </div>
            </header>
            <section className='my-4'>
                รับคนเพิ่ม freelance
                ทั้งออกแบบภาพโฆษณา
                ออกแบบ logo
                ตัดต่อวีดีโอ
                ทำ motion กราฟิก
                เป็นอย่างใดอย่างหนึ่งก็ได้
                ราคางานเกี่ยวกับภาพ แต่ละงานอยู่ที่ 100-1000 บาท
                ราคางานวีดีโอราคางานอยู่ที่ 200-1500 บาท
                รับหลายคน สนใจอินบ็อคมาได้เลย มีงานรออยู่ ด่วน!!!

                <img
                    className='w-full rounded-md mt-3'
                    src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                />

            </section>
            <Divider />
            <footer>
                <Grid container className='my-2'>
                    <Grid items xs={4}>
                        <Button size='small' className='flex items-center' fullWidth >
                            <ThumbUpIcon />
                            <Typography className='font-bold ml-2' > Like </Typography>
                        </Button>
                    </Grid>
                    <Grid items xs={4}>
                        <Button
                            onClick={() => setIsCommentSectionShow(prev => prev ? false : true)}
                            size='small'
                            className='flex items-center'
                            fullWidth
                        >
                            <ModeCommentIcon />
                            <Typography className='font-bold ml-2' > Comment </Typography>
                        </Button>
                    </Grid>
                    <Grid items xs={4}>
                        <Button size='small' className='flex items-center' fullWidth >
                            <ReplyIcon />
                            <Typography className='font-bold ml-2' > Share </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </footer>
            <Divider />
            {
                isCommentSectionShow &&
                <Box className='pt-4 flex items-center'>
                    <figure className='relative mr-3' style={{ width: "35px", height: "35px" }}>
                        <img
                            className='rounded-full fit-img'
                            src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                        />
                    </figure>

                    <StyledCommentInput size='small' placeholder='Write a public comment' />
                </Box>
            }
        </StyledPostList>
    )
}

export default PostList