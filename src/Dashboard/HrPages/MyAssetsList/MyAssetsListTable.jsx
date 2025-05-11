import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaListAlt, FaHashtag } from 'react-icons/fa';

const MyAssetsListTable = ({ asset, refetch, isTable }) => {
    const { assetsName, assetsType, quantity, _id } = asset;
    const axiosSecure = useAxiosSecure();

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Cancel Request?",
            text: "Are you sure you want to cancel this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it!"
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/assets/${_id}`);
                await Swal.fire("Cancelled", "Your request has been cancelled.", "success");
                refetch();
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Something went wrong!", "error");
            }
        }
    };

    // If Table view
    if (isTable) {
        return (
            <tr className="text-center">
                <td className="border p-2">{assetsName}</td>
                <td className="border p-2">{assetsType}</td>
                <td className="border p-2">{quantity}</td>
                <td className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                        <Link to={`/dashboard/assets-update/${_id}`}
                            className="bg-[#0149B1] text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                        >
                            <FaEdit /> Update
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    // If Card view (mobile)
    return (
        <div className="border border-gray-300 p-4 rounded-lg shadow bg-white space-y-4">
        {/* Name */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <FaBoxOpen className="text-blue-500" />
                <span className="font-semibold">Name:</span>
            </div>
            <span>{assetsName}</span>
        </div>
    
        {/* Type */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <FaListAlt className="text-green-500" />
                <span className="font-semibold">Type:</span>
            </div>
            <span>{assetsType}</span>
        </div>
    
        {/* Quantity */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <FaHashtag className="text-purple-500" />
                <span className="font-semibold">Quantity:</span>
            </div>
            <span>{quantity}</span>
        </div>
    
        {/* Actions */}
        <div className="flex items-center gap-2">
            <Link
                to={`/dashboard/assets-update/${_id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-1 w-full justify-center"
            >
                <FaEdit /> Update
            </Link>
            <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-1 w-full justify-center"
            >
                <FaTrash /> Delete
            </button>
        </div>
    </div>
    
    );
};

export default MyAssetsListTable;
