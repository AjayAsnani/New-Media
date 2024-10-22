import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi'; // Import the arrow icon

const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-md shadow-lg flex items-center justify-center"
        >
          <FiArrowUp size={24} /> {/* Show only the icon */}
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
