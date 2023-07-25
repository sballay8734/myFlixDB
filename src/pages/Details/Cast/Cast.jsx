/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"

import "./cast.scss"

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import Img from "../../../components/LazyLoadImg/LazyLoadImg"
import avatar from "../../../assets/avatar.png"

function Cast({ data, loading }) {
  const { url } = useSelector((state) => state.home)
  let usedIds = []

  const skeleton = () => {
    return (
      <div className="skeleton-item">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    )
  }
  return (
    <div className="cast-section">
      <ContentWrapper>
        <div className="section-heading">Top Cast</div>
        {!loading ? (
          <div className="list-items">
            {data?.map((item) => {
              // duplicate id's check
              if (usedIds.includes(item.id)) return

              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar
              usedIds.push(item.id)

              return (
                <div key={item.id} className="list-item">
                  <div className="profile-img">
                    <Img src={imgUrl} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="cast-skeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Cast
