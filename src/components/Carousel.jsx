import React, { useState } from 'react';
import { FontAwesomeIcon } from '@/icons'

const Carousel = ({ imgList }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % imgList.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + imgList.length) % imgList.length);
  };

  return (
    <div className="rounded-lg border-y-2 border-y-ured relative w-full aspect-[5/3]">
      <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {imgList.map((image, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0">
              <img
                src={image}
                alt={`carousel-${idx}`}
                className="w-full h-full object-cover"
                onError={e => {
                  e.currentTarget.onError = null;
                  e.currentTarget.src = "/images/placeholder.png";
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {imgList.length > 1
        && <>
          <FontAwesomeIcon
            icon="chevron-left"
            onClick={prevImage}
            className="absolute top-1/2 left-1 transform -translate-y-1/2 text-xs p-1 md:p-2 aspect-square rounded-full bg-black bg-opacity-50 text-white"
          >
            &#10094;
          </FontAwesomeIcon>
          <FontAwesomeIcon
            icon="chevron-right"
            onClick={nextImage}
            className="absolute top-1/2 right-1 transform -translate-y-1/2 text-xs p-1 md:p-2 aspect-square rounded-full bg-black bg-opacity-50 text-white"
          >
            &#10095;
          </FontAwesomeIcon>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {imgList.map((_, idx) => (
              <FontAwesomeIcon
                key={idx}
                icon="circle"
                className={`text-tiny md:text-xs ${idx === current ? 'text-white' : 'text-gray-400'}`}
              />
            ))}
          </div>
        </>
      }
    </div>
  );
};

export default Carousel;
