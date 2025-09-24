import Link from 'next/link';

export default function PrimaryNav() {
  const navItems = [
    { name: 'Business Profile', href: '/business-profile' },
    { name: 'Generic Products', href: '/generic-products' },
    { name: 'Wellness Products', href: '/wellness-products' },
    { name: 'Local Partners', href: '/local-partners' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm py-3 border-b border-gray-100 hidden md:block">
      <div className="container mx-auto px-4 flex justify-center space-x-8 lg:space-x-12">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className="text-gray-700 hover:text-green-700 font-medium text-lg transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}