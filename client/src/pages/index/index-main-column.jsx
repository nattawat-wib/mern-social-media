import { useState, useEffect } from "react";
import { CreatePostCard, CreatePostDialog } from "../../components/create-post"
import PostItem from '../../components/post-item';
import axios from './../../utils/axios';
import { useAuth } from "../../context/auth-context";
import { useToggleContext } from "../../context/toggle-context";

const MainColumn = () => {
    const [postList, setPostList] = useState([]);
    const { member } = useAuth();
    const { rerender } = useToggleContext()

    useEffect(() => {
        axios.get(`/post/follow`)
            .then(resp => {
                console.log(resp);
                setPostList(resp.data.data.allPost);
            })
            .catch(err => {
                console.log(err);
            })
    }, [rerender])

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