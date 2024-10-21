import { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CardGenerator = () => {
    const [userProfile, setUserProfile] = useState({
        name: '',
        designation: '',
        userMobile: '',
        profilePhoto: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserProfile({
                    name: data.name,
                    designation: data.designation,
                    userMobile: data.userMobile,
                    profilePhoto: data.profilePhoto,
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const frontRef = useRef(null); // Reference for the front side
    const backRef = useRef(null);  // Reference for the back side

    const downloadCard = async () => {
    // Capture the front side
    const frontCanvas = await html2canvas(frontRef.current, {
        scale: 2, // Higher resolution capture
        useCORS: true,
    });

    // Capture the back side
    const backCanvas = await html2canvas(backRef.current, {
        scale: 2, // Higher resolution capture
        useCORS: true,
    });

    const frontImage = frontCanvas.toDataURL('image/png');
    const backImage = backCanvas.toDataURL('image/png');

    const cardWidthMM = 420 * 0.264583; // Convert 420px to mm
    const cardHeightMM = 258 * 0.264583; // Convert 258px to mm
    const gapMM = 10; // Set the gap size in mm (adjust as needed)

    const totalHeight = cardHeightMM * 2 + gapMM; // Total height of the card including the gap

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [cardWidthMM * 2, totalHeight], // Set the total height for the document
    });

    // Calculate center x position
    const centerX = (doc.internal.pageSize.getWidth() - cardWidthMM) / 2;

    // Calculate center y position for the entire card
    const centerY = (doc.internal.pageSize.getHeight() - totalHeight) / 2;

    // Add the front side to the PDF, centered
    doc.addImage(frontImage, 'PNG', centerX, centerY, cardWidthMM, cardHeightMM);
    
    // Add the back side below the front side, with a gap
    doc.addImage(backImage, 'PNG', centerX, centerY + cardHeightMM + gapMM, cardWidthMM, cardHeightMM);

    // Save the PDF
    doc.save('digital-media-card.pdf');
};

    
    

    return (
        <div>
            <div className='w-full flex justify-center gap-10'>
                <div className="flex flex-col items-center">
                    {/* Front Side */}
                    <div className="w-[420px] h-[258px] rounded-lg shadow-xl bg-white relative overflow-hidden" ref={frontRef}>
                        {/* Header */}
                        <div className="flex items-center">
                            <img
                                src="public/Photos/Logo.jpg"
                                alt="Logo"
                                className="pl-2 w-30 h-20 object-fill"
                            />
                            <div className='w-full'>
                                <h2 className='text-[18px] pt-2 tracking-wider text-nowrap text-center font-extrabold text-red-600'>
                                    <span className='text-[22px]'>D</span>IGITAL <span className='text-[22px]'>I</span>NDIA <span className='text-[22px]'>E</span>DUCATION
                                </h2>
                                <p className='text-center font-bold mt-[-10px]'>wa</p>
                                <h2 className='tracking-wide text-center mt-[-10px] bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent text-[35px] font-extrabold'>
                                    DIGITAL MEDIA
                                </h2>
                            </div>
                        </div>

                        {/* Photo and Info Section */}
                        <div className='px-2'>
                            <p className="text-[11px] text-red-500 text-center font-bold ">IDENTITY CARD</p>
                            <div className="flex">
                                <div className='mt-[-15px]'>
                                    <img
                                        src={userProfile.profilePhoto || 'public/Photos/PersonIcon.jpg'}
                                        alt="Profile"
                                        className="w-20 h-15 border-[1px] border-gray-500"
                                    />
                                </div>

                                <div className="ml-4 text-[12px] font-semibold leading-snug flex-grow">
                                    <p>
                                        <span className="font-bold">NAME: </span>
                                        <span className="font-normal">{userProfile.name || 'Loading...'}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">DESIGNATION: </span>
                                        <span className="font-normal">{userProfile.designation || 'Loading...'}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">USER MOBILE: </span>
                                        <span className="font-normal">{userProfile.userMobile || 'Loading...'}</span>
                                    </p>
                                    <p>
                                        <span className="font-bold">WORKING AREA: </span>
                                        <span className="font-normal">ALL INDIA</span>
                                    </p>
                                </div>

                                {/* QR Code Section */}
                                <div className="ml-4">
                                    <img
                                        src="public/Photos/QR.jpg"
                                        alt="QR Code"
                                        className="w-16 h-16"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="left-0 right-0 mt-1">
                            <div className="bg-blue-700 mb-[1px] text-white text-center py-1 text-[12px] font-bold">
                                सबका साथ, सबका विकास
                            </div>
                            <div className="bg-red-600 text-white text-center pt-1 text-[13px] font-medium tracking-wider">
                                www.digitalindiaeducation.co.in
                            </div>
                            <div className="bg-red-600 text-white text-center pb-3 text-[14px] font-medium tracking-wide">
                                REGISTERED UNDER GOVERNMENT OF INDIA
                            </div>
                        </div>
                    </div>

                    {/* Back Side */}
                    <div className="w-[420px] h-[258px] rounded-lg shadow-xl bg-white relative overflow-hidden mt-4" ref={backRef}>
                        <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white text-center py-2 font-semibold text-[12px] leading-tight">
                            <p className="text-[15px] tracking-wide ">DIGITAL INDIA EDUCATION & DIGITAL INDIA MEDIA</p>
                            <p className="text-[10px]">REGISTERED UNDER GOVERNMENT OF INDIA REGISTRATION NO GJ 01 0200853</p>
                        </div>

                        <div className="px-4 pt-1 text-[10px] leading-tight mt-[-5px]">
                            <p className="font-bold underline text-[15px] text-center mb-1 text-red-600">Declaration</p>
                            <ul className="list-disc pl-5 font-semibold text-[11px]">
                                <li>This Card is issued for the Identification of the Member & must be produced on demand.</li>
                                <li>The Card Holder is authorized to book advertisements from all over India for the website & promote the website throughout India.</li>
                                <li>This Card Is Not A Reporter Card.</li>
                                <li>The Company Is Not Liable For any illegal activity of the card holder.</li>
                                <li>If the Card is lost, the Member must lodge an FIR & inform the issuing authority.</li>
                                <li>This Card is not valid anymore after the validity date.</li>
                                <li>After Expire validity of card, the member must renew the card.</li>
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white text-center mt-1 text-[12px] font-semibold leading-tight">
                            Corporate Office: E-112, Siddhi Appartment, Near Madhuvan Society, Ghodasar, Ahmedabad - 380050
                        </div>
                        <div className="bg-gradient-to-r tracking-wide from-blue-500 to-red-500 text-white pb-1 text-center text-[12px] font-medium leading-tight">
                            www.digitalindiaeducation.co.in
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex items-center justify-center mt-5'>
                <button onClick={downloadCard} className='bg-[#1f2937] hover:bg-[#1f2937e2] text-white py-2 px-4 rounded-xl'>
                    Download Card
                </button>
            </div>
        </div>
    );
};

export default CardGenerator;