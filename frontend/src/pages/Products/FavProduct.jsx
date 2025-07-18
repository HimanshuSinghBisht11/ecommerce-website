import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const FavProduct = ({ product }) => {
  return (
    <div className="w-full p-3 relative group transition-all duration-300 hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-medium text-gray-100 truncate">
              {product.name}
            </div>
            <span className="bg-red-900 text-red-300 text-sm font-medium px-2.5 py-0.5 rounded-full">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default FavProduct;
