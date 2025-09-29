"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
import { Check, ShoppingCart } from 'lucide-react'; // Import Check icon

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
    { name: "BringTikaCare", id: "bringtikacare", logoUrl: "/pharmacies/bringtikacare/png/bringTCare.png" },
    { name: "MediCarePlus", id: "medicareplus", logoUrl: "/pharmacies/medicareplus/png/mediCare.png" },
    { name: "Zion Pharmacy", id: "zion", logoUrl: "/pharmacies/zion/png/ZionLogo.png" },
];

const pharmacyImageFiles: { [key: string]: string[] } = {
  bringtikacare: ["calmFlex.png", "AllerCare.png", "GastroGuard.png", "RespiraTab.png", "wellness/ComfortNap.png", "wellness/DermaGlow.png", "wellness/Immunicare.png"],
  medicareplus: ["Medicilin.png", "mediReleif.png", "MediGel.png", "wellness/MediOil.png", "wellness/MediTox.png", "wellness/MediTherapy.png"],
  zion: ["Zion AnalgesicAntipyretic (Generic).png", "Zion Antacid (Generic).png", "Zion AntiAshtma (Generic).png", "Zion Antidiarrheal (Generic).png", "Zion Antihistamine (Generic).png", "Zion MefenamicAcid (Generic).png", "Zion Mucolytic (Generic).png"],
};

const formatProductName = (filename: string): string => {
  const nameWithoutExt = filename.split('/').pop()?.replace('.png', '') || '';
  return nameWithoutExt.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim();
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
  return { ...pharmacyInfo, productCategories: [{ name: "Available Products", products: products }] };
});

const adImages = ['/ads/Ad1.png', '/ads/Ad2.png', '/ads/PharmacEZAd1.png', '/ads/PharmacEZ Ad2.png', '/ads/PharmacEZAdvertisement.png', '/ads/Zion Advertisement.png'];


