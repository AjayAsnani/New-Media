
import Navbar from '../Components/Navbar'; // Reuse the same navbar

const ForgotPassword = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-[50%] max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>
          <p className="text-center mb-4">
            Enter your email to receive password reset instructions.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-blue-500"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Send Reset Link
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
