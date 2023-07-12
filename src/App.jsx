import "./App.scss"
import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { fetchData } from "./utils/api"
import { useDispatch } from "react-redux"
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
  // const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fetchConfig()
  }, [])

  function fetchConfig() {
    fetchData("/configuration").then((res) => {
      console.log(res)

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }

      dispatch(getAPIConfiguration(url))
    })
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
