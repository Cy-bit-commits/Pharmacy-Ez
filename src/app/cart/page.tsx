"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Menu, X, User, Search, LogOut, ArrowLeft } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type Product = { id: string; name: string; price: number; imageUrl?: string; };
type Pharmacy = { name: string; id: string; logoUrl: string; productCategories: { name: string; products: Product[]; }[]; };
type CartItem = Product & { quantity: number; pharmacyName: string; };

// --- STATIC DATA (safe for server rendering) ---
const initialPharmacies = [
    { name: "BringTikaCare", id: "bringtikacare", logoUrl: "/pharmacies/bringtikacare/png/bringTCare.png" },
    { name: "MediCarePlus", id: "medicareplus", logoUrl: "/pharmacies/medicareplus/png/mediCare.png" },
    { name: "Zion Pharmacy", id: "zion", logoUrl: "/pharmacies/zion/png/ZionLogo.png" },
];
const pharmacyImageFiles: { [key: string]: string[] } = {
  bringtikacare: ["calmFlex.png",
     "AllerCare.png",
      "GastroGuard.png",
       "RespiraTab.png",
       "CalmFlex.png",
      "wellness/ComfortNap.png", 
      "wellness/DermaGlow.png", 
      "wellness/Immunicare.png",
      
    ],
  medicareplus: ["Medicilin.png", "mediReleif.png", "MediGel.png", "wellness/MediOil.png", "wellness/MediTox.png", "wellness/MediTherapy.png"],
  zion: [
    "Zion AnalgesicAntipyretic (Generic).png",
    "Zion AnalgesicAntipyreticDecongestantAntihistamine Syrup (Generic).png",
    "Zion Antacid (Generic).png",
    "Zion AntiAshtma (Generic).png",
    "Zion Antidiarrheal (Generic).png",
    "Zion Antihistamine (Generic).png",
    "Zion DecongestantAntihistamineAnalgesicAntipyretic 325mg(Generic) .png",
    "Zion DecongestantAntihistamineAnalgesicAntipyretic 500mg(Generic) .png",
    "Zion Laxative (Generic).png",
    "Zion MefenamicAcid (Generic).png",
    "Zion Mucolytic (Generic).png",
    "Zion Mucolytic 15mg (Generic).png",
    "Zion Mucolytic Syrup 250mg (Generic).png",
    "Zion Paracetamol Syrup 125mg (Generic).png",
    "Zion Paracetamol Syrup 250mg(Generic).png",
    // Wellness products (in wellness/ subfolder)
    "wellness/Zion Ascorbic Acid Gummies (Wellness).png",
    "wellness/Zion Ascorbic Acid+Zinc.png",
    "wellness/Zion AscorbicAcid Kid (Wellness).png",
    "wellness/Zion AscorbicAcidZinc (Wellness).png",
    "wellness/Zion Iron-AntiAnemic(Wellness).png",
    "wellness/Zion Kids Vit+Zinc Gummies (Wellness).png",
    "wellness/Zion Kids Vitamins+Zinc Gummies (Wellness).png",
    "wellness/Zion Memo Gold (Wellness).png",
    "wellness/Zion Multivitamins + Zinc (Wellness).png",
    "wellness/Zion Multivitamins Kids Syrup.png",
    "wellness/Zion Multivitamins+Zinc+Copper (Wellness).png",
    "wellness/Zion Multivitamis (Wellness).png",
    "wellness/Zion Neurotonic (Wellness).png",
    "wellness/Zion VitaminE+Lecithin (Wellness) .png",
  ],
};
const formatProductName = (filename: string): string => {
  const name = filename.split('/').pop() || '';
  return name.replace('.png', '').replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim();
};
const adImages = ['/ads/Ad1.png', '/ads/Ad2.png', '/ads/PharmacEZAd1.png', '/ads/PharmacEZ Ad2.png', '/ads/PharmacEZAdvertisement.png', '/ads/Zion Advertisement.png'];


