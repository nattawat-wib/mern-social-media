import { CreatePostCard, CreatePostDialog } from "../../components/create-post"
import PostItem from '../../components/post-item';

const MainColumn = () => {
    return (
        <>
            <CreatePostDialog />
            <CreatePostCard />
            {
                [1, 2, 4, 5].map((item, i) => {
                    return (<PostItem key={i} />)
                })
            }
        </>
    )
}

export default MainColumn