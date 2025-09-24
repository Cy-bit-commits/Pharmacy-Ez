import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User, Heart, MessageSquare } from 'lucide-react'; // Example icons

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo.png" 
            alt="PharmEZ Logo" 
            width={40} 
            height={40} 
            className="rounded-full" // Modern touch
          />
          <span className="text-2xl font-bold text-green-700">PharmacEZ</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl mx-8 relative">
          <input 
            type="text" 
            placeholder="Search for products or pharmacies..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="relative group flex items-center gap-1 text-gray-700 hover:text-green-700 transition-colors">
            <ShoppingCart size={24} />
            <span className="text-sm hidden md:inline">Cart</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span> {/* Example item count */}
          </Link>
          <Link href="/login" className="group flex items-center gap-1 text-gray-700 hover:text-green-700 transition-colors">
            <User size={24} />
            <span className="text-sm hidden md:inline">Account</span>
          </Link>
          <Link href="/login" className="group flex items-center gap-1 text-gray-700 hover:text-green-700 transition-colors">
            <Heart size={24} />
            <span className="text-sm hidden md:inline">Wishlist</span>
          </Link>
        </div>
      </div>

      {/* Secondary Nav (under search, similar to your 'ORDER ONLINE' bar) */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-center lg:justify-end space-x-8 text-sm">
          <Link href="/login" className="hover:underline">How to Order</Link>
          <Link href="/login" className="hover:underline">FAQ</Link>
          <Link href="/login" className="hover:underline">Contact Us</Link>
          <Link href="/login" className="hover:underline">Blog</Link>
        </div>
      </div>
    </header>
  );
}