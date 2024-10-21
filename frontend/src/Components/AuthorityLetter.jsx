

const Authority = () => {
  const images = [
    // '/Photos/Letters/Amit-Kumar-Letter.jpg', // Replace with your image paths
    // '/Photos/Letters/HileshBhai-Letter.jpg',
    // '/Photos/Letters/Javed-Bhai-Letter.jpg',
    // '/Photos/Letters/NarayanBhai-Letter.jpg',
    // '/Photos/Letters/PrakashBhai-Letter.jpg',
    // '/Photos/Letters/RajeshBhai-Letter.jpg',
    '/Photos/kit.png',
    '/Photos/IdCard.jpg',
    '/Photos/QR.jpg',
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-600 text-left mb-8">
        Authority Letters
      </h1>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="flex justify-center">
            <img 
              src={src} 
              alt={`Authority ${index + 1}`} 
              className="object-contain w-full max-w-sm h-auto shadow-lg" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authority;
