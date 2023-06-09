import { useEffect, useState } from "react";

const PopularInstructors = () => {
  const [PI, SetPI] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/instructors")
      .then((res) => res.json())
      .then((data) => {
        const topPI = data.slice(0, 6);
        SetPI(topPI);
      });
  }, []);
  console.log(PI);

  return (
    <div>
        <p className="text-4xl font-semibold text-center">Popular Instructors</p>
      <hr className="border-2 border-lime-500" />
      <br />
      <div className="grid md:grid-cols-3 gap-5">
      {PI.map((p) => {
        return (
          <div key={p._id} className="card  bg-base-100 shadow-xl h-[550px]">
            <figure>
              <img
                src={p.image}
                alt="instructor"
                className="w-full h-[400px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {p.name}
                <div className="badge badge-secondary">Popular</div>
              </h2>
              
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{p.email}</div>

              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default PopularInstructors;
