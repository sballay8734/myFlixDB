/* eslint-disable react/prop-types */
import "./videos-section.scss"

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import Img from "../../../components/LazyLoadImg/LazyLoadImg"
import PlayButton from "../Banner/PlayButton"

const VideosSection = ({ data, loading }) => {
  const loadingSkeleton = () => {
    return (
      <div className="skeleton-Item">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    )
  }

  function handleVideoClick(key) {
    window.open(
      `https://www.youtube.com/watch?v=${key}`,
      "_blank",
      "noreferrer"
    )
  }

  return (
    <div className="videos-section">
      <ContentWrapper>
        <div className="section-heading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="video-item"
                onClick={() => {
                  handleVideoClick(video.key)
                }}
              >
                <div className="video-thumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayButton />
                </div>
                <div className="video-title">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="video-skeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default VideosSection
