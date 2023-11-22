import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getFreshToken } from "../store/slices/user"

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://skypro-music-api.skyeng.tech',
  prepareHeaders: (headers, { getState }) => {

    const token = getState().user.access
    if (token) {
      console.log(token)
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})


const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await api.dispatch(getFreshToken())
    if (refreshResult.data) {
      // Возможно обработка ошибок
      // api.dispatch( getFreshToken())
      // retry the initial query
      //   result = await baseQuery(args, api, extraOptions)
    } else {
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}


export const tracksApi = createApi({

  reducerPath: "tracksApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getFavoritesTracks: build.query({
      query: () => '/catalog/track/favorite/all/',

    })
  }),
})

export const { useGetFavoritesTracksQuery } = tracksApi