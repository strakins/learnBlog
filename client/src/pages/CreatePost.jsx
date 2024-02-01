import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
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
          <FileInput type='file' accept="image/*"  />
          <Button type="button" gradientDuoTone='greenToBlue' size='sm'  outline >
            Upload
          </Button>
        </div>
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