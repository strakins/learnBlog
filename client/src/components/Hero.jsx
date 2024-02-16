import { Link } from "react-router-dom"



const Hero = () => {
  return (
    <div className="h-64 flex flex-col justify-center pl-20 bg-gradient-to-r from-purple-600 to-green-500 text-white">
    {/* // <div className="h-64 flex flex-col justify-center pl-20 bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 text-color-mode"> */}
        <p className="my-6 text-xl md:text-2xl ">
            Learn with
        <span className='px-2 py-1 ml-2 bg-gradient-to-tr from-blue-600 via-green-500 to-purple-500 rounded-md text-white'>STRAKINS BLOG</span>
            
        </p> 
        <div className="animate-bounce">
            <Link to='/projects'>
                <span className="py-1.5 px-4 bg-red-600 text-white border rounded-md  ">Explore</span>
            </Link>
        </div> 
        
    </div>
  )
}

export default Hero