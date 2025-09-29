"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { warn } from "console";
// Assuming useCart is from a context file like './context/CartContext'
// To make this a truly single file, we would need to implement the context here as well.
// For now, let's assume `useCart` is a placeholder for local state management.

// --- TYPE DEFINITIONS ---
type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

type Pharmacy = {
  name: string;
  id: string;
  logoUrl: string;
  heroImageUrl: string;
  productCategories: {
    name: string;
    products: Product[];
  }[];
};

type CartItem = Product & {
  quantity: number;
  pharmacyName: string;
};

// --- DYNAMIC DATA GENERATION ---
const initialPharmacies = [
  {
    name: "BringTikaCare",
    id: "bringtikacare",
    logoUrl: "/pharmacies/bringtikacare/png/bringTCare.png",
    heroImageUrl: "/heroes/bringtikacare-hero.png",
  },
  {
    name: "MediCarePlus",
    id: "medicareplus",
    logoUrl: "/pharmacies/medicareplus/png/mediCare.png",
    heroImageUrl: "/pharmacies/medicareplus/png/mediCare.png",
  },
  {
    name: "Zion Pharmacy",
    id: "zion",
    logoUrl: "/pharmacies/zion/png/ZionLogo.png",
    heroImageUrl: "/pharmacies/medicareplus/png/mediCare.png",
  },
];

const pharmacyImageFiles: { [key: string]: string[] } = {
  bringtikacare: [
    "calmFlex.png", "AllerCare.png", "GastroGuard.png", "RespiraTab.png",
    "wellness/ComfortNap.png", "wellness/DermaGlow.png", "wellness/Immunicare.png",
  ],
  medicareplus: [
    "Medicilin.png", "mediReleif.png", "MediGel.png",
    "wellness/MediOil.png", "wellness/MediTox.png", "wellness/MediTherapy.png",
  ],
  zion: [
    "Zion AnalgesicAntipyretic (Generic).png", "Zion AnalgesicAntipyreticDecongestantAntihistamine Syrup (Generic).png",
    "Zion Antacid (Generic).png", "Zion AntiAshtma (Generic).png", "Zion Antidiarrheal (Generic).png",
    "Zion Antihistamine (Generic).png", "Zion DecongestantAntihistamineAnalgesicAntipyretic 325mg(Generic) .png",
    "Zion DecongestantAntihistamineAnalgesicAntipyretic 500mg(Generic) .png", "Zion Laxative (Generic).png",
    "Zion MefenamicAcid (Generic).png", "Zion Mucolytic (Generic).png", "Zion Mucolytic 15mg (Generic).png",
    "Zion Mucolytic Syrup 250mg (Generic).png", "Zion Paracetamol Syrup 125mg (Generic).png",
    "Zion Paracetamol Syrup 250mg(Generic).png",
  ],
};

const formatProductName = (filename: string): string => {
  const nameWithoutExt = filename.split('/').pop()?.replace('.png', '') || '';
  return nameWithoutExt
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

const pharmacies: Pharmacy[] = initialPharmacies.map(pharmacyInfo => {
  const products: Product[] = (pharmacyImageFiles[pharmacyInfo.id] || []).map(fileName => {
    const productName = formatProductName(fileName);
    return {
      id: `${pharmacyInfo.id}-${productName.toLowerCase().replace(/\s/g, '-')}`,
      name: productName,
      price: Math.floor(Math.random() * (25 - 5 + 1)) + 5,
      imageUrl: `/pharmacies/${pharmacyInfo.id}/png/${fileName}`,
    };
  });
  return {
    ...pharmacyInfo,
    productCategories: [{
      name: "Available Products",
      products: products,
    }],
  };
});

// --- SVG ICONS ---
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.838-5.514a1.875 1.875 0 00-1.087-2.338H5.25l-.321-1.206a1.125 1.125 0 00-1.087-.835H2.25v1.5zM16.5 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8.25 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

// --- THE MAIN SHOP PAGE COMPONENT ---
export default function ShopPage() {
  // Local state management for the cart since we are in a single file
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [recentlyAddedId, setRecentlyAddedId] = React.useState<string | null>(null);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleAddToCart = (pharmacy: Pharmacy, product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl || '',
      price: product.price,
      pharmacyName: pharmacy.name,
    });
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  const handleUpdateQuantity = (productId: string, amount: number) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + amount);
    }
  };

  const { totalItems, cartTotal } = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    return { totalItems, cartTotal };
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Shop All Pharmacies
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your local Surigao City favorites, delivered.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          <main className="lg:w-2/3 space-y-16">
            {pharmacies.map((pharmacy) => (
              <section key={pharmacy.id} id={pharmacy.id}>
                <div className="flex items-center gap-4 mb-6">
                  <Image src={pharmacy.logoUrl} alt={`${pharmacy.name} Logo`} width={64} height={64} className="object-contain rounded-full shadow-md border-2 border-white" />
                  <h2 className="text-3xl font-bold text-gray-900">{pharmacy.name}</h2>
                </div>
                <div className="space-y-10">
                  {pharmacy.productCategories.map((category) => (
                    <div key={category.name}>
                      <h3 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-green-500">{category.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {category.products.map((product) => {
                          const isRecentlyAdded = recentlyAddedId === product.id;
                          return (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col transition-transform hover:-translate-y-1 duration-200">
                              <div className="relative w-full h-32 bg-gray-100">
                                {product.imageUrl && <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="contain" className="p-2" />}
                              </div>
                              <div className="p-4 flex flex-col flex-grow">
                                <p className="font-semibold text-gray-800 text-base flex-grow">{product.name}</p>
                                <p className="text-blue-600 font-bold text-lg mt-1 mb-3">${product.price.toFixed(2)}</p>
                                <button
                                  className={`w-full mt-auto px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    isRecentlyAdded
                                      ? 'bg-blue-600 text-white cursor-not-allowed'
                                      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                                  }`}
                                  onClick={() => handleAddToCart(pharmacy, product)}
                                  disabled={isRecentlyAdded}
                                >
                                  {isRecentlyAdded ? 'Added ✔' : 'Add to Cart'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>

          <aside className="lg:w-1/3">
            <div className="sticky top-8 bg-white border border-gray-200 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <Link href="/cart" className="relative group">
                  <ShoppingCartIcon />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only group-hover:not-sr-only absolute left-1/2 -translate-x-1/2 top-8 bg-black text-white text-xs rounded px-2 py-1 opacity-80">Go to Cart</span>
                </Link>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                ) : (
                  <ul className="space-y-4">
                    {cart.map(item => (
                      <li key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image src={item.imageUrl || '/placeholder.png'} alt={item.name} layout="fill" objectFit="contain" className="rounded-md border"/>
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.pharmacyName}</p>
                          <p className="text-sm font-bold text-blue-600">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1">
                          <button onClick={() => handleUpdateQuantity(item.id, -1)} className="px-2 text-gray-600 hover:text-black">-</button>
                          <span className="w-6 text-center font-medium">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.id, 1)} className="px-2 text-gray-600 hover:text-black">+</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                  <div className="flex justify-between items-center text-lg font-bold mb-4">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors " >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}