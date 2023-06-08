import { Link } from "react-router-dom";
import img from '../../public/logo.jpg'
import ActiveLink from "../Hooks/ActiveLink";
import { useContext } from "react";
import { UserContext } from "../Auth/ContextApi";


const Navbar = () => {
    const {user,logOut,}=useContext(UserContext)
    const handleLogOut=()=>{
      logOut()
      .then(()=>{})
      .catch(error=>{})
    }
//   console.log(user);
  return (
    <nav className=" text-white bg-gradient-to-r bg-black sticky top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex justify-center items-center gap-3">
          <img src={img} alt="logo" className="h-14 w-14 rounded-full" />
            <Link
              to="/"
              className=" font-bold text-2xl"
            >
            <span className="text-lime-500 text-4xl">G</span>lobal<span className="text-lime-500 text-4xl">S</span>peak
                 
            </Link>
            
          </div>

          <div className="mx-auto space-x-5 hidden md:flex font-semibold ">
            <ActiveLink
              to="/"
              className="text-white  px-3 py-2"
            >
              Home
            </ActiveLink>
            <ActiveLink
              to="/instructors"
              className="text-white  px-3 py-2 rounded-md text-base font-medium"
            >
              Instructors
            </ActiveLink>
            <ActiveLink
              to="/classes"
              className="text-white  px-3 py-2 rounded-md text-base font-medium"
            >
              Classes
            </ActiveLink>
          </div>

          <div className="hidden md:block font-semibold ">
            <div className="space-x-4">
              {
              user?
              <div className="flex space-x-4 items-center">
                {(user.email === 'ph@2023.com') ? <ActiveLink to='/admin/dashboard'>Dashboard</ActiveLink> : null}
                {(user.email === 'juber@gmail.com') ? <ActiveLink to='/instructor/dashboard'>Dashboard</ActiveLink> : null}
                {(user.email !=='juber@gmail.com' && user.email !=='ph@2023.com') ? <ActiveLink to='/student/dashboard'>Dashboard</ActiveLink> : null}
                <p className="cursor-pointer" onClick={handleLogOut}>Logout</p>
                <img className=" h-12 w-12 rounded-full cursor-pointer" src={user?.photoURL} alt="" title={user?.displayName} />
              </div>
              :
              <div className="space-x-4">
                  <ActiveLink to="/register">Register</ActiveLink>
                  <ActiveLink to="/login">Login</ActiveLink>
              </div>
              
              
            }
            </div>
            
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-white  focus:focus:outline-sky-400 focus:text-gray-200"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  className="hidden"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                />
                <path
                  className="block"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 18V6H4v12h2zm3-1V7H7v10h2zm3-1V8H10v8h2zm3-1V9h-2v7h2zm3-1v-6h-2v6h2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
          <ActiveLink
            to="/"
            className="text-white block  px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </ActiveLink>
          <ActiveLink
            to="/classes"
            className="text-white block  px-3 py-2"
          >
            Classes
          </ActiveLink>
          <ActiveLink
            to="/instructors"
            className="text-white block  px-3 py-2"
          >
            Instructors
          </ActiveLink>
          
          {/* {
              user?
              <div className="flex space-x-4 items-center">
                
                <ActiveLink to='/dashboard'>Dashboard</ActiveLink>
                <p className="cursor-pointer" onClick={handleLogOut}>Logout</p>
                <img className=" h-12 w-12 rounded-full cursor-pointer" src={user?.photoURL} alt="" title={user?.displayName} />
              </div>
              :
              <div className="space-x-4">
                  <ActiveLink to="/register">Register</ActiveLink>
                  <ActiveLink to="/login">Login</ActiveLink>
              </div>
              
              
            } */}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
