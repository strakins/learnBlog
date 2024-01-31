import { useSelector } from 'react-redux';
import {Alert, Button, Modal, TextInput} from 'flowbite-react'
import { useEffect, useRef, useState } from 'react';
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable 
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  updateStart, 
  updateSuccess, 
  updatefailure, 
  deleteUserStart, 
  deleteUserSuccess, 
  deleteUserFailure, 
  signOutSuceess 
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { AiOutlineExclamationCircle } from "react-icons/ai";



const DashboardProfile = () => {

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setimageFileUploadErrror] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSucess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const fileUploadRef = useRef();
  const dispatch = useDispatch();
  // console.log(currentUser._id)

  const { currentUser, error } = useSelector( state => state.user)

  const handleImageUpdate = (e) => {
    const file = e.target.files[0]
    if(file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file));
    }
  }
  
  
  useEffect(() => {
    if(imageFile) {
      uploadImage();
    }

  }, [imageFile])

  const uploadImage = async () => {
    // console.log('uploading image....')
    setImageFileUploading(true)
    setimageFileUploadErrror(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
        (snapshot) => {
          const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setimageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setimageFileUploadErrror('Could not Upload Error(File must be less than 2mb)')
          setimageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null)
          setImageFileUploading(false)
        },
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  }

  const handleUserInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  // console.log(formData)

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(Object.keys(formData).length === 0) {
      setUpdateUserError('No Changes Made');
      return;
    }
    if(imageFileUploading) {
      setUpdateUserError('Please wait for image to upload')
      return;
    }
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        // credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok) {
        dispatch(updatefailure(data.message));
        setUpdateUserError(data.message);
      }else {
        dispatch(updateSuccess(data));
        setUpdateUserSucess("User's profile updated successfully")
      }
    } catch (error) {
      dispatch(updatefailure(error.message));
      setUpdateUserError(error.message)
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      }else {
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }

  };

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
    <div className='max-w-lg mx-auto p-4 w-full'>
      <h1 className="text-center my-5 font-semibold text-3xl">Profile</h1>
      <form action="" onSubmit={handleUpdate} className='flex flex-col gap-4'>
        <input 
          type="file" 
          accept='image/*' 
          onChange={handleImageUpdate} 
          ref={fileUploadRef}
          hidden
        />
        {/* Add react circular progress bar as package 
        to make d file upload  more user friendly*/}

        <div className='relative w-52 h-52 md:w-60 md:h-60 self-center cursor-pointer shadow-md
          overflow-hidden rounded-full' onClick={() => fileUploadRef.current.click()}
        >        
          {imageFileUploadProgress && 
            <CircularProgressbar 
              value={imageFileUploadProgress || 0 }
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                }
              }}
            />
          }  
          <img 
            src={imageFileUrl || currentUser.profilePicture} 
            alt="user" 
            className={`rounded-full object-cover w-full h-full border-8 
            border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} 
          />
        </div>
        {imageFileUploadError && 
          <Alert color='failure'>
            {imageFileUploadError}
          </Alert>
        }

        <TextInput type='text' id='username' placeholder='username'
          defaultValue={currentUser.username}  onChange={handleUserInput}/>
        <TextInput type='email' id='email' placeholder='email'
          defaultValue={currentUser.email}  onChange={handleUserInput}/>
        <TextInput type='password' id='password' placeholder='password' onChange={handleUserInput}/>

        <Button type='submit' gradientDuoTone='greenToBlue' outline >
          Update
        </Button>
      </form>
      {
        updateUserSuccess && 
        <Alert color='success' className='my-4' >{updateUserSuccess}</Alert>
      }
      {
        error && 
        <Alert color='success' className='my-4' >{error}</Alert>
      }
      {
        updateUserError && 
        <Alert color='success' className='my-4' >{updateUserError}</Alert>
      }
      <div className="text-red-500 flex justify-between mt-5 font-semibold cursor-pointer">
        <span onClick={() => setShowModal(true)}>Delete Account</span>
        <span onClick={handleSignOut}>Sign Out</span>
      </div>
      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        popup 
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AiOutlineExclamationCircle className='h-14 w-14 text-gray-500 dark:text-gray-200 my-4 mx-auto' />
            <h3 className='mb-3 text-lg text-gray-600 dark:text-gray-300'>We don't like to let go</h3>
            <h3 className='mb-3 text-lg text-red-500 '>Are you sure, you wanna delete the account?</h3>
            <div className='flex justify-between mt-8'>
              <Button color='failure' onClick={handleDelete} >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)} >
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashboardProfile