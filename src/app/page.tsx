import Header from './homepage/Header';
import HeroSection from './homepage/HeroSection';
import PharmacyCard from './homepage/PharmacyCard';
import Footer from './homepage/Footer';

// --- Data Layer ---
// In a real application, this data would be fetched from an API.
// The data has been standardized for consistency.
const pharmacies = [
  {
    id: "truecare",
    name: 'True Care ',
    address: 'Carmen Annex, Ozamis City',
    imageUrl: '/pharmacies/truecare/png/trueCare.png',
    status: 'Open',
    distance: 2, // Distance in kilometers (number)
  },
  {
    id: "medicareplus",
    name: 'Medi Care Plus',
    address: 'Port Road, Ozamis City',
    imageUrl: '/pharmacies/medicareplus/png/mediCare.png',
    status: 'Closed', // Inconsistent key
    distance: 5,
  },
  {
    id: "zion",
    name: 'Zion Pharmacy',
    address: 'Rizal Avenue, Ozamis City',
    imageUrl: '/pharmacies/zion/png/ZionLogo.png',
    status: 'Open',
    distance: 8,
  },
   
];

// --- UI Component ---
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {/* Use flex-1 to ensure this section grows and pushes the footer down */}
      <main className="flex-1">
        <HeroSection />

        {/* Pharmacy List Section */}
        {/* Adjusted padding for better responsiveness and added max-width */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
           Local Pharmacies
          </h2>
          {/* Fixed responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-24">
            {pharmacies.map(pharmacy => {
              // Prepare props to handle data inconsistencies and formatting
              const pharmacyProps = {
                ...pharmacy,
                status: pharmacy.status || pharmacy.status || 'N/A', // Handles inconsistent 'status' key
                distance: `${pharmacy.distance}km away`,
                link: `/cart`,
              };

              return <PharmacyCard key={pharmacy.id} pharmacy={pharmacyProps} />;
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}