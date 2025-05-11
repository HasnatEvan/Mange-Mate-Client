import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// Icons
import { FaBoxOpen, FaListAlt, FaHashtag, FaPlusCircle, FaBuilding } from "react-icons/fa";

const AddAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");

  // ✅ Fetch HR info (company name) from user collection
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

    if (user?.email) {
      fetchCompanyName();
    }
  }, [user, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

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
    };

    try {
      const res = await axiosSecure.post("/assets", assetsData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Asset added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        form.reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-12 text-black">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* Side Info Panel */}
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h2 className="text-3xl font-bold text-[#0149B1] mb-4">Manage Your Inventory</h2>
          <p className="text-gray-600">
            Easily add and organize company assets. Ensure each item is accurately categorized
            as <strong>Returnable</strong> or <strong>Non-returnable</strong> for efficient tracking.
          </p>
          <ul className="mt-4 list-disc list-inside text-sm text-gray-500">
            <li>Use clear asset names (e.g., Dell Laptop, Office Chair).</li>
            <li>Set the correct type to avoid inventory mismatch.</li>
            <li>Ensure the quantity reflects actual stock.</li>
          </ul>
        </div>

        {/* Asset Form */}
        <div className="lg:w-1/2 w-full bg-gray-100 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#0149B1] flex items-center justify-center gap-2">
            <FaPlusCircle /> Add a New Asset
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <FaBuilding /> Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={companyName}
                readOnly
                className="w-full border border-gray-300 rounded p-2 bg-gray-200"
              />
            </div>

            {/* Assets Name */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <FaBoxOpen /> Assets Name
              </label>
              <input
                type="text"
                name="assetsName"
                placeholder="Enter asset name"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Assets Type */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <FaListAlt /> Assets Type
              </label>
              <select
                name="assetsType"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-returnable</option>
              </select>
            </div>

            {/* Assets Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <FaHashtag /> Assets Quantity
              </label>
              <input
                type="number"
                min="1"
                name="quantity"
                placeholder="Enter asset quantity"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FD8E29] text-white py-2 rounded hover:bg-primary-dark transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                <>
                  <FaPlusCircle /> Add Asset
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
