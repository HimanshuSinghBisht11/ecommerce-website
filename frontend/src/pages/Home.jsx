import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Header from "../components/Header.jsx";
import HomeProduct from "./Products/HomeProduct.jsx";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer.jsx";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="bg-[#090812] min-h-screen ml-14">
      <div className="flex justify-center mb-6 pt-4">
        <div className="bg-gray-800 flex items-center rounded-full shadow-lg px-4 py-2 w-[80%] max-w-[600px] border border-gray-700">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-grow outline-none px-3 py-2 text-gray-200 bg-transparent rounded-l-full placeholder-gray-400"
          />
          <FaSearch
            className="text-pink-500 cursor-pointer hover:text-pink-400 transition-colors"
            size={26}
          />
        </div>
      </div>

      <div className="w-full h-[70vh] bg-cover bg-center flex items-center justify-center relative mb-4">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to Buybud
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-6">
            Discover Your Signature Style
          </p>
        </div>
      </div>

      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message ||
            isError?.message ||
            isError?.error ||
            "An error occurred"}
        </Message>
      ) : (
        <>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mt-16 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100">
                Trending Now
              </h1>
              <Link
                to="/shop"
                className="bg-pink-600 mr-20 font-bold rounded-full py-3 px-8 text-white hover:bg-pink-700 transition-colors duration-300"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {data?.products?.map((product) => (
                <HomeProduct key={product._id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
