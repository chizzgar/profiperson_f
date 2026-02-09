import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProviderProfile } from "../../features/providers/types";
import type { UserProfile } from "../../features/users/types";

const apiBaseUrl = "/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getProviders: builder.query<ProviderProfile[], void>({
      query: () => "/users",
      transformResponse: (users: UserProfile[]): ProviderProfile[] =>
        users.map((user) => ({
          id: user._id,
          name: user.username,
          role: user.role?.[0] ?? "provider",
          rating: 5,
          tags: user.role ?? []
        }))
    }),
    getUsers: builder.query<UserProfile[], void>({
      query: () => "/users"
    })
  })
});

export const { useGetProvidersQuery, useLazyGetUsersQuery } = api;
