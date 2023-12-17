import React, { useState } from 'react';

const YourComponent = () => {
  const [data, setData] = useState([
    { id: 'B-0001', name: 'Milo', status: '1', parent: 'Phyo Min', breed: 'Rottweiler', gender: 'Male', dob: '23.3.2000', phone: '09 877 766 345', address: 'No.35 Thirihaymar St, Zawana Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0002', name: 'Bella', status: '2', parent: 'Zayar', breed: 'Chiwhawha', gender: 'Female', dob: '3.3.2001', phone: '09 232 766 345', address: 'No. 90 BoAung St, MarGa Qtr', township: 'Yankin', city: 'Yangon' },
    { id: 'B-0003', name: 'Kitty', status: '1', parent: 'Yae', breed: 'Golden Reteriver', gender: 'Male', dob: '2.3.2002', phone: '09 877 121 345', address: 'No. 32, Mahar Ban Lann, Ta Mar Di Qtr', township: 'Yankin', city: 'Yangon' }
  ]);

  const deleteObject = (idToDelete) => {
    const updatedData = data.filter(item => item.id !== idToDelete);
    setData(updatedData);
    console.log(`Object with id '${idToDelete}' deleted successfully.`);
  };

  return (
    <div>
      {/* Render your data or use it as needed */}
      {data.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.status}</p>
          <p>{item.parent}</p>
          <p>{item.breed}</p>
          <p>{item.gender}</p>
          <p>{item.dob}</p>
          <p>{item.phone}</p>
          <p>{item.address} {item.township} {item.city}</p>
          <hr />
          {/* Add more properties as needed */}
          <button onClick={() => deleteObject(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
