import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface QueryItems {
  key_name: string;
  isHidden: boolean;
}

export const itemFiltersApi = createApi({
  reducerPath: "itemFiltersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (build) => ({
    getKeyValues: build.query({
      query: ({ key_name, isHidden }: QueryItems) =>
        `filter/key?key_name=${key_name}&isHidden=${isHidden}`,
    }),
  }),
});

export const { useGetKeyValuesQuery } = itemFiltersApi;
