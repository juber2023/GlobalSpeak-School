import { useContext } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../Auth/ContextApi";
import { useLoaderData } from "react-router-dom";
import useTitle from "../Hooks/Usetitle";

const InstructorDashboard = () => {
  const [activeItem, setActiveItem] = useState("item1");
  useTitle('Dashboard')

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  // Manage Add Class
  const { user } = useContext(UserContext);
  const handleAddClass = (event) => {
    event.preventDefault();
    const form = event.target;
    const img = form.url.value;
    const name = form.name.value;
    const price = Number(form.price.value);
    const available = Number(form.available.value);
    const sellerName = user?.displayName;
    const sellerEmail = user?.email;
    const newClass = {
      image: img,
      name: name,
      price: price,
      availableSeats: available,
      instructor: sellerName,
      email: sellerEmail,
      type: "Pending",
    };

    fetch("https://server-12-foreign-langauage.vercel.app/classes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newClass),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          window.location.reload();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Class Added",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        form.reset();
      });
  };

  // manage my enrolled classes
  const enrolledClass = useLoaderData();
  const myClass = enrolledClass.filter(
    (c) => c.instructor === user?.displayName
  );

  return (
    <div className="flex">
      <div className="w-1/6 bg-gray-200 min-h-[calc(100vh-305px)] ">
        <ul className="py-20 sticky top-0 z-50">
          <li
            className={`py-2 md:pl-10 cursor-pointer ${
              activeItem === "item1" ? "bg-lime-500 text-white" : ""
            }`}
            onClick={() => handleItemClick("item1")}
          >
            Add A Class
          </li>
          <li
            className={`py-2 md:pl-10 cursor-pointer ${
              activeItem === "item2" ? "bg-lime-500 text-white" : ""
            }`}
            onClick={() => handleItemClick("item2")}
          >
            My Classes
          </li>
        </ul>
      </div>
      <div className="w-3/4 bg-white">
        {/* Add Class  */}
        {activeItem === "item1" && (
          <form
            onSubmit={handleAddClass}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Class Name
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
                id="name"
                type="text"
                placeholder="name"
                name="name"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
                id="price"
                type="number"
                placeholder="price"
                name="price"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="available"
              >
                Available Seats
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-sky-400 focus:shadow-outline"
                id="available"
                type="number"
                placeholder="seats"
                min={1}
                name="available"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="url"
              >
                Class Photo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:focus:outline-sky-400 focus:shadow-outline"
                id="url"
                type="url"
                placeholder="photo url"
                name="url"
                required
              />
            </div>
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        )}
        {activeItem === "item2" && (
          <div className="grid md:grid-cols-3 gap-10 p-10 ">
            {myClass.map((m) => {
              return (
                <div key={m._id} >
                  <div className="card h-[450px] bg-base-100 shadow-xl ">
                    <figure>
                      <img
                        src={m.image}
                        alt="photo"
                        className="h-[300px] w-full"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {m.name}
                        <div className={`badge text-lg p-3 ${m.type=='Approved' && 'bg-green-500'} ${m.type=='Pending' && 'bg-slate-400'} ${m.type=='Denied' && 'bg-red-500'}`}>{m.type}</div>
                      </h2>
                      <hr className="border-2" />
                      <p>Price: ${m.price}</p>
                      <p>Available Seats: {m.availableSeats}</p>
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

export default InstructorDashboard;
