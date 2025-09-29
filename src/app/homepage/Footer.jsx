import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">PharmEZ</h3>
          <p className="text-sm">
            Your trusted partner for health and wellness delivered right to your door.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/pharmacy" className="hover:text-white transition-colors">Products</Link></li>

          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <p className="text-sm">La Salle University, Ozamis, State, 7200</p>
          <p id="contact" className="text-sm">Phone: (+63) 456-7890</p>
          <p className="text-sm">Email: PharmacEZ@PharmacEz.com</p>
        </div>
        </div>
        </footer>
        );
        }