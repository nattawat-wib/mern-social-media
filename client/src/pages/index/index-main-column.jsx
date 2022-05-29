import CreatePostCard from "../../components/create-post-card"
import PostList from '../../components/post-list';

const MainColumn = () => {
    return (
        <>
            <CreatePostCard />
            {
                [1, 2, 4, 5].map((item, i) => {
                    return (<PostList key={i} />)
                })
            }
        </>
    )
}

export default MainColumn