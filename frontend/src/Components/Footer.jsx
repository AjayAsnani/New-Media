
import { FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa'; // Import icons from React Icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      {/* First Row - Three Columns */}
      <div className="flex justify-between mb-4 ml-8">
        {/* First Column */}
        <div className="flex-1  mx-4 mb-4 md:mb-0 ">
          <h2 className="text-lg font-bold text-center">Digital India Education</h2>
          <p className="mt-2 leading-8">
            डिजिटल इंडिया मोदी सरकार द्वारा एकछत्र अभियान है जिसके अंतर्गत बहोत सारे अभियानों का आरम्भ करना सरकार का मूल उद्देश्य है| डिजिटल इंडिया प्रोजेक्ट भारत के वर्तमान सरकार (मोदी सरकार) द्वारा 2 जुलाई 2015 को शुरू किया गया था| इस अभियान का जश्न पूरा एक सप्ताह तक किया गया जिसे “डिजिटल वीक” कहा जा रहा है|
          </p>
        </div>

        {/* Second Column */}
        <div className="flex-1 mx-4 mb-4 md:mb-0">
          <h2 className="text-lg font-bold text-center">Digital Media</h2>
          <p className="mt-2 leading-8">
            डिजिटल इंडिया योजना प्रधानमंत्री नरेन्द्र मोदी द्वारा शुरू किया गया है| इस अवसर पर देश की कई बड़ी - बड़ी बिजनेस मैन और अन्य जानी मानी हस्तियाँ मौजूद थे|
          </p>
        </div>

        {/* Third Column */}
        <div className="flex-1 mb-4 md:mb-0" >
          <h2 className="text-lg font-bold text-center">Follow Us</h2>
          <div className="flex justify-center gap-8 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
            className='bg-[#343a40] p-2 '>
              <FaFacebook className="text-2xl hover:text-blue-600" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
            className='bg-[#343a40] p-2'>
              <FaYoutube className="text-2xl hover:text-red-600" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer"
            className='bg-[#343a40] p-2'>
              <FaWhatsapp className="text-2xl hover:text-green-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Second Row - Copyright */}
      <div className="flex justify-center items-center">
        <p className="text-center text-md">
          © 2024 DIGITAL INDIA EDUCATION • DIGITAL MEDIA
        </p>
      </div>
    </footer>
  );
};

export default Footer;
