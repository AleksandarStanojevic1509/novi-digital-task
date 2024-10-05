import React from "react";
import { logout } from "../utils/logout";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button className="btn btn-secondary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
