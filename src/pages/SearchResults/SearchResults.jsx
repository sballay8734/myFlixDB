import "./search-results.scss"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"

import { fetchData } from "../../utils/api"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import MovieCard from "../../components/MovieCard/MovieCard"
import Spinner from "../../components/Spinner/Spinner"
import noResults from "../../assets/no-results.png"
import Img from "../../components/LazyLoadImg/LazyLoadImg"

const SearchResults = () => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()

  function fetchInitialData() {
    setLoading(true)
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  function fetchNextPageData() {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...res.results]
        })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1)
    })
  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])

  return (
    <div className="search-results-page">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="page-title">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return
                  return <MovieCard key={index} data={item} fromSearch={true} />
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="no-results">
              <span className="result-not-found">
                Sorry, Results not found!
              </span>
              <Img className="no-result-img" src={noResults} />
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResults
