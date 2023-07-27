/* eslint-disable react/prop-types */
import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import dayjs from "dayjs"

import "./banner.scss"

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper"
import useFetch from "../../../hooks/useFetch"
import Genres from "../../../components/Genres/Genres"
import CircleRating from "../../../components/CircleRating/CircleRating"
import Img from "../../../components/LazyLoadImg/LazyLoadImg"
import PosterFallback from "../../../assets/no-poster.png"
import PlayButton from "./PlayButton"

const Banner = ({ video, crew }) => {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}`)

  const { url } = useSelector((state) => state.home)

  const _genres = data?.genres?.map((g) => g.id)

  const directors = crew?.filter((item) => item.job === "Director")
  const writers = crew?.filter(
    (item) =>
      item.job === "Screenplay" || item.job === "Story" || item.job === "Writer"
  )

  function toHoursAndMinutes(totalMinutes) {
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
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="poster-img"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="poster-img" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${
                      data.name || data.title
                    } (${dayjs(data?.release_date).format("YYYY")})`}</div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="play-button"
                        onClick={() => {
                          window.open(
                            `https://www.youtube.com/watch?v=${video.key}`,
                            "_blank",
                            "noreferrer"
                          )
                        }}
                      >
                        <PlayButton />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="info-item">
                          <span className="text bold">Status:{""}</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="info-item">
                          <span className="text bold">Release Date:{""}</span>
                          <span className="text">{data.release_date}</span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="info-item">
                          <span className="text bold">Runtime:{""}</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {directors?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director(s): {""}</span>
                        <span className="text">
                          {directors.map((d, index) => {
                            return (
                              <span key={index}>
                                {d.name}
                                {directors.length - 1 !== index && ", "}
                              </span>
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {writers?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writers(s): {""}</span>
                        <span className="text">
                          {writers.map((d, index) => {
                            return (
                              <span key={index}>
                                {d.name}
                                {writers.length - 1 !== index && ", "}
                              </span>
                            )
                          })}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator(s): {""}</span>
                        <span className="text">
                          {data?.created_by.map((d, index) => {
                            return (
                              <span key={index}>
                                {d.name}
                                {data?.created_by.length - 1 !== index && ", "}
                              </span>
                            )
                          })}
                        </span>
                      </div>
                    )}
                  </div>
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
