import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProviderProfile } from "@/features/providers/types.ts";
import type { CreateUserPayload, UserProfile } from "@/features/users/types.ts";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? "http://localhost:3000/api" : "https://profiperson.onrender.com/api");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token?: string }, { email: string; password: string }>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload
      })
    }),
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
  useLoginMutation,
  useGetProvidersQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation
} = api;
