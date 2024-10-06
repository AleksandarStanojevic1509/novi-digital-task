import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, IUserResponse } from "../common/interfaces";
import { customFetcher } from "../common/fetcher";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const Login: React.FC<Props> = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when input changes
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid.";
      isValid = false;
    }

    // password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return;

    try {
      const response: AxiosResponse<IUserResponse> = await customFetcher(
        "/auth/login",
        {
          method: "POST",
          data: formData,
          withCredentials: true
        }
      );
      const userData: IUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
    } catch (error) {
      console.error("Error registering", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="mb-4 text-center">Login</h1>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
            />
            {errors.email && (
              <div className="invalid-feedback text-dark">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
            />
            {errors.password && (
              <div className="invalid-feedback text-dark">
                {errors.password}
              </div>
            )}
          </div>

          <button className="btn btn-dark w-100">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
