import { useState } from 'react';

const StudentDashboard = () => {
  const [activeItem, setActiveItem] = useState('item1');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="flex">
      <div className="w-1/6 bg-gray-200 min-h-[calc(100vh-305px)] ">
        <ul className="py-20 sticky top-0 z-50">
          <li
            className={` py-2 md:pl-10 cursor-pointer ${
              activeItem === 'item1' ? 'bg-lime-500 text-white' : ''
            }`}
            onClick={() => handleItemClick('item1')}
          >
            My Selected Classes
          </li>
          <li
            className={` py-2 md:pl-10 cursor-pointer ${
              activeItem === 'item2' ? 'bg-lime-500 text-white' : ''
            }`}
            onClick={() => handleItemClick('item2')}
          >
            My Enrolled Classes
          </li>
          
          
        </ul>
      </div>
      <div className="w-3/4 bg-white ">
        
        {activeItem === 'item1' && <h1>Content for Item 1</h1>}
        {activeItem === 'item2' && <h1>Content for Item 2</h1>}
      </div>
    </div>
  );
};

export default StudentDashboard;
