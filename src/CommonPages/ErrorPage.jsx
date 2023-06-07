import { Link } from "react-router-dom";
import useTitle from "../Hooks/Usetitle";

const ErrorPage = () => {
  useTitle("Error");
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div>
        <img
          className="h-96 rounded-lg"
          src="https://img.freepik.com/free-vector/flat-404-error-template_23-2147741200.jpg?w=826&t=st=1686108106~exp=1686108706~hmac=b8ab2464ab417fa954f3add006d305787d47067280a2aff18d1d000e9511a6e7"
          alt=""
        />
      </div>

      <button className=" mt-5 relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span className="absolute animate-ping w-full h-full rounded-md bg-blue-400 opacity-75"></span>
        <Link className="relative" to="/">
          Back to home
        </Link>
      </button>
    </div>
  );
};

export default ErrorPage;
