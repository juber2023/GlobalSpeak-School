import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ClassesCard = ({ item, userRole, user }) => {
  const { image, name, instructor, availableSeats, price, _id } = item;
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddSelect = () => {
    if (user && user.email) {
      const selectItem = {
        selectItemId: _id,
        name,
        image,
        availableSeats,
        price,
        email: user.email,
      };
      fetch("http://localhost:5000/enroll", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Food added on the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to select the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div>
      <div className="card h-[600px] glass">
        <figure>
          <img src={image} alt="class" className="w-full h-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Name: {name}</h2>
          <p>Instructor: {instructor}</p>
          <p>Available Seats: {availableSeats}</p>
          <p>Price: ${price}</p>
          <div className="card-actions justify-end">
            <button
            onClick={handleAddSelect}
              className="btn"
              disabled={userRole === "Admin" || userRole === "Instructor"}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesCard;
