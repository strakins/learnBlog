import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardProfile from '../components/DashboardProfile';
import DashboardPosts from '../components/DashboardPosts';



const Dashboard = () => {

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
    <div>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-60">
          < DashboardSidebar />
        </div>


        {/* Main section */}
        <div className="">
          {tab === 'profile' && < DashboardProfile />}
        </div>
        <div className="">
          {tab === 'posts' && < DashboardPosts />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard