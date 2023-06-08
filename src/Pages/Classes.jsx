import React from "react";
import { useLoaderData } from "react-router-dom";

const Classes = () => {
  const classes = useLoaderData();
  console.log(classes);
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {classes.map((c) => {
        return (
          <div key={c._id} className="card h-[600px] glass">
            <figure>
              <img
                src={c.image}
                alt="class"
                className="w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Name: {c.name}</h2>
              <p>Instructor: {c.instructor}</p>
              <p>Available Seats: {c.availableSeats}</p>
              <p>Price: ${c.price}</p>
              <div className="card-actions justify-end">
                <button className="btn">Select</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Classes;
