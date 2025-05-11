import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssetsTable = ({ asset, refetch, mobile = false }) => {
  const { assetsName, assetsType, quantity, _id, companyName,hr } = asset;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const handleRequest = async () => {
    const { value: note } = await MySwal.fire({
      title: "Request Asset",
      html: `<input id="note" class="swal2-input" placeholder="Additional notes (required)" />`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Request",
      preConfirm: () => {
        const input = document.getElementById("note")?.value.trim();
        if (!input) {
          Swal.showValidationMessage("Note is required");
          return false;
        }
        return input;
      },
    });

    if (!note) return; // User cancelled or empty note

    const requestData = {
      employ: {
        name: user?.displayName,
        email: user?.email,
      },
      requestId: _id,
      assetsName,
      assetsType,
      quantity: 1,
      note: note,
      requestDate: new Date().toISOString(),
      status: "pending",
      assetsOwner: hr?.email,
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);

      if (res.data.insertedId) {
        const stockResponse = await axiosSecure.patch(`/assets/quantity/${_id}`, {
          quantityToUpdate: 1,
          status: "decrease",
        });

        if (stockResponse.data.modifiedCount > 0) {
          await Swal.fire({
            icon: "success",
            title: "Request Successful!",
            text: "Asset requested and stock updated successfully.",
          });

          refetch();
          navigate("/dashboard/my-assets");
        } else {
          await Swal.fire({
            icon: "success",
            title: "Request Successful!",
            text: "Asset requested and stock updated successfully.",
          });
          refetch();
          navigate("/dashboard/my-assets");
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while submitting the request.",
      });
    }
  };

  if (mobile) {
    return (
      <>
        {quantity > 0 ? (
          <button
            onClick={handleRequest}
            className="bg-primary text-white py-1 px-3 rounded text-sm"
          >
            Request
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white py-1 px-3 rounded text-sm cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </>
    );
  }

  return (
    <tr className="text-center hover:bg-gray-50">
      <td className="py-2 px-4 border-b">{companyName}</td>
      <td className="py-2 px-4 border-b">{assetsName}</td>
      <td className="py-2 px-4 border-b">{assetsType}</td>
      <td className="py-2 px-4 border-b">{quantity}</td>
      <td className="py-2 px-4 border-b">
        {quantity > 0 ? (
          <button
            onClick={handleRequest}
            className="bg-[#FD8E29] text-white py-1 px-3 rounded text-sm"
          >
            Request
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white py-1 px-3 rounded text-sm cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </td>
    </tr>
  );
};

export default AssetsTable;
