/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import dayjs from "dayjs"

import "./banner.scss"

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import useFetch from "../../../hooks/useFetch"
import Genres from "../../../components/Genres/Genres"
import CircleRating from "../../../components/CircleRating/CircleRating"
import Img from "../../../components/LazyLoadImg/LazyLoadImg"
import PosterFallback from "../../../assets/no-poster.png"
// import { PlayIcon } from "../Playbtn"
// import VideoPopup from "../../../components/videoPopup/VideoPopup"

const Banner = ({ video, crew }) => {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)

  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}`)

  const { url } = useSelector((state) => state.home)

  const _genres = data?.genres?.map((g) => g.id)

  const director = crew?.filter((f) => f.job === "Director")
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  )

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
  }

  return (
    <div className="details-banner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left"></div>
                  <div className="right"></div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="details-banner-skeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  )
}

export default Banner
