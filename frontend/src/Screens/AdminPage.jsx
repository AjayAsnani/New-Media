import{ useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users'); // Ensure this is the correct URL
        console.log('Fetched Users:', response.data); // Log the fetched data
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error); // Log the error if it occurs
      }
    };

    fetchUsers(); // Call the function to fetch data
  }, []);

  // Rest of your Admin component code...


  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl text-white font-bold">Admin Panel</h1>
        </div>
        <div>
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <i className={`ri-${darkMode ? 'sun-line' : 'moon-line'}`}></i>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {/* User Management Table */}
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="overflow-x-auto">
          <table className={`min-w-full border-collapse ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <thead>
              <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <th className="border border-gray-300 p-2">First Name</th>
                <th className="border border-gray-300 p-2">Last Name</th>
                <th className="border border-gray-300 p-2">Street Address</th>
                <th className="border border-gray-300 p-2">Town</th>
                <th className="border border-gray-300 p-2">State</th>
                <th className="border border-gray-300 p-2">Pincode</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Nominee Name</th>
                <th className="border border-gray-300 p-2">Sponsor ID</th>
                <th className="border border-gray-300 p-2">Vigilance Officer</th>
                <th className="border border-gray-300 p-2">Account Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className={`hover:bg-${darkMode ? 'gray-800' : 'gray-100'}`}>
                  <td className="border border-gray-300 p-2">{user.firstName}</td>
                  <td className="border border-gray-300 p-2">{user.lastName}</td>
                  <td className="border border-gray-300 p-2">{user.streetAddress}</td>
                  <td className="border border-gray-300 p-2">{user.town}</td>
                  <td className="border border-gray-300 p-2">{user.state}</td>
                  <td className="border border-gray-300 p-2">{user.pincode}</td>
                  <td className="border border-gray-300 p-2">{user.phone}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.nomineeName}</td>
                  <td className="border border-gray-300 p-2">{user.sponsorId}</td>
                  <td className="border border-gray-300 p-2">{user.vigilanceOfficer}</td>
                  <td className="border border-gray-300 p-2">{user.accountUsername}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
