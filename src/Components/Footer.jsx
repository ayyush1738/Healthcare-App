import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';



const Footer = () => {
  return (
    <div className="p-4 flex justify-between items-center" style={{ background: " rgb(155 174 230)" }}>
      {/* Left side */}
      <div className="flex space-x-4">
        <img src="public\logo.png" alt="Fortis" className="h-12" />
        <div>
          <p className="font-bold text-white-800">HealthLens</p>
          <address className="not-italic text-sm " style={{ font: " rgb(255 255 255 )" }}>
            SRM University AP , Amravati , Andhra Pradesh
          </address>
        </div>
      </div>

      {/* Right side */}
      <div className="text-lg text-gray-600">STAY IN TOUCH

        <div className="flex space-x-2">
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
        </div>
      </div>


      {/* Our Team */}
      <div className="text-sm">
        <p className="font-bold text-gray-800 mt-4">Our Team</p>
        <ul className="list-disc pl-6">
          <li>Joydeep Ghosh</li>
          <li>Supriya Manna</li>
          <li>Hari Govind</li>
          <li>Ayush Singh Rathore</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;



