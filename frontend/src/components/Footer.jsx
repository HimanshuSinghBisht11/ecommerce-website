import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-gray-300 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-blue-500">
              BuyBud
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Products Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-semibold relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-blue-500">
                Connect With Us
              </h3>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white p-2 rounded-full transition-all duration-300 hover:-translate-y-1"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white p-2 rounded-full transition-all duration-300 hover:-translate-y-1"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white p-2 rounded-full transition-all duration-300 hover:-translate-y-1"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white p-2 rounded-full transition-all duration-300 hover:-translate-y-1"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-400">Send your Feedback</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white flex-grow"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded transition-colors"
                >
                  Feedback
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
