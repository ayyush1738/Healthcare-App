import './App.css';
import React from "react";
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Testimonials from './Components/Testimonial';
import Footer from './Components/Footer';
import Diagnose from './Components/Diagnose';

function App() {
  return (
    <div className="w-full h-screen bg-no-repeat bg-cover">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <Footer />
      {/* <Diagnose/> */}
    </div>
  );
}

export default App;