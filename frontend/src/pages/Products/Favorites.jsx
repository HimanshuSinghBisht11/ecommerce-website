import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import FavProduct from "./FavProduct";
import { FaHeartBroken, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  // Check if favorites is undefined or null before accessing length
  if (!favorites || !Array.isArray(favorites)) {
    return (
      <div className="bg-gray-950 min-h-screen text-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-red-500 mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-300">
            Loading Error
          </h2>
          <p className="text-gray-400 mb-6">
            We couldn't load your favorites. Please try again.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaSearch className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
          YOUR FAVORITE FINDS
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative w-64 h-64 mb-8">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M100 40a30 30 0 00-30 30 30 30 0 00-60 0c0 50 80 90 80 90s80-40 80-90a30 30 0 00-60 0 30 30 0 00-30-30z"
                />
              </svg>
              <FaHeartBroken className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-red-500 opacity-80" />
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-300">
              Your favorites collection is empty
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-md">
              "Find products that match your{" "}
              <span className="text-red-400">unique vibe</span>.
              <br />
              Your perfect style awaits..."
            </p>

            <Link
              to="/shop"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-900/30"
            >
              <FaSearch className="mr-2" />
              Find your vibe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <FavProduct key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