// --- SUB-COMPONENTS for a cleaner structure ---
const Header = ({ cartItemCount }: { cartItemCount: number }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => { 
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'; 
      return () => 
        { document.body.style.overflow = 'auto';

         }; 
        }, 
        [isMenuOpen]);
    const handleLogout = () => { setIsMenuOpen(false); alert("You have been logged out."); };
    
    return (
        <>
            <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="PharmEZ Logo" width={40} height={40} className="rounded-full" />
                    <span className="text-2xl font-bold text-green-700">PharmacEZ</span>
                    </Link>
                    <div className="hidden lg:flex flex-grow max-w-xl mx-8 relative">
                      <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link href="/cart" className="relative flex items-center gap-1 text-gray-700 hover:text-green-700"><ShoppingCart size={24} />
                        <span>
                          Cart</span>
                          {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}</span>}
                            </Link>
                        <Link href="/account" className="flex items-center gap-1 text-gray-700 hover:text-green-700">
                        <User size={24} />
                        <span>
                          Account</span></Link>
                        <button onClick={handleLogout} className="flex items-center gap-1 text-gray-700 hover:text-red-600"><LogOut size={24} /><span>Exit</span></button>
                    </div>
                    <div className="lg:hidden"><button onClick={() => setIsMenuOpen(true)} aria-label="Open menu"><Menu size={28} /></button></div>
                </div>
            </header>
            <AnimatePresence>{isMenuOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsMenuOpen(false)} />}</AnimatePresence>
            <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b"><h2 className="font-bold text-lg text-green-700">Menu</h2><button onClick={() => setIsMenuOpen(false)}><X size={28} /></button></div>
                <nav className="p-4 space-y-4"><Link href="/cart" className="flex items-center gap-4 text-lg p-3 rounded-md hover:bg-gray-100"><ShoppingCart size={24} /><span>Cart</span>{cartItemCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">{cartItemCount}</span>}</Link><Link href="/account" className="flex items-center gap-4 text-lg p-3 rounded-md hover:bg-gray-100"><User size={24} /><span>Account</span></Link><button onClick={handleLogout} className="w-full flex items-center gap-4 text-lg text-red-600 p-3 rounded-md hover:bg-red-50"><LogOut size={24} /><span>Exit</span></button></nav>
            </div>
        </>
    );
};

const HeroSection = () => {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length);
        }, 8000);
        return () => clearTimeout(timer);
    }, [currentAdIndex]);

    return (
        <section className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-4 overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between z-10 relative">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-xl text-center md:text-left mb-10 md:mb-0"><h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-4">Your Health, <br /> Delivered Fast.</h1><p className="text-xl opacity-90 mb-8">
                  Get essentials from Ozamis City&apos;s trusted pharmacies, delivered right to your doorstep.</p>
                  <Link href="#shop" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                  Start Shopping</Link>
                  </motion.div>
                <div className="relative flex-shrink-0 w-full max-w-lg h-64 md:h-80">
                  <AnimatePresence>
                    {adImages.map((src, index) => 
                      (index === currentAdIndex && 
                      <motion.div key={src} 
                      initial={{ opacity: 0, scale: 1.05 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.95 }} 
                      transition={{ duration: 0.8 }} 
                      className="absolute inset-0"
                      >
                        <Image src={src} alt="Ad" layout="fill" objectFit="cover" 
                        priority={index === 0} 
                        className="rounded-2xl shadow-2xl" 
                        />
                        </motion.div>
                      )
                      )
                      }
                      </AnimatePresence>
                      </div>
            </div>
        </section>
    );
};

