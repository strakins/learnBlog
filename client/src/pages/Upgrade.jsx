import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';

export const Upgrade = () => {
  const form = useRef();

  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  const {currentUser} = useSelector((state) => state.user)

  // console.log(import.meta.env.VITE_SERVICE_ID)
  // console.log(import.meta.env.VITE_TEMPLATE_ID)
  // console.log(import.meta.env.VITE_PUBLIC_KEY)

  const sendEmail = (e) => {
    e.preventDefault();
    setSubmitting(true)
    emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setSubmitting(false)
        setShowModal(true)
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
      <section className=''>
        <h2 className='text-center mt-6'>Apply As a Content Creator </h2>
        {/* <p>{JSON.stringify(import.meta.env)}</p> */}
        <form ref={form} onSubmit={sendEmail} className='text-color-mode p-4 max-w-xl mx-auto'>
          <div className='py-3'>
            <label htmlFor="from_name" className='block mb-2 text-sm md:text-md'>Name</label>
            <input type="text" name="from_name" className='border-2 border-gray-500 dark:bg-gray-500 rounded-md p-3 w-full text-sm md:text-md' required />
          </div>
          
          <div className='py-3'>
            <label 
              htmlFor="from_email" 
              className='block mb-2 text-sm md:text-md'
            >  
              Email
            </label>
            <input 
              type="text" 
              name="from_email" 
              value={currentUser.email}
              className='rounded-md p-3 dark:bg-gray-500 w-full text-sm md:text-md border-2 border-gray-500 '  
              required
            />
          </div>
          
          <div className='py-3'>
            <label htmlFor="message" className='block mb-2 text-sm md:text-md'>Briefly Describe your Writing Ability</label>
            <textarea name="message" id="" cols="40" rows="4" className='dark:bg-gray-500 rounded-md p-3 w-full text-md md:text-xl border-2 border-gray-500'></textarea>
          </div>

          <div className='bg-green-600 mb-4 w-full text-center px-2 py-2 font-semibold cursor-pointer rounded-lg text-white my-3'>
            <input type="submit" value={submitting ? "Forwarding Details..." : "Submit Request"} />
          </div>
        </form>
        <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        popup 
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <AiOutlineExclamationCircle 
              className='h-14 w-14 text-gray-500 dark:text-gray-200 my-4 mx-auto' 
              onClick={() => {
                setShowModal(false)
                navigate('/dashboard?tab=profile')
              }}
            />
            {/* <h3 className='mb-3 text-lg text-gray-600 dark:text-gray-300'>We don't like to let go</h3> */}
            <h3 className='mb-3 text-lg text-green-500 '>Your request has been submitted Successfully, We will reach out soon!</h3>
            <div className='flex justify-between mt-8'>
              <div></div>
              <Button color='gray' onClick={() => {
                setShowModal(false)
                navigate('/dashboard?tab=profile')
                }} 
              >
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </section>
  );
};