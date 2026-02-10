export type UserProfile = {
  _id: string;
  username: string;
  email: string;
  isActive: boolean;
  role: ("customer" | "worker")[];
  createdAt: string;
};

export type CreateUserPayload = {
  username: string;
  email: string;
  role: ("customer" | "worker")[];
  isActive?: boolean;
};
