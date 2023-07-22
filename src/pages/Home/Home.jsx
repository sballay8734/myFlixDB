import "./home.scss"
import HeroSection from "./heroSection/HeroSection"
import Trending from "./Trending/Trending"
import Popular from "./Popular/Popular"

function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <Trending />
      <Popular />
      <div style={{ height: 1000 }}></div>
    </div>
  )
}

export default Home
