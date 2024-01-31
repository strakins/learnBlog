import { Button, Dropdown, Navbar, TextInput, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme} from '../redux/theme/themeSlice';
import { signOutSuceess } from '../redux/user/userSlice';



const Header = () => {

  const path = useLocation().pathname;
  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme);
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


  return (
    <Navbar className='border-b-4'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl 
          font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-tr from-blue-600 via-green-500 to-purple-500 rounded-md text-white'>STRAKINS</span>
            BLOG
        </Link>
        <form action="">
          <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden md:inline'
          />
        </form>
        {/* {
          !currentUser &&
        } */}
        <Button className='w-12 h-8 md:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
          <Button 
            className='hidden md:inline' 
            color='gray'
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? 
            <FaMoon /> :
             <FaSun/>
            }
          </Button >
          {
            currentUser ? 
            <Dropdown 
              arrowIcon={false}
              inline
              label={
                <Avatar 
                  alt='uer_avatar'
                  img={currentUser.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className='block text-sm pb-3 border-b-2'>{currentUser.username}</span>
                <span className='block text-sm py-3 border-b-2 font-medium truncate'>{currentUser.email}</span>
                <Link to={'/dashboard?tab=profile'}>
                  <Dropdown.Item>
                    Profile
                  </Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>

              </Dropdown.Header>
            </Dropdown>:
            <Link to='login' className='hidden md:inline'>
              {
                !currentUser &&
                <Button gradientDuoTone='greenToBlue' outline>
                Sign in
              </Button>}
            </Link>
          }
          <Navbar.Toggle />
        </div>
          <Navbar.Collapse >
              <Navbar.Link active={path === '/'} as={'div'}>
                <Link to='/' className='text-lg'>Home</Link>
              </Navbar.Link>
              <Navbar.Link active={path === '/about'} as={'div'}>
                <Link to='/about' className='text-lg'>About Us</Link>
              </Navbar.Link>
              <Navbar.Link active={path === '/projects'} as={'div'}>
                <Link to='/projects' className='text-lg'>Projects</Link>
              </Navbar.Link>
              <Navbar.Link active={path === '/login'} as={'div'}>
                <Link to='/login' className='inline md:hidden'>
                  <Button gradientDuoTone='greenToBlue' outline>
                    Sign in
                  </Button>
                </Link>
              </Navbar.Link>
              
          </Navbar.Collapse>
        
    </Navbar>
  )
}

export default Header