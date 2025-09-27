"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


// Example cart data (replace with real data or context/store in production)
const initialCart = [
  {
    id: 1,
    name: 'MediTox 500mg',
    price: 25.0,
    quantity: 2,
    imageUrl: 'pharmacies/medicareplus/png/mediTox.png',
  },
  {
    id: 2,
    name: 'Calm flex ',
    price: 8.00,
    quantity: 1,
    imageUrl: 'pharmacies/bringtikacare/png/calmFlex.png',
  },
  {
    id: 3,
    name: 'MediOil ',
    price: 24.00,
    quantity: 1,
    imageUrl: '/mediOil.png',
  },
  {
    id: 4,
    name: 'MediReleif',
    price: 8.00,
    quantity: 1,
    imageUrl: '/mediReleif.png',
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const handleQuantityChange = (id: number, qty: number) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart(cart => cart.filter(item => item.id !== id)); //removes item from the cart
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // calculates the totalprices

  return (
    <div>
      {/* Logo at the top left corner, links to home */}
      <div style={{ position: 'absolute', top: 32, left: 32 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Image src="/logo.png" alt="Logo" width={48} height={48} style={{ borderRadius: 10, objectFit: 'cover', boxShadow: '0 2px 8px #e3e8ee', cursor: 'pointer' }} />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1a2233', marginLeft: 8 }}>Pharmac EZ</span>
        </Link>
      </div>
    <div className="min-h-screen bg-gray-50 py-6 px-2 sm:px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-700 text-center">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-12 sm:py-16">
            Your cart is empty.
            <br />
            <Link href="/products" className="text-green-600 hover:underline mt-4 inline-block">Shop Products</Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-6 sm:mb-8">
              {cart.map(item => (
                <li key={item.id} className="flex flex-col sm:flex-row items-center py-4 sm:py-6 gap-4 sm:gap-6">
                  <Image src={item.imageUrl} alt={item.name} width={96} height={96} className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-md border" style={{ maxWidth: '100%', height: 'auto' }} />
                  <div className="flex-1 w-full">
                    <div className="font-semibold text-base sm:text-lg text-gray-800">{item.name}</div>
                    <div className="text-gray-500 text-sm">₱{item.price.toFixed(2)}</div>
                    <div className="flex items-center mt-2 gap-2">
                      <label htmlFor={`qty-${item.id}`} className="text-sm">Qty:</label>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 border rounded px-2 py-1 text-center"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold mt-2 sm:mt-0 sm:ml-4"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
              <span className="text-lg sm:text-xl font-bold">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-green-700">₱{total.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-base sm:text-lg transition-colors"
              onClick={() => alert('Order placed! (Demo only)')}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
    </div>
  );
}
