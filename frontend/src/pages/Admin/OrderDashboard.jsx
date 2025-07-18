import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderDash = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <AdminMenu />

      <div className="bg-[#121212] min-h-screen px-4 sm:px-8 pt-10 text-white">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-100">
          Orders Dashboard
        </h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg border border-[#333] bg-[#1f1f1f]">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#2a2a2a] text-gray-300">
                <tr>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Paid</th>
                  <th className="px-4 py-3">Delivered</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-[#333] hover:bg-[#2c2c2c] transition"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3">{order._id}</td>
                    <td className="px-4 py-3">
                      {order.user?.username || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {order.createdAt?.substring(0, 10) || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-green-400 font-semibold">
                      ${order.totalPrice}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          order.isPaid
                            ? "bg-green-600 text-green-200"
                            : "bg-red-600 text-red-200"
                        }`}
                      >
                        {order.isPaid ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          order.isDelivered
                            ? "bg-green-600 text-green-200"
                            : "bg-red-600 text-red-200"
                        }`}
                      >
                        {order.isDelivered ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link to={`/order/${order._id}`}>
                        <button className="px-4 py-1 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-500 transition text-white">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDash;
