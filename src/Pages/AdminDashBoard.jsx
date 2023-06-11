
import anime from 'animejs/lib/anime.es.js';
import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('item1');
  // const classes=useLoaderData()
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  // manage classes 
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/classes');
        setClassList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleApproveClick = async (classId) => {
    try {
      await axios.put(`http://localhost:5000/classes/${classId}`, { type: 'Approved' });
      const updatedClassList = classList.map((classItem) => {
        if (classItem._id === classId) {
          return { ...classItem, type: 'Approved' };
        }
        return classItem;
      });
      setClassList(updatedClassList);
    } catch (error) {
      console.error('Error updating class status:', error);
    }
  };


  const handleDenyClick = async (classId) => {
    try {
      await axios.put(`http://localhost:5000/classes/${classId}`, { type: 'Denied' });
      const updatedClassList = classList.map((classItem) => {
        if (classItem._id === classId) {
          return { ...classItem, type: 'Denied' };
        }
        return classItem;
      });
      setClassList(updatedClassList);
    } catch (error) {
      console.error('Error updating class status:', error);
    }
  };

  // modal 
  const handleFeedbackClick = (classItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    setFeedbackText('');
  };

  const handleSendFeedback = async () => {
    try {
      const feedback = feedbackText.trim();
      if (feedback) {
        console.log(`Sending feedback to instructor for class ID: ${selectedClass._id}`);
        console.log(`Feedback text: ${feedback}`);
      }
      handleModalClose();
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };


  // Animate table 
  const tableRef = useRef(null);

  useEffect(() => {
    anime({
      targets: tableRef.current.querySelectorAll('tr'),
      opacity: [0, 1],
      translateY: ['1rem', 0],
      easing: 'easeOutExpo',
      duration: 2000,
      delay: anime.stagger(100),
    });
  }, []);

  return (
    <div className="flex">
      <div className="w-1/6 bg-gray-200 min-h-[calc(100vh-305px)] ">
        <ul className="py-20">
          <li
            className={` py-2 md:pl-10 cursor-pointer ${
              activeItem === 'item1' ? 'bg-lime-500 text-white' : ''
            }`}
            onClick={() => handleItemClick('item1')}
          >
            Manage Classes
            

          </li>
          <li
            className={` py-2 md:pl-10 cursor-pointer ${
              activeItem === 'item2' ? 'bg-lime-500 text-white' : ''
            }`}
            onClick={() => handleItemClick('item2')}
          >
            Manage Users
          </li>
          
          
        </ul>
      </div>
      <div className="w-3/4 bg-white p-4">
        {/* classes table  */}
        {activeItem === 'item1' && 
        <table ref={tableRef} className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Photo</th>
            <th className="px-4 py-2">Class Name</th>
            <th className="px-4 py-2">Instructor</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Available Seats</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {classList.map((classItem) => (
            <tr key={classItem._id} className=' border-y-4'>
              <td className="px-4 py-2">
                <img src={classItem.image} alt={classItem.name} className="h-20 w-30 " />
              </td>
              <td className="px-4 py-2">{classItem.name}</td>
              <td className="px-4 py-2">{classItem.instructor}</td>
              <td className="px-4 py-2">{classItem.email}</td>
              <td className="px-4 py-2">{classItem.availableSeats}</td>
              <td className="px-4 py-2">${classItem.price}</td>
              <td className={`px-4 py-2 ${classItem.type==="Denied" && "text-red-500 font-semibold"} ${classItem.type==="Approved" && "text-green-500 font-semibold"} ${classItem.type==="Pending" && "animate-pulse font-bold"}`} >{classItem.type}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleApproveClick(classItem._id)}
                  disabled={classItem.type === 'Approved' || classItem.type === 'Denied'}
                  className="mr-2 bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-800"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDenyClick(classItem._id)}
                  disabled={classItem.type === 'Approved' || classItem.type === 'Denied'}
                  className="mr-2 bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-900"
                >
                  Deny
                </button>
                <button
                  onClick={() => handleFeedbackClick(classItem._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                  Send Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        }
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Send Feedback</h2>
            
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter feedback..."
              className="w-full h-24 resize-none border border-gray-300 rounded p-2 mt-2"
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSendFeedback}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Send
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        {activeItem === 'item2' && <h1>Content for Item 2</h1>}
       
      </div>
    </div>
  );
};

export default AdminDashboard;
