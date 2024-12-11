import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const specificationApi = createApi({
  reducerPath: 'specificationApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (companyId) => `Specification/GetCategory`
    }),
    getSbuCategory: builder.query({
      query: (CategoryID) => `Specification/GetSbuCategory?CategoryID=${CategoryID}`
    }),
    getProductsBySubCategory: builder.query({
      query: (subCategoryId) => `Specification/GetProductsBySubCategory?subCategoryId=${subCategoryId}`
    })
  })
});

export const { useGetCategoryQuery, useGetSbuCategoryQuery, useGetProductsBySubCategoryQuery } = specificationApi;
