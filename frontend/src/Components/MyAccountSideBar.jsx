import { useState } from 'react';
import { FaHome, FaUser, FaDollarSign, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const MyAccountSideBar = () => {
    const [isMarketingOpen, setMarketingOpen] = useState(false);
    const [isReportsOpen, setReportsOpen] = useState(false);
    const [loading, setLoading] = useState(false); // To show loading state during logout
    const [error, setError] = useState(''); // To show any errors during logout
    const navigate = useNavigate(); // For navigation after logout

    const toggleMarketing = () => setMarketingOpen(!isMarketingOpen);
    const toggleReports = () => setReportsOpen(!isReportsOpen);

    // Handle Logout Function
    const handleLogout = async () => {
        setLoading(true); // Start loading state
        setError(''); // Reset any previous errors

        try {
            const response = await fetch('http://localhost:3001/api/logout', {  // Ensure this points to your backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Ensures cookies are sent along with the request
            });
    
            if (response.ok) {
                // Clear localStorage or sessionStorage if you are using them
                localStorage.removeItem('token'); // Remove token if stored locally

                // On successful logout, redirect to login page or home page
                navigate('/login'); // Assuming you have a login page route set up
            } else {
                setError('Failed to log out'); // Show error message if logout fails
            }
        } catch (error) {
            setError('Error logging out. Please try again.'); // Handle fetch/network errors
            console.error('Error logging out:', error);
        } finally {
            setLoading(false); // Stop loading state
        }
    };
    
    return (
        <div className="w-80 h-full bg-[#1f2937] text-white p-4">
            <h1 className="text-lg font-bold">Dashboard</h1>

            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <FaHome className="mr-2" />
                <span>Dashboard</span>
            </div>
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <FaUser className="mr-2" />
                <span>Profile</span>
            </div>
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <span>Edit Your Account</span>
            </div>
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <span>Change Your Password</span>
            </div>
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <FaDollarSign className="mr-2" />
                <span>Payout Details</span>
            </div>

            {/* Marketing Dropdown */}
            <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 cursor-pointer" onClick={toggleMarketing}>
                <span>Marketing</span>
                {isMarketingOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isMarketingOpen && (
                <div className="pl-6">
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Link 1</div>
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Link 2</div>
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Link 3</div>
                </div>
            )}

            {/* Payments */}
            <div className="px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center">
                <span>Payments</span>
            </div>

            {/* Reports Dropdown */}
            <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-500 cursor-pointer" onClick={toggleReports}>
                <span>Reports</span>
                {isReportsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isReportsOpen && (
                <div className="pl-6">
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">Reports</div>
                    <div className="py-1 hover:bg-blue-500 cursor-pointer">My Team</div>
                </div>
            )}

            {/* Log Out */}
            <div
                className={`px-4 py-2 hover:bg-blue-500 cursor-pointer flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button during logout
                onClick={handleLogout}
                disabled={loading} // Disable interaction when logging out
            >
                <span>LogOut</span>
            </div>

            {/* Show error message if logout fails */}
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
    );
};

export default MyAccountSideBar;
