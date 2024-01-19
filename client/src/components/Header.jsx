import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';




const Header = () => {

  const path = useLocation().pathname;

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
        <Button className='w-12 h-8 md:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
          <Button className='hidden md:inline' color='gray'>
            <FaMoon />
            {/* <FaSun/> */}
          </Button >
          <Link to='login' className='hidden md:inline'>
            <Button gradientDuoTone='greenToBlue' outline>
              Sign in
            </Button>
          </Link>
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