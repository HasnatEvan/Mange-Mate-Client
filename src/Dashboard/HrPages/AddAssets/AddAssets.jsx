import { useEffect, useState } from "react";

import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Player } from "@lottiefiles/react-lottie-player";
import uploadingAnim from "../../../assets/Lottie/uploading.json";
import toast from "react-hot-toast";


import {
  FaBoxOpen,
  FaListAlt,
  FaHashtag,
  FaPlusCircle,
  FaBuilding,
} from "react-icons/fa";

const AddAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");

  // Fetch company name
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user?.email}`);
        if (res.data?.companyName) {
          setCompanyName(res.data.companyName);
        }
      } catch (error) {
        console.error("Failed to fetch company info", error);
      }
    };

    if (user?.email) fetchCompanyName();
  }, [user, axiosSecure]);

const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  // 3 second delay
  await new Promise(res => setTimeout(res, 3000));

  const form = event.target;
  const assetsName = form.assetsName.value;
  const assetsType = form.assetsType.value;
  const quantity = form.quantity.value;

  const hr = {
    name: user?.displayName,
    image: user?.photoURL,
    email: user?.email,
  };

  const assetsData = {
    assetsName,
    assetsType,
    quantity,
    companyName,
    hr,
    timestamp: new Date(),
  };

  try {
    const res = await axiosSecure.post("/assets", assetsData);

    if (res.data.insertedId) {
      toast.success("Asset added successfully!", {
        style: {
          background: "#ffffff",
          color: "#000",
          border: "1px solid #3b82f6",
        },
      });

      form.reset();
    }
  } catch (error) {
    toast.error("Could not add asset!", {
      style: {
        background: "#ffeded",
        color: "#d60000",
        border: "1px solid #ff7979",
      },
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
        {/* LEFT PANEL */}
        <div className="flex flex-col justify-center items-center text-center lg:text-left px-2">
          <Player
            autoplay
            loop
            src={uploadingAnim}
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-2xl"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mt-6">
            Smart Asset Management
          </h2>

          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed max-w-md">
            Keep your assets well-organized with clear naming, correct
            categorization and proper stock information.
          </p>

          <ul className="mt-4 space-y-2 text-gray-600 text-sm md:text-base">
            <li className="flex items-center gap-2">✔ Add assets quickly</li>
            <li className="flex items-center gap-2">✔ Clear & searchable data</li>
            <li className="flex items-center gap-2">✔ Professional tracking</li>
          </ul>
        </div>

        {/* RIGHT PANEL (FORM) */}
        <div
          className="
            backdrop-blur-xl bg-white/70 
            p-6 sm:p-8 rounded-2xl 
            hover:shadow-2xl transition-all duration-300
          "
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-8 flex items-center justify-center gap-2">
            <FaPlusCircle className="text-blue-600" /> Add New Asset
          </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

  {/* Company Name */}
  <div>
    <label className="block text-sm font-semibold mb-2 text-gray-700">
      <FaBuilding className="inline mr-2" />
      Company Name
    </label>
    <input
      type="text"
      value={companyName}
      readOnly
      placeholder="Company Name"
      className="
        w-full bg-gray-100 border border-gray-300 rounded-xl p-3
        text-black
        placeholder:text-black placeholder:opacity-100 placeholder:font-medium
      "
    />
  </div>

  {/* Asset Name */}
  <div>
    <label className="block text-sm font-semibold mb-2 text-gray-700">
      <FaBoxOpen className="inline mr-2" />
      Asset Name
    </label>
    <input
      type="text"
      name="assetsName"
      placeholder="Enter asset name"
      className="
        w-full border border-gray-300 rounded-xl p-3 
        text-black
        focus:ring-2 focus:ring-blue-500 transition
        placeholder:text-black placeholder:opacity-100 placeholder:font-medium
      "
      required
    />
  </div>

  {/* Asset Type */}
  <div>
    <label className="block text-sm font-semibold mb-2 text-gray-700">
      <FaListAlt className="inline mr-2" />
      Asset Type
    </label>
    <select
      name="assetsType"
      defaultValue=""
      className="
        w-full border border-gray-300 rounded-xl p-3 
        text-black
        focus:ring-2 focus:ring-blue-500 
        placeholder:text-black placeholder:opacity-100 placeholder:font-medium
      "
      required
    >
      <option value="" disabled className="text-gray-400">
        Select type
      </option>
      <option value="returnable">Returnable</option>
      <option value="non-returnable">Non-returnable</option>
    </select>
  </div>

  {/* Quantity */}
  <div>
    <label className="block text-sm font-semibold mb-2 text-gray-700">
      <FaHashtag className="inline mr-2" />
      Quantity
    </label>
    <input
      type="number"
      min="1"
      name="quantity"
      placeholder="Enter quantity"
      className="
        w-full border border-gray-300 rounded-xl p-3 
        text-black
        focus:ring-2 focus:ring-blue-500 transition 
        placeholder:text-black placeholder:opacity-100 placeholder:font-medium
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
        <FaPlusCircle className="text-white" /> Add Asset
      </>
    )}
  </button>

</form>

        </div>
      </div>
    </div>
  );
};

export default AddAssets;
