import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserIdentity } from './ContextApi';
import Swal from 'sweetalert2';

const PersonalRouter = ({children}) => {
    const {user,loading}=useContext(UserIdentity)
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
            title: 'You have to log in first to view details',
          })
    }
    return <>
    <Navigate to='/login' state={{from:location}} replace></Navigate>
    </>
    
};

export default PersonalRouter;