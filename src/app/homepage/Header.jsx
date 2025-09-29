"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHowToOrderOpen, setIsHowToOrderOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false); // State for the FAQ modal

  // Effect to lock body scroll when any modal is open
  useEffect(() => {
    if (isMenuOpen || isHowToOrderOpen || isFaqOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isHowToOrderOpen, isFaqOpen]);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="PharmEZ Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-green-700">PharmacEZ</span>
          </Link>

          <div className="hidden md:flex flex-grow max-w-xl mx-8 relative">
            <input 
              type="text" 
              placeholder="Search for products or pharmacies..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" className="relative group flex items-center gap-1 text-gray-700 hover:text-green-700 transition-colors">
              <ShoppingCart size={24} />
              <span className="text-sm">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </Link>
            <Link href="/login" className="group flex items-center gap-1 text-gray-700 hover:text-green-700 transition-colors">
              <User size={24} />
              <span className="text-sm">Account</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu size={28} className="text-gray-700" />
            </button>
          </div>
        </div>

        <div className="bg-green-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-center lg:justify-end space-x-8 text-sm">
            <button onClick={() => setIsHowToOrderOpen(true)} className="hover:underline">How to Order</button>
            <button onClick={() => setIsFaqOpen(true)} className="hover:underline">FAQ</button>
            <Link href="#contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Panel --- */}
      {/* (Mobile menu code remains the same as before) */}
      <AnimatePresence>
        {isMenuOpen && (
             <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black bg-opacity-50 z-50"
             onClick={() => setIsMenuOpen(false)}
           />
        )}
      </AnimatePresence>
      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Mobile menu content */}
      </div>

      {/* --- How to Order Modal --- */}
      <AnimatePresence>
        {isHowToOrderOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={() => setIsHowToOrderOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsHowToOrderOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" aria-label="Close"><X size={24} /></button>
              <h2 className="text-2xl font-bold text-green-700 mb-4">How to Order</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Register for an account.</li>
                <li>Log in to your new account.</li>
                <li>Browse products and add items to your cart.</li>
                <li>Click the cart icon to review your items.</li>
                <li>Click "Proceed to Checkout" and fill in your details.</li>
                <li>Enjoy your delivery!</li>
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FAQ Modal --- */}
      <AnimatePresence>
        {isFaqOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0flex items-center justify-center z-50 p-4"
            onClick={() => setIsFaqOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsFaqOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" aria-label="Close"><X size={24} /></button>
              <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6 text-gray-700 max-h-[70vh] overflow-y-auto pr-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">What is PharmacEZ?</h3>
                  <p>PHARMAC-EZ is a school-based telepharmacy platform for La Salle University, Ozamiz City. It connects students and staff with local pharmacies through a smartphone app, offering product search, real-time delivery tracking, and cashless transactions. We prioritize over-the-counter medicines and partner exclusively with licensed local pharmacies.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">How does PharmacEZ handle partnerships?</h3>
                  <p>We see great potential for growth by partnering with local pharmacies, delivery riders, and school clinics. These partnerships help us boost visibility and reliability, expanding our services to other universities and communities in the future.</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">What is your social responsibility?</h3>
                  <p>PHARMAC-EZ aims to make healthcare more accessible. Our platform allows all students, including those with disabilities (PWDs), to easily purchase generic medications and wellness products. We are committed to enhancing student health and fostering a culture of proactive health management, with a long-term goal of serving the wider community beyond the university.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}