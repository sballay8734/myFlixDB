import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3"
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN

const headers = {
  Authorization: "bearer " + API_TOKEN
}

async function fetchData(url, params) {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params
    })
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}

export { fetchData }
