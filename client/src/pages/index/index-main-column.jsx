import { useState, useEffect } from "react";
import { CreatePostCard, CreatePostDialog } from "../../components/create-post"
import PostItem from '../../components/post-item';
import axios from './../../utils/axios';
import { useAuth } from "../../context/auth-context";

const MainColumn = () => {
    const [postList, setPostList] = useState([]);
    const { member } = useAuth();

    useEffect(() => {
        axios.get(`/post`)
            .then(resp => {
                setPostList(resp.data.data.post)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <CreatePostDialog />
            <CreatePostCard />
            {
                postList.map(post => {
                    return (<PostItem key={post._id} post={post} />)
                })
            }
        </>
    )
}

export default MainColumn