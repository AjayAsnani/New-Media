import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import IntroBanner from '../Components/IntroBanner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import GoToTopButton from '../Components/GoToTopButton';


const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const navigate = useNavigate();

  
    const isAdult = (dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        return (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate()))
            ? age - 1 >= 18
            : age >= 18;
    };

    async function onSubmit(data) {
        setSubmitMessage('');
        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    streetAddress: data.streetAddress,
                    town: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    phone: data.phoneNumber,
                    email: data.email,
                    nomineeName: data.nomineeName,
                    sponsorId: data.sponsorID,
                    vigilanceOfficer: 'Officer Name',
                    accountUsername: data.username,
                    password: data.password,
                }),
            });

            if (response.ok) {
                setSubmitMessage('Registration successful!');
                reset(); // Reset form fields
                navigate('/home'); // Redirect after successful registration
            } else {
                const errorData = await response.json();
                console.log('Error data:', errorData); // Log the error response for debugging
                setSubmitMessage(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmitMessage('An error occurred. Please try again.');
        }
    }

    return (
        <>
            <IntroBanner />
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-[70%] m-10">
                    <h2 className="text-3xl font-bold mb-6 text-center">Registration Form</h2>
                    {submitMessage && (
                        <div className={`text-center ${submitMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                            {submitMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* First Name */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">First Name <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('firstName', { required: 'First Name is required' })}
                                placeholder='Enter First Name'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Last Name <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('lastName', { required: 'Last Name is required' })}
                                placeholder='Enter Last Name'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Date of Birth <span className='text-red-500'>*</span></label>
                            <input
                                type="date"
                                {...register('dob', {
                                    required: 'Date of Birth is required',
                                    validate: (value) => isAdult(value) || 'You must be at least 18 years old',
                                })}
                                placeholder='Enter Age'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">
                                Phone Number <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                {...register('phoneNumber', {
                                    required: 'Phone Number is required',
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: 'Phone Number must be 10 digits',
                                    },
                                })}
                                placeholder='Enter Phone Number'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Email <span className='text-red-500'>*</span></label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email format',
                                    },
                                })}
                                placeholder='Enter Email'
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                                autoComplete='email'
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Street Address */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Street Address <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('streetAddress', { required: 'Street Address is required' })}
                                placeholder="Enter House Number and Street Name"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.streetAddress && <p className="text-red-500">{errors.streetAddress.message}</p>}
                        </div>

                        {/* Town*/}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Town <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('city', { required: 'Town is required' })}
                                placeholder="Enter Town"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                        </div>

                        {/* State Dropdown */}
                        <div className="relative">
                            <label className="block mb-1 font-semibold text-start">
                                State<span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                                {...register('state', { required: 'State is required' })} // Validation with react-hook-form
                            >
                                <option value="">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                            {/* Error Display */}
                            {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                        </div>


                        {/* City Textbox */}
                        <div className="relative mt-4">
                            <label className="block mb-1 font-semibold text-start">
                                City<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter City"
                                {...register('city', { required: 'City is required' })}
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            />
                            {/* Display Error */}
                            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                        </div>

                        {/* Pincode */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Pincode <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('pincode', {
                                    required: 'Pincode is required',
                                    pattern: {
                                        value: /^[1-9][0-9]{5}$/,
                                        message: 'Invalid Pincode',
                                    },
                                })}
                                placeholder="Enter Pincode"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}
                        </div>

                        {/* Nominee Name */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Nominee Name <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('nomineeName', { required: 'Nominee Name is required' })}
                                placeholder="Enter Nominee Name"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.nomineeName && <p className="text-red-500">{errors.nomineeName.message}</p>}
                        </div>

                        {/* Sponsor ID */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Sponsor ID <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('sponsorID', { required: 'Sponsor ID is required' })}
                                placeholder="Enter Sponsor ID"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.sponsorID && <p className="text-red-500">{errors.sponsorID.message}</p>}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block mb-1 font-semibold text-start">Username <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                {...register('username', { required: 'Username is required' })}
                                placeholder="Enter Username"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block mb-1 font-semibold text-start">Password <span className='text-red-500'>*</span></label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                placeholder="Enter Password"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 cursor-pointer">
                                {showPassword ? 'Hide' : 'Show'}
                            </span>
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="block mb-1 font-semibold text-start">Confirm Password <span className='text-red-500'>*</span></label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: (value) => value === watch('password') || 'Passwords do not match',
                                })}
                                placeholder="Confirm Password"
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:border-black"
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2 cursor-pointer">
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </span>
                            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Submit and Reset buttons */}
                        <div className="flex space-x-4 justify-center">
                            <button
                                type="submit"
                                className={`bg-blue-500 ${isSubmitting ? 'bg-blue-400 hover:bg-blue-400' : ''} w-32 rounded text-white p-2 hover:bg-blue-600`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting" : "Submit"}
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="bg-gray-500 w-32 rounded text-white p-2 hover:bg-gray-600"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <GoToTopButton />
            <Footer />
        </>
    );
};

export default RegisterPage;
