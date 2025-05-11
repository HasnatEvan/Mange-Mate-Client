import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBox, FaTag, FaEnvelope, FaUser, FaCalendarAlt, FaStickyNote, FaInfoCircle } from "react-icons/fa";

const AllRequestTable = ({ request, refetch, isMobile }) => {
    const { assetsName, assetsType, employ, requestDate, note, status, _id,requestId } = request;
    const axiosSecure = useAxiosSecure();

    const handleApprove = async () => {
        try {
            const result = await Swal.fire({
                title: "Approve Request?",
                text: "Are you sure you want to approve this request?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, approve it!",
            });

            if (result.isConfirmed) {
                await axiosSecure.patch(`/request/approve/${_id}`, { approvalDate: new Date().toISOString() });
                await Swal.fire("Approved!", "The request has been approved.", "success");
                refetch();
            }
        } catch (error) {
            console.error("Approve Error:", error);
        }
    };

    const handleReject = async () => {
      try {
          const result = await Swal.fire({
              title: "Cancel Request?",
              text: "Are you sure you want to cancel this request?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, cancel it!",
          });
  
          if (result.isConfirmed) {
              // If you want to update the asset quantity when rejecting the request:
              await axiosSecure.patch(`/assets/quantity/${requestId}`, {
                  quantityToUpdate: 1, // Assuming you're increasing by 1
                  status: "increase",
              });
  
              // Delete the request after updating the stock
              await axiosSecure.delete(`/request/${_id}`);
  
              await Swal.fire("Cancelled", "The request has been cancelled.", "success");
              refetch();
          }
      } catch (error) {
          console.error("Reject Error:", error);
      }
  };
  
    if (isMobile) {
        return (
            <div className="p-4 rounded-lg shadow-sm space-y-2 bg-white">
            <p className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <FaBox className="text-primary" />
                <strong>Asset Name:</strong>
              </span>
              <span className="text-right">{assetsName}</span>
            </p>
          
            <p className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <FaTag className="text-primary" />
                <strong>Asset Type:</strong>
              </span>
              <span className="text-right">{assetsType}</span>
            </p>
          
            <p className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <strong>Email:</strong>
              </span>
              <span className="text-right">{employ?.email}</span>
            </p>
          
            <p className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <FaUser className="text-primary" />
                <strong>Name:</strong>
              </span>
              <span className="text-right">{employ?.name}</span>
            </p>
          
            <p className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                <strong>Request Date:</strong>
              </span>
              <span className="text-right">{new Date(requestDate).toLocaleDateString()}</span>
            </p>
          
            <p className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <FaStickyNote className="text-primary" />
                <strong>Note:</strong>
              </span>
              <span className="text-right">{note || "N/A"}</span>
            </p>
          
            <p className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <FaInfoCircle className="text-primary" />
                <strong>Status:</strong>
              </span>
              <span className="capitalize text-right">{status}</span>
            </p>
          
            <div className="flex justify-between mt-4">
              <button
                onClick={handleApprove}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
              >
                <FaCheck /> Approve
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
              >
                <FaTimes /> Reject
              </button>
            </div>
          </div>
          
        );
    }

    return (
        <tr className="text-center">
            <td className="border px-3 py-2">{assetsName}</td>
            <td className="border px-3 py-2">{assetsType}</td>
            <td className="border px-3 py-2">{employ?.email}</td>
            <td className="border px-3 py-2">{employ?.name}</td>
            <td className="border px-3 py-2">{new Date(requestDate).toLocaleDateString()}</td>
            <td className="border px-3 py-2">{note || "N/A"}</td>
            <td className="border px-3 py-2 capitalize">{status}</td>
            <td className="border px-3 py-2 space-x-2">
                <button
                    onClick={handleApprove}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
                >
                    <FaCheck />
                </button>
                <button
                    onClick={handleReject}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                >
                    <FaTimes />
                </button>
            </td>
        </tr>
    );
};

export default AllRequestTable;
