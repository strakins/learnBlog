
import { Sidebar } from 'flowbite-react';
import { FaUser, FaListUl, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'

const DashboardSidebar = () => {

    const location = useLocation();
  const [tab, setTab] = useState('')

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
                <Sidebar.Item icon={FaSignOutAlt} >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashboardSidebar