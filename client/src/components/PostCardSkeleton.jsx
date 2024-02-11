import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const PostCardSkeleton = () => {
    return (
        < Skeleton className='h-80 rounded-lg w-[260px] mb-4' /> 
    )
}

export default PostCardSkeleton