import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.4)",
      transition: {
        duration: 0.3,
        yoyo: 3,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black py-12 px-4">
      <div className="container mx-auto">
        <ProgressSteps step1 step2 />

        <motion.div
          className="mt-12 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.form
            onSubmit={submitHandler}
            className="w-full max-w-2xl bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700 p-8"
            variants={itemVariants}
          >
            <motion.h1
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Shipping Details
            </motion.h1>

            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-2 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="Enter your address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-2 font-medium">
                  City
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="Enter your city"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-2 font-medium">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="Enter postal code"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-2 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="Enter your country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-3 font-medium">
                  Payment Method
                </label>
                <div className="mt-2">
                  <motion.label
                    className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-gray-400 border-2 border-gray-500 focus:ring-gray-400"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-gray-200">PayPal or Credit Card</span>
                  </motion.label>
                </div>
              </motion.div>

              <motion.button
                className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-xl shadow-lg mt-6 hover:from-red-600 hover:to-red-800 transition-all duration-300"
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Continue to Checkout
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
