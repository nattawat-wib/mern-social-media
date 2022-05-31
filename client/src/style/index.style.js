import { LightTheme } from './theme.style';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const isLightMode = LightTheme.palette.mode === 'light';

export const IndexPageWrapper = styled.main`
    background-color: ${isLightMode ? '#f0f2f5' : '#121212' };
    height: calc(100vh - 59px);
    overflow: auto;
`

export const StyledCreatePostCard = styled(Paper)`
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, .12);
    padding: 1rem;
    margin-bottom: 2rem;
`

export const CreatePostModalToggle = styled.div`
    width: calc(100% - 90px);
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
    background-color: ${isLightMode ? '#f0f2f5' : '#121212'};
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
    background-color: ${isLightMode ? '#fff' : '#1b1b1b' };
    color: ${isLightMode ? '#121212' : '#fff' };
    position: sticky;
    width: 100%;
`

export const StyledTextareaAutosize = styled(TextareaAutosize)`
    width: calc(100% - 1rem);
    border: none;
    resize: none;
    background-color: ${isLightMode ? '#f0f2f5' : '#121212'};
    color: ${isLightMode ? '#121212' : '#f0f2f5'};
    padding: .5rem;
    font-family: Roboto, sans-serif;
    font-size: 1rem;

    &:focus {
        outline: none;
    }
`