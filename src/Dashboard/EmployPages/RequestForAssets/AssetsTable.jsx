import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssetsTable = ({ asset, refetch, mobile = false }) => {
  const { assetsName, assetsType, quantity, _id, companyName, hr } = asset;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const handleRequest = async () => {
    const { value: note } = await MySwal.fire({
      title: "Request Asset",
      html: `<input id="note" class="swal2-input" placeholder="Additional notes (required)" />`,
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

    if (!note) return;

    const requestData = {
      employ: { name: user?.displayName, email: user?.email },
      requestId: _id,
      assetsName,
      assetsType,
      quantity: 1,
      note,
      requestDate: new Date().toISOString(),
      status: "pending",
      assetsOwner: hr?.email,
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);

      if (res.data.insertedId) {
        await axiosSecure.patch(`/assets/quantity/${_id}`, {
          quantityToUpdate: 1,
          status: "decrease",
        });

        Swal.fire("Success!", "Request submitted successfully.", "success");
        refetch();
        navigate("/dashboard/my-assets");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to send request", "error");
    }
  };

  if (mobile) {
    return (
      <>
        {quantity > 0 ? (
          <button
            onClick={handleRequest}
            className="w-full py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Request
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2 bg-gray-400 text-white rounded-xl cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </>
    );
  }

  return (
    <div className="flex justify-center">
      {quantity > 0 ? (
        <button
          onClick={handleRequest}
          className="bg-blue-600 text-white px-4 py-1 rounded-lg shadow hover:bg-blue-700"
        >
          Request
        </button>
      ) : (
        <button
          disabled
          className="bg-gray-400 text-white px-4 py-1 rounded-lg cursor-not-allowed"
        >
          Out of Stock
        </button>
      )}
    </div>
  );
};

export default AssetsTable;
