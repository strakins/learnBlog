// import { FaHome } from "react-icons/fa";


const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-color-mode">
        <div className="text-center">
            <h1 className="mb-4 text-4xl font-semibold text-red-500">PAGE NOT FOUND</h1>
            <p className="mb-8 text-lg ">Oops! Looks like you're lost.</p>
            <div className="animate-bounce ">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            </div>
            <p className="mt-4">Let's get you back <a href="/" class="text-blue-500">
                Home 
                </a>.
            </p>
             </div>
        </div>
  )
}

export default PageNotFound