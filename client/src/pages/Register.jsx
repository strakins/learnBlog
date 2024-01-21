import {Link} from 'react-router-dom';
import {Button, Label, TextInput} from 'flowbite-react'


const Register = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-4 gap-5 max-w-4xl mx-auto flex-col  md:flex-row md:items-center'>
        {/* left */}
        <div className="flex-1">
          <Link to='/' className='text-xl sm:text-4xl font-bold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-tr from-blue-600 via-green-500 to-purple-500 rounded-md text-white'>STRAKINS</span>
              BLOG
          </Link>
          <p className='text-sm mt-6'> Lorem ipsum dolor sit amet consectetur, adipisicing 
            elit. ducimus minus. Natus tenetur enim obcaecati, 
            itaque odit, optio at debitis repudiandae quaerat, id qui
            voluptate accusamus! 
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4 w-full'>
            <div >
              <Label  value='Your Username' />
              <TextInput 
                 type='text'
                 placeholder='Username'
                 id='username'  
              />
            </div>
            <div >
              <Label  value='Enter Email' />
              <TextInput 
                 type='email'
                 placeholder='name@company.com'
                 id='email'  
              />
            </div>
            <div >
              <Label  value='Your Pasword' />
              <TextInput 
                 type='password'
                 placeholder='Password'
                 id='password'  
              />
            </div>
            <Button gradientDuoTone='greenToBlue' outline>
              Sign up
            </Button>
          </form>
          <p className='mt-5 text-sm'>Already have an account? <Link to='/login'> <span className='text-blue-500 italic'>Sign In</span> </Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register