"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// This is a complete and self-contained HeroSection component
export default function HeroSection() {
  // List of ad images in /public/ads
  const adImages = [
    '/ads/Ad1.png',
    '/ads/Ad2.png',
    '/ads/PharmacEZAd1.png',
    '/ads/PharmacEZ Ad2.png',
    '/ads/PharmacEZAdvertisement.png',
    '/ads/Zion Advertisement.png',
  ];

  // State now holds the INDEX of the current ad, not the path
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // This effect sets up a timer to change to the next ad
    const timer = setTimeout(() => {
      let nextIndex;
      // Pick a new random index, ensuring it's not the same as the current one
      do {
        nextIndex = Math.floor(Math.random() * adImages.length);
      } while (nextIndex === currentIndex && adImages.length > 1);
      
      setCurrentIndex(nextIndex); // Trigger the transition by updating the index
    }, 10000); // Change ad every 10 seconds

    // Cleanup function to clear the timer when the component unmounts or re-renders
    return () => clearTimeout(timer);
  }, [currentIndex, adImages.length]); // Re-run the effect whenever the currentIndex changes


  return (
    <section className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-4 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between z-10 relative">
        <div className="max-w-md text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Your Health, <br /> Delivered.
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Everything is made easy with Pharmac EZ. Get your medications and wellness products from Surigao City's trusted pharmacies, delivered right to your doorstep.
          </p>
          <Link href="/cart" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Shop Now
          </Link>
        </div>

        {/* Image container for the cross-fade effect */}
        <div className="relative flex-shrink-0 w-[500px] h-[350px]"onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % adImages.length)}>
          
          {adImages.map((src, index) => (
            <Image 
              key={src} // Add a key for each image
              src={src}
              alt="Pharmacy Delivery Advertisement in Surigao City" 
              layout="fill"
              objectFit="cover"
              priority={index === 0} // Only prioritize the first image for faster initial load
              className={`
                absolute inset-0 rounded-lg shadow-xl
                transition-opacity duration-1000 ease-in-out
                ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
              `}
            />
          ))}
        </div>
      </div>
      
      {/* Background patterns for a modern look */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-64 h-64 bg-white rounded-full -bottom-20 -left-20 animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 bg-white rounded-full top-10 right-20 opacity-50 animate-pulse-slow delay-100"></div>
      </div>
    </section>
  );
}