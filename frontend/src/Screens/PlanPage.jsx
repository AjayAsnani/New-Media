
import IntroBanner from '../Components/IntroBanner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import GoToTopButton from '../Components/GoToTopButton';

// Array of 15 image URLs
const images = [
  '/Photos/Plan/1DMEnew.jpg',
  '/Photos/Plan/2Plan.jpg',
  '/Photos/Plan/3Plan.jpg',
  '/Photos/Plan/4Plan.jpg',
  '/Photos/Plan/5Plan.jpg',
  '/Photos/Plan/6Plan.jpg',
  '/Photos/Plan/7Plan.jpg',
  '/Photos/Plan/8Plan.jpg',
  '/Photos/Plan/9Plan.jpg',
  '/Photos/Plan/10Plan.jpg',
  '/Photos/Plan/11Plan.jpg',
  '/Photos/Plan/12Plan.jpg',
  '/Photos/Plan/13Plan.jpg',
  '/Photos/Plan/14Plan.jpg',
  '/Photos/Plan/15Plan.jpg',
  // Add more image URLs if needed
];

const PlanPage = () => {
  return (
    <>
      <IntroBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-600 text-left mb-8">
          Plans
        </h1>

        {/* Grid layout for 15 images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {images.map((src, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={src}
                alt={`Plan ${index + 1}`}
                className="object-fill w-[400px] h-[360px] shadow-lg" // Updated dimensions
              />
            </div>
          ))}
        </div>

        {/* Additional single image with fixed 900x600 size */}
        <div className="flex justify-center">
          <img
            src="/Photos/IdCard.jpg"
            alt="Single Additional Image"
            className="w-[850px] h-[550px] object-fill shadow-lg"
          />
        </div>
      </div>
      <GoToTopButton />
      <Footer />
    </>
  );
};

export default PlanPage;
