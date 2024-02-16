import {Footer} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';


const FooterCom = () => {
  return (
    <Footer container className='border border-t-8 border-green-500'>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="my-5 ">
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl 
              font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-tr from-blue-600 via-green-500 to-purple-500 rounded-md text-white'>STRAKINS</span>
                BLOG
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='' target='_blank' rel='noopener noreffere'>
                  My Projects
                </Footer.Link>
                <Footer.Link href='' target='_blank' rel='noopener noreffere'>
                  About Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Our Offers' />
              <Footer.LinkGroup col>
                <Footer.Link href='' target='_blank' rel='noopener noreffere'>
                  My Projects
                </Footer.Link>
              
                <Footer.Link href='' target='_blank' rel='noopener noreffere'>
                  About Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Contact Us' />
              <Footer.LinkGroup col>
                <Footer.Link href='' target='_blank' rel='noopener noreffere'>
                  My Projects
                </Footer.Link>
              
                <Footer.Link href='' target='_blank' rel='noopener noreffere'>
                  About Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright 
            href='https://strakins-portfolio.vercel.app/' 
            by="Strakins" 
            year={new Date().getFullYear()}
          />
          <div className="flex gap-4 mt-2 md:mt-4 sm:justify-center">
            <Footer.Icon href='https://twitter.com/straksman' icon={FaTwitter} />
            <Footer.Icon href='https://www.linkedin.com/in/blessing-akinola-0073b9112/' icon={FaLinkedin} />
            <Footer.Icon href='https://github.com/strakins' icon={FaGithub} />
          </div>
        </div>

      </div>
    </Footer>
  )
}

export default FooterCom