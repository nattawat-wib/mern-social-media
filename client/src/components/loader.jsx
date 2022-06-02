import { StyledPageLoader } from "../style/util.style"
import { RotatingSquare } from 'react-loader-spinner';

export const PageLoader = ({ loading }) => {
    return (
        <StyledPageLoader loading={loading}>
            <RotatingSquare
                visible={true}
                color="grey"
            />
        </StyledPageLoader>
    )
}