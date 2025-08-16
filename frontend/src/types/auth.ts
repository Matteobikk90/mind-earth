export type AuthSliceType = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};
