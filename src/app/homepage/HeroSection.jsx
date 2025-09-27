import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between z-10 relative">
        <div className="max-w-md text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Your Health, <br /> Delivered.
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Everything is made easy with PharmEZ. Get your medications and wellness products quickly.
          </p>
          <Link href="/products" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
            Shop Now
          </Link>
        </div>
        <div className="flex-shrink-0">
          <Image 
            src="/pharmacy.png" // Placeholder for a modern delivery image
            alt="Pharmacy Delivery" 
            width={500} 
            height={350} 
            priority
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
      {/* Background patterns or shapes for a modern look */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-64 h-64 bg-white rounded-full -bottom-20 -left-20 animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 bg-white rounded-full top-10 right-20 opacity-50 animate-pulse-slow delay-100"></div>
      </div>
    </section>
  );
}