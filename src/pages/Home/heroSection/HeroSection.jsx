import "./hero-section.scss"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useFetch from "../../../hooks/useFetch"
import { useSelector } from "react-redux"
import LazyLoadImg from "../../../components/LazyLoadImg/LazyLoadImg"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"

function HeroSection() {
  const [backgroundImg, setBackgroundImg] = useState("")
  const [query, setQuery] = useState("")

  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackgroundImg(bg)
  }, [data])

  function queryHandler(e) {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
      setQuery("")
    }
  }

  function searchClickHandler() {
    if (query.length > 0) {
      navigate(`/search/${query}`)
      setQuery("")
    }
  }

  return (
    <div className="hero">
      {!loading && (
        <div className="background-img">
          <LazyLoadImg src={backgroundImg} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="hero-content">
            <span className="title">Welcome.</span>
            <span className="sub-title">
              Unlock a World of Entertainment: Countless Films, Series, and
              Faces Await. Jump in!
            </span>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search for a movie or show....."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={queryHandler}
                value={query}
              />
              <button onClick={searchClickHandler}>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroSection
