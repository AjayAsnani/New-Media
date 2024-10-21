

const MyAccountProfile = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-6 w-full max-w-6xl flex">
        {/* Left Side: Profile Picture and Name */}
        <div className="flex items-center">
          <img
            src="/Photos/Profile.jpeg" // Replace with the correct path for the profile image
            alt="Profile"
            className="rounded-full w-24 h-24 mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">TRIPATHI AVADHKISHOR</h1>
            <p className="text-gray-500 mt-1">Congratulation Welcome to our Family</p>
            <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              Member
            </span>
          </div>
        </div>

        {/* Right Side: Referrals, Earnings, and Rank Progress */}
        <div className="ml-auto flex flex-col justify-between">
          {/* Referrals and Earnings */}
          <div className="flex space-x-8">
            <div className="text-center">
              <h2 className="text-gray-600 font-semibold">Referrals</h2>
              <p className="text-2xl font-bold text-gray-800">83</p>
            </div>
            <div className="text-center">
              <h2 className="text-gray-600 font-semibold">Earnings</h2>
              <p className="text-2xl font-bold text-gray-800">12,640.00 INR</p>
            </div>
          </div>

          {/* Rank Progress Bar */}
          <div className="mt-4">
            <p className="text-gray-500 mb-2">Until Senior Sales Officer Rank...</p>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountProfile;
