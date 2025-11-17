import { FaEdit, FaTrash, FaBoxOpen, FaListAlt, FaHashtag } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyAssetsListTable = ({ asset, refetch, isTable }) => {
    const { assetsName, assetsType, quantity, _id } = asset;
    const axiosSecure = useAxiosSecure();

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Delete Asset?",
            text: "Are you sure you want to delete this asset?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/assets/${_id}`);
                await Swal.fire("Deleted!", "Asset has been removed.", "success");
                refetch();
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        }
    };

    // ======================= TABLE ROW =======================
    if (isTable) {
        return (
            <tr className="hover:bg-blue-50 transition-all border-b border-gray-200">
                <td className="p-3 text-center text-gray-800 border-r border-gray-200">{assetsName}</td>

                <td className="p-3 text-center text-gray-800 capitalize border-r border-gray-200">{assetsType}</td>

                <td className="p-3 text-center text-gray-800 font-semibold border-r border-gray-200">{quantity}</td>

                <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-3">

                        <Link
                            to={`/dashboard/assets-update/${_id}`}
                            className="p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            <FaEdit size={16} />
                        </Link>

                        <button
                            onClick={handleDelete}
                            className="p-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                        >
                            <FaTrash size={16} />
                        </button>

                    </div>
                </td>
            </tr>


        );
    }

    // ======================= MOBILE CARD =======================
    return (
       <div className="bg-white/80 backdrop-blur-md border  p-5
           transition-all duration-300">

    {/* NAME */}
    <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 text-gray-800">
            <FaBoxOpen className="text-blue-600 text-xl" />
            <span className="font-semibold text-gray-700">Name</span>
        </div>
        <span className="font-semibold text-gray-900">{assetsName}</span>
    </div>

    {/* TYPE */}
    <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 text-gray-800">
            <FaListAlt className="text-green-600 text-xl" />
            <span className="font-semibold text-gray-700">Type</span>
        </div>
        <span className="capitalize text-gray-900">{assetsType}</span>
    </div>

    {/* QUANTITY */}
    <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3 text-gray-800">
            <FaHashtag className="text-purple-600 text-xl" />
            <span className="font-semibold text-gray-700">Quantity</span>
        </div>
        <span className="font-semibold text-gray-900">{quantity}</span>
    </div>

    {/* ACTION BUTTONS */}
    <div className="grid grid-cols-2 gap-4">

        <Link
            to={`/dashboard/assets-update/${_id}`}
            className="py-3 bg-blue-600 text-white rounded-xl shadow-md 
                       flex items-center justify-center gap-2 hover:bg-blue-700 
                       transition-all active:scale-95"
        >
            <FaEdit size={18} />
            <span className="font-medium text-sm">Update</span>
        </Link>

        <button
            onClick={handleDelete}
            className="py-3 bg-red-500 text-white rounded-xl shadow-md 
                       flex items-center justify-center gap-2 hover:bg-red-600 
                       transition-all active:scale-95"
        >
            <FaTrash size={18} />
            <span className="font-medium text-sm">Delete</span>
        </button>

    </div>
</div>

    );
};

export default MyAssetsListTable;
