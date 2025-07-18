import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { AiOutlineShoppingCart } from "react-icons/ai";

const HomeProduct = ({ product }) => {
  return (
    <div className="w-[70%] p-2">
      <div className="bg-[#10101b] border-[15px]  border-[#0f0f0f]  border-solid rounded-lg shadow hover:shadow-md transition-all duration-300 h-full flex flex-col group">
        <div className="relative pt-[100%] overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <HeartIcon
            product={product}
            className="text-gray-300 hover:text-pink-500"
          />
        </div>

        <div className="p-3 flex-grow flex flex-col">
          <Link to={`/product/${product._id}`} className="flex-grow">
            <h2 className="text-md font-medium text-gray-100 mb-1 line-clamp-2 hover:text-pink-400 transition-colors">
              {product.name}
            </h2>
            {product.rating && (
              <div className="flex items-center mb-1">
                <div className="flex text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-gray-400 text-xs ml-1">
                  ({product.reviewCount})
                </span>
              </div>
            )}
          </Link>

          <div className="mt-auto flex justify-between items-center">
            <span className="text-lg font-bold text-pink-400">
              ${product.price.toFixed(2)}
            </span>
            <button className="bg-pink-600 hover:bg-pink-700 text-white p-1.5 rounded-full transition-colors duration-200">
              <AiOutlineShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;
