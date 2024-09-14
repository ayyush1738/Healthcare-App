import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Partha Pratim Paul',
      testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus eget sapien pulvinar eleifend.'
    },
    {
      id: 2,
      name: 'Dedipya Goswami',
      testimonial: 'Vestibulum vel arcu vel ligula commodo laoreet at quis libero. Donec rutrum nunc vitae sem dictum placerat.'
    },
    {
      id: 3,
      name: 'Sujal',
      testimonial: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vitae magna vel turpis dapibus tincidunt.'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  return (
    <div className="bg-gray-200 py-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Patient's Testimonials</h2>
        <Slider {...settings}>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="px-8 py-6 bg-white rounded-lg shadow-lg">
              <div className="relative">
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-6">{testimonial.testimonial}</p>
              <p className="text-sm font-bold text-gray-800">{testimonial.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
