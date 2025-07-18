import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="ml-14 bg-gradient-to-br from-gray-950 to-gray-900 min-h-screen p-6">
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto">
        {cart.cartItems.length === 0 ? (
          <Message variant="info">Your cart is empty</Message>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-emerald-400 border-b border-gray-700 pb-3">
                  Order Items
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="p-3 text-left text-blue-300">Image</th>
                        <th className="p-3 text-left text-blue-300">Product</th>
                        <th className="p-3 text-center text-blue-300">Qty</th>
                        <th className="p-3 text-right text-blue-300">Price</th>
                        <th className="p-3 text-right text-blue-300">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart.cartItems.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="p-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </td>

                          <td className="p-3">
                            <Link
                              to={`/product/${item.product}`}
                              className="text-cyan-200 hover:text-cyan-100 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </td>
                          <td className="p-3 text-center text-gray-300">
                            {item.qty}
                          </td>
                          <td className="p-3 text-right text-gray-300">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="p-3 text-right text-emerald-300 font-medium">
                            $ {(item.qty * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-gray-700 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Items:</span>
                    <span className="text-gray-300">${cart.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Shipping:</span>
                    <span className="text-gray-300">${cart.shippingPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Tax:</span>
                    <span className="text-gray-300">${cart.taxPrice}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-700">
                    <span className="text-blue-300 font-bold">Total:</span>
                    <span className="text-emerald-400 font-bold text-lg">
                      ${cart.totalPrice}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-rose-400">
                    Shipping Details
                  </h2>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <p className="text-gray-300">
                      <span className="text-blue-300">Address:</span>{" "}
                      {cart.shippingAddress.address},{" "}
                      {cart.shippingAddress.city}{" "}
                      {cart.shippingAddress.postalCode},{" "}
                      {cart.shippingAddress.country}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-amber-400">
                    Payment Method
                  </h2>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <p className="text-gray-300">
                      <span className="text-blue-300">Method:</span>{" "}
                      {cart.paymentMethod}
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6">
                    <Message variant="danger">{error.data.message}</Message>
                  </div>
                )}

                <button
                  type="button"
                  className={`w-full py-3 px-4 rounded-lg font-bold shadow-lg transition-all ${
                    cart.cartItems.length === 0
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 hover:shadow-purple-500/20 hover:translate-y-[-2px]"
                  } text-white`}
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  {isLoading ? (
                    <span className="flex justify-center">
                      <Loader size="small" />
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
