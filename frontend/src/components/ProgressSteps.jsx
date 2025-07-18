import { motion } from "framer-motion";
import {
  FaCheck,
  FaUser,
  FaShippingFast,
  FaClipboardList,
} from "react-icons/fa";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="relative flex items-center">
        {/* Step 1 - Login */}
        <div className="flex flex-col items-center z-10">
          <motion.div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              step1
                ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                : "bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {step1 ? (
              <FaCheck className="text-white text-xl" />
            ) : (
              <FaUser className="text-gray-500 text-xl" />
            )}
          </motion.div>
          <span
            className={`mt-2 text-sm font-medium ${
              step1 ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            Login
          </span>
        </div>

        {/* Connector line after Step 1 */}
        <motion.div
          className={`h-1 w-24 mx-2 ${
            step2 ? "bg-emerald-500" : "bg-gray-200"
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Step 2 - Shipping */}
        <div className="flex flex-col items-center z-10">
          <motion.div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              step2
                ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                : "bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {step2 ? (
              <FaCheck className="text-white text-xl" />
            ) : (
              <FaShippingFast className="text-gray-500 text-xl" />
            )}
          </motion.div>
          <span
            className={`mt-2 text-sm font-medium ${
              step2 ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            Shipping
          </span>
        </div>

        {/* Connector line after Step 2 */}
        <motion.div
          className={`h-1 w-24 mx-2 ${
            step3 ? "bg-emerald-500" : "bg-gray-200"
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Step 3 - Summary */}
        <div className="flex flex-col items-center z-10">
          <motion.div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              step3
                ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                : "bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {step3 ? (
              <FaCheck className="text-white text-xl" />
            ) : (
              <FaClipboardList className="text-gray-500 text-xl" />
            )}
          </motion.div>
          <span
            className={`mt-2 text-sm font-medium ${
              step3 ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            Summary
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
