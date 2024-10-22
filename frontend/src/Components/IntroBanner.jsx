
const IntroBanner = () => {
  return (
    <>
        <div className='flex w-full bg-[#1f2937] pt-5'>
            <div className='w-[15%] flex justify-center m-3 ml-10'>
                <img src="/Photos/Logo.png" alt="Logo" loading='lazy'
                className='w-full object-contain'/>
            </div>
            <div className='p-3 mr-14'>
                <h2 
                className='text-5xl font-bold mb-3 text-white tracking-wide'>
                    DIGITAL INDIA EDUCATION WA DIGITAL MEDIA</h2>
                <h3 className='text-3xl font-bold text-white border p-5'>
                    सब का साथ , सब का विकास
                </h3>
            </div>
        </div>
    </>
  )
}

export default IntroBanner;