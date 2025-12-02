import {
  FaEnvelope,
  FaBirthdayCake,
  FaBuilding,
  FaTransgender,
  FaUserCheck
} from "react-icons/fa";
import { MdOutlinePersonOff } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const RequestedEmploy = ({ request, refetch, hrEmail, isTable }) => {
  const axiosSecure = useAxiosSecure();

  const {
    name,
    companyName,
    gender,
    photoURL,
    email,
    dob,
    role,
    timestamp,
    _id
  } = request;

  const [status, setStatus] = useState(role?.toLowerCase() || "");
  const [approvedByOther, setApprovedByOther] = useState(false);

  const handleApprove = async () => {
    try {
      const limitRes = await axiosSecure.get(`/hr-employee-limit/${hrEmail}`);
      const { totalAllowed, currentEmployees } = limitRes.data;

      if (currentEmployees >= totalAllowed) {
        Swal.fire("Limit Reached", "You have reached your employee limit.", "warning");
        return;
      }

      const result = await Swal.fire({
        title: "Approve User?",
        text: `Do you want to approve ${name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Approve",
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
          Swal.fire("Already Approved", "This user is already approved.", "info");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Could not approve user.", "error");
    }
  };

  // ========== TABLE VIEW ========== //
  if (isTable) {
    return (
  <tr className="hover:bg-blue-50 transition border-b border-gray-300 text-gray-700">

  <td className="p-3 text-center align-middle border-r border-gray-300">
    <img src={photoURL} className="w-10 h-10 rounded-full mx-auto object-cover" />
  </td>

  <td className="p-3 text-center align-middle border-r border-gray-300">{name}</td>

  <td className="p-3 text-center align-middle border-r border-gray-300">{companyName}</td>

  <td className="p-3 text-center align-middle border-r border-gray-300 capitalize">{gender}</td>

  <td className="p-3 text-center align-middle border-r border-gray-300">{email}</td>

  <td className="p-3 text-center align-middle border-r border-gray-300">{dob}</td>

  <td className="p-3 text-center align-middle border-r border-gray-300">
    {new Date(timestamp).toLocaleDateString()}
  </td>

  <td className="p-3 text-center align-middle">
    <button
      onClick={handleApprove}
      disabled={status === "employee"}
      className={`px-4 py-2 rounded-lg text-white font-medium shadow 
        ${
          status === "employee"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
    >
      {status === "employee"
        ? approvedByOther
          ? "Approved by another HR"
          : "Already Employed"
        : "Approve"}
    </button>
  </td>

</tr>

    );
  }

  // ========== MOBILE CARD VIEW ========== //
  return (
 <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-md border border-gray-200 
                hover:shadow-xl hover:border-blue-300 transition-all duration-300">

  {/* PHOTO + NAME */}
  <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
    <img
      src={photoURL}
      className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-blue-100"
    />
    <div>
      <p className="text-xl font-bold text-gray-900">{name}</p>
      <p className="text-blue-600 text-sm font-medium">{companyName}</p>
    </div>
  </div>

  {/* DETAILS */}
  <div className="pt-5 space-y-3 text-gray-700">

    <div className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 p-3 rounded-xl border border-gray-200 transition">
      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
        <FaEnvelope />
      </div>
      <span>{email}</span>
    </div>

    <div className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 p-3 rounded-xl border border-gray-200 capitalize transition">
      <div className="p-2 rounded-full bg-pink-100 text-pink-600">
        <FaTransgender />
      </div>
      <span>{gender}</span>
    </div>

    <div className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 p-3 rounded-xl border border-gray-200 transition">
      <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
        <FaBirthdayCake />
      </div>
      <span>DOB: {dob}</span>
    </div>

    <div className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 p-3 rounded-xl border border-gray-200 transition">
      <div className="p-2 rounded-full bg-green-100 text-green-600">
        <FaBuilding />
      </div>
      <span>Joined: {new Date(timestamp).toLocaleDateString()}</span>
    </div>

  </div>

  {/* BUTTON */}
  <button
    onClick={handleApprove}
    disabled={status === "employee"}
    className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold 
                shadow-lg transition-all duration-300
      ${
        status === "employee"
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-xl hover:from-blue-700 hover:to-blue-800"
      }
    `}
  >
    {status === "employee" ? (
      <>
        <MdOutlinePersonOff className="text-lg" />
        {approvedByOther ? "Approved by Another HR" : "Already Employed"}
      </>
    ) : (
      <>
        <FaUserCheck className="text-lg" />
        Approve
      </>
    )}
  </button>

</div>

  );
};

export default RequestedEmploy;
