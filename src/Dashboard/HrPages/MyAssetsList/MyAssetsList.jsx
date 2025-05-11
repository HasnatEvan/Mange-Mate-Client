import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MyAssetsListTable from "./MyAssetsListTable";
import { MdSync } from "react-icons/md";

const MyAssetsList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assets/hr`);
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-base md:text-lg font-medium text-primary">
                <MdSync className="animate-spin inline-block mr-2 text-2xl text-primary" />
                Loading...
            </div>
        );
    }

    if (assets.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center text-lg font-medium text-gray-400">
                    No assets found
                </div>
            </div>
        );
    }

    return (
        <div className="text-black p-4 max-w-7xl mx-auto">
            {/* Title and Description */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-[#0149B1]">My Asset List</h1>
                <p className="text-sm text-gray-600 py-2">
                    Here you can view and manage all the assets that are assigned to you.
                    Update or take action on each asset as needed.
                </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => (
                            <MyAssetsListTable
                                key={asset._id}
                                asset={asset}
                                refetch={refetch}
                                isTable={true}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
                {assets.map((asset) => (
                    <MyAssetsListTable
                        key={asset._id}
                        asset={asset}
                        refetch={refetch}
                        isTable={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyAssetsList;
