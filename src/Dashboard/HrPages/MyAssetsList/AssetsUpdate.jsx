import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

import Lottie from "lottie-react";
import updateAnim from "../../../assets/Lottie/update.json";

import {
  FaBoxOpen,
  FaHashtag,
  FaListAlt,
  FaPlusCircle,
  FaBuilding,
} from "react-icons/fa";

const AssetsUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch asset info
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

      Swal.fire({
        title: "Success!",
        text: "Asset updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/dashboard/asset-list");
      });

    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update asset.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center">

      <div
        className="
          w-full max-w-7xl 
          backdrop-blur-xl bg-white/70 shadow-2xl border border-white/40 
          rounded-3xl p-6 md:p-12 
          grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12
        "
      >
        {/* LEFT PANEL — LOTTIE */}
        <div className="flex flex-col justify-center items-center text-center lg:text-left px-2">
          <Lottie
            animationData={updateAnim}
            loop
            autoplay
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-2xl"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mt-6">
            Update Asset Information
          </h2>

          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed max-w-md">
            Keep all your company assets updated to ensure accurate tracking and
            smooth management experience.
          </p>
        </div>

        {/* RIGHT PANEL — FORM */}
        <div
          className="
            backdrop-blur-xl bg-white/70 
            p-6 sm:p-8 rounded-2xl 
            hover:shadow-2xl transition-all duration-300
          "
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-8 flex items-center justify-center gap-2">
            <FaPlusCircle className="text-blue-600" /> Update Asset
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Company Name (ReadOnly) */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <FaBuilding className="inline mr-2" /> Company Name
              </label>
              <input
                type="text"
                value={product.companyName || ""}
                readOnly
                className="
                  w-full bg-gray-100 border border-gray-300 rounded-xl p-3
                  text-black
                "
              />
            </div>

            {/* Asset Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <FaBoxOpen className="inline mr-2" /> Asset Name
              </label>
              <input
                type="text"
                name="assetsName"
                value={product.assetsName || ""}
                onChange={handleChange}
                placeholder="Enter asset name"
                className="
                  w-full border border-gray-300 rounded-xl p-3 
                  text-black
                  focus:ring-2 focus:ring-blue-500 transition
                "
                required
              />
            </div>

            {/* Asset Type */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <FaListAlt className="inline mr-2" /> Asset Type
              </label>
              <select
                name="assetsType"
                value={product.assetsType || ""}
                onChange={handleChange}
                className="
                  w-full border border-gray-300 rounded-xl p-3 
                  text-black
                  focus:ring-2 focus:ring-blue-500 transition
                "
                required
              >
                <option value="" disabled>Select type</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-returnable</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                <FaHashtag className="inline mr-2" /> Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={product.quantity || ""}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="
                  w-full border border-gray-300 rounded-xl p-3 
                  text-black
                  focus:ring-2 focus:ring-blue-500 transition
                "
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold text-white text-lg
                bg-gradient-to-r from-blue-600 to-blue-500
                hover:from-blue-700 hover:to-blue-600
                shadow-md hover:shadow-xl transition flex items-center justify-center gap-3
              "
            >
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                <>
                  <FaPlusCircle className="text-white" /> Update Asset
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetsUpdate;
