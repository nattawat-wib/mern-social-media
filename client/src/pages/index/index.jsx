import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { IndexPageWrapper } from '../../style/index.style';
import MainColumn from './index-main-column';
import LeftColumn from './index-left-column';
import RightColumn from './index-right-column';

const Index = () => {
    return (
        <IndexPageWrapper>
            <Container>
                <Grid container spacing={2} className='p-4'>
                    <Grid item xs={3} className='sticky top-0 h-fit'>
                        <LeftColumn />
                    </Grid>
                    <Grid item xs={6} >
                        <MainColumn />
                    </Grid>
                    <Grid item xs={3} className='sticky top-0 h-fit'>
                        <RightColumn />
                    </Grid>
                </Grid>
            </Container>
        </IndexPageWrapper>
    )
}

export default Index