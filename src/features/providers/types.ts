export type ProviderProfile = {
  id: string;
  name: string;
  role: "customer" | "worker";
  rating: number;
  tags: string[];
};
