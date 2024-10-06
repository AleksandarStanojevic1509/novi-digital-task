import { customFetcher } from "../common/fetcher";

export const logout = async () => {
  await customFetcher("/auth/logout", {
    method: "POST",
    withCredentials: true,
  });

  localStorage.removeItem("user");

  window.location.href = "/";
};
