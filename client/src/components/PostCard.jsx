import { useState } from "react"
import { FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"

const PostCard = ({ post }) => {

    const [read, setread ] = useState(10);

    const totalRead = () => {
        setread(read + 1);
    }

  return (
    <div className='group relative border border-teal-500 hover:border-2 h-[300px] overflow-hidden rounded-lg  transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[200px] w-full  object-cover group-hover:h-[170px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
            <p className='text-lg font-semibold line-clamp-1'>{post.title}</p>
        <article className="flex justify-between ">
            <div>
                <span className='italic text-xs capitalize'>{post.category}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
                <FaEye/>
                <p>0</p>
                {/* {read && {read}} */}
            </div>
        </article>
        <Link
          to={`/post/${post.slug}`}
          onClick={totalRead}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  )
}

export default PostCard