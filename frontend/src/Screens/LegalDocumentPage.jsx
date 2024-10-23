
import IntroBanner from '../Components/IntroBanner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import GoToTopButton from '../Components/GoToTopButton';

const images = [
  '/Photos/LegalDocuments/PanCarddetails.jpg',
  '/Photos/LegalDocuments/MSMEDetails.jpg',
  '/Photos/LegalDocuments/PublicNoticePage1.jpg',
  '/Photos/LegalDocuments/PublicNoticePage2.jpg',
  '/Photos/LegalDocuments/PublicNoticePage3.jpg',
  '/Photos/LegalDocuments/NodhaniKaDakhla.jpg',
];

const LegalDocumentPage = () => {
  return (
    <>
      <IntroBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-600 text-left mb-8">
          Legal Documents
        </h1>

        {/* Grid layout for images in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10">
          {images.map((src, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={src}
                alt={`Legal Document ${index + 1}`}
                className="object-contain w-full h-auto max-h-[700px] shadow-lg" // Maintain aspect ratio
                style={{
                  maxWidth: '700px',
                  maxHeight: '700px',
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <GoToTopButton />
      <Footer />
    </>
  );
};

export default LegalDocumentPage;
