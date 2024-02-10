import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from "flowbite-react";
// import  { Link } from 'react-router-dom';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaCheck, FaTimes, FaUserTie } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { MdAdminPanelSettings } from "react-icons/md";


const DashboardUsers = () => {

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState('');
  const [userIdToDelete, setUserIdToDelete] = useState('');

  const { currentUser } = useSelector((state) => state.user)


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json();
        if(res.ok){
          setUsers((prev) => [ ...prev, ...data.posts]);
          if(data.users.length < 9) {
            setShowMore(false)
          }
        }
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
          console.log(data.message);
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
      <h1 className="my-5 p-2 bg-gray-400 rounded-md w-fit">Hi {currentUser.username}, you currently have {users.length} registered users on your Site</h1>
      { 
        currentUser.isAdmin && users.length > 0 ?
        (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>User Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>IsAdmin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {  users.map((user) => {
                return <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="bg-white dark:border-red-400 dark:bg-slate-900">
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      
                        <img src={user.profilePicture} alt={user.username} className="h-20 w-20 object-cover bg-gray-500 rounded-full"/>
                    
                    </Table.Cell>
                    <Table.Cell>
                      <span className="font-medium text-gray-900 dark:text-white" >
                        {user.username}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {user.email}
                    </Table.Cell>
                    <Table.Cell>
                      {/* {user.isAdmin ? <FaCheck className="text-green-500"/> :  < TfiWrite className="text-blue-500"/>} */}
                      {user.isCreator  && < TfiWrite className="text-blue-500"/>}
                      {user.isAdmin  && <MdAdminPanelSettings className="text-green-500"/> }
                      {!user.isAdmin  && !user.isCreator && <FaUserTie className="text-red-500"/> }
                    </Table.Cell>
                    <Table.Cell>
                      <span 
                        className="font-medium text-red-500 
                          hover:cursor-pointer hover:underline"
                        onClick={() => {
                          setShowModal(true)
                          setUserIdToDelete(user._id)
                          setEmailToDelete(user.email)
                        }}
                        >
                          Delete
                        </span>
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
          <p> You Do not have registered Users! </p>
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
            <h3 className='mb-3 text-lg text-red-500 '>Are you sure you want to delete {emailToDelete}!</h3>
            <div className='flex justify-between mt-8'>
              <Button color='failure' onClick={handleDeleteUser} >
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

export default DashboardUsers;