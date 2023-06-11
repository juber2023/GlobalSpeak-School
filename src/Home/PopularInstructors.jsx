import { useEffect, useState } from "react";

const PopularInstructors = () => {
  const [PI, SetPI] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const instructors=data.filter(i=>i.role==='Instructor')
        const topPI = instructors.slice(0, 6);
        SetPI(topPI);
      });
  }, []);
  

  return (
    <div>
        <p className="text-4xl font-semibold text-center">Popular Instructors</p>
      <hr className="border-2 border-lime-500" />
      <br />
      <div className="grid md:grid-cols-3 gap-5">
      {PI.map((p) => {
        return (
          <div key={p._id} className="card  bg-base-100 shadow-xl h-[550px] hover:scale-110 duration-150">
            <figure>
              <img
                src={p.photo}
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
