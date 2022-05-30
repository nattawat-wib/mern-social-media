import CreatePostCard from "../../components/create-post-card"
import PostItem from '../../components/post-item';

const MainColumn = () => {
    return (
        <>
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