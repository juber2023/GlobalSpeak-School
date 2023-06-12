
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
