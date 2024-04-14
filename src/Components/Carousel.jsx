import React, { useState, useEffect } from 'react';
import { Carousel } from "@material-tailwind/react";


export function CarouselCustomNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % 3); // Change '3' to the total number of slides
    }, 3000); // Change '3000' to the desired interval in milliseconds

    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex]);

  return (
    <Carousel
      className="rounded-xl"
      activeIndex={activeIndex}
      controls={false}
      indicators={false}
      onNext={() => setActiveIndex((activeIndex + 1) % 3)} // Change '3' to the total number of slides
    >
      <img
        src="https://t4.ftcdn.net/jpg/06/44/60/47/240_F_644604785_SQ2ZfIeK6Z9Ne8jKqYCWsrRfRIm6P5JR.jpg"
        alt="image 1"
        className="h-100 w-100 object-cover"
      />
      <img
        src="https://as1.ftcdn.net/v2/jpg/05/74/37/04/1000_F_574370409_KMr80U0Nwl3teca06Lbcjv3WWcpbrXk8.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}

export default CarouselCustomNavigation;


