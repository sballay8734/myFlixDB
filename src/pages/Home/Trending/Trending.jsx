import "../home.scss"
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper"
import TabSwitch from "../../../components/TabSwitch/TabSwitch"
import { useState } from "react"
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../components/Carousel/Carousel"

function Trending() {
  const [endpoint, setEndpoint] = useState("day")

  const { data, loading } = useFetch(`/trending/all/${endpoint}`)

  function onTabChange(tab) {
    setEndpoint(tab === "Day" ? "day" : "week")
  }

  return (
    <div className="carousel-section">
      <ContentWrapper>
        <span className="carousel-title">Trending</span>
        <TabSwitch data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending
