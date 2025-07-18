import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col xl:flex-row gap-8 min-h-[600px] h-[80vh]">
        <div className="xl:w-1/2 xl:flex hidden flex-col">
          <div className="grid grid-cols-2 gap-4">
            {data.map((product) => (
              <SmallProduct key={product._id} product={product} />
            ))}
          </div>
        </div>

        <div className="xl:w-1/2 w-full flex flex-col">
          <div className="flex-grow  overflow-hidden rounded-lg">
            <ProductCarousel products={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
