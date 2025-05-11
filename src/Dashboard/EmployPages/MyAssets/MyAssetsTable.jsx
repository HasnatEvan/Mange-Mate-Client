import { useState } from "react";
import { FaPrint, FaUndo, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBox, FaBuilding, FaTags, FaCalendarAlt, FaCheckCircle, } from "react-icons/fa"

const styles = StyleSheet.create({
  page: { padding: 20 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
  footer: { fontSize: 10, position: "absolute", bottom: 20, left: 20 }
});

const AssetPDF = ({ request }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>Company Name: {request.companyName}</Text>
      <Text style={styles.text}>Asset Name: {request.assetsName}</Text>
      <Text style={styles.text}>Asset Type: {request.assetsType}</Text>
      <Text style={styles.text}>Request Date: {new Date(request.requestDate).toLocaleDateString()}</Text>
      <Text style={styles.text}>Approval Date: {new Date(request.approvalDate).toLocaleDateString()}</Text>
      <Text style={styles.text}>Requested By: {request.employ?.name} ({request.employ?.email})</Text>
      <Text style={styles.text}>Status: {request.status}</Text>
      <Text style={styles.text}>Note: {request.note}</Text>
      <Text style={styles.footer}>Printed on: {new Date().toLocaleString()}</Text>
    </Page>
  </Document>
);

const MyAssetsTable = ({ request, refetch, isMobile = false }) => {
  const { companyName, assetsName, assetsType, requestDate, approvalDate, status, _id,requestId } = request;
  const axiosSecure = useAxiosSecure();
  const [isReturned, setIsReturned] = useState(false);

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel Request?",
      text: "Are you sure you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!"
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/assets/quantity/${requestId}`, {
        quantityToUpdate: 1,
        status: "increase",
      });
      await axiosSecure.delete(`/request/${_id}`);
      await Swal.fire("Cancelled", "Your request has been cancelled.", "success");
      refetch();
    }
  };

  const handleReturn = async () => {
    await axiosSecure.patch(`/requests/return/${_id}`, { status: "returned" });
    await axiosSecure.patch(`/assets/quantity/${request.requestId}`, {
      quantityToUpdate: 1,
      status: "increase"
    });
    setIsReturned(true);
    await Swal.fire("Returned!", "Asset has been returned successfully.", "success");
    refetch();
  };

  // ✅ Mobile Card View
  if (isMobile) {
    return (
      <div className=" rounded shadow-sm p-4 space-y-1 text-sm bg-white">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FaBox className="text-gray-500" /> <strong>Asset:</strong>
          </span>
          <span>{assetsName}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FaBuilding className="text-gray-500" /> <strong>Company:</strong>
          </span>
          <span>{companyName}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FaTags className="text-gray-500" /> <strong>Type:</strong>
          </span>
          <span>{assetsType}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" /> <strong>Request Date:</strong>
          </span>
          <span>{new Date(requestDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" /> <strong>Approval Date:</strong>
          </span>
          <span>{approvalDate ? new Date(approvalDate).toLocaleDateString() : "N/A"}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FaCheckCircle className="text-gray-500" /> <strong>Status:</strong>
          </span>
          <span>{isReturned ? "Returned" : status}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {status === "pending" && (
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
            >
              <FaTimes /> Cancel
            </button>
          )}

          {status === "approved" && (
            <>
              <PDFDownloadLink
                document={<AssetPDF request={request} />}
                fileName={`asset_${_id}.pdf`}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
              >
                {({ loading }) => loading ? "Loading..." : <><FaPrint /> Print</>}
              </PDFDownloadLink>

              {assetsType === "Returnable" && !isReturned && (
                <button
                  onClick={handleReturn}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                >
                  <FaUndo /> Return
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ✅ Default Desktop Table Row
  return (
    <tr className="border-b text-xs md:text-sm">
      <td className="px-4 py-2">{assetsName}</td>
      <td className="px-4 py-2">{companyName}</td>
      <td className="px-4 py-2">{assetsType}</td>
      <td className="px-4 py-2">{new Date(requestDate).toLocaleDateString()}</td>
      <td className="px-4 py-2">{approvalDate ? new Date(approvalDate).toLocaleDateString() : "N/A"}</td>
      <td className="px-4 py-2">{isReturned ? "Returned" : status}</td>
      <td className="px-4 py-2">
        <div className="flex flex-col md:flex-row flex-wrap gap-2">
          {status === "pending" && (
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            >
              <FaTimes /> Cancel
            </button>
          )}
          {status === "approved" && (
            <>
              <PDFDownloadLink
                document={<AssetPDF request={request} />}
                fileName={`asset_${_id}.pdf`}
                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                {({ loading }) => loading ? "Loading..." : <><FaPrint /> Print</>}
              </PDFDownloadLink>

              {assetsType === "Returnable" && !isReturned && (
                <button
                  onClick={handleReturn}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
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
