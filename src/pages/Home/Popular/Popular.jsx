import "../home.scss"
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper"
import TabSwitch from "../../../components/TabSwitch/TabSwitch"
import { useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../components/Carousel/Carousel"

function Popular() {
  const [endpoint, setEndpoint] = useState("movie")

  const { data, loading } = useFetch(`/${endpoint}/popular`)

  function onTabChange(tab) {
    setEndpoint(tab === "Movies" ? "movie" : "tv")
  }

  return (
    <div className="carousel-section">
      <ContentWrapper>
        <span className="carousel-title">Popular</span>
        <TabSwitch data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  )
}

export default Popular
