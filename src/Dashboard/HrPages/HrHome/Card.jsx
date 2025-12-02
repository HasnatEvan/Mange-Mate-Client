import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 5;

const Card = ({ dashboard }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Pagination States
  const [assetPage, setAssetPage] = useState(1);
  const [empPage, setEmpPage] = useState(1);
  const [reqPage, setReqPage] = useState(1);

  // Fetch HR Assets
  const { data: myAssets = [], isLoading: assetsLoading } = useQuery({
    queryKey: ["hr-assets", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/assets/hr");
      return data || [];
    },
    enabled: !!user?.email,
  });

  // Pagination Logic
  const paginate = (data, page) =>
    data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const assetTotalPages = Math.ceil(myAssets.length / ITEMS_PER_PAGE);
  const empTotalPages = Math.ceil((dashboard?.recentEmployees?.length || 0) / ITEMS_PER_PAGE);
  const reqTotalPages = Math.ceil((dashboard?.recentRequests?.length || 0) / ITEMS_PER_PAGE);

  return (
    <div>
      {/* Responsive Grid: 1 col → 2 col → 3 col */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* ====================== MY ASSETS ====================== */}
        <div className="bg-white text-gray-800 p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">My Assets</h2>

          {assetsLoading ? (
            <div className="space-y-3">
              <AssetSkeleton />
              <AssetSkeleton />
            </div>
          ) : myAssets.length === 0 ? (
            <p className="text-sm text-gray-500">No assets found.</p>
          ) : (
            <div className="space-y-4">
              {paginate(myAssets, assetPage).map((asset) => (
                <div key={asset._id} className="flex items-center justify-between bg-gray-100 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {asset.assetsName?.charAt(0) || "A"}
                    </div>
                    <div>
                      <p className="font-medium">{asset.assetsName}</p>
                      <p className="text-xs text-gray-600">{asset.companyName || "—"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{asset.assetsType}</p>
                    <p className="text-xs text-gray-500">Qty: {asset.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination page={assetPage} totalPages={assetTotalPages} setPage={setAssetPage} />
        </div>

        {/* ====================== MY EMPLOYEES ====================== */}
        <div className="bg-white text-gray-800 p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">My Employees</h2>

          {dashboard?.recentEmployees?.length ? (
            <div className="space-y-4">
              {paginate(dashboard.recentEmployees, empPage).map((emp, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-100 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.photoURL || "https://i.pravatar.cc/40"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-xs text-gray-600">
                        Joined: {emp.timestamp ? new Date(emp.timestamp).toLocaleDateString() : "—"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-medium">Active</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No employees available.</p>
          )}

          <Pagination page={empPage} totalPages={empTotalPages} setPage={setEmpPage} />
        </div>

        {/* ====================== ALL REQUESTS ====================== */}
        <div className="bg-white text-gray-800 p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-between">
          <h2 className="text-lg font-semibold mb-3 sm:mb-4">All Requests</h2>

          {dashboard?.recentRequests?.length ? (
            <div className="space-y-4">
              {paginate(dashboard.recentRequests, reqPage).map((req, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-100 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      {req.assetsName?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{req.assetsName}</p>
                      <p className="text-xs text-gray-600">By {req.employ?.name}</p>
                    </div>
                  </div>

                  <p className="text-sm capitalize">
                    {req.status === "pending" && <span className="text-yellow-600">Pending</span>}
                    {req.status === "approved" && <span className="text-green-600">Approved</span>}
                    {req.status === "returned" && <span className="text-purple-600">Returned</span>}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No requests found.</p>
          )}

          <Pagination page={reqPage} totalPages={reqTotalPages} setPage={setReqPage} />
        </div>

      </div>
    </div>
  );
};

export default Card;

/* ---------- Pagination Component ---------- */
function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(p => p + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

/* ---------- Light Skeleton ---------- */
function AssetSkeleton() {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div>
          <div className="h-3 w-32 bg-gray-300 rounded mb-1" />
          <div className="h-2 w-20 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="text-right">
        <div className="h-3 w-12 bg-gray-300 rounded mb-1" />
        <div className="h-2 w-8 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
