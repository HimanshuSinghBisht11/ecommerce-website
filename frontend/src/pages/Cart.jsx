import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Removed from cart", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="relative w-64 h-64 mb-8">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M50 30a10 10 0 0110-10h80a10 10 0 0110 10v10h20a10 10 0 0110 10v110a10 10 0 01-10 10H30a10 10 0 01-10-10V50a10 10 0 0110-10h20V30zm10 10v10h80V30H60zm-20 20v100h120V50H40zm20 20a10 10 0 0110 10v50a10 10 0 01-20 0V80a10 10 0 0110-10zm40 0a10 10 0 0110 10v50a10 10 0 01-20 0V80a10 10 0 0110-10z"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl text-gray-600">?</div>
              </div>
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                No Products in your cart
              </h2>
              <p className="text-xl text-gray-400">
                Your cart feels lonely.{" "}
                <span className="text-red-400">Shop now</span>, find your{" "}
                <span className="text-red-400">vibe</span>...
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-900/30"
            >
              <FaArrowLeft className="mr-2" />
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">
            <div className="lg:w-3/5">
              <h1 className="text-3xl font-bold text-gray-100 mb-6">
                Shopping Cart
              </h1>

              <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 ml-4 min-w-0">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-lg font-medium text-red-500 hover:text-red-400 truncate"
                      >
                        {item.name}
                      </Link>
                      <div className="text-gray-400 text-sm">{item.brand}</div>
                      <div className="text-lg font-bold text-gray-200 mt-1">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="mx-4">
                      <select
                        className="w-20 p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:ring-red-500 focus:border-red-500"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="text-red-500 hover:text-red-400 p-2 transition-colors"
                      onClick={() => removeFromCartHandler(item._id)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-2/5 flex items-center">
              <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full border border-gray-800">
                <h2 className="text-xl font-bold text-gray-100 mb-4">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-2 text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                  </span>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-gray-300">Total</span>
                  <span className="text-2xl font-bold text-red-500">
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors mb-4
                    ${
                      cartItems.length === 0
                        ? "bg-gray-700 cursor-not-allowed text-gray-400"
                        : "bg-red-600 hover:bg-red-700"
                    }
                  `}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>

                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center w-full py-2 px-4 text-red-500 hover:text-red-400 font-medium transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
