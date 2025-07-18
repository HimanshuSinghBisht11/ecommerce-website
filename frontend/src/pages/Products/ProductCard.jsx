import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm relative bg-[#050505] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-[#0e0d0d] group">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-md">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full transition-transform duration-500 group-hover:scale-105"
            src={p.image}
            alt={p.name}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5 flex flex-col h-48">
        <div className="flex justify-between items-start mb-2">
          <h5 className="text-xl font-bold text-white truncate max-w-[60%]">
            {p?.name}
          </h5>
          <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-500">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        <p className="mb-4 font-normal text-gray-300 flex-grow">
          {p?.description?.substring(0, 60)}...
        </p>
        <section className="flex justify-between items-center mt-auto">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-cyan-800 shadow-md"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <button
            className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-950 hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-gray-700/50 hover:rotate-[5deg]"
            onClick={(e) => {
              e.preventDefault();
              addToCartHandler(p, 1);
            }}
            aria-label="Add to cart"
          >
            <AiOutlineShoppingCart size={25} className="text-white" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
