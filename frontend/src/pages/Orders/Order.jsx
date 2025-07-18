import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    if (!order || isNaN(order.totalPrice) || order.totalPrice <= 0) {
      toast.error("Invalid order amount");
      return Promise.reject("Invalid order amount");
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
            currency_code: "USD",
          },
        },
      ],
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="ml-12 p-6 bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-gray-950 rounded-xl shadow-2xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400 border-b border-gray-700 pb-3">
              Order Items
            </h2>
            {order.orderItems.length === 0 ? (
              <Messsage>Order is empty</Messsage>
            ) : (
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
                    {order.orderItems.map((item, index) => (
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
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-950 rounded-xl shadow-2xl p-6 mb-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-rose-400 border-b border-gray-700 pb-3">
              Shipping Info
            </h2>
            <div className="space-y-4">
              <p>
                <span className="text-blue-300 font-medium">Order ID:</span>{" "}
                <span className="text-gray-300">{order._id}</span>
              </p>
              <p>
                <span className="text-blue-300 font-medium">Customer:</span>{" "}
                <span className="text-gray-300">{order.user.username}</span>
              </p>
              <p>
                <span className="text-blue-300 font-medium">Email:</span>{" "}
                <span className="text-gray-300">{order.user.email}</span>
              </p>
              <p>
                <span className="text-blue-300 font-medium">Address:</span>{" "}
                <span className="text-gray-300">
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </span>
              </p>
              <p>
                <span className="text-blue-300 font-medium">Method:</span>{" "}
                <span className="text-gray-300">{order.paymentMethod}</span>
              </p>
              <div className="pt-2">
                {order.isPaid ? (
                  <div className="bg-emerald-900/30 text-emerald-400 p-3 rounded-lg border border-emerald-800">
                    Paid on {new Date(order.paidAt).toLocaleString()}
                  </div>
                ) : (
                  <div className="bg-rose-900/30 text-rose-400 p-3 rounded-lg border border-rose-800">
                    Payment Pending
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-950 rounded-xl shadow-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-purple-400 border-b border-gray-700 pb-3">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-300">Items</span>
                <span className="text-gray-300">${order.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Shipping</span>
                <span className="text-gray-300">${order.shippingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Tax</span>
                <span className="text-gray-300">${order.taxPrice}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="text-blue-300 font-bold">Total</span>
                <span className="text-emerald-400 font-bold text-lg">
                  ${order.totalPrice}
                </span>
              </div>
            </div>

            {!order.isPaid && (
              <div className="mt-6">
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "pill",
                        label: "pay",
                        height: 40,
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <button
                  type="button"
                  className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white py-3 px-4 rounded-lg font-bold shadow-lg transition-all hover:shadow-emerald-500/20 hover:translate-y-[-2px]"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
