// Import necessary Firebase modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from './Config.jsx';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Hero = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if the user is already signed up
    const checkSignUpStatus = async () => {
      // Handle the check if the user is already signed up
    };

    checkSignUpStatus();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in the database
      await set(ref(getDatabase(), `users/${user.uid}`), {
        name,
        email,
        password,
        phone,
        selectedOption,
      });

      console.log('User created:', user);
      navigate('/Diagnose');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("email",userCredential.user.email)
      // console.log('User logged in:', userCredential.user.email);
      navigate('/Diagnose');
    } catch (error) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="bg-blue-50 py-20 px-4 md:px-0 flex items-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="text-left md:text-center md:mr-12">
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Roboto Slab', serif" }}>
              Welcome to HealthLens
            </h1>
            <p className="text-xl md:text-2xl lg:text-4xl font-light text-gray-600 mb-8" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              From Shadows to Clarity: Your Health Deciphered.
            </p>
            <button onClick={() => setShowSignup(true)} className="bg-blue-500 hover:bg-blue-200 text-white font-bold text-lg md:text-xl lg:text-2xl py-5 px-12 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Diagnose
            </button>
          </div>
          <div className="hidden md:block w-596 h-896 bg-transparent ml-12">
            {/* Add your image here */}
            <img src="public\doctor.png" alt="HealthLens Image" className="object-contain" style={{ width: '300%', height: '300%', maxWidth: '300%', position: 'relative', left: '-124%' }} />
          </div>
        </div>
      </div>

      {/* Signup form modal */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 " style={{zIndex:"100"}}>
          <div className="bg-white p-8 rounded-lg max-w-md relative">
            <button onClick={() => setShowSignup(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" required />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" required />
              <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" required>
                <option value="data1">Pneumonia</option>
                <option value="data2">Covid-19</option>
              </select>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">Submit</button>
            </form>
            <p className="text-gray-600 mt-2">Already have an account? <span onClick={() => {setShowLogin(true); setShowSignup(false)}} className="text-blue-500 cursor-pointer">Login here</span></p>
          </div>
        </div>
      )}

      {/* Login form modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg max-w-md relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2" required />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out">Login</button>
            </form>
            <p className="text-gray-600 mt-2">Don't have an account? <span onClick={() => {setShowSignup(true); setShowLogin(false)}} className="text-blue-500 cursor-pointer">Sign up here</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;

