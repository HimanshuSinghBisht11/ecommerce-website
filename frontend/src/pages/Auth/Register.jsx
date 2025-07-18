import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaUserPlus, FaLock, FaEnvelope, FaQuoteLeft } from "react-icons/fa";
import { HiUser, HiEye, HiEyeOff } from "react-icons/hi";
import BgImg from "../../hero_img/Bg_img1.png";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Welcome to the family! Registration successful");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <div className="bg-gradient-to-br from-red-800 to-blue-800 rounded-xl p-8 flex-1 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('BgImg')] bg-cover bg-center"></div>
          <div className="relative z-10 text-white max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-pink-600 rounded-full">
                <FaUserPlus className="text-2xl" />
              </div>
              <h1 className="text-4xl font-bold">Welcome to BuyBud</h1>
            </div>

            <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm mb-6">
              <FaQuoteLeft className="text-pink-400 text-xl mb-2" />
              <p className="text-xl italic mb-4">
                "Welcome to BuyBud, where your wishlist meets reality."
              </p>
              <p className="text-pink-300">- BuyBud</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">
                  <span>1</span>
                </div>
                <p className="text-gray-200">Exclusive member benefits</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">
                  <span>2</span>
                </div>
                <p className="text-gray-200">
                  Personalized shopping experience
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center">
                  <span>3</span>
                </div>
                <p className="text-gray-200">Fast checkout & order tracking</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#171717]  rounded-xl p-8 flex-1 max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FaUserPlus className="text-pink-500 text-2xl" />
              <h1 className="text-3xl font-bold text-pink-400">
                Create Account
              </h1>
            </div>
            <p className="text-gray-400">Become part of our growing family</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <HiUser />
                </div>
                <input
                  type="text"
                  id="name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-pink-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-pink-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2" small />
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Register Now
                </>
              )}
            </button>

            <div className="text-center text-gray-400">
              Already part of the family?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-400 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
