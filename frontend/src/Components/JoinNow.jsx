

const JoinNow = () => {
  return (
    <>
      <h2 className="text-start text-3xl font-bold mt-8 pl-10 text-gray-600">JOIN NOW</h2>
      <div className='flex w-full justify-center items-center p-5'>
        <div className='w-1/2 flex flex-col items-center'>
          <div className='mb-4'>
            <img 
              src="/Photos/Logo.png" 
              alt="Logo Image" 
              className="w-64 h-auto"
            />
          </div>
          <div className='text-center'>
            <h3 className="font-semibold text-lg">Member</h3>
            <p className="text-lg">₹2,500.00</p>
          </div>
          <div className='flex flex-col items-center mt-4'>
            <a href="" className="text-black hover:underline mb-2">Add Review</a>
            <button className="bg-[#1f2937] text-white py-2 px-4 rounded-full hover:bg-[#1f2937e2] transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
        <div className='w-1/2 flex items-center justify-center'>
          <img 
            src="/Photos/Plan/3Plan.jpg" 
            alt="Join Now Image" 
            className="w-[90%] h-auto" // Ensure it takes full width of its parent
          />
        </div>
      </div>
    </>
  );
}

export default JoinNow;
