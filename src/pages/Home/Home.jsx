import "./home.scss"
import HeroSection from "./heroSection/HeroSection"
import Trending from "./Trending/Trending"
import Popular from "./Popular/Popular"
import TopRated from "./TopRated/TopRated"

function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home
