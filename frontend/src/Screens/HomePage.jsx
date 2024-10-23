
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import IntroBanner from '../Components/IntroBanner'
import Login from '../Components/Login'
import JoinNow from '../Components/JoinNow'
import Authority from '../Components/AuthorityLetter'
import HomeYTVideo from '../Components/HomeYTVideo'
import GoToTopButton from '../Components/GoToTopButton'

const HomePage = () => {
  const titleProperty = {
    textalign: 'text-left',
    fontsize: 'text-5xl',
    fontColor: 'text-gray-600'
  }
  return (
    <>
      <IntroBanner />
      <Navbar />
      <JoinNow />
      {/* Flex container to center the Login component */}
      <div className="flex justify-center items-center my-10">
        <div className="w-full max-w-md">
          <Login prop={titleProperty} />
        </div>
      </div>
      <Authority />
      <HomeYTVideo />
      <GoToTopButton />
      <Footer />
    </>
  )
}

export default HomePage