import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../contexts/Auth";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(null);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await signUp({ email, password });

    if (error) return setError(error);

    navigate("/");
  }

  return (
    <>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            Get started today
          </h1>

          <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>

          <form onSubmit={handleSubmit} className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-gray-300 text-indigo-700">
            <p className="text-lg font-medium">Sign Up to your account</p>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Enter email"
                  ref={emailRef}
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Enter password"
                  ref={passwordRef}
                />

               
              </div>
            </div>

            <button
              type="submit"
              className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            >
              Sign up
            </button>

            <p className="text-sm text-center text-gray-500">
              You already have an account?
              <Link to="/login" className="underline ml-2">Login</Link>
            </p>
          </form>
        </div>
      </div>

    </>
  );
}
