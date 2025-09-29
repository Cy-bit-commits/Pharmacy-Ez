"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'; // Import Menu and X icons

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to lock body scroll when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
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

          {/* Search Bar - Hidden on small screens, visible on medium and up */}
          <div className="hidden md:flex flex-grow max-w-xl mx-8 relative">
            <input 
              type="text" 
              placeholder="Search for products or pharmacies..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Desktop User Actions - Hidden on small screens */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" className="relative group flex items-center gap-1 text-gray-700 hover:text-green-700 transition-colors">
              <ShoppingCart size={24} />
              <span className="text-sm">Cart</span>
              {/* Example item count */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </Link>
            <Link href="/login" className="group flex items-center gap-1 text-gray-700 hover:text-green-700 transition-colors">
              <User size={24} />
              <span className="text-sm">Account</span>
            </Link>
          </div>

          {/* Mobile Menu Button - Visible only on small screens */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu size={28} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Secondary Nav */}
        <div className="bg-green-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-center lg:justify-end space-x-8 text-sm">
            <Link href="/faq" className="hover:underline">How to Order</Link>
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Panel --- */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      
      {/* Menu Content */}
      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg text-green-700">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X size={28} className="text-gray-700" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link href="/cart" className="flex items-center gap-4 text-lg text-gray-800 p-3 rounded-md hover:bg-gray-100">
            <ShoppingCart size={24} />
            <span>Cart</span>
            <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">3</span>
          </Link>
          <Link href="/login" className="flex items-center gap-4 text-lg text-gray-800 p-3 rounded-md hover:bg-gray-100">
            <User size={24} />
            <span>Account</span>
          </Link>
          <div className="border-t pt-4 mt-2">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-7 top-[152px] text-gray-400" size={20} />
          </div>
        </nav>
      </div>
    </>
  );
}