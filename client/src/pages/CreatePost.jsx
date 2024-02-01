import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

const CreatePost = () => {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({})


  const handlePhotoUpload = async () => {
    try {
      if(!file) {
        setImageUploadError('Please select an image')
        return;
      }
      setImageUploadError(null)
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
          (snapshot) => {
            const progress = 
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageUploadError('Image Upload Error')
            setImageUploadProgress(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({ ...formData, image: downloadURL });
            });
            console.log(formData)
        }
      );

    } catch (error) {
      setImageUploadError('Image Upload Error');
      setImageUploadProgress(null);
      console.log(error)
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-2xl font-semibold my-8">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TextInput type="text" placeholder="Title" id="title" required className="flex-1"/>
          <Select>
            <option value='uncategorized' >Select a Category</option>
            <option value='education' >Education</option>
            <option value='travels' >Travels</option>
            <option value='web3' >Web 3</option>
            <option value='webdev' >Web Development</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between p-4 rounded-md border-4 border-green-500 border-dotted">
          <FileInput 
            type='file'  
            accept="image/*" 
            onChange={(e) => setFile(e.target.files[0])} 
          />
          <Button 
            type="button" 
            onClick={handlePhotoUpload} 
            gradientDuoTone='greenToBlue' 
            size='sm'  
            outline 
            disabled={imageUploadProgress}
          >
            {
              imageUploadProgress ? 
              <div className="h-16 w-16">
                <CircularProgressbar 
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div> :
                'Upload'
            }
          </Button>
        </div>
        {
          imageUploadError && 
          <Alert color='failure'>
            {imageUploadError}
          </Alert>
        }
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill 
          theme="snow" 
          placeholder="Add Content Here...." 
          className="h-64 mb-10" 
          required
        />
        <Button type='submit' gradientDuoTone='greenToBlue' >
          Publish
        </Button>
      </form>
    </div>
  )
}

export default CreatePost