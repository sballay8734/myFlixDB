import "./details.scss"
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
import Banner from "./Banner/Banner"

function Details() {
  // const { mediaType, id } = useParams()
  // const { data, loading } = useFetch(`/${mediaType}/${id}`)

  return (
    <div>
      <Banner />
    </div>
  )
}

export default Details
