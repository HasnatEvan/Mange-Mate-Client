import { useState } from "react";
import { FaPrint, FaUndo, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { PDFDownloadLink } from "@react-pdf/renderer";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBox, FaBuilding, FaTags, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import AssetPDF from "./PDFGenerator";

const MyAssetsTable = ({ request, refetch, isMobile = false }) => {
  const { companyName, assetsName, assetsType, requestDate, approvalDate, status, _id, requestId } = request;
  const axiosSecure = useAxiosSecure();
  const [isReturned, setIsReturned] = useState(false);

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel Request?",
      text: "Are you sure you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel"
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/assets/quantity/${requestId}`, { quantityToUpdate: 1, status: "increase" });
      await axiosSecure.delete(`/request/${_id}`);
      Swal.fire("Cancelled", "Your request has been cancelled.", "success");
      refetch();
    }
  };

  const handleReturn = async () => {
    await axiosSecure.patch(`/requests/return/${_id}`, { status: "returned" });
    await axiosSecure.patch(`/assets/quantity/${requestId}`, { quantityToUpdate: 1, status: "increase" });
    setIsReturned(true);
    Swal.fire("Returned!", "Asset returned successfully.", "success");
    refetch();
  };

  // 📱 Mobile Card UI
if (isMobile) {
  return (
    <div className="bg-white text-gray-700 p-4 rounded-xl shadow-md space-y-3 text-sm transition relative">

      {/* ==== ACTION BUTTONS (TOP RIGHT) ==== */}
      <div className="absolute top-3 right-3 flex gap-2">

        {status === "pending" && (
          <button
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm transition"
          >
            <FaTimes /> Cancel
          </button>
        )}

        {status === "approved" && (
          <>
            <PDFDownloadLink
              document={<AssetPDF request={request} />}
              fileName={`asset_${_id}.pdf`}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm transition"
            >
              <FaPrint /> Print
            </PDFDownloadLink>

            {assetsType === "Returnable" && !isReturned && (
              <button
                onClick={handleReturn}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm transition"
              >
                <FaUndo /> Return
              </button>
            )}
          </>
        )}
      </div>

      {/* ==== DATA SECTION ==== */}

      {/* Asset */}
      <div className="flex justify-between items-center mt-10">
        <span className="flex items-center gap-2 font-medium text-gray-600">
          <FaBox className="text-blue-600" /> Asset
        </span>
        <span className="font-semibold text-gray-900">{assetsName}</span>
      </div>

      {/* Company */}
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 font-medium text-gray-600">
          <FaBuilding className="text-blue-600" /> Company
        </span>
        <span className="font-semibold text-gray-900">{companyName}</span>
      </div>

      {/* Type */}
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 font-medium text-gray-600">
          <FaTags className="text-blue-600" /> Type
        </span>
        <span className="font-semibold text-gray-900">{assetsType}</span>
      </div>

      {/* Requested */}
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 font-medium text-gray-600">
          <FaCalendarAlt className="text-blue-600" /> Requested
        </span>
        <span className="font-semibold text-gray-900">
          {new Date(requestDate).toLocaleDateString()}
        </span>
      </div>

      {/* Approved */}
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 font-medium text-gray-600">
          <FaCalendarAlt className="text-blue-600" /> Approved
        </span>
        <span className="font-semibold text-gray-900">
          {approvalDate ? new Date(approvalDate).toLocaleDateString() : "N/A"}
        </span>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 font-medium text-gray-600">
          <FaCheckCircle className="text-blue-600" /> Status
        </span>
        <span
          className={`font-semibold ${
            isReturned ? "text-green-600" : "text-gray-900"
          }`}
        >
          {isReturned ? "Returned" : status}
        </span>
      </div>

    </div>
  );
}



  // 🖥 Desktop Excel Row
  return (
  <tr className="border-b border-gray-300 text-sm text-gray-700 text-center">

  <td className="px-4 py-3 border-r border-gray-300">{assetsName}</td>

  <td className="px-4 py-3 border-r border-gray-300">{companyName}</td>

  <td className="px-4 py-3 border-r border-gray-300">{assetsType}</td>

  <td className="px-4 py-3 border-r border-gray-300">
    {new Date(requestDate).toLocaleDateString()}
  </td>

  <td className="px-4 py-3 border-r border-gray-300">
    {approvalDate ? new Date(approvalDate).toLocaleDateString() : "N/A"}
  </td>

  <td className="px-4 py-3 border-r border-gray-300">
    {isReturned ? "Returned" : status}
  </td>

  <td className="px-4 py-3">
    <div className="flex flex-wrap gap-2 justify-center">

      {status === "pending" && (
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
        >
          <FaTimes /> Cancel
        </button>
      )}

      {status === "approved" && (
        <>
          <PDFDownloadLink
            document={<AssetPDF request={request} />}
            fileName={`asset_${_id}.pdf`}
            className="bg-green-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
          >
            <FaPrint /> Print
          </PDFDownloadLink>

          {assetsType === "Returnable" && !isReturned && (
            <button
              onClick={handleReturn}
              className="bg-blue-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
            >
              <FaUndo /> Return
            </button>
          )}
        </>
      )}

    </div>
  </td>

</tr>

  );
};

export default MyAssetsTable;


