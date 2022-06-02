import { StyledPageLoader } from "../style/util.style"
import { RotatingSquare, Triangle } from 'react-loader-spinner';

export const PageLoader = ({ loading }) => {
    return (
        <StyledPageLoader loading={loading}>
            <RotatingSquare
                color="grey"
            />
        </StyledPageLoader>
    )
}