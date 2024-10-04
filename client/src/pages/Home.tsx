import React from "react";

const Home = ({
  user,
}: {
  user: { firstName: string; lastName: string } | null;
}) => {
  return (
    <div className="p-4">
      {user ? (
        <h1 className="text-3xl font-semibold text-center">
          Hi {user.firstName} {user.lastName} 👋
        </h1>
      ) : (
        <h1 className="text-3xl font-semibold text-center">
          Welcome to the Home Page
        </h1>
      )}
    </div>
  );
};

export default Home;
