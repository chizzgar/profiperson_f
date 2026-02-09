import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProviderProfile } from "../../features/providers/types";

const providerData: ProviderProfile[] = [
  {
    id: "p1",
    name: "Анастасия Лебедева",
    role: "UI/UX дизайнер",
    rating: 4.9,
    tags: ["figma", "ux research"]
  },
  {
    id: "p2",
    name: "Дмитрий Корнев",
    role: "Мастер по ремонту",
    rating: 4.7,
    tags: ["электрика", "срочно"]
  },
  {
    id: "p3",
    name: "Светлана Орлова",
    role: "Репетитор по английскому",
    rating: 5.0,
    tags: ["онлайн", "разговорный"]
  }
];

export const api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProviders: builder.query<ProviderProfile[], void>({
      queryFn: async () => ({ data: providerData })
    })
  })
});

export const { useGetProvidersQuery } = api;
