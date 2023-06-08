import { useLoaderData } from "react-router-dom";

const Instructors = () => {
  const instructor = useLoaderData();
  console.log(instructor);
  return (
    <div className="grid md:grid-cols-3 gap-5 my-5">
      {instructor.map((i) => {
        return(
            <div key={i._id}>
          <div className="card card-compact  bg-base-100 shadow-xl h-96">
            <figure>
              <img
                src={i.image}
                alt="instructor"
                className="h-full w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{i.name}</h2>
              <p>{i.email}</p>
              
            </div>
          </div>
        </div>
        )
      })}
    </div>
  );
};

export default Instructors;
