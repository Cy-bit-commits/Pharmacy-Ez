"use client";
import React, { useState } from "react";
import Image from "next/image";

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

type CartItem = Product & { pharmacyId: string; pharmacyName: string };

// --- MOCK DATA (Adjusted to fit the new structure) ---
const pharmacies: Pharmacy[] = [
  {
    name: "BringTikaCare",
    id: "bringtikacare",
    logoUrl: "/pharmacies/bringtikacare/png/bringTCare.png", // Placeholder path
    heroImageUrl: "/heroes/bringtikacare-hero.png", // Placeholder path
    productCategories: [
      {
        name: "Generic Medicines", // This would typically be "Generic Products" from the image
        products: [
          { id: "btc1", name: "CalmFlex", price: 10, imageUrl: "/pharmacies/bringtikacare/png/calmFlex.png" },
          { id: "btc2", name: "AllerCare", price: 15, imageUrl: "pharmacies/bringtikacare/png/AllerCare.png" },
          { id: "btc3", name: "SleepWell", price: 12, imageUrl: "/pharmacies/bringtikacare/png/GastroGuard.png" },
          { id: "btc4", name: "VitaminC", price: 8, imageUrl: "/pharmacies/bringtikacare/png/RespiraTab.png" },
        ],
      },
      {
        name: "Wellness Products",
        products: [
          { id: "btc5", name: "ComfortNap", price: 7, imageUrl: "/pharmacies/bringtikacare/png/wellness/ComfortNap.png" },
          { id: "btc6", name: "DermaGlow", price: 20, imageUrl: "/pharmacies/bringtikacare/png/wellness/DermaGlow.png" },
          { id: "btc7", name: "ImmuniCare", price: 18, imageUrl: "/pharmacies/bringtikacare/png/wellness/Immunicare.png" },
        ],
      },
      // You can add more categories as needed
    ],
  },

   {
    name: "MediCarePlus",
    id: "medicareplus",
    logoUrl: "/pharmacies/medicareplus/png/mediCare.png", // Placeholder path
    heroImageUrl: "/pharmacies/medicareplus/png/mediCare.png", // Placeholder path
    productCategories: [
      {
        name: "Generic Medicines", // This would typically be "Generic Products" from the image
        products: [
          { id: "med1", name: "MediCilin", price: 10, imageUrl: "/pharmacies/medicareplus/png/Medicilin.png" },
          { id: "med2", name: "MediReleif", price: 15, imageUrl: "pharmacies/medicareplus/png/mediReleif.png" },
          { id: "med3", name: "MediGel", price: 12, imageUrl: "/pharmacies/medicareplus/png/MediGel.png" },
          
        ],
      },
      {
        name: "Wellness Products",
        products: [
          { id: "btc5", name: "Medi-Oil", price: 7, imageUrl: "/pharmacies/medicareplus/png/wellness/MediOil.png" },
          { id: "btc6", name: "Medi-Tox", price: 20, imageUrl: "/pharmacies/medicareplus/png/wellness/MediTox.png" },
          { id: "btc7", name: "Medi-Therapy", price: 18, imageUrl: "/pharmacies/medicareplus/png/wellness/MediTherapy.png" },
        ],
      },
      // You can add more categories as needed
    ],
  },
  
  



  

  // Add more pharmacies if needed, following the same structure
];

// --- ICONS ---
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);



export default function AllPharmaciesProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (pharmacyId: string, pharmacyName: string, product: Product) => {
    setCart((prev) => [
      ...prev,
      { ...product, pharmacyId, pharmacyName },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Shop Products from Different Pharmacies</h1>

        {/* Cart summary */}
        <div className="mb-8 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-2">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart.</p>
          ) : (
            <ul className="list-disc pl-5">
              {cart.map((item, idx) => (
                <li key={idx}>
                  {item.name} (${item.price}) from <span className="font-semibold">{item.pharmacyName}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pharmacies and their products */}
        <div className="space-y-16">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id}>
              {/* Pharmacy header */}
              <div className="flex items-center gap-4 mb-4">
                <Image src={pharmacy.logoUrl} alt={`${pharmacy.name} Logo`} width={60} height={60} className="object-contain rounded" />
                <h2 className="text-2xl font-bold">{pharmacy.name}</h2>
              </div>
              {/* Categories */}
              <div className="space-y-8">
                {pharmacy.productCategories.map((category) => (
                  <div key={category.name}>
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {category.products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 p-3 text-center transition-transform hover:scale-105 duration-200">
                          <div className="relative w-full h-24 mb-2 bg-gray-100 rounded-md flex items-center justify-center">
                            {product.imageUrl ? (
                              <Image src={product.imageUrl} alt={product.name} width={80} height={80} objectFit="contain" />
                            ) : (
                              <span className="text-gray-400 text-xs">No Image</span>
                            )}
                          </div>
                          <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
                          <p className="text-blue-600 font-bold text-lg mt-1">${product.price.toFixed(2)}</p>
                          <button
                            className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            onClick={() => addToCart(pharmacy.id, pharmacy.name, product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Example of how to use this component (e.g., in your main app page) ---
// In a real Next.js app, you'd typically get the pharmacyId from the URL (e.g., via dynamic routes: /pharmacies/[pharmacyId].tsx)
// For demonstration, let's assume you'd render it like this:
/*
export default function MyMainPage() {
  return (
    // ... other layout
    <PharmacyShopPage pharmacyId="bringtikacare" />
    // ... other layout
  );
}
*/