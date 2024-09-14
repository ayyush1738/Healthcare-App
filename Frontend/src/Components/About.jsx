import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Our Services</h1>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:border-blue-500 border-2 border-transparent hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">X-ray Analysis</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias similique cumque quae excepturi sequi quia nobis facere, aliquid officiis? Rerum minima ea at temporibus illum mollitia voluptas ratione laborum consequatur!
          </p>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:border-green-500 border-2 border-transparent hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-green-600">Booking Appointment</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias similique cumque quae excepturi sequi quia nobis facere, aliquid officiis? Rerum minima ea at temporibus illum mollitia voluptas ratione laborum consequatur!
          </p>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:border-purple-500 border-2 border-transparent hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2 text-purple-600">Giving Ptiority</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias similique cumque quae excepturi sequi quia nobis facere, aliquid officiis? Rerum minima ea at temporibus illum mollitia voluptas ratione laborum consequatur!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
