import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-2 sm:px-0">
      {/* Logo at the top left corner, links to home */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-lg shadow-md" />
          <span className="font-bold text-lg text-green-700 hidden sm:inline">Pharmac EZ</span>
        </Link>
      </div>
      <form className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col gap-4 mt-20">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-2">Login</h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="you@example.com"
            required 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="password1234"
            required 
          />
        </div>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg text-base transition-colors">
          Login
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-2 text-sm gap-2">
          <a href="#" className="text-green-600 hover:underline">Forgot Password?</a>
          <span className="text-gray-500">Don&apos;t have an account? <Link href="/register" className="text-green-600 hover:underline">Sign up!</Link></span>
        </div>
      </form>
    </div>
  );
}