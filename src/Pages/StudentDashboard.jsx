import { useContext } from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { UserContext } from "../Auth/ContextApi";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineDoneOutline } from "react-icons/Md";
import Swal from "sweetalert2";
import useTitle from "../Hooks/Usetitle";

const StudentDashboard = () => {
  const [activeItem, setActiveItem] = useState("item1");
  const { user } = useContext(UserContext);
  useTitle("Dashboard")

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  // manage selected class
  const selectedClass = useLoaderData();
  const mySelectedClass = selectedClass.filter(
    (c) => c.email === user.email && !c.enroll
  );
  const myEnrolledClass = selectedClass.filter(
    (c) => c.email === user.email && c.enroll
  );
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://server-12-foreign-langauage.vercel.app/enroll/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              window.location.reload();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };


  return (
    <div className="flex">
      <div className="w-1/6 bg-gray-200 min-h-[calc(100vh-305px)] ">
        <ul className="py-20 sticky top-0 z-50">
          <li
            className={` py-2 md:pl-10 cursor-pointer ${
              activeItem === "item1" ? "bg-lime-500 text-white" : ""
            }`}
            onClick={() => handleItemClick("item1")}
          >
            My Selected Classes
          </li>
          <li
            className={` py-2 md:pl-10 cursor-pointer ${
              activeItem === "item2" ? "bg-lime-500 text-white" : ""
            }`}
            onClick={() => handleItemClick("item2")}
          >
            My Enrolled Classes
          </li>
        </ul>
      </div>
      <div className="w-3/4 bg-white ">
        {/* manage selected class  */}
        {activeItem === "item1" && (
          <div>
            <div className="overflow-x-auto w-full border-r-4">
              <table className="table w-full text-center">
                {/* head */}
                <thead className="bg-slate-400">
                  <tr className="text-xl">
                    <th></th>
                    <th>Image</th>
                    <th>Class Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mySelectedClass.map((item, index) => (
                    <tr className="border-y-4 border-t-0" key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className=" w-16 h-16 rounded-xl">
                            <img src={item.image} alt="class photo" />
                          </div>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td className="">${item.price}</td>
                      <td className="space-x-5">
                        <Link
                          to={`/payment/${item._id}`}
                          className="btn text-white"
                        >
                          <button>Pay</button>
                        </Link>
                        <button
                          onClick={() => handleDelete(item)}
                          className=" p-3 bg-red-500  text-white rounded-xl hover:bg-red-800"
                        >
                          <FaTrashAlt></FaTrashAlt>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeItem === "item2" && (
          <div className="grid md:grid-cols-3 gap-10 p-10">
            {myEnrolledClass.map((e) => {
              return (
                <div key={e._id} >
                  <div className="card  glass h-[450px]">
                    <figure>
                      <img
                        src={e.image}
                        alt="photo"
                        className="h-[300px] w-full"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{e.name}</h2>
                      <p>Instructor: {e.instructor}</p>
                      <div className="card-actions justify-end items-center text-lime-500">
                      <MdOutlineDoneOutline className=" text-xl"></MdOutlineDoneOutline>
                        <button className="text-xl font-semibold"> Successfully Paid</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
