
import { Button } from 'flowbite-react';
import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const OAuth = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'})
    try {
      const  resultsFromGoogle = await signInWithPopup(auth, provider)
      // console.log(resultsFromGoogle)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL
        })
      });
      const data = await res.json();
      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button 
      type='button' 
      gradientDuoTone='greenToBlue' 
      outline
      onClick={handleGoogleClick}
    >
      <FaGoogle className='text-orange-500 w-6 h-6 mr-2' />
      <span className='text-lg'>Continue with Google</span>
    </Button>
  )
}

export default OAuth