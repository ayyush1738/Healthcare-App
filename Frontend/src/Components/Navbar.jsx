import React, { useState, useEffect } from 'react';
// import { auth, provider } from "./Config.jsx";
// import { signInWithPopup } from "firebase/auth";
// import Diagnose from './Diagnose.jsx';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Navbar = () => {
  // const navigate = useNavigate(); // Initialize useNavigate hook
  // const [value, setValue] = useState('');

  // const handleClick = () => {
  //   signInWithPopup(auth, provider).then((data) => {
  //     setValue(data.user.email);
  //     localStorage.setItem("email", data.user.email);
  //     // Navigate to '/Diagnose' after successful login
  //     navigate('/Diagnose');
  //   });
  // };

  // useEffect(() => {
  //   setValue(localStorage.getItem('email'));
  // }, []);


  return (
    <nav className="bg-white bg-opacity-75 backdrop-blur-lg text-gray-800 p-4 flex justify-between items-center fixed top-0 w-full z-30 transition duration-300 ease-in-out shadow-md" style={{ height: '70px' }}>
      {/* Project name or logo on the left */}
      <div className="flex items-center"> {/* Added flex and items-center to align logo and text */}
        <img src="../.././public/logo.png" alt="HealthLens Logo" className="h-10 mr-3" />
      </div>
      {/* Navigation items aligned to the right */}
      <ul className="flex space-x-4 items-center"> {/* Added items-center to align navigation items */}
        <li className="text-sm md:text-base hover:text-blue-500 transition duration-300 px-4 py-2"><a href="#home">Home</a></li>
        <li className="text-sm md:text-base hover:text-blue-500 transition duration-300 px-4 py-2"><a href="#about">About</a></li>
        <li className="text-sm md:text-base hover:text-blue-500 transition duration-300 px-4 py-2"><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;