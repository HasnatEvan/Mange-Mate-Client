import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaBox,
  FaTag,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaStickyNote,
  FaInfoCircle
} from "react-icons/fa";
import { useState } from "react";

const AllRequestTable = ({ request, refetch, isMobile }) => {
  const { assetsName, assetsType, employ, requestDate, note, status, _id, requestId } = request || {};
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // ===================== UNIVERSAL STATUS UPDATE =====================
  const handleStatusChange = async (newStatus) => {
    const confirm = await Swal.fire({
      title: `Change status to ${newStatus}?`,
      text: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, change"
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      await axiosSecure.patch(`/request/status/${_id}`, {
        status: newStatus,
      });

      await Swal.fire("Updated!", `Status changed to ${newStatus}.`, "success");

      refetch();
    } catch (error) {
      Swal.fire("Error", "Status update failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  // ===================== OLD APPROVE FUNCTION =====================
  const handleApprove = async () => {
    const result = await Swal.fire({
      title: "Approve Request?",
      text: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve"
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await axiosSecure.patch(`/request/approve/${_id}`, {
        approvalDate: new Date().toISOString()
      });
      await Swal.fire("Approved!", "Request has been approved.", "success");
      refetch();
    } catch (err) {
      console.error(err);
      await Swal.fire("Error", "Could not approve request. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ===================== OLD REJECT FUNCTION =====================
  const handleReject = async () => {
    const result = await Swal.fire({
      title: "Cancel Request?",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancel Request"
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      if (requestId) {
        await axiosSecure.patch(`/assets/quantity/${requestId}`, {
          quantityToUpdate: 1,
          status: "increase"
        });
      }

      await axiosSecure.delete(`/request/${_id}`);

      await Swal.fire("Cancelled!", "Request has been removed.", "success");
      refetch();

    } catch (err) {
      console.error(err);
      await Swal.fire("Error", "Could not cancel request. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ===================== MOBILE CARD =====================
  if (isMobile) {
    return (
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-md  space-y-3 text-gray-700">
        <CardRow icon={<FaBox />} label="Asset Name" value={assetsName || "N/A"} />
        <CardRow icon={<FaTag />} label="Type" value={assetsType || "N/A"} />
        <CardRow icon={<FaEnvelope />} label="Email" value={employ?.email || "N/A"} />
        <CardRow icon={<FaUser />} label="Name" value={employ?.name || "N/A"} />
        <CardRow icon={<FaCalendarAlt />} label="Date" value={requestDate ? new Date(requestDate).toLocaleDateString() : "N/A"} />
        <CardRow icon={<FaStickyNote />} label="Note" value={note || "N/A"} />

        {/* ⭐ STATUS DROPDOWN IN MOBILE */}
     <div>
  <label className="text-gray-700 font-medium">Status</label>

  <select
    value={status}
    onChange={(e) => handleStatusChange(e.target.value)}
    disabled={loading}
    className={`
      w-full border px-3 py-2 rounded-xl mt-1 outline-none
      ${status === "pending"
        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
        : status === "approved"
        ? "bg-green-100 text-green-700 border-green-300"
        : "bg-purple-100 text-purple-700 border-purple-300"
      }
    `}
  >
    <option className="bg-white text-gray-700" value="pending">Pending</option>
    <option className="bg-white text-gray-700" value="approved">Approved</option>
    <option className="bg-white text-gray-700" value="returned">Returned</option>
  </select>
</div>


        {/* OLD BUTTONS (optional) */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={handleApprove}
            disabled={loading || status === "approved"}
            className="bg-green-600 disabled:opacity-50 text-white py-2 rounded-xl shadow hover:bg-green-700"
          >
            <FaCheck className="inline" /> Approve
          </button>

          <button
            onClick={handleReject}
            disabled={loading}
            className="bg-red-500 disabled:opacity-50 text-white py-2 rounded-xl shadow hover:bg-red-600"
          >
            <FaTimes className="inline" /> Reject
          </button>
        </div>
      </div>
    );
  }

  // ===================== DESKTOP TABLE =====================
  return (
    <tr className="text-center hover:bg-blue-50 transition text-gray-700">
      <td className="border border-gray-300 px-3 py-2">{assetsName || "N/A"}</td>
      <td className="border border-gray-300 px-3 py-2">{assetsType || "N/A"}</td>
      <td className="border border-gray-300 px-3 py-2">{employ?.email || "N/A"}</td>
      <td className="border border-gray-300 px-3 py-2">{employ?.name || "N/A"}</td>
      <td className="border border-gray-300 px-3 py-2">
        {requestDate ? new Date(requestDate).toLocaleDateString() : "N/A"}
      </td>
      <td className="border border-gray-300 px-3 py-2">{note || "N/A"}</td>

      {/* ⭐ DROPDOWN inside STATUS COLUMN */}
      <td className="border border-gray-300 px-3 py-2">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={loading}
          className={`px-3 py-1 rounded-full text-xs font-semibold border outline-none w-full
            ${status === "pending" ? "bg-yellow-100 text-yellow-700 border-yellow-300" :
              status === "returned" ? "bg-purple-100 text-purple-700 border-purple-300" :
              "bg-green-100 text-green-700 border-green-300"
            }`}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="returned">Returned</option>
        </select>
      </td>

      {/* OLD ACTION BUTTONS */}
      <td className="border border-gray-300 px-3 py-2 space-x-2">
        <button
          onClick={handleApprove}
          disabled={loading || (status || "").toLowerCase() === "approved"}
          className="bg-green-500 disabled:opacity-50 hover:bg-green-600 text-white px-2 py-1 rounded"
        >
          <FaCheck />
        </button>

        <button
          onClick={handleReject}
          disabled={loading}
          className="bg-red-500 disabled:opacity-50 hover:bg-red-600 text-white px-2 py-1 rounded"
        >
          <FaTimes />
        </button>
      </td>
    </tr>
  );
};

const CardRow = ({ icon, label, value }) => (
  <p className="flex justify-between items-center">
    <span className="flex items-center gap-2 text-gray-700 font-medium">
      {icon}
      {label}
    </span>
    <span className="text-gray-900">{value}</span>
  </p>
);

export default AllRequestTable;
