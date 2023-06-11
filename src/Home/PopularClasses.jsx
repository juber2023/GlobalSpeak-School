import { useEffect, useState } from "react";

const PopularClasses = () => {
  const [PC, SetPC] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => {
        const topPC = data.slice(0, 6);
        SetPC(topPC);
      });
  }, []);
  

  return (
    <div className="my-5">
      <p className="text-4xl font-semibold text-center">Popular Classes</p>
      <hr className="border-2 border-lime-500" />
      <br />
      <div className="grid md:grid-cols-3 gap-5">
      {PC.map((p) => {
        return (
          <div key={p._id} className="card glass h-[550px] hover:scale-110 duration-150">
            <figure>
              <img
                src={p.image}
                alt="class"
                className="w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <p>Instructor: {p.instructor}</p>
              <p>Available Seats: {p.availableSeats}</p>
              <p>Price: ${p.price}</p>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default PopularClasses;
