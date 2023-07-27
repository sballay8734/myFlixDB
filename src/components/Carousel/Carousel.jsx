/* eslint-disable react/prop-types */
import "./carousel.scss"
import { useRef } from "react"
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill
} from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import dayjs from "dayjs"

import ContentWrapper from "../ContentWrapper/ContentWrapper"
import Img from "../LazyLoadImg/LazyLoadImg"
import PosterFallback from "../../assets/no-poster.png"
import CircleRating from "../CircleRating/CircleRating"
import Genres from "../Genres/Genres"

function Carousel({ data, loading, endpoint, title }) {
  const carouselContainer = useRef()
  const { url } = useSelector((state) => state.home)
  const navigate = useNavigate()

  function skeletonItem() {
    return (
      <div className="skeleton-item">
        <div className="poster-block skeleton"></div>
        <div className="text-block">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    )
  }

  function navigation(direction) {
    const container = carouselContainer.current

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20)

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carousel-title">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carousel-left-nav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel-right-nav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div ref={carouselContainer} className="carousel-items">
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback
              return (
                <div
                  key={item.id}
                  className="carousel-item"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="poster-block">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 3)} />
                  </div>
                  <div className="text-block">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="loading-skeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel
