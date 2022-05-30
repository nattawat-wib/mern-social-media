import theme from './theme.style'
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';

export const IndexPageWrapper = styled.main`
    background-color: #f0f2f5;
    height: calc(100vh - 59px);
    overflow: auto;
`

export const StyledCreatePostCard = styled(Paper)`
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, .12);
    padding: 1rem;
    margin-bottom: 2rem;
`

export const CreatePostModalToggle = styled.div`
    width: calc(100% - 40px);
    background-color: rgba(0, 0, 0, .09);
    padding: .7rem 1rem;
    border-radius: 99px;

    &:hover {
        background-color: rgba(0, 0, 0, .05);
        cursor: pointer;
    }
`

export const StyledPostItem = styled(Paper)`
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
    padding: 1rem;
    margin-bottom: 1rem;
`

export const StyledCommentInput = styled(TextField)`
    background-color: #f0f2f5;
    border-radius: 99px;
    overflow: hidden;
    width: calc(100% - 35px);

    & fieldset {
        border: none;
    }
`

export const StyledLeftColumnWrapper = styled(List)`
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, .05);
    border-radius: 8px;
    background-color: #fff;
    position: sticky;
    width: 100%;
`