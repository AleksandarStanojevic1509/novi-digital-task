import React from "react";
import { IHomeProps } from "../common/interfaces";

const Home: React.FC<IHomeProps> = ({ user }) => {
  return (
    <div className="p-4">
      {user ? (
        <h1>
          Welcome {user.firstName} {user.lastName} 👋
        </h1>
      ) : (
        <h1>
          Welcome to the Home Page. <br />
          Please register or login.
        </h1>
      )}
    </div>
  );
};

export default Home;
