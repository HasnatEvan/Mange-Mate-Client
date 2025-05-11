import { FaUserCheck, FaUserShield, FaEnvelope, FaBirthdayCake } from "react-icons/fa";
import { MdOutlinePersonOff } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const RequestedEmploy = ({ request, refetch, hrEmail }) => {
  const axiosSecure = useAxiosSecure();
  const { name, email, dob, _id } = request;

  const [status, setStatus] = useState(request.role?.toLowerCase() || "");
  const [approvedByOther, setApprovedByOther] = useState(false);

  const handleApprove = async () => {
    try {
      // Step 1: Check HR's employee limit
      const limitRes = await axiosSecure.get(`/hr-employee-limit/${hrEmail}`);
      const { totalAllowed, currentEmployees } = limitRes.data;

      if (currentEmployees >= totalAllowed) {
        Swal.fire(
          "Limit Reached",
          "You have reached your employee limit based on your package.",
          "warning"
        );
        return;
      }

      // Step 2: Confirm Approve
      const result = await Swal.fire({
        title: "Approve User?",
        text: `Do you want to approve ${name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Approve",
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.patch(`/approve-user/${_id}`, { hrEmail });

        if (response.data.success) {
          setStatus("employee");
          Swal.fire("Approved!", `${name} is now an employee.`, "success");
          refetch();
        } else if (response.data.message === "User is already approved by another HR") {
          setStatus("employee");
          setApprovedByOther(true);
          Swal.fire(
            "Already Approved",
            "This user is already approved by another HR.",
            "info"
          );
        }
      }
    } catch (error) {
      console.error("Error approving user:", error);
      Swal.fire("Error", "Could not approve user.", "error");
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-md bg-white space-y-5 hover:shadow-lg transition">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <FaUserShield className="text-3xl text-blue-500" />
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-lg font-semibold">
            <FaUserShield className="text-blue-400" /> {name}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <FaEnvelope className="text-gray-400" /> {email}
          </p>
          <p className="flex items-center gap-2 text-gray-500 text-sm">
            <FaBirthdayCake className="text-pink-400" /> DOB: {dob}
          </p>
        </div>
      </div>

      {/* Approve Button */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handleApprove}
          disabled={status === "employee"}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-white font-medium
            ${status === "employee" 
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FD8E29] hover:bg-green-600 transition"}
          `}
        >
          {status === "employee" ? (
            <>
              <MdOutlinePersonOff className="text-xl" />
              {approvedByOther ? "Approved by another HR" : "Already Employed"}
            </>
          ) : (
            <>
              <FaUserCheck className="text-xl" />
              Approve
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestedEmploy;
