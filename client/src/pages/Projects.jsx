import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CallToAction from "../components/CallToAction";

const Projects = () => {
  
  const [recentPosts, setRecentPosts] = useState('');

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);


  return (
    <div className="max-w-6xl mx-auto">
      <section className='grid md:grid-cols-2 lg:grid-cols-4 gap-5 my-5 justify-center'>
          { 
            recentPosts
             &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
      </section>
      <div className="my-4">
        < CallToAction />

      </div>
    </div>
  )
}

export default Projects