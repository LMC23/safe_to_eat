import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useAuth } from "../contexts/Auth";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await signIn({ email, password });

    if (error) return setError(error);

    navigate("/");
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="px-4 py-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center sm:text-3xl text-yellow-300">
            Get started today
          </h1>

          <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>

          <form onSubmit={handleSubmit} className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-slate-800 text-yellow-300">
            <p className="text-lg font-medium">Sign in to your account</p>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 pr-12 text-sm border-gray-900 rounded-lg shadow-sm bg-gray-700"
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
                  className="w-full p-4 pr-12 text-sm border-gray-900 rounded-lg shadow-sm bg-gray-700"
                  placeholder="Enter password"
                  ref={passwordRef}
                />


              </div>
            </div>

            <button
              type="submit"
              className="block w-full px-5 py-3 text-sm font-medium text-gray-900 bg-yellow-500 rounded-lg"
            >
              Sign in
            </button>

            <p className="text-sm text-center">
              No account?
              <Link to="/signup" className="underline ml-2">Sign Up</Link>
            </p>
          </form>
        </div>
      </motion.div>

      {/* <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <div>{error && JSON.stringify(error)}</div>

        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Login</button>
      </form>
      <br />
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p> */}
    </>
  );
}
