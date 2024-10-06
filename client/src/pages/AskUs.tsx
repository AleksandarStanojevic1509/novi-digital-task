import React, { useState } from "react";
import { IAskUsProps, IUser, IAskUsResponse } from "../common/interfaces";
import { customFetcher } from "../common/fetcher";
import { AxiosError, AxiosResponse } from "axios";
import { IInquireStatus } from "../common/enums";

const AskUs: React.FC<IAskUsProps> = ({ user }) => {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      window.alert("Please enter your question.");
      return;
    }

    if (question.length > 500) {
      window.alert("Question cannot exceed 500 characters.");
      return;
    }

    try {
      const response: AxiosResponse<IAskUsResponse> = await customFetcher(
        "/ask-us/inquire",
        {
          method: "POST",
          data: {
            question,
            userEmail: user?.email,
            userFullName: `${user?.firstName} ${user?.lastName}`,
            status: IInquireStatus.PENDING,
          },
          withCredentials: true,
        }
      );

      const userData: IUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(userData));

      setSubmitted(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // api errors
        const apiError = error.response.data.message || "Inquire failed. Please try again.";
        window.alert(apiError);
      } else {
        // all other errors
        console.error("An login error occurred", error);
        window.alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleAskMore = () => {
    setSubmitted(false);
    setQuestion("");
  };

  return (
    <div className="container mt-4">
      {user ? (
        submitted ? (
          <div className="text-center">
            <h1>Thank you for your question!</h1>
            <p>We will answer ASAP.</p>
            <button onClick={handleAskMore} className="btn btn-dark">
              Ask More
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <h1 className="mb-4 text-center">Ask Us Anything!</h1>
              <div className="mb-3">
                <label htmlFor="question" className="form-label">
                  Your Question
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="form-control"
                  placeholder="Type your question here"
                  rows={6}
                  maxLength={500}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100">
                Submit
              </button>
              <div className="mt-2 text-muted text-end">
                {question.length}/500 characters
              </div>
            </div>
          </form>
        )
      ) : (
        <h1 className="text-center">Register to Ask Us Anything!</h1>
      )}
    </div>
  );
};

export default AskUs;
