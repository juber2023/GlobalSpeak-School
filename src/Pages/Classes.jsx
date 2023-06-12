
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Auth/ContextApi";
import Swal from "sweetalert2";
import ClassesCard from "./classesCard";

const Classes = () => {
  const classes = useLoaderData();
  const approvedClasses=classes.filter(c=>c.type==='Approved')

  // disabled button 
  const { user} = useContext(UserContext);
  const [userRole, setUserRole] = useState(null);

  const [allUsers, SetAllUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        SetAllUsers(data);
      });
  }, []);

  useEffect(() => {
    if (user && allUsers.length > 0) {
      const loggedUser = allUsers.find((u) => u.email === user.email);

      if (loggedUser) {
        setUserRole(loggedUser.role);
      } else {
        setUserRole("No user found");
      }
    }
  }, [user, allUsers]);

  // select class 
  // const { name, image, price, recipe, _id } = item;
  // const {user} = useContext(AuthContext);
  // const [, refetch] = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleAddSelect = item => {
      
//       if(user && user.email){
//           const selectItem = {menuItemId: _id, name, image, price, email: user.email}
//           fetch('http://localhost:5000/enroll', {
//               method: 'POST',
//               headers: {
//                   'content-type': 'application/json'
//               },
//               body: JSON.stringify(selectItem)
//           })
//           .then(res => res.json())
//           .then(data => {
//               if(data.insertedId){
                  
//                   Swal.fire({
//                       position: 'top-end',
//                       icon: 'success',
//                       title: 'Food added on the cart.',
//                       showConfirmButton: false,
//                       timer: 1500
//                     })
//               }
//           })
//       }

//       else{
//         Swal.fire({
//             title: 'Please login to order the food',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Login now!'
//           }).then((result) => {
//             if (result.isConfirmed) {
//               navigate('/login', {state: {from: location}})
//             }
//           })
//     }
// }

  
  
  return (
    <div>
      <p className="text-4xl font-semibold text-center">All Classes</p>
      <hr className="border-2 border-lime-500" />
      <br />
      <div className="grid md:grid-cols-3 gap-5 my-3">
      {approvedClasses.map((item) => <ClassesCard key={item._id} userRole={userRole} item={item} user={user}></ClassesCard> )}
    </div>
    </div>
  );
};

export default Classes;
