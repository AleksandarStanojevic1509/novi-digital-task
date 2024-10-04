import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }: { setUser: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string } | null>> }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const user = { firstName, lastName };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Register</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2">
        Register
      </button>
    </div>
  );
};

export default Register;
