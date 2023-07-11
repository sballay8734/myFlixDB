import "./App.css"
import { useEffect } from "react"
import { fetchData } from "./utils/api"
import { useSelector, useDispatch } from "react-redux"
import { getAPIConfiguration } from "./reduxStore/homeSlice"

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    apiTesting()
  }, [])

  function apiTesting() {
    fetchData("/movie/popular").then((res) => {
      console.log(res)
      dispatch(getAPIConfiguration(res))
    })
  }

  return <div className="App">{url?.total_pages}</div>
}

export default App
