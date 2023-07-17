import "./home.scss"
import HeroSection from "./heroSection/HeroSection"
import Trending from "./Trending/Trending"

function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <Trending />
      <div style={{ height: 1000 }}></div>
    </div>
  )
}

export default Home
