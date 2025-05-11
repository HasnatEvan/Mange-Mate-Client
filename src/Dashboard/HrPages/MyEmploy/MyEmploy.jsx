import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaBriefcase, FaUserTimes } from "react-icons/fa";

const MyEmploy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myEmployees = [], isLoading, refetch } = useQuery({
    queryKey: ["my-employ", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employ`, {
        params: { hrEmail: user?.email },
      });
      return res.data.data;
    },
  });

  const handleCancelEmploy = async (empId) => {
    const confirm = await Swal.fire({
      title: "Cancel Employment?",
      text: "Are you sure you want to cancel this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/cancel-employ/${empId}`);
        if (res.data.success) {
          Swal.fire("Cancelled!", "Employee role has been removed.", "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to cancel employment.", "error");
      }
    }
  };

  return (
    <div className="p-6 text-black">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#0149B1]">My Employees</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : myEmployees.length === 0 ? (
        <p className="text-center text-gray-400">No employees found.</p>
      ) : (
        <>
          {/* Desktop View (Table) */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {myEmployees.map((emp, index) => (
                  <tr key={emp._id} className="border-b hover:bg-gray-50 transition duration-200 ease-in-out">
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{emp.name}</td>
                    <td className="py-4 px-6">{emp.email}</td>
                    <td className="py-4 px-6 capitalize">{emp.role}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleCancelEmploy(emp._id)}
                        className="bg-[#FD8E29] hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                      >
                        <FaUserTimes />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View (Card) */}
          <div className="block md:hidden space-y-4">
            {myEmployees.map((emp, index) => (
              <div key={emp._id} className="bg-white p-6 rounded-lg shadow-md space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">#{index + 1}</p>
                  <p className="capitalize bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <FaBriefcase className="text-green-600" /> {emp.role}
                  </p>
                </div>

                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FaUser className="text-blue-500" /> {emp.name}
                </h3>

                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" /> {emp.email}
                </p>

                <button
                  onClick={() => handleCancelEmploy(emp._id)}
                  className="mt-4 bg-[#FD8E29] hover:bg-red-600 text-white w-full py-2 rounded-md text-sm font-medium transition flex items-center justify-center gap-2"
                >
                  <FaUserTimes /> Cancel
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyEmploy;
