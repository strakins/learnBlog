import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Button, Table } from "flowbite-react";
import  { Link } from 'react-router-dom'


const DashboardPosts = () => {

  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const { currentUser } = useSelector((state) => state.user)


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json();
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    };
    // fetchPosts();
    if(currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json();
        if(res.ok){
          setUserPosts((prev) => [ ...prev, ...data.posts]);
          if(data.posts.length < 9) {
            setShowMore(false)
          }
        }
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-4 
      scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
      dark:scrollbar-track-slate-600 dark:scrollbar-thumb-slate-500
      "
    >
      { 
        currentUser.isAdmin && userPosts.length > 0 ?
        (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {  userPosts.map((post) => {
                return <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-red-400 dark:bg-slate-900">
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/posts/${post.slug}`}>
                        <img src={post.image} alt={post.title} className="h-12 w-20 object-cover bg-gray-500 rounded-md"/>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="font-medium text-gray-900 dark:text-white" to={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {post.category}
                    </Table.Cell>
                    <Table.Cell>
                      <span className="font-medium text-red-500 hover:cursor-pointer hover:underline">Delete</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-posts/${post._id}`}>
                        <span className="text-green-600 hover:underline">Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                  
                </Table.Body>
              })

              }
            </Table>
            {
              showMore && 
              <Button 
                outline 
                gradientDuoTone='greenToBlue' 
                className="my-5 mx-auto"
                onClick={handleShowMore}
              >
                Show More
              </Button>
            }
          </>
        )
        :
        (
          <p> You Have no Posts Yet! </p>
        )
      }
    </div>
  )
}

export default DashboardPosts