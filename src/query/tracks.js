import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90e…UxN30.Q39p8f2af5fU9EerFeD0UbOtwdpJIqOj_gDw8JMKaPI";

export const tracksApi = createApi({
  reducerPath: "tracksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/catalog/',
    // prepareHeaders: (headers) => {

    //   // if (accessToken) {
    //   //   console.log(accessToken)
    //   // }
    //   headers.set('authorization', `Bearer ${accessToken}`)
    //   console.log(accessToken)
    //   console.log("u")

    //   return headers
    // },

  }),
  endpoints: (build) => ({
    getFavoritesTracks: build.query({
      query: () => 'track/favorite/all/',
      // headers: { authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNTA1NjI2LCJpYXQiOjE3MDA0OTIxMDcsImp0aSI6IjUzZGJkZTk0ZWVkZjRmODM5MTAyNmUxNzY4MjgyYzlmIiwidXNlcl9pZCI6MjUxN30.vNQ82tPdbyBosYw-c_-tmkas6xPUxC7-umnkShrTFYM` }

      prepareHeaders: (headers, { getState }) => {
        const token = getState().user.access;
        console.log(token)
        // console.log("accessToken", token);

        if (token) {
          headers.set("authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90e…UxN30.fDL6QjZShFgRecH9Nd0ICnGYcZEgAAzTARAwYZppkNU`);
        }
        return headers;
      },
    })
  }),
})

export const { useGetFavoritesTracksQuery } = tracksApi