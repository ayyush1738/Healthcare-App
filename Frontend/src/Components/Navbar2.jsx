import React from 'react';


const Navbar2 = () => {
    return (
        <nav className="backdrop-blur-lg text-white p-4 flex justify-between items-center fixed top-0 w-full z-30 transition duration-300 ease-in-out shadow-md" style={{ height: '70px' }}>

            <div className="flex items-center">
                <img src="/logo.png" alt="HealthLens Logo" className="h-10 mr-3" />
                <a href="#home" className="text-2xl font-bold hover:text-blue-500 transition duration-300">HealthLens</a>
            </div>

            <ul className="flex space-x-4 items-center">
                <li className="text-sm md:text-base hover:text-blue-500 transition duration-300 px-4 py-2"><a href="#home">Home</a></li>
                <li className="text-sm md:text-base hover:text-blue-500 transition duration-300 px-4 py-2"><a href="#about">About</a></li>
                <li className="text-sm md:text-base hover:text-blue-500 transition duration-300 px-4 py-2"><a href="#contact">Contact</a></li>

            </ul>
        </nav>

    );
};

export default Navbar2;

