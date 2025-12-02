import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import {
  FaUserAlt,
  FaEnvelope,
  FaBirthdayCake,
  FaTransgender,
  FaBuilding,
  FaUserTie,
  FaUsers,
  FaMale,
  FaFemale,
  FaUserClock,
} from "react-icons/fa";
import { MdSync } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";

const MyTeam = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch HR email
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-hr-email/${user.email}`)
        .then((res) => {
          if (res.data.success) {
            fetchTeamMembers(res.data.hrEmail);
          } else {
            setIsLoading(false);
          }
        })
        .catch(() => setIsLoading(false));
    }
  }, [user]);

  // Fetch team members
  const fetchTeamMembers = (hrEmail) => {
    axios
      .get(`http://localhost:5000/team-members/${hrEmail}`)
      .then((res) => {
        if (res.data.success) {
          setTeamMembers(res.data.members);
        }
      })
      .finally(() => setIsLoading(false));
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-center gap-3">
          <MdSync className="animate-spin text-blue-600 text-3xl" />
          <p className="text-blue-600 text-lg font-semibold">Loading Team...</p>
        </div>
      </div>
    );
  }

  // Summary counts
  const totalMembers = teamMembers.length;
  const totalMale = teamMembers.filter((m) => m.gender === "male").length;
  const totalFemale = teamMembers.filter((m) => m.gender === "female").length;
  const totalRequested = teamMembers.filter((m) => m.status !== "employee").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">

        {/* ================= TOP SUMMARY CARDS ================= */}
        {teamMembers.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <div className="bg-white/80 p-5 rounded-xl shadow border flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Members</p>
                <h2 className="text-2xl font-bold text-gray-800">{totalMembers}</h2>
              </div>
              <FaUsers className="text-blue-600 text-3xl" />
            </div>

            <div className="bg-white/80 p-5 rounded-xl shadow border flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Male</p>
                <h2 className="text-2xl font-bold text-gray-800">{totalMale}</h2>
              </div>
              <FaMale className="text-indigo-600 text-3xl" />
            </div>

            <div className="bg-white/80 p-5 rounded-xl shadow border flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Female</p>
                <h2 className="text-2xl font-bold text-gray-800">{totalFemale}</h2>
              </div>
              <FaFemale className="text-pink-600 text-3xl" />
            </div>

            <div className="bg-white/80 p-5 rounded-xl shadow border flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Requested</p>
                <h2 className="text-2xl font-bold text-gray-800">{totalRequested}</h2>
              </div>
              <FaUserClock className="text-orange-600 text-3xl" />
            </div>

          </div>
        )}


        {/* ================= EMPTY STATE ================= */}
        {teamMembers.length === 0 && (
         <div className="min-h-screen flex items-center justify-center">
  <div className="bg-white/70 backdrop-blur-md p-8 border border-gray-200 rounded-2xl shadow-xl text-center max-w-md mx-auto">
    <FaBoxOpen className="text-blue-500 text-5xl mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Team Members Found</h2>
    <p className="text-gray-600">
      You currently have no team members. Once they are added, they will appear here.
    </p>
  </div>
</div>


        )}

        {/* ================= IF MEMBERS EXIST — SHOW TABLE + CARDS ================= */}
        {teamMembers.length > 0 && (
          <>
            {/* ================= DESKTOP TABLE VIEW ================= */}
            <div className="hidden md:block bg-white rounded-xl shadow-xl overflow-auto border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-b from-blue-200 to-blue-300 text-gray-800 sticky top-0 border-b border-gray-400">
                  <tr>
                    <th className="p-3 text-center border-r border-gray-300">Photo</th>
                    <th className="p-3 text-center border-r border-gray-300">Name</th>
                    <th className="p-3 text-center border-r border-gray-300">Company</th>
                    <th className="p-3 text-center border-r border-gray-300">Gender</th>
                    <th className="p-3 text-center border-r border-gray-300">Email</th>
                    <th className="p-3 text-center border-r border-gray-300">DOB</th>
                    <th className="p-3 text-center border-r border-gray-300">Role</th>
                    <th className="p-3 text-center">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {teamMembers.map((m, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition border-b border-gray-300 text-gray-700">
                      <td className="p-3 text-center border-r border-gray-300">
                        <img src={m.photoURL} className="w-12 h-12 rounded-full object-cover mx-auto" />
                      </td>
                      <td className="p-3 text-center border-r border-gray-300">{m.name}</td>
                      <td className="p-3 text-center border-r border-gray-300">{m.companyName}</td>
                      <td className="p-3 text-center border-r border-gray-300 capitalize">{m.gender}</td>
                      <td className="p-3 text-center border-r border-gray-300">{m.email}</td>
                      <td className="p-3 text-center border-r border-gray-300">{m.dob}</td>
                      <td className="p-3 text-center border-r border-gray-300 capitalize">{m.role || "N/A"}</td>
                      <td className="p-3 text-center">
                        {new Date(m.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="block md:hidden space-y-4 mt-6">
              {teamMembers.map((m, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition-all">

                  <div className="flex items-center gap-4 pb-4 border-b">
                    <img src={m.photoURL} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                    <div>
                      <p className="text-xl font-bold text-gray-900">{m.name}</p>
                      <p className="text-blue-600 text-sm font-semibold">{m.companyName}</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2 text-gray-700">
                    <p className="flex items-center gap-2"><FaEnvelope className="text-blue-600" /> {m.email}</p>
                    <p className="flex items-center gap-2 capitalize"><FaTransgender className="text-pink-500" /> {m.gender}</p>
                    <p className="flex items-center gap-2"><FaBirthdayCake className="text-orange-600" /> DOB: {m.dob}</p>
                    <p className="flex items-center gap-2 capitalize"><FaUserTie className="text-purple-600" /> Role: {m.role || "N/A"}</p>
                    <p className="flex items-center gap-2"><FaBuilding className="text-green-600" /> Joined: {new Date(m.timestamp).toLocaleDateString()}</p>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default MyTeam;
