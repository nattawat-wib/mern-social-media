import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

import { StyledCreatePostCard, CreatePostModalToggle } from '../style/index.style';
import AddIcon from '@mui/icons-material/Add';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const CreatePostCard = () => {
    return (
        <StyledCreatePostCard>
            <Box className='flex items-center'>
                <figure className='relative rounded-full overflow-hidden mr-3' style={{ height: "40px", width: "40px" }}>
                    <img
                        className='fit-img'
                        src='https://www.gannett-cdn.com/presto/2020/03/17/USAT/c0eff9ec-e0e4-42db-b308-f748933229ee-XXX_ThinkstockPhotos-200460053-001.jpg?crop=1170%2C658%2Cx292%2Cy120&width=1200'
                    />
                </figure>
                <CreatePostModalToggle>
                    What do you thing ? nutella
                </CreatePostModalToggle>
            </Box>
            <Divider className='my-4' />
            <Box className='flex items-center justify-between'>
                <Box>
                    <Button variant='outlined' size='small' className='rounded-full' startIcon={<EmojiEmotionsIcon />}> Feeling / Activity </Button>
                    <Button variant='outlined' size='small' className='rounded-full ml-2' startIcon={<AddPhotoAlternateIcon />}> Add Photo </Button>
                </Box>
                <Button variant='contained' size='small' className='rounded-full' startIcon={<AddIcon />}> CREATE POST </Button>
            </Box>
        </StyledCreatePostCard>
    )
}

export default CreatePostCard