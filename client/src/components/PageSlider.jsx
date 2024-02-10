import { Carousel } from 'flowbite-react';
import { useEffect, useState } from "react";
import PostCard from './PostCard';

const PageSlider = () => {
    const [recentPosts, setRecentPosts] = useState('')

    console.log(recentPosts)

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
    

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-96 flex justify-center mx-auto">
        <div>

        
        {
            recentPosts && recentPosts.map((post) => {
                return (
                <Carousel slideInterval={5000} key={post._id}>
                <h1 >{post.title}</h1>
                </Carousel>
                )
            })
        }
        </div>
    </div>
  )
}

export default PageSlider