type CartContentProps = {
  cart: CartItem[];
  cartTotal: number;
  handleUpdateQuantity: (id: string, amount: number) => void;
  onCheckout: () => void;
};
const CartContent = ({ cart, cartTotal, handleUpdateQuantity, onCheckout }: CartContentProps) => (
    <>
        <div className="p-6 max-h-[calc(100vh-160px)] overflow-y-auto">
            {cart.length === 0 ? (<p className="text-gray-500 text-center py-8">Your cart is empty.</p>) : (
        <ul className="space-y-4">{cart.map((item: CartItem) => (
          <li key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 relative flex-shrink-0"><Image src={item.imageUrl || '/placeholder.png'} alt={item.name} layout="fill" objectFit="contain" className="rounded-md border bg-white p-1"/>
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.pharmacyName}</p>
                        <p className="text-sm font-bold text-blue-600">₱{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1">
                          <button onClick={() => handleUpdateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full">
                            -</button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full">+</button>
                          </div>
                          </li>
                ))}</ul>
            )}

        </div>

        {cart.length > 0 && (<div className="p-6 border-t bg-gray-50 rounded-b-xl">
            <div className="flex justify-between items-center text-lg font-bold mb-4 border-b">
                <span>Total</span>
                <span className="text-green-600">₱{cartTotal.toFixed(2)}</span>
            </div>
            <hr className="h-2 bg-green-500 border-none"></hr>
            <p className="text-gray-500 font-extrabold mb-4">Payment Method:</p>
            <div className="grid grid-cols-1 gap-4">
                <button onClick={onCheckout} className="bg-green-400 hover:bg-green-200 text-white font-bold py-3 rounded-lg border-4 border-green-900 transition-colors">On cash Delivery</button>
                <button  onClick={onCheckout} className="bg-red-400 hover:bg-red-200 text-white font-bold py-3 rounded-lg border-4 border-red-900 transition-colors">G-Cash</button>
                <p className="text-red-500">Note: Temporarily unavailable</p>
                <button  className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg border-4 border-green-900 transition-colors">Debit/creditcard</button>
                <hr className= "h-2 bg-green-500 border-none"></hr>
                <p className="text-red-500">Note: Temporarily unavailable</p>
                <button className="bg-white hover:bg-gray-200   text-red-600 font-bold py-3 rounded-lg border-4 border-green-900 transition-colors">Order Check Out</button>
                
            </div>
        </div>)}
        

    </>
);


// --- THE MAIN SHOP PAGE COMPONENT ---
export default function ShopPage() {
  // --- HYDRATION FIX START ---
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only once on the client after mounting
    const generatedPharmacies = initialPharmacies.map(pharmacyInfo => {
      const allFiles = pharmacyImageFiles[pharmacyInfo.id] || [];
      const genericProducts: Product[] = allFiles.filter(f => !f.toLowerCase().includes('wellness')).map(fileName => {
        const productName = formatProductName(fileName);
        return {
          id: `${pharmacyInfo.id}-generic-${productName.toLowerCase().replace(/\s/g, '-')}`,
          name: productName,
          price: Math.floor(Math.random() * 21) + 5,
          imageUrl: `/pharmacies/${pharmacyInfo.id}/png/${fileName}`,
        };
      });
      const wellnessProducts: Product[] = allFiles.filter(f => f.toLowerCase().includes('wellness')).map(fileName => {
        const productName = formatProductName(fileName);
        return {
          id: `${pharmacyInfo.id}-wellness-${productName.toLowerCase().replace(/\s/g, '-')}`,
          name: productName,
          price: Math.floor(Math.random() * 21) + 5,
          imageUrl: `/pharmacies/${pharmacyInfo.id}/png/${fileName}`,
        };
      });
      const productCategories = [];
      if (genericProducts.length > 0) productCategories.push({ name: 'Generic Products', products: genericProducts });
      if (wellnessProducts.length > 0) productCategories.push({ name: 'Wellness Products', products: wellnessProducts });
      return { ...pharmacyInfo, productCategories };
    });
    setPharmacies(generatedPharmacies);
    setIsClient(true); // Signal that client-side rendering is complete
  }, []);
  // --- HYDRATION FIX END ---

  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => { setCart((prev) => { const existing = prev.find(i => i.id === itemToAdd.id); if (existing) return prev.map(i => i.id === itemToAdd.id ? { ...i, quantity: i.quantity + 1 } : i); return [...prev, { ...itemToAdd, quantity: 1 }]; }); };
  const updateQuantity = (id: string, qty: number) => { setCart(p => qty <= 0 ? p.filter(i => i.id !== id) : p.map(i => i.id === id ? { ...i, quantity: qty } : i)); };
  const handleAddToCart = (pharmacy: Pharmacy, product: Product) => { addToCart({ id: product.id, name: product.name, imageUrl: product.imageUrl, price: product.price, pharmacyName: pharmacy.name }); setRecentlyAddedId(product.id); setTimeout(() => setRecentlyAddedId(null), 1500); };
  const handleUpdateQuantity = (id: string, amount: number) => { const item = cart.find(i => i.id === id); if (item) updateQuantity(id, item.quantity + amount); };
  
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsMobileCartOpen(false);
    setIsOrderSuccess(true);
    setCart([]);
  };

  const { totalItems, cartTotal } = useMemo(() => ({
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
  }), [cart]);

  useEffect(() => {
    document.body.style.overflow = isMobileCartOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileCartOpen]);

  // Render a loading state until the client has mounted and generated the data
  if (!isClient) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading PharmacEZ...</p>
        </div>
    );
  }

  return (
    <>
      <Header cartItemCount={totalItems} />
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <HeroSection />
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
                      <p className="font-semibold text-gray-800 text-base flex-grow min-h-[40px]">{product.name}</p>
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
              <div className="sticky top-24 bg-white border border-gray-200 rounded-xl shadow-lg">
                <div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-900">Your Cart</h2></div>
                <CartContent cart={cart} cartTotal={cartTotal} handleUpdateQuantity={handleUpdateQuantity} onCheckout={handleCheckout} />
              </div>
            </aside>
          </div>
        </div>

        {cart.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 z-40">
            <button onClick={() => setIsMobileCartOpen(true)} className="flex items-center justify-between bg-green-600 text-white font-bold py-3 px-5 rounded-lg w-full">
              <div className="flex items-center gap-2"><ShoppingCart /><span>{totalItems} item{totalItems > 1 ? 's' : ''}</span></div>
              <span>View Cart</span><span>₱{cartTotal.toFixed(2)}</span>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMobileCartOpen && (
            <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 lg:hidden" onClick={() => setIsMobileCartOpen(false)} />
                <motion.div initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed bottom-0 left-0 right-0 h-[90vh] bg-white rounded-t-2xl z-50 lg:hidden flex flex-col">
                    <div className="p-4 border-b flex-shrink-0 flex items-center gap-4"><button onClick={() => setIsMobileCartOpen(false)}><ArrowLeft size={24}/></button><h2 className="text-xl font-bold text-gray-900">Your Cart</h2></div>
                    <CartContent cart={cart} cartTotal={cartTotal} handleUpdateQuantity={handleUpdateQuantity} onCheckout={handleCheckout} />
                </motion.div>
            </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOrderSuccess && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-xl text-center p-8 max-w-sm w-full">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6"><Check className="text-green-600 w-12 h-12" /></motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h2>
              <p className="text-gray-600 mb-6">Thank you for your purchase. Your items are being prepared for delivery.</p>
              <button onClick={() => setIsOrderSuccess(false)} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Continue Shopping</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}