import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import { FaUserAlt, FaEnvelope, FaBirthdayCake } from 'react-icons/fa';
import { MdSync } from "react-icons/md";

const MyTeam = () => {
    const { user } = useAuth();
    const [teamMembers, setTeamMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 🔄 loading state

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://asset-management-system-server-kappa.vercel.app/my-hr-email/${user.email}`)
                .then(res => {
                    if (res.data.success) {
                        fetchTeamMembers(res.data.hrEmail);
                    } else {
                        setIsLoading(false); // ❌ error or no HR email
                    }
                })
                .catch(error => {
                    console.error("Error fetching HR email:", error);
                    setIsLoading(false);
                });
        }
    }, [user]);

    const fetchTeamMembers = (hrEmail) => {
        if (hrEmail) {
            axios.get(`https://asset-management-system-server-kappa.vercel.app/team-members/${hrEmail}`)
                .then(res => {
                    if (res.data.success) {
                        setTeamMembers(res.data.members);
                    }
                })
                .catch(error => {
                    console.error("Error fetching team members:", error);
                })
                .finally(() => {
                    setIsLoading(false); // ✅ loading done
                });
        }
    };

    // 🔃 Show loading
     if (isLoading) {
    return (
      <div className="text-center text-base md:text-lg font-medium text-primary">
        <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
        Loading...
      </div>
    );
  }

    return (
        <div className="text-black p-4">
            {/* 📝 Title and Description */}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-center">Team Members</h2>
                <p className="text-sm text-gray-500 text-center">Here is the list of all your team members, including their names, emails, and dates of birth.</p>
            </div>

            {/* 🖥️ Desktop Table View */}
            <div className="hidden md:block">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">DOB</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {teamMembers.map((member, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{member.name}</td>
                                <td className="border px-4 py-2">{member.email}</td>
                                <td className="border px-4 py-2">{member.dob}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📱 Mobile Card View */}
            <div className="block md:hidden space-y-4">
                {teamMembers.map((member, index) => (
                    <div key={index} className="p-4 rounded-lg shadow-md bg-white">
                        <p><FaUserAlt className="inline mr-2" /><span className="font-semibold">Name:</span> {member.name}</p>
                        <p><FaEnvelope className="inline mr-2" /><span className="font-semibold">Email:</span> {member.email}</p>
                        <p><FaBirthdayCake className="inline mr-2" /><span className="font-semibold">DOB:</span> {member.dob}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTeam;
