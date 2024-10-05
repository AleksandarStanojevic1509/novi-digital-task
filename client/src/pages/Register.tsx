import React, { useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { IUser, IUserResponse } from "../common/interfaces";
import { customFetcher } from "../common/fetcher";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const Register: React.FC<Props> = ({ setUser }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { firstName: "", lastName: "", email: "", password: "" };

    // firstName validation
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
      isValid = false;
    }

    // lastName validation
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required.";
      isValid = false;
    }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response: AxiosResponse<IUserResponse> = await customFetcher(
        "/auth/register",
        {
          method: "POST",
          data: formData,
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
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="mb-4 text-center">Register</h1>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="First Name"
            />
            {errors.firstName && (
              <div className="invalid-feedback text-dark">
                {errors.firstName}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <div className="invalid-feedback text-dark">
                {errors.lastName}
              </div>
            )}
          </div>
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
          <button type="submit" className="btn btn-dark w-100">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
