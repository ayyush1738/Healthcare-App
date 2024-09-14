import React, { useState, useEffect } from "react";
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Testimonials from './Components/Testimonial';
import Footer from './Components/Footer';
import Diagnose from './Components/Diagnose';
import Chat from './Components/chatMessage';
import Loader from './Components/Loader'; // Assuming you have a Loader component

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Change the duration as needed (5 seconds here)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-no-repeat bg-cover relative">
      {isLoading && <Loader />} {/* Render loader only if loading */}
      {!isLoading && (
        <>
          <Chat />
          <Navbar />
          <Hero />
          <About />
          <Testimonials />
          <Footer />
          {/* <Diagnose/> */}
        </>
      )}
    </div>
  );
}

export default App;