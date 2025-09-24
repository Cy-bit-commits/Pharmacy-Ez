




import Header from './homepage/Header';
import HeroSection from './homepage/HeroSection';
import PharmacyCard from './homepage/PharmacyCard';
import Footer from './homepage/Footer';

// Example pharmacy data (replace with real data or fetch from API)
const pharmacies = [
  {
    id: 1,
    name: 'Medi Tox',
    address: 'Used to temporarily improve the appearance of moderate to severe facial wrinkles by relaxing overactive facial muscles',
    imageUrl: '/mediTox.png',
    status: 'Available',
    distance: 'Medicare',
  },
  {
    id: 2,
    name: 'Medi Oil',
    address: 'For hair health, Medi Grade olive oil ear drops to soften earwax, or various traditional liniments and massage oils for muscle pain relief',
    imageUrl: '/mediOil.png',
    status: 'Closed',
    distance: 'MediCare',
  },
  {
    id: 3,
    name: 'Medi Releif',
    address: 'For headaches, body aches, and fever, or generic pain relievers containing ingredients like paracetamol and ibuprofen',
    imageUrl: '/mediReleif.png',
    status: 'Available',
    distance: 'MediCare',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* Pharmacy List Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Drugs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {pharmacies.map(pharmacy => (
              <PharmacyCard key={pharmacy.id} pharmacy={{ ...pharmacy, link: '/cart' }} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
