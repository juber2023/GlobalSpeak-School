import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';

import { FcGoogle } from 'react-icons/fc';
import { UserContext } from './ContextApi';
import useTitle from '../Hooks/Usetitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {createUser,googleLogIn}=useContext(UserContext)
    const navigate=useNavigate()
    const from = location.state?.from?.pathname || "/";
    useTitle('Register')

    const handleRegister=data=>{
        // event.preventDefault()
        // const name=event.target.name.value
        
        createUser(data.email,data.password)
        .then(result=>{
            const loggedUser=result.user
            console.log(loggedUser);
            updateProfile(loggedUser,{ displayName:data.name, photoURL:data.photoURL})
            .then(() => {
              const saveUser = { name: data.name, email: data.email }
              fetch('http://localhost:5000/users', {
                  method: 'POST',
                  headers: {
                      'content-type': 'application/json'
                  },
                  body: JSON.stringify(saveUser)
              })
                  .then(res => res.json())
                  .then(data => {
                      if (data.insertedId) {
                          // reset();
                          Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: 'Account created successfully',
                              showConfirmButton: false,
                              timer: 1500
                          });
                          navigate('/');
                      }
                  })



          })
          .catch(error => console.log(error))
        })
    }

    const handleGoogle = () => {
        googleLogIn()
        .then(result => {
          const loggedInUser = result.user;
          // console.log(loggedInUser);
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
<div className="">
          
          <div className="">
      <div className="w-2/4 mx-auto">
        
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          <p className="text-lime-500 text-2xl text-center font-bold">Register</p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
            {...register("name", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              name="name"
            />
            { errors.name && <span className="text-red-600">Name is required</span>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
            {...register("email", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email"
              name="email"
              
            />
            {errors.email && <span className="text-red-600">Email is required</span>}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              Photo
            </label>
            <input
            {...register("photoURL", { required: false })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
              id="url"
              type="url"
              placeholder="photo url"
              name="photoURL"
              
            />
            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
          })}
             
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
              name="password"
            
            />
            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase and one special character.</p>}
            
          </div>
          <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Retype Password
            </label>
          <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder='Retype password'
        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
        {...register("confirmPassword",{
          required: 'Please Retype Password',
          validate: (value) =>
            value === watch('password') || 'Password does not match',
        })}
      />
      {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
          
            <button
              className="btn mt-5"
              type="submit"
            >
              Register
            </button>
            
            
            <p>
             Already have an account? Please <Link to='/login' className="font-bold text-sm text-lime-500 hover:text-lime-800">Login</Link>
            </p>
          
        </form>
        <p className='text-center my-3 font-semibold'>or</p>
            <div onClick={handleGoogle} className='flex items-center space-x-2 border shadow-lg rounded-2xl p-2 hover:bg-sky-200 cursor-pointer mb-5'>
            <FcGoogle></FcGoogle>
            <p> Sign in with <span>google</span></p>
            </div>
        
      </div>
    </div>
        </div>
    );
};

export default Register;