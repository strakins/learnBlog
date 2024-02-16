import { Link } from "react-router-dom"
import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux';

const RestrictedAcessPage = () => {

  const {currentUser} = useSelector(state => state.user)

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col gap-5 items-center mt-24">
      <h2>Sorry You are not Permmited to View This Page</h2>
      <Link to='/login'> <Button >Login</Button> </Link>
      { currentUser &&
        <Link to='/upgrade'> <Button>Apply As Content Creator</Button></Link>}
    </div>
  )
}

export default RestrictedAcessPage