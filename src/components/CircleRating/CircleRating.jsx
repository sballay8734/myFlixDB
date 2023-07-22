/* eslint-disable react/prop-types */
import "react-circular-progressbar/dist/styles.css"
import "./circle-rating.scss"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

function CircleRating({ rating }) {
  return (
    <div className="circle-rating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green"
        })}
      />
    </div>
  )
}

export default CircleRating
