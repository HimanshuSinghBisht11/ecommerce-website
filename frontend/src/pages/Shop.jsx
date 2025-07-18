import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Filter Section */}
      <div className="w-64 bg-[#151515] p-4 sticky top-0 h-screen overflow-y-auto ml-14 scrollbar-hide hover:overflow-y-auto">
        <h2 className="text-lg font-semibold text-center py-2 bg-black rounded-full mb-4 text-white">
          Filter by Categories
        </h2>

        <div className="space-y-2 mb-6">
          {categories?.map((c) => (
            <div key={c._id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${c._id}`}
                onChange={(e) => handleCheck(e.target.checked, c._id)}
                className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              />
              <label
                htmlFor={`category-${c._id}`}
                className="ml-2 text-sm font-medium text-white"
              >
                {c.name}
              </label>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-center py-2 bg-black rounded-full mb-4 text-white">
          Filter by Brands
        </h2>

        <div className="space-y-2 mb-6">
          {uniqueBrands?.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="radio"
                id={brand}
                name="brand"
                onChange={() => handleBrandClick(brand)}
                className="w-4 h-4 text-red-400 bg-gray-100 border-gray-300 focus:ring-red-500"
              />
              <label
                htmlFor={brand}
                className="ml-2 text-sm font-medium text-white"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-center py-2 bg-black rounded-full mb-4 text-white">
          Filter by Price
        </h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Price"
            value={priceFilter}
            onChange={handlePriceChange}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-red-300"
          />
        </div>

        <button
          className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Reset Filters
        </button>
      </div>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : (
            products?.map((p) => (
              <div key={p._id} className="flex justify-center">
                <ProductCard p={p} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
