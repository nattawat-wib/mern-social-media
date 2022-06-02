import { useState, useEffect } from "react";
import { CreatePostCard, CreatePostDialog } from "../../components/create-post"
import PostItem from '../../components/post-item';
import axios from './../../utils/axios';
import { useAuth } from "../../context/auth-context";

const MainColumn = () => {
    const [postList, setPostList] = useState([]);
    const { member } = useAuth();

    useEffect(() => {
        axios.get(`/post/${member.username}`)
            .then(resp => {
                // console.log(resp);
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
                postList.map((post, i) => {
                    return (<PostItem key={i} post={post} />)
                })
            }
        </>
    )
}

export default MainColumn