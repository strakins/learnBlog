import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const CommentSection = ({postId}) => {

    const {currentUser} = useSelector((state) => state.user);

    const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  
  
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  
  
  const handleDeleteComment = () => {

  }
  return (
    <div className='max-w-3xl mx-auto w-full p-3'>
        {
            currentUser ? 
            (
                <div className='flex items-center gap-1 my-5 text-gray-700 dark:text-gray-300 text-sm'>
                    <p className='font-semibold'>Signed in as:</p>
                    <img
                        className='h-5 w-5 object-cover rounded-full'
                        src={currentUser.profilePicture}
                        alt=''
                    />
                    <Link
                        to={'/dashboard?tab=profile'}
                        className='text-xs text-cyan-600 hover:underline'
                    >
                    @{currentUser.username}
                    </Link>
                </div>
            )
            :
            (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-500 hover:underline' to={'/login'}>
                        Sign In
                    </Link>
                </div>
            )
        }
        {currentUser && (
        <form
          onSubmit={handleSubmitComment}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-400 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='greenToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
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
            {/* <h3 className='mb-3 text-lg text-gray-600 dark:text-gray-300'>We don't like to let go</h3> */}
            <h3 className='mb-3 text-lg text-red-500 '>`Are you sure, you wanna delete the Post? `</h3>
            <div className='flex justify-between mt-8'>
              <Button color='failure' onClick={handleDeleteComment} >
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

export default CommentSection