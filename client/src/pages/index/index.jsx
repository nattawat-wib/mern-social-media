import Grid from '@mui/material/Grid';
import { IndexPageWrapper } from '../../style/index.style';
import MainColumn from './index-main-column';

const Index = () => {
    return (
        <IndexPageWrapper>
            <Grid container spacing={2} className='p-4'>
                <Grid item xs={3} >
                    <div style={{ position: 'fixed' }}>

                        1
                    </div>
                </Grid>
                <Grid item xs={6} >
                    <MainColumn />
                </Grid>
                <Grid item xs={3}>
                    1
                </Grid>
            </Grid>
        </IndexPageWrapper>
    )
}

export default Index