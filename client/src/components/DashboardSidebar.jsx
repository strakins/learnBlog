
import { Sidebar } from 'flowbite-react';
import { FaUser, FaListUl, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuceess } from '../redux/user/userSlice';


const DashboardSidebar = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();

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
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item 
                      active={tab === 'profile'} 
                      icon={FaUser} 
                      label={'User'} 
                      labelColor='dark'
                      as='div'
                    >
                        Profile
                    </Sidebar.Item>
                </Link>

                <Link to={'/dashboard?tab=posts'}>
                    <Sidebar.Item 
                      active={tab === 'posts'} 
                      icon={FaListUl} 
                      as='div'

                    >
                        Posts
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={FaSignOutAlt} onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashboardSidebar