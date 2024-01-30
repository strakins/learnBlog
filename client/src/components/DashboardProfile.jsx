import { useSelector } from 'react-redux';
import {Alert, Button, TextInput} from 'flowbite-react'
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


const DashboardProfile = () => {

  const { currentUser } = useSelector( state => state.user)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setimageFileUploadErrror] = useState(null);
  const fileUploadRef = useRef();

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
        },
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          // setFormData({ ...formData, profilePicture: downloadURL });
          // setImageFileUploading(false);
        });
      }
    );

  }

  return (
    <div className='max-w-lg mx-auto p-4 w-full'>
      <h1 className="text-center my-5 font-semibold text-3xl">Profile</h1>
      <form action="" className='flex flex-col gap-4'>
        <input 
          type="file" 
          accept='image/*' 
          onChange={handleImageUpdate} 
          ref={fileUploadRef}
          hidden
        />
        {/* Add react circular progress bar as package 
        to make d file upload  more user friendly*/}

        <div className='relative w-60 h-60 self-center cursor-pointer shadow-md
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