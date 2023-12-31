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
        name: name,
        image,
        instructor,
        availableSeats,
        price,
        email: user.email,
      };
      fetch("https://server-12-foreign-langauage.vercel.app/enroll", {
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
              position: "center",
              icon: "success",
              title: "Class Selected",
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
          <h2 className="card-title">{name}</h2>
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