// --- THE MAIN SHOP PAGE COMPONENT ---
export default function ShopPage() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let nextIndex;
      do { nextIndex = Math.floor(Math.random() * adImages.length); }
      while (nextIndex === currentAdIndex && adImages.length > 1);
      setCurrentAdIndex(nextIndex);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentAdIndex]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false); // New state for the modal

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemToAdd.id);
      if (existingItem) return prevCart.map((item) => item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) return prevCart.filter(item => item.id !== productId);
      return prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item);
    });
  };

  const handleAddToCart = (pharmacy: Pharmacy, product: Product) => {
    addToCart({ id: product.id, name: product.name, imageUrl: product.imageUrl || '', price: product.price, pharmacyName: pharmacy.name });
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  const handleUpdateQuantity = (productId: string, amount: number) => {
    const item = cart.find((item) => item.id === productId);
    if (item) updateQuantity(productId, item.quantity + amount);
  };

  const handleCheckout = () => {
    setIsOrderSuccess(true); // Show the success modal
    setCart([]); // Clear the cart
  };

  const { totalItems, cartTotal } = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    return { totalItems, cartTotal };
  }, [cart]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        
        <section className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-4 overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between z-10 relative">
                <div className="max-w-xl text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-4">Your Health, <br /> Delivered Fast.</h1>
                    <p className="text-xl opacity-90 mb-8">Get items from Ozamis City&apos;s trusted pharmacies, delivered to your doorstep.</p>
                    <Link href="#shop" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">Start Shopping</Link>
                </div>
                <div className="relative flex-shrink-0 w-full max-w-lg h-64 md:h-80">
                    {adImages.map((src, index) => (
                        <Image key={src} src={src} alt="Ad" layout="fill" objectFit="cover" priority={index === 0} className={`absolute inset-0 rounded-2xl shadow-2xl transition-opacity duration-1000 ease-in-out ${index === currentAdIndex ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                </div>
            </div>
        </section>

        <div id="shop" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="text-center mb-12"><h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">Shop All Pharmacies</h2><p className="mt-2 text-lg text-gray-600">Convenience from your local favorites in Ozamis City.</p></header>
            <div className="flex flex-col lg:flex-row gap-12">
                <main className="lg:w-2/3 space-y-16">
                    {pharmacies.map((pharmacy) => (
                        <section key={pharmacy.id}>
                            <div className="flex items-center gap-4 mb-6"><Image src={pharmacy.logoUrl} alt={`${pharmacy.name} Logo`} width={64} height={64} className="object-contain rounded-full shadow-md border-2 border-white bg-white p-1" /><h3 className="text-3xl font-bold text-gray-900">{pharmacy.name}</h3></div>
                            {pharmacy.productCategories.map((category) => (
                                <div key={category.name}>
                                    <h4 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-emerald-500">{category.name}</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {category.products.map((product) => (
                                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                                <div className="relative w-full h-36 bg-gray-100 overflow-hidden">{product.imageUrl && <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="contain" className="p-3 transition-transform duration-300 group-hover:scale-110" />}</div>
                                                <div className="p-4 flex flex-col flex-grow">
                                                    <p className="font-semibold text-gray-800 text-base flex-grow">{product.name}</p>
                                                    <p className="text-blue-600 font-bold text-xl mt-1 mb-3">₱{product.price.toFixed(2)}</p>
                                                    <button onClick={() => handleAddToCart(pharmacy, product)} disabled={recentlyAddedId === product.id} className={`w-full mt-auto px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${recentlyAddedId === product.id ? 'bg-blue-600 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'}`}>{recentlyAddedId === product.id ? 'Added ✔' : 'Add to Cart'}</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                    ))}
                </main>
                <aside className="hidden lg:block lg:w-1/3">
                    <div className="sticky top-8 bg-white border border-gray-200 rounded-xl shadow-lg">
                        <div className="p-6 border-b flex items-center justify-between"><h2 className="text-2xl font-bold text-gray-900">Your Cart</h2><Link href="/cart" className="relative group"><ShoppingCart />{totalItems > 0 && (<span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{totalItems}</span>)}</Link></div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">{cart.length === 0 ? (<p className="text-gray-500 text-center py-8">Your cart is empty.</p>) : (<ul className="space-y-4">{cart.map(item => (<li key={item.id} className="flex items-center gap-4"><div className="w-12 h-12 relative flex-shrink-0"><Image src={item.imageUrl || '/placeholder.png'} alt={item.name} layout="fill" objectFit="contain" className="rounded-md border"/></div><div className="flex-grow"><p className="font-semibold">{item.name}</p><p className="text-sm text-gray-500">{item.pharmacyName}</p><p className="text-sm font-bold text-blue-600">₱{item.price.toFixed(2)}</p></div><div className="flex items-center gap-2 border border-gray-300 rounded-md p-1"><button onClick={() => handleUpdateQuantity(item.id, -1)} className="px-2 text-gray-600 hover:text-black">-</button><span className="w-6 text-center font-medium">{item.quantity}</span><button onClick={() => handleUpdateQuantity(item.id, 1)} className="px-2 text-gray-600 hover:text-black">+</button></div></li>))}</ul>)}</div>
                        {cart.length > 0 && (<div className="p-6 border-t bg-gray-50 rounded-b-xl"><div className="flex justify-between items-center text-lg font-bold mb-4"><span>Total</span><span>₱{cartTotal.toFixed(2)}</span></div><button onClick={handleCheckout} className="block w-full text-center bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">Proceed to Checkout</button></div>)}
                    </div>
                </aside>
            </div>
        </div>

        {cart.length > 0 && (<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 z-40"><button onClick={handleCheckout} className="flex items-center justify-between bg-green-600 text-white font-bold py-3 px-5 rounded-lg w-full"><div className="flex items-center gap-2"><ShoppingCart /><span>{totalItems} item{totalItems > 1 ? 's' : ''}</span></div><span>Checkout</span><span>₱{cartTotal.toFixed(2)}</span></button></div>)}
      </div>

      {/* --- Order Success Modal --- */}
      <AnimatePresence>
        {isOrderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  opacity-90 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white rounded-2xl shadow-xl text-center p-8 max-w-sm w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6"
              >
                <Check className="text-green-600 w-12 h-12" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your items are being prepared for delivery.
              </p>
              <button
                onClick={() => setIsOrderSuccess(false)}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}