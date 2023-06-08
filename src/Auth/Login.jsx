import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { UserContext } from "./ContextApi";
import useTitle from "../Hooks/Usetitle";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/Ai';
import Swal from "sweetalert2";




const Login = () => {
  const { register, handleSubmit, formState: { errors }} = useForm();
 const [error, setError]=useState()
 const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleLogIn} = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useTitle('login')

  const handleLogin = data => {
    
    signIn(data.email, data.password)
      .then((result) => {
        navigate(from, { replace: true });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'successfully logged in',
          showConfirmButton: false,
          timer: 1500
      });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage)
        
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogle = () => {
    googleLogIn()
    .then(result => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
      fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(saveUser)
      })
          .then(res => res.json())
          .then(() => {
              navigate(from, { replace: true });
          })
  });
  };
  return (

        <div className="grid md:grid-cols-2 items-center">
          <div className="hidden md:block " data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
            <img className="" src='https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?w=1060&t=st=1686151801~exp=1686152401~hmac=b46e0792a27877a4013c7af185988d6f59cbbb336fbfa1c31b3ffd39b3c34f42' alt="" />
          </div>
          <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <p className="text-blue-500 text-2xl text-center font-bold">Login</p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline w-11/12"
              id="email"
              type="email"
              placeholder="email"
              name="email"
              {...register("email",{ required:'Email is required' })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex">
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              name="password"
              
              {...register("password",{ required:'password is required' })}
            />
            <i
            className={`password-toggle-icon text-2xl cursor-pointer ${showPassword ? 'visible' : ''}`}
            onClick={handleTogglePassword}
          >
            {showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye> }
          </i>
            </div>
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          
          {error && <p className="text-red-500">User Email or Password is wrong</p> }
            <button
              className="btn"
              type="submit"
            >
              Sign In
            </button>
            <p className="text-red-500 font-bold text-2xl"></p>
            <p>
             New to GlobalSpeak? Please <Link to='/register' className="font-bold text-sm text-blue-500 hover:text-blue-800">Register</Link>
            </p>
        </form>
        <p className='text-center my-3 font-semibold'>or</p>
            <div onClick={handleGoogle} className='flex items-center space-x-2 border shadow-lg rounded-2xl p-2 hover:bg-sky-200 cursor-pointer'>
            <FcGoogle></FcGoogle>
            <p> Sign in with <span>google</span></p>
            </div>
        
      </div>
    </div>
        </div>

  );
};

export default Login;
