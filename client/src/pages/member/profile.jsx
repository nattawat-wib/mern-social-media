import Container from '@mui/material/Container';
import styled from 'styled-components';

const Profile = () => {
    return(
        <>
            <header>
                <Container>
                    <ProfileCover />
                </Container>
            </header>

        </>
    )
}

export default Profile

const ProfileCover = styled(figure)`
    padding-top: 100%;
    width: 100%;
`