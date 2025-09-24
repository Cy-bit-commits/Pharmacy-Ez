import Image from 'next/image';
import Link from 'next/link';
function PharmacyCard({ pharmacy }) {
  return (
    <Link href={pharmacy.link || `/pharmacy/${pharmacy.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Image 
        src={pharmacy.imageUrl} 
        alt={pharmacy.name} 
        width={300} 
        height={200} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{pharmacy.name}</h3>
        <p className="text-gray-600 text-sm">{pharmacy.address}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-green-600">{pharmacy.status}</span>
          <span className="text-sm text-gray-500">{pharmacy.distance}</span>
        </div>
      </div>
    </Link>
  );
}
export default PharmacyCard;