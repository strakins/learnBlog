
import { Sidebar } from 'flowbite-react';
import { FaUser, FaListUl, FaSignOutAlt, FaUsers, FaComments  } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuceess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux'; 


const DashboardSidebar = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();

  const { currentUser } = useSelector(state => state.user)

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: "POST"
      });
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      }else {
        dispatch(signOutSuceess())
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <Sidebar className='w-full md:w-60'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-2'>
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item 
                      active={tab === 'profile'} 
                      icon={FaUser} 
                      label={currentUser.isAdmin ? 'Admin' : currentUser.isCreator ? 'Creator' : 'User'}
                      
                      labelColor='dark'
                      as='div'
                    >
                      Profile
                    </Sidebar.Item>
                </Link>
                { currentUser.isAdmin || currentUser.isCreator ? 
                  <Link to={'/dashboard?tab=dashboard'}>
                    <Sidebar.Item 
                      active={tab === 'dashboard'} 
                      icon={MdDashboard}                      
                      as='div'
                    >
                      Dashboard
                    </Sidebar.Item>
                  </Link>
                  : ''
                }
               
                {
                  currentUser.isAdmin || currentUser.isCreator ?
                  <Link to={'/dashboard?tab=posts'}>
                      <Sidebar.Item 
                        active={tab === 'posts'} 
                        icon={FaListUl} 
                        as='div'
                      >
                          All Posts
                      </Sidebar.Item>
                  </Link> : ''
                }
                 { currentUser.isAdmin || currentUser.isCreator ?
                  <Link to={'/dashboard?tab=comments'}>
                    <Sidebar.Item 
                      active={tab === 'comments'} 
                      icon={FaComments}                       
                      labelColor='dark'
                      as='div'
                    >
                      Comments
                    </Sidebar.Item>
                  </Link> : '' } 
                {
                  currentUser.isAdmin && 
                  <Link to={'/dashboard?tab=users'}>
                      <Sidebar.Item 
                        active={tab === 'users'} 
                        icon={FaUsers} 
                        as='div'

                      >
                          All Users
                      </Sidebar.Item>
                  </Link>
                }

                <Sidebar.Item icon={FaSignOutAlt} onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashboardSidebar