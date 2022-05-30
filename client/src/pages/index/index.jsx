import Grid from '@mui/material/Grid';
import { IndexPageWrapper } from '../../style/index.style';
import MainColumn from './index-main-column';
import LeftColumn from './index-left-column';
import RightColumn from './index-right-column';

const Index = () => {
    return (
        <IndexPageWrapper>
            <Grid container spacing={2} className='p-4'>
                <Grid item xs={3} >
                    <LeftColumn />
                </Grid>
                <Grid item xs={6} >
                    <MainColumn />
                </Grid>
                <Grid item xs={3}>
                    <RightColumn />
                </Grid>
            </Grid>
        </IndexPageWrapper>
    )
}

export default Index