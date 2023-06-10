import React from 'react';

const AdminManageClasses = () => {
    return (
        <div>
            <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Class Name</th>
          <th>Instructor Name</th>
          <th>Instructor Email</th>
          <th>Available Seats</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <img src={item.image} alt={item.className} style={{ width: '50px', height: '50px' }} />
            </td>
            <td>{item.className}</td>
            <td>{item.instructorName}</td>
            <td>{item.instructorEmail}</td>
            <td>{item.availableSeats}</td>
            <td>{item.price}</td>
            <td>{item.status}</td>
            <td>
              <button onClick={() => handleApprove(item.id)}>Approve</button>
              <button onClick={() => handleDeny(item.id)}>Deny</button>
              <button onClick={() => handleSendFeedback(item.id)}>Send Feedback</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
    );
};

export default AdminManageClasses;