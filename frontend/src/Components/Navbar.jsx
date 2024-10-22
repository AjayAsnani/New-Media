import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to track the current path

const Navbar = () => {
    const location = useLocation(); // Get the current URL path
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname); // Set initial state to current path

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link); // Set the clicked link as active
        if (isOpen) setIsOpen(false); // Close the menu if it's open
    };

    return (
        <nav className="bg-[#1f2937] text-white sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Hamburger Icon for Mobile */}
                    <div className="flex items-center sm:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            {isOpen ? (
                                <i className="ri-close-fill ri-lg"></i> // Close icon when menu is open
                            ) : (
                                <i className="ri-menu-2-line ri-lg"></i> // Menu icon when menu is closed
                            )}
                        </button>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        {renderLinks()}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Links */}
            <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800`}>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-col space-y-1">
                        {renderLinks()}
                    </div>
                </div>
            </div>
        </nav>
    );

    // Helper function to render all links
    function renderLinks() {
        const links = [
            { to: '/home', label: 'Home' },
            { to: '/plan', label: 'Plan' },
            { to: '/legalDocument', label: 'Legal Document' },
            { to: '/login', label: 'Login' },
            { to: '/register', label: 'Register' },
            { to: '/accountPage', label: 'My Account' },
        ];

        return links.map(({ to, label }) => (
            <Link
                key={to}
                to={to}
                onClick={() => handleLinkClick(to)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeLink === to ? 'bg-gray-700' : ''
                } hover:bg-gray-700`}
            >
                {label}
            </Link>
        ));
    }
};

export default Navbar;
