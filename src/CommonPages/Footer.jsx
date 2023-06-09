import { Link } from 'react-router-dom';
import img from '../../src/assets/logo.jpg'

const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="md:container mx-auto pt-8 ">
        <div className="md:flex  justify-between items-center">
          <div className="flex items-center space-x-3">
          <img src={img} alt="logo" className="h-14 w-14 rounded-full" />
          <Link
              to="/"
              className=" font-bold text-2xl"
            >
            <span className="text-lime-500 text-4xl">G</span>lobal<span className="text-lime-500 text-4xl">S</span>peak
                 
            </Link>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <p className='text-xl font-semibold text-lime-400'>Summer Camp Way</p>
            <p>Rajshahi, Bangladesh</p>
            <p>Cell: +8801748427227</p>
            <p>info@globalspeak.com</p>
          </div>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p className='text-xl font-semibold text-lime-400'>Opening Hours:</p>
            <p>Sunday - Thursday: 9am - 5pm</p>
            <p>Friday - Saturday: Closed</p>
          </div>
        </div>
        
        <div className="text-center py-3">
          <p>&copy; 2023 GlobalSpeak. All rights reserved.</p>
        </div>
      </div>
        </footer>
    );
};

export default Footer;