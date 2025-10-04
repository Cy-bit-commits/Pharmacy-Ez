"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection() {
  const adImages = [
    '/ads/Ad1.png',
    '/ads/Ad2.png',
    '/ads/PharmacEZAd1.png',
    '/ads/PharmacEZ Ad2.png',
    '/ads/PharmacEZAdvertisement.png',
    '/ads/Zion Advertisement.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simple cycle to the next image instead of random
      setCurrentIndex((prevIndex) => (prevIndex + 1) % adImages.length);
    }, 8000); // Change ad every 8 seconds

    return () => clearTimeout(timer);
  }, [currentIndex, adImages.length]);

  return (
    <section className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-4 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between z-10 relative gap-12">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl text-center lg:text-left"
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Your Health, <br /> Delivered Fast.
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Get essentials from Surigao City's trusted pharmacies, delivered right to your doorstep.
          </p>
          <Link href="/cart" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block">
            Shop Now
          </Link>
        </motion.div>

        {/* Image Slideshow Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-lg h-64 md:h-80 lg:h-96 rounded-2xl shadow-2xl overflow-hidden"
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % adImages.length)}
        >
          <AnimatePresence>
            {adImages.map((src, index) => (
              index === currentIndex && (
                <motion.div
                  key={src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={src}
                    alt="Pharmacy Delivery Advertisement in Surigao City" 
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-64 h-64 bg-white rounded-full -bottom-20 -left-20"></div>
        <div className="absolute w-48 h-48 bg-white rounded-full top-10 right-20 opacity-50"></div>
      </div>
    </section>
  );
}