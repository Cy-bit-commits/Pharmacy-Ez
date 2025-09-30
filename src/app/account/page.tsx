"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
    ArrowLeft, 
    Wallet, 
    Truck, 
    PackageCheck, 
    ShoppingBag, 
    Ticket, 
    Repeat, 
    Star, 
    Banknote, 
    LifeBuoy,
    BadgeCheck
} from 'lucide-react';

// --- Sub-components for cleaner code ---

type NavLinkProps = { icon: React.ElementType; label: string; href: string };
const NavLink = ({ icon: Icon, label, href }: NavLinkProps) => (
    <Link href={href} className="flex items-center p-4 text-gray-700 hover:bg-gray-100 transition-colors rounded-lg">
        <Icon className="w-6 h-6 mr-4 text-gray-500" />
        <span className="font-medium">{label}</span>
    </Link>
);

type StatusButtonProps = { icon: React.ElementType; count: number };
const StatusButton = ({ icon: Icon, count }: StatusButtonProps) => (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-600">
        <div className="relative">
            <Icon className="w-8 h-8" />
            {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {count}
                </span>
            )}
        </div>
    </div>
);


export default function AccountPage() {
    const router = useRouter();
    const [user, setUser] = useState({ name: 'Juan Dela Cruz', email: 'juan@email.com' });

    useEffect(() => {
        // Try to get user info from localStorage/sessionStorage
        if (typeof window !== 'undefined') {
            const name = localStorage.getItem('userName') || sessionStorage.getItem('userName');
            const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
            setUser({
                name: name || 'Juan Dela Cruz',
                email: email || 'juan@email.com',
            });
        }
    }, []);

    const handleLogout = () => {
        alert("You have been logged out.");
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto max-w-lg p-4 font-sans">
                {/* --- Page Header --- */}
                <div className="flex items-center gap-4 py-4">
                    <button onClick={() => router.back()} className="text-gray-700">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-red-600">MY ACCOUNT</h1>
                </div>

                {/* --- Profile Section --- */}
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 mb-6">
                    <Image 
                        src="/profile-placeholder.png" // Replace with user's actual profile picture
                        alt="User Profile"
                        width={64}
                        height={64}
                        className="rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-grow">
                        <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
                        <div className="text-gray-500 text-sm mb-1">{user.email}</div>
                        <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                            <BadgeCheck size={16} />
                            <span>VERIFIED</span>
                        </div>
                    </div>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-800">
                        EDIT PROFILE
                    </button>
                </div>

                {/* --- Status Buttons Section --- */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="grid grid-cols-3 divide-x divide-gray-200">
                        <StatusButton icon={Wallet} count={2} />
                        <StatusButton icon={Truck} count={1} />
                        <StatusButton icon={PackageCheck} count={3} />
                    </div>
                </div>

                {/* --- Navigation Links Section --- */}
                <div className="bg-white rounded-lg shadow-md p-2">
                    <NavLink icon={ShoppingBag} label="My Purchases" href="/account/purchases" />
                    <NavLink icon={Ticket} label="My Vouchers" href="/account/vouchers" />
                    <NavLink icon={Repeat} label="My Subscriptions" href="/account/subscriptions" />
                    <NavLink icon={Star} label="My Reviews" href="/account/reviews" />
                    <NavLink icon={Banknote} label="Payment Options" href="/account/payment" />
                    <NavLink icon={LifeBuoy} label="Help & Support" href="/help" />
                </div>

                {/* --- Log Out Button --- */}
                <div className="mt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-red-600 transition-colors shadow-md"
                    >
                        LOG-OUT
                    </button>
                </div>
            </main>
        </div>
    );
}
