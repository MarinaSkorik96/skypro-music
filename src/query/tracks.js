import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const tracksApi = createApi({

  reducerPath: "tracksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/catalog/',
    // headers: { authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNTY0MzMwLCJpYXQiOjE3MDA1MDc5MDYsImp0aSI6ImQyNjA5MTg5YTBhZTQ1ZWU4ODdlNzljZDZmNTdmMjI2IiwidXNlcl9pZCI6MjUxN30.NOQS3JqepdyrEhByH0XVSfQMu9x0w3k8JCkzUkn15-Y` }
    prepareHeaders: (headers, { getState }) => {

      const token = getState().user.access
      if (token) {
        console.log(token)
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },

  }),
  endpoints: (build) => ({
    getFavoritesTracks: build.query({
      query: () => 'track/favorite/all/',
    })
  }),
})

export const { useGetFavoritesTracksQuery } = tracksApi