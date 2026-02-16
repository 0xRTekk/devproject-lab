export type UserMetadata = {
  avatar_url?: string;
  avatar?: string;
  full_name?: string;
  name?: string;
  preferred_username?: string;
  user_name?: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
};

export type User = {
  id?: string;
  email?: string;
  avatar_url?: string;
  user_metadata?: UserMetadata;
};

export default User;
