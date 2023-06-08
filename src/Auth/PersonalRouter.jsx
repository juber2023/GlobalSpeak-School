import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import Swal from 'sweetalert2';
import { UserContext } from './ContextApi';

const PersonalRouter = ({children}) => {
    const {user,loading}=useContext(UserContext)
    const location=useLocation()

    if(loading){
        return  <p className='animate-spin w-10 h-10 border-8 border-sky-700 border-dotted rounded-full mt-5'></p>
    }

    if(user){
        return children
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'You have to log in first',
          })
    }
    return <>
    <Navigate to='/login' state={{from:location}} replace></Navigate>
    </>
    
};

export default PersonalRouter;