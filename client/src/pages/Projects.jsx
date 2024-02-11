import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CallToAction from "../components/CallToAction";
import PostCardSkeleton from './../components/PostCardSkeleton';

const Projects = () => {
  
  const [recentPosts, setRecentPosts] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    setIsLoading(true)
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=12`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
          setIsLoading(false);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);


  return (
    <div className="max-w-6xl mx-auto p-2">
      <section className='grid md:grid-cols-2 lg:grid-cols-4 gap-5 my-5 justify-center'>
          { 
            recentPosts
             &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)
          }
          {isLoading &&
            skeletons.map((n) => <PostCardSkeleton key={n} />)
          }
      </section>
      <div className="my-4">
        < CallToAction />

      </div>
    </div>
  )
}

export default Projects