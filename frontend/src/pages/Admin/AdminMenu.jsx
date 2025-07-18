import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTimes,
  FaBars,
  FaTachometerAlt,
  FaLayerGroup,
  FaBoxOpen,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } fixed bg-[#121212] p-3 rounded-lg shadow-lg hover:bg-[#1e1e1e] transition-all duration-300 z-50`}
        onClick={toggleMenu}
        aria-label="Toggle Admin Menu"
      >
        {isMenuOpen ? (
          <FaTimes color="white" size={20} />
        ) : (
          <FaBars color="white" size={20} />
        )}
      </button>

      {isMenuOpen && (
        <section className="fixed right-7 top-16 bg-[#121212] p-5 rounded-lg shadow-2xl w-64 max-w-full border border-[#333] z-40">
          <ul className="list-none mt-2 space-y-4">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-green-700 text-green-400"
                      : "text-gray-300 hover:bg-[#222] hover:text-green-400"
                  }`
                }
              >
                <FaTachometerAlt /> Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categorylist"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-purple-700 text-purple-400"
                      : "text-gray-300 hover:bg-[#222] hover:text-purple-400"
                  }`
                }
              >
                <FaLayerGroup /> Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/productlist"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-700 text-blue-400"
                      : "text-gray-300 hover:bg-[#222] hover:text-blue-400"
                  }`
                }
              >
                <FaBoxOpen /> Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/allproductslist"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-pink-700 text-pink-400"
                      : "text-gray-300 hover:bg-[#222] hover:text-pink-400"
                  }`
                }
              >
                <FaBoxOpen /> All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/userlist"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-indigo-700 text-indigo-400"
                      : "text-gray-300 hover:bg-[#222] hover:text-indigo-400"
                  }`
                }
              >
                <FaUsers /> Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orderlist"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-yellow-700 text-yellow-400"
                      : "text-gray-300 hover:bg-[#222] hover:text-yellow-400"
                  }`
                }
              >
                <FaClipboardList /> Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
