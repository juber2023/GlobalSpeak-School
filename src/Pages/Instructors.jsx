import { useLoaderData } from "react-router-dom";

const Instructors = () => {
  const users = useLoaderData();
  const instructor=users.filter(i=>i.role==='Instructor')
  console.log(instructor);
  return (
    <div>
      <p className="text-4xl font-semibold text-center">All Instructors</p>
      <hr className="border-2 border-lime-500" />
      <br />
      <div className="grid md:grid-cols-3 gap-7 my-5 ">
      {instructor.map((i) => {
        return(
            <div key={i._id} className="h-[550px] hover:scale-110 duration-75">
          <div className="card card-compact  bg-base-100 shadow-xl h-96">
            <figure>
              <img
                src={i.photo}
                alt="instructor"
                className="h-72 w-full"
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
    </div>
  );
};

export default Instructors;
