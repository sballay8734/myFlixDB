import "../home.scss"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import TabSwitch from "../../../components/TabSwitch/TabSwitch"

function Trending() {
  function onTabChange(tab) {}

  return (
    <div className="carousel-section">
      <ContentWrapper>
        <span className="carousel-title">Trending</span>
        <TabSwitch data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
    </div>
  )
}

export default Trending
