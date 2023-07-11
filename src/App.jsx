import "./App.css"
import { useEffect } from "react"
import { fetchData } from "./utils/api"
import { useSelector, useDispatch } from "react-redux"
import { getAPIConfiguration } from "./reduxStore/homeSlice"

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home"
import Details from "./pages/Details/Details"
import Error from "./pages/Error/Error"
import Explore from "./pages/Explore/Explore"
import SearchResults from "./pages/SearchResults/SearchResults"

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
