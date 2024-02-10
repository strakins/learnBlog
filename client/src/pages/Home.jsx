import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CallToAction from "../components/CallToAction";
// import Typical from 'react-typical'

const Home = () => {

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=4`);
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

  const [recentPosts, setRecentPosts] = useState('')
  return (
    <div className="p-5">
      <section className="h-32 flex items-center justify-center text-3xl">
        {/* <Typical
           steps={['Welcome to Strakins Blog', 4000, 
           'The Best Place to Learn', 4000,
           'The Best Place Write', 4000,
           'Convineintly Express your Opinion', 4000,
          ]}
           loop={Infinity}
           wrapper="p"
        /> */}
      </section>
      <section className='grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 justify-center'>
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

export default Home