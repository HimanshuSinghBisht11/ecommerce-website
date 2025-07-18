import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
  useGetCategoryDistributionQuery,
  useGetTopProductsQuery,
  useGetMonthlyOrdersQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderDash from "./OrderDashboard.jsx";
import Loader from "../../components/Loader";
import {
  FaUsers,
  FaChartBar,
  FaRupeeSign,
  FaBoxOpen,
  FaShoppingCart,
  FaArrowUp,
  FaArrowDown,
  FaBox,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const {
    data: categoryData = { categories: [] },
    isLoading: loadingCategories,
  } = useGetCategoryDistributionQuery();
  const {
    data: topProductsData = { products: [] },
    isLoading: loadingProducts,
  } = useGetTopProductsQuery();
  const {
    data: monthlyData = { monthlyData: Array(12).fill(0) },
    isLoading: loadingMonthly,
  } = useGetMonthlyOrdersQuery();

  const defaultMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const defaultCategories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Books",
    "Sports",
  ];
  const defaultCategoryData = [35, 25, 20, 12, 8];

  const defaultTopProducts = [
    { name: "Smartphone X", sales: 85000 },
    { name: "Laptop Pro", sales: 72000 },
    { name: "Wireless Earbuds", sales: 58000 },
    { name: "Smart Watch", sales: 45000 },
    { name: "Gaming Console", sales: 38000 },
  ];

  const defaultMonthlyOrders = [
    120, 145, 135, 160, 180, 175, 195, 200, 220, 215, 235, 250,
  ];

  const revenueGrowth = 12.5;
  const customerGrowth = 8.3;
  const orderGrowth = 15.7;

  const [revenueState, setRevenueState] = useState({
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
        background: "transparent",
        foreColor: "#a1a1aa",
      },
      theme: {
        mode: "dark",
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
        },
      },
      colors: ["#8b5cf6"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
          colorStops: [
            [
              {
                offset: 0,
                color: "#8b5cf6",
                opacity: 0.8,
              },
              {
                offset: 100,
                color: "#8b5cf6",
                opacity: 0.1,
              },
            ],
          ],
        },
      },
      title: {
        text: "Revenue Trend",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: 600,
          color: "#f4f4f5",
        },
      },
      grid: {
        borderColor: "#3f3f46",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      markers: {
        size: 4,
        colors: ["#8b5cf6"],
        strokeColors: "#18181b",
        strokeWidth: 2,
        hover: {
          size: 6,
        },
      },
      xaxis: {
        categories: defaultMonths,
        title: {
          text: "Date",
          style: {
            fontSize: "12px",
            fontWeight: 500,
            color: "#a1a1aa",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: "inherit",
            color: "#a1a1aa",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          text: "Revenue (₹)",
          style: {
            fontSize: "12px",
            fontWeight: 500,
            color: "#a1a1aa",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: "inherit",
            color: "#a1a1aa",
          },
          formatter: (value) => `₹${value.toLocaleString()}`,
        },
        min: 0,
      },
    },
    series: [{ name: "Revenue", data: Array(12).fill(0) }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSales = salesDetail.map((item) => ({
        x: new Date(item._id).toLocaleDateString(),
        y: item.totalSales,
      }));

      setRevenueState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: formattedSales.map((item) => item.x),
          },
        },
        series: [
          {
            name: "Revenue",
            data: formattedSales.map((item) => item.y),
          },
        ],
      }));
    }
  }, [salesDetail]);

  const [demographicsState] = useState({
    options: {
      chart: {
        type: "bar",
        background: "transparent",
        foreColor: "#a1a1aa",
      },
      theme: {
        mode: "dark",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      colors: ["#3b82f6"],
      xaxis: {
        categories: ["18-24", "25-34", "35-44", "45-54", "55+"],
        labels: {
          style: {
            colors: "#a1a1aa",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#a1a1aa",
          },
        },
      },
      grid: {
        borderColor: "#3f3f46",
      },
    },
    series: [
      {
        name: "Users",
        data: [15, 40, 25, 15, 5],
      },
    ],
  });

  const [categoryState, setCategoryState] = useState({
    options: {
      chart: {
        type: "donut",
        background: "transparent",
        foreColor: "#a1a1aa",
      },
      theme: {
        mode: "dark",
      },
      labels: defaultCategories,
      colors: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      legend: {
        position: "bottom",
        fontSize: "14px",
        labels: {
          colors: "#a1a1aa",
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Products",
                color: "#f4f4f5",
              },
            },
          },
        },
        tooltip: {
          y: {
            formatter: (value) => `${value}% of total products`,
          },
        },
      },
      dataLabels: {
        style: {
          colors: ["#18181b"],
        },
      },
      stroke: {
        colors: ["#18181b"],
      },
    },
    series: defaultCategoryData,
  });

  useEffect(() => {
    if (categoryData?.categories?.length > 0) {
      setCategoryState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          labels: categoryData.categories.map((cat) => cat.name),
        },
        series: categoryData.categories.map((cat) => cat.count),
      }));
    }
  }, [categoryData]);

  const [productsState, setProductsState] = useState({
    options: {
      chart: {
        type: "bar",
        background: "transparent",
        foreColor: "#a1a1aa",
      },
      theme: {
        mode: "dark",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          barHeight: "60%",
        },
      },
      colors: ["#10b981"],
      xaxis: {
        categories: defaultTopProducts.map((product) => product.name),
        labels: {
          formatter: (value) => `₹${(value / 1000).toFixed(0)}k`,
          style: {
            colors: "#a1a1aa",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
            colors: "#a1a1aa",
          },
        },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value) => `₹${value.toLocaleString()}`,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (value) => `₹${(value / 1000).toFixed(0)}k`,
        style: {
          fontSize: "12px",
          colors: ["#18181b"],
        },
        offsetX: 30,
      },
      grid: {
        borderColor: "#3f3f46",
      },
    },
    series: [
      {
        name: "Sales",
        data: defaultTopProducts.map((product) => product.sales),
      },
    ],
  });

  const [ordersState, setOrdersState] = useState({
    options: {
      chart: {
        type: "line",
        background: "transparent",
        foreColor: "#a1a1aa",
        toolbar: {
          show: false,
        },
      },
      theme: {
        mode: "dark",
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      colors: ["#f59e0b"],
      xaxis: {
        categories: defaultMonths,
        labels: {
          style: {
            fontSize: "12px",
            colors: "#a1a1aa",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => Math.round(value),
          style: {
            fontSize: "12px",
            colors: "#a1a1aa",
          },
        },
        title: {
          text: "Number of Orders",
          style: {
            fontSize: "12px",
            fontWeight: 500,
            color: "#a1a1aa",
          },
        },
      },
      markers: {
        size: 4,
        strokeColors: "#18181b",
        strokeWidth: 2,
        hover: {
          size: 6,
        },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value) => `${value} Orders`,
        },
      },
      grid: {
        borderColor: "#3f3f46",
        strokeDashArray: 4,
      },
    },
    series: [
      {
        name: "Orders",
        data: defaultMonthlyOrders,
      },
    ],
  });

  useEffect(() => {
    if (topProductsData?.products?.length > 0) {
      setProductsState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: topProductsData.products.map((p) => p.name),
          },
        },
        series: [
          {
            name: "Sales",
            data: topProductsData.products.map((p) => p.totalSales),
          },
        ],
      }));
    }
  }, [topProductsData]);

  return (
    <div className="min-h-screen ml-14 bg-zinc-900 text-zinc-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-full space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">
                Dashboard Overview
              </h1>
              <p className="text-zinc-400 mt-1">
                Welcome to your admin dashboard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 p-6 hover:shadow-purple-500/10 transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <FaRupeeSign className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zinc-400">
                        Total Revenue
                      </p>
                      <h3 className="text-2xl font-bold text-zinc-100">
                        {isLoading ? (
                          <Loader />
                        ) : (
                          `₹${sales?.totalSales.toLocaleString() || 0}`
                        )}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${revenueGrowth >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {revenueGrowth >= 0 ? (
                      <FaArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <FaArrowDown className="w-3 h-3 mr-1" />
                    )}
                    <span className="text-sm font-medium">
                      {Math.abs(revenueGrowth)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">vs. previous month</p>
              </div>

              <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 p-6 hover:shadow-blue-500/10 transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <FaUsers className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zinc-400">
                        Total Customers
                      </p>
                      <h3 className="text-2xl font-bold text-zinc-100">
                        {loading ? (
                          <Loader />
                        ) : (
                          customers?.length.toLocaleString() || 0
                        )}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${customerGrowth >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {customerGrowth >= 0 ? (
                      <FaArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <FaArrowDown className="w-3 h-3 mr-1" />
                    )}
                    <span className="text-sm font-medium">
                      {Math.abs(customerGrowth)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">vs. previous month</p>
              </div>

              <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 p-6 hover:shadow-emerald-500/10 transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <FaShoppingCart className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-zinc-400">
                        Total Orders
                      </p>
                      <h3 className="text-2xl font-bold text-zinc-100">
                        {loadingTwo ? (
                          <Loader />
                        ) : (
                          orders?.totalOrders.toLocaleString() || 0
                        )}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${orderGrowth >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {orderGrowth >= 0 ? (
                      <FaArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <FaArrowDown className="w-3 h-3 mr-1" />
                    )}
                    <span className="text-sm font-medium">
                      {Math.abs(orderGrowth)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">vs. previous month</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-zinc-100 mb-4">
                  Revenue Trend
                </h3>
                {isLoading ? (
                  <div className="flex justify-center items-center h-[350px]">
                    <Loader />
                  </div>
                ) : (
                  <Chart
                    options={revenueState.options}
                    series={revenueState.series}
                    type="area"
                    height={350}
                  />
                )}
              </div>

              <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-zinc-100 mb-4">
                  Product Categories
                </h3>
                {loadingCategories ? (
                  <div className="flex justify-center items-center h-[350px]">
                    <Loader />
                  </div>
                ) : (
                  <Chart
                    options={categoryState.options}
                    series={categoryState.series}
                    type="donut"
                    height={350}
                  />
                )}
              </div>

              <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-zinc-100 mb-4">
                  Customer Age Groups
                </h3>
                <Chart
                  options={demographicsState.options}
                  series={demographicsState.series}
                  type="bar"
                  height={350}
                />
              </div>

              <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-zinc-100 mb-4">
                  Top Products
                </h3>
                {loadingProducts ? (
                  <div className="flex justify-center items-center h-[350px]">
                    <Loader />
                  </div>
                ) : (
                  <Chart
                    options={productsState.options}
                    series={productsState.series}
                    type="bar"
                    height={350}
                  />
                )}
              </div>

              <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-zinc-100 mb-4">
                  Monthly Orders
                </h3>
                {loadingMonthly ? (
                  <div className="flex justify-center items-center h-[350px]">
                    <Loader />
                  </div>
                ) : (
                  <Chart
                    options={ordersState.options}
                    series={ordersState.series}
                    type="line"
                    height={350}
                  />
                )}
              </div>
            </div>

            <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 overflow-hidden">
              <div className="p-6 border-b border-zinc-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-100">
                      Recent Orders
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                      Track and manage your latest orders
                    </p>
                  </div>
                  <Link
                    to="/admin/orderlist"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <OrderDash />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
