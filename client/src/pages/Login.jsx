import {Link, useNavigate} from 'react-router-dom';
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';


const Login = () => {

  const [formData, setFormData] = useState({});

  const {loading, error} = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };
  // console.log(formData)

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if( !formData.email || !formData.password) {
      dispatch(signInFailure('Please Fill Out All Fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(signInFailure(data.message))
      }
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className='flex p-4 gap-5 max-w-6xl mx-auto flex-col  md:flex-row md:items-center'>
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
          <form className='flex flex-col gap-4 w-full' onSubmit={handleUserSubmit}>
            <div >
              {error && (
                <Alert className='my-3' color='failure'>
                  {error}
                </Alert>
              )}
            </div>
            <div >
              <Label  value='Enter Email' />
              <TextInput 
                 type='email'
                 placeholder='name@company.com'
                 id='email'  
                 onChange={handleChange}
              />
            </div>
            <div >
              <Label  value='Your Pasword' />
              <TextInput 
                 type='password'
                 placeholder='********'
                 id='password'
                 onChange={handleChange}  
              />
            </div>
            <Button type='submit' gradientDuoTone='greenToBlue' disabled={loading} >
              {loading ? (
              <>
                <Spinner className='sm' />
                <p>Loading...</p>
              </>
              ) : 'Sign In'}
            </Button>
          </form>
          <p className='mt-5 text-sm'>Don't have an account? <Link to='/register'> <span className='text-blue-500 italic'>Sign Up Here</span> </Link></p>
          
        </div>
      </div>
    </div>
  )
}

export default Login