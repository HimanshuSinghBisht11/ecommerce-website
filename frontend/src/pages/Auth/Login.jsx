import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <div className="bg-gradient-to-br from-red-700 to-blue-800 rounded-xl p-8 flex-1 flex flex-col justify-center text-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-xl mb-6 text-gray-200">
              Sign in to access your account and continue your shopping journey.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-sm">1</span>
                </div>
                <p>Exclusive member discounts</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-sm">2</span>
                </div>
                <p>Fast checkout process</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-sm">3</span>
                </div>
                <p>Personalized recommendations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#171717] rounded-xl p-8 flex-1 max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-400 mb-2">Sign In</h1>
            <p className="text-gray-400">Enter your credentials to continue</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-pink-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-pink-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-pink-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2" small />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-400 hover:underline"
              >
                Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
