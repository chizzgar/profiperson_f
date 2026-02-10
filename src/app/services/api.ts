import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProviderProfile } from "@/features/providers/types.ts";
import type { CreateUserPayload, UserProfile } from "@/features/users/types.ts";

const apiBaseUrl = import.meta.env.DEV
  ? "/api"
  : "https://profiperson.onrender.com/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getProviders: builder.query<ProviderProfile[], void>({
      query: () => "/users",
      transformResponse: (users: UserProfile[]): ProviderProfile[] =>
        users
          .filter((user) => user.role?.includes("worker"))
          .map((user) => ({
            id: user._id,
            name: user.username,
            role: user.role?.[0] ?? "worker",
            rating: 5,
            tags: user.role ?? []
          }))
    }),
    getUsers: builder.query<UserProfile[], void>({
      query: () => "/users"
    }),
    createUser: builder.mutation<UserProfile, CreateUserPayload>({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload
      })
    })
  })
});

export const {
  useGetProvidersQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation
} = api;
