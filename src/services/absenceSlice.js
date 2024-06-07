import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const absenceApi = createApi({
  reducerPath: 'absenceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://front-end-kata.brighthr.workers.dev/api/' }),
  endpoints: (builder) => ({
    getAbsences: builder.query({
      query: () => 'absences',
    }),
    getConflict: builder.query({
      query: (id) => `conflict/${id}`,
    }),
    getUserAbsences: builder.query({
      query: (id) => `absences/${id}`,
    }),
  }),
});

export const { useGetAbsencesQuery, useGetConflictQuery, useGetUserAbsencesQuery } = absenceApi;
