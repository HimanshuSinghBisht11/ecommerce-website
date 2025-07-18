import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    draggable: true,
    pauseOnHover: true,
    adaptiveHeight: false,
  };

  return (
    <div className="w-full h-full">
      <Slider {...settings} className="h-full">
        {products.map((product) => (
          <div
            key={product._id}
            className="h-[80vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] px-2 outline-none focus:outline-none relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute bottom-0 left-0 w-full bg-transparent text-white p-4 rounded-b-lg">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-pink-400 text-lg mb-2">${product.price}</p>
              <p className="text-sm line-clamp-3 mb-3">{product.description}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FaStore className="mr-2" />
                    <span>Brand: {product.brand}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>Added: {moment(product.createdAt).fromNow()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="mr-2" />
                    <span>Reviews: {product.numReviews}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <FaStar className="mr-2" />
                    <span>Rating: {Math.round(product.rating)}/5</span>
                  </div>
                  <div className="flex items-center">
                    <FaShoppingCart className="mr-2" />
                    <span>Quantity: {product.quantity}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBox className="mr-2" />
                    <span>In Stock: {product.countInStock}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
