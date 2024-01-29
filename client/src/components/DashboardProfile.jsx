import { useSelector } from 'react-redux';
import {Button, TextInput} from 'flowbite-react'


const DashboardProfile = () => {

  const { currentUser } = useSelector( state => state.user)
  return (
    <div className='max-w-lg mx-auto p-4 w-full'>
      <h1 className="text-center my-5 font-semibold text-3xl">Profile</h1>
      <form action="" className='flex flex-col gap-4'>
        <div className='w-40 h-40 self-center cursor-pointer shadow-md
         overflow-hidden rounded-full'>
          <img 
            src={currentUser.profilePicture} 
            alt="user" 
            className='rounded-full object-cover w-full h-full border-8 
            border-[lightgray] ' 
          />
        </div>
        <TextInput type='text' id='username' placeholder='username'
          defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='email'
          defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='password'/>

        <Button type='submit' gradientDuoTone='greenToBlue' outline >
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 font-semibold cursor-pointer">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  )
}

export default DashboardProfile