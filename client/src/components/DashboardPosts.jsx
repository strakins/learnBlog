import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from "flowbite-react";
import  { Link } from 'react-router-dom';
import { AiOutlineExclamationCircle } from "react-icons/ai";


const DashboardPosts = () => {

  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

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
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if(!res.ok) {
        console.log(data.method)
      } else {
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
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
                return <Table.Body className="divide-y" key={post._id}>
                  <Table.Row className="bg-white dark:border-red-400 dark:bg-slate-900">
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className="h-12 w-20 object-cover bg-gray-500 rounded-md"/>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {post.category}
                    </Table.Cell>
                    <Table.Cell>
                      <span 
                        className="font-medium text-red-500 
                          hover:cursor-pointer hover:underline"
                        onClick={() => {
                          setShowModal(true)
                          setPostIdToDelete(post._id)
                          // console.log(postIdToDelete)
                        }}
                        >
                          Delete
                        </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`}>
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
      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        popup 
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AiOutlineExclamationCircle className='h-14 w-14 text-gray-500 dark:text-gray-200 my-4 mx-auto' />
            {/* <h3 className='mb-3 text-lg text-gray-600 dark:text-gray-300'>We don't like to let go</h3> */}
            <h3 className='mb-3 text-lg text-red-500 '>`Are you sure, you wanna delete the Post? `</h3>
            <div className='flex justify-between mt-8'>
              <Button color='failure' onClick={handleDeletePost} >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)} >
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashboardPosts