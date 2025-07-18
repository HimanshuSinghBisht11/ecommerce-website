import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="ml-12 min-h-screen bg-[#121212] p-6 text-white">
      <AdminMenu />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="rounded-xl shadow-2xl overflow-hidden border border-[#2a2a2a] bg-[#1f1f1f]">
          <div className="px-6 py-5 border-b border-[#333] bg-gradient-to-r from-[#1e1d1d] to-[#0e0f13]">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4a68ec] to-[#2f9de7]">
              Order Dashboard
            </h2>
            <p className="text-[#94a3b8] font-medium">
              Manage all customer orders
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2a2a2a] text-[#cbd5e1] uppercase text-sm tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Items</th>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold">Payment</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2a2a2a]">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-[#2c2c2c] transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.orderItems[0].image}
                          alt={order._id}
                          className="w-10 h-10 object-cover rounded-md border border-[#333] shadow"
                        />
                        <span className="text-xs text-[#94a3b8]">
                          {order.orderItems.length} item
                          {order.orderItems.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-[#7f5af0]">
                        {order._id.substring(0, 8)}...
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-[#e2e8f0]">
                      {order.user ? order.user.username : "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm text-[#94a3b8]">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4 font-semibold text-[#2cb67d]">
                      ${order.totalPrice.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.isPaid
                            ? "bg-[#1e3a8a] text-[#60a5fa]"
                            : "bg-[#713f12] text-[#f59e0b]"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.isDelivered
                            ? "bg-[#064e3b] text-[#34d399]"
                            : "bg-[#7f1d1d] text-[#f87171]"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-[#7f5af0] hover:text-[#a78bfa] font-medium text-sm hover:underline flex items-center"
                      >
                        Details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
