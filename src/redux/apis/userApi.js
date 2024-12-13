import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => `User/GetAllClients`
    }),
    getAllUsers: builder.query({
      query: () => `User/GetAllUsers`
    }),
    GetUsersByClientID: builder.query({
      query: (ClientID) => `User/GetUsersByClientID?ClientID=${ClientID}`
    }),
    getBranches: builder.query({
      query: () => `Specification/GetBranches`
    }),
    GetBranchesByClientID: builder.query({
      query: (ClientID) => `Specification/GetBranchesByClientID?ClientID=${ClientID}`
    }),
    getStates: builder.query({
      query: () => `Specification/GetStates`
    }),
    getCities: builder.query({
      query: (StateID) => `Specification/GetCities?StateID=${StateID}`
    })
  })
});

export const {
  useGetAllClientsQuery,
  useGetAllUsersQuery,
  useGetUsersByClientIDQuery,
  useGetBranchesQuery,
  useGetBranchesByClientIDQuery,
  useGetStatesQuery
} = userApi;
