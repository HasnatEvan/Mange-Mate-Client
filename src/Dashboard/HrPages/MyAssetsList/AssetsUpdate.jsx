import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaBoxOpen,
  FaHashtag,
  FaListAlt,
  FaPlusCircle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

const AssetsUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await axiosSecure.get(`/assets/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };
    fetchProductData();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosSecure.put(`/assets/${id}`, product);
      // ✅ Sweet Alert for Success
      Swal.fire({
        title: "Success!",
        text: "Asset updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard/asset-list");
      });
    } catch (error) {
      console.error("Error updating asset", error);
      // ✅ Sweet Alert for Error
      Swal.fire({
        title: "Error!",
        text: "Failed to update asset. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Close",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 text-black">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="p-8 rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#0149B1]">
            Update Asset
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Asset Name */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <FaBoxOpen /> Asset Name
              </label>
              <input
                type="text"
                name="assetsName"
                value={product.assetsName || ""}
                onChange={handleChange}
                placeholder="Enter asset name"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Asset Type */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <FaListAlt /> Asset Type
              </label>
              <select
                name="assetsType"
                value={product.assetsType || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-returnable</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <FaHashtag /> Quantity
              </label>
              <input
                type="number"
                min="1"
                name="quantity"
                value={product.quantity || ""}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FD8E29] text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                <>
                  <FaPlusCircle /> Update Asset
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sidebar Info Section */}
        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#0149B1]">
            <FaInfoCircle /> Why Keep Assets Updated?
          </h3>
          <ul className="space-y-4 text-sm list-disc pl-5">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-1" />
              Accurate asset tracking helps reduce losses.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-1" />
              Helps management take informed decisions.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-1" />
              Streamlines audits and inventory checks.
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-1" />
              Ensures up-to-date quantity and usability.
            </li>
          </ul>
          <p className="mt-5 text-sm">
            Keeping your company's assets updated saves time, improves accuracy, and helps everyone stay on the same page. Always ensure the latest information is available.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AssetsUpdate;
