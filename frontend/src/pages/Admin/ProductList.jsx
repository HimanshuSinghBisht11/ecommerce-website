import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { FaTimes } from "react-icons/fa";

const ProductList = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      if (image) {
        const uploadFormData = new FormData();
        uploadFormData.append("image", image);
        const uploadRes = await uploadProductImage(uploadFormData).unwrap();
        productData.append("image", uploadRes.image);
      }

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <div className="w-40">
          <AdminMenu />
        </div>

        <div className="flex-1 p-3">
          <div className="text-2xl font-semibold mb-6">Create Product</div>

          <div className="bg-[#1a1a1d] rounded-lg p-6 mb-6 shadow-lg">
            {imagePreview && (
              <div className="mb-6 relative inline-block">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="max-h-64 rounded-lg border-2 border-gray-600 object-contain"
                  />
                  <button
                    onClick={removeSelectedImage}
                    className="absolute -right-2 -top-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                    title="Remove image"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              </div>
            )}

            {!imagePreview && (
              <div className="mb-6">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer py-8 hover:border-gray-500 transition-colors">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-[#252529] border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-lg bg-[#252529] border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-lg bg-[#252529] border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-[#252529] border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter brand"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-[#252529] border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stock Count
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-[#252529] border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter stock count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#252529] border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 px-6 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition-colors text-white shadow-lg"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
