// /plugins/image-slider/components/Slider.js
import React from 'react';

const Slider = ({ images }) => {
  return (
    <div className="image-slider">
      {images.map((image, index) => (
        <div key={index} className="slide">
          <img src={image.src} alt={image.alt} />
        </div>
      ))}
    </div>
  );
};

export default Slider;
