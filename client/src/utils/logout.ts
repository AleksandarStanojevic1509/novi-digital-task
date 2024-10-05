import { customFetcher } from "../common/fetcher";

export const logout = async () => {
  await customFetcher("/auth/logout", {
    method: "POST",
  });

  localStorage.removeItem("user");

  window.location.href = "/";
};
