import "./details.scss"
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
import Banner from "./Banner/Banner"
import Cast from "./Cast/Cast"
import VideosSection from "./VideosSection/VideosSection"
import Similar from "./carousels/Similar"
import Recommendations from "./carousels/Recommendations"

function Details() {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  )

  return (
    <div>
      <Banner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details
