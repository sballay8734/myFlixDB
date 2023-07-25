/* eslint-disable react/prop-types */
import Carousel from "../../../components/Carousel/Carousel"
import useFetch from "../../../hooks/useFetch"

import "./styles.scss"

function Recommendations({ mediaType, id }) {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`)

  if (data?.results.length > 0) {
    return (
      <Carousel
        title="Recommendations"
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
      />
    )
  } else {
    return (
      <div>
        <div className="carousel-title">Recommendations</div>
        <div className="carousel-fallback">
          No recommendations at this time! Movie must be very new!
        </div>
      </div>
    )
  }
}

export default Recommendations
