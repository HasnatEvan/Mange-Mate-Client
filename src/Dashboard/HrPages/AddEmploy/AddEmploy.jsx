import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RequestedEmploy from "./RequestedEmploy";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { MdSync } from "react-icons/md";

const AddEmploy = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [searchText, setSearchText] = useState("");

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["requested-users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/requested-user");
      return response.data.data;
    },
  });

  if (isLoading) {
     return (
       <div className="text-center text-base md:text-lg font-medium text-primary">
         <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
         Loading...
       </div>
     );
   }

  const filteredRequests = requests.filter((req) =>
    req.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="text-black space-y-6 mt-8 lg:-mt-2">
      {/* Search Bar */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search by Email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <RequestedEmploy
              key={request._id}
              request={request}
              refetch={refetch}
              hrEmail={user?.email}
            />
          ))
        ) : (
          <p className="text-center col-span-2">No user found with this email.</p>
        )}
      </div>
    </div>
  );
};

export default AddEmploy;
