
import { useState } from 'react';

const InstructorDashboard = () => {
  const [activeItem, setActiveItem] = useState('item1');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 min-h-[calc(100vh-305px)] ">
        <ul className="py-20 ">
          <li
            className={`px-4 py-2 cursor-pointer ${
              activeItem === 'item1' ? 'bg-lime-500 text-white' : ''
            }`}
            onClick={() => handleItemClick('item1')}
          >
            Item 1
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${
              activeItem === 'item2' ? 'bg-lime-500 text-white' : ''
            }`}
            onClick={() => handleItemClick('item2')}
          >
            Item 2
          </li>
          <li
            className={`px-4 py-2 cursor-pointer ${
              activeItem === 'item3' ? 'bg-lime-500 text-white' : ''
            }`}
            onClick={() => handleItemClick('item3')}
          >
            Item 3
          </li>
          
        </ul>
      </div>
      <div className="w-3/4 bg-white p-4">
        
        {activeItem === 'item1' && <h1>Content for Item 1</h1>}
        {activeItem === 'item2' && <h1>Content for Item 2</h1>}
        {activeItem === 'item3' && <h1>Content for Item 3</h1>}
      </div>
    </div>
  );
};

export default InstructorDashboard;
