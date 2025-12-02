import { useState } from "react";
import { FaUsers, FaUserTie, FaUserFriends } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth"; // ⭐ Added this line

const ITEMS_PER_PAGE = 5;

const Card = ({ dashboard }) => {
  const { user } = useAuth(); // ⭐ Logged in user here

  const [assetPage, setAssetPage] = useState(1);
  const [returnPage, setReturnPage] = useState(1);

  const employeeInfo = dashboard?.employeeInfo || {};
  const recentRequests = dashboard?.recentRequests || [];

  const myAssets = recentRequests.filter((req) => req.status === "approved");
  const returnedAssets = recentRequests.filter((req) => req.status === "returned");

  const paginate = (data, page) =>
    data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const assetTotalPages = Math.ceil(myAssets.length / ITEMS_PER_PAGE);
  const returnTotalPages = Math.ceil(returnedAssets.length / ITEMS_PER_PAGE);

  const cards = [
    {
      title: "My Team",
      icon: <FaUserTie className="text-white" />,
      gradient: "from-indigo-500 to-purple-500",
      content: (
        <div>
          {!employeeInfo?.hrEmail ? (
            <p className="text-sm text-gray-500">No HR Assigned.</p>
          ) : (
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">

              {/* ⭐ Show Me instead of name if it is the logged-in user */}
              <p className="font-semibold text-lg text-gray-800">
                {employeeInfo?.email === user?.email ? "Me" : employeeInfo?.name}
              </p>

              <p className="text-sm text-gray-600 break-all">{employeeInfo?.email}</p>
            </div>
          )}
        </div>
      ),
    },

    // 🔵 MY ASSETS
    {
      title: "My Assets",
      icon: <FaUsers className="text-white" />,
      gradient: "from-blue-500 to-cyan-500",
      content: (
        <div className="space-y-3">
          {!myAssets.length ? (
            <p className="text-sm text-gray-500">No received assets.</p>
          ) : (
            paginate(myAssets, assetPage).map((asset, idx) => (
              <div
                key={idx}
                className="flex justify-between bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-100 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800">{asset.assetsName}</p>
                  <p className="text-xs text-gray-600">{asset.companyName}</p>
                </div>

                <p className="text-xs text-gray-500 text-right">
                  {asset.approvalDate
                    ? new Date(asset.approvalDate).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            ))
          )}

          <Pagination
            page={assetPage}
            totalPages={assetTotalPages}
            setPage={setAssetPage}
          />
        </div>
      ),
    },

    // 🟢 RETURNED ASSETS
    {
      title: "Returned Assets",
      icon: <FaUserFriends className="text-white" />,
      gradient: "from-green-500 to-teal-500",
      content: (
        <div className="space-y-3">
          {!returnedAssets.length ? (
            <p className="text-sm text-gray-500">No returned assets.</p>
          ) : (
            paginate(returnedAssets, returnPage).map((asset, idx) => (
              <div
                key={idx}
                className="flex justify-between bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded-xl border border-green-100 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800">{asset.assetsName}</p>
                  <p className="text-xs text-gray-600">Returned</p>
                </div>

                <p className="text-xs text-gray-500 text-right">
                  {asset.returnedDate
                    ? new Date(asset.returnedDate).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            ))
          )}

          <Pagination
            page={returnPage}
            totalPages={returnTotalPages}
            setPage={setReturnPage}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[350px] border border-gray-100"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">{card.title}</h2>

            <div
              className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}
            >
              {card.icon}
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1">{card.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Card;


/* ======================= PAGINATION COMPONENT ======================= */
function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex justify-between items-center text-xs font-medium">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-3 py-1.5 rounded-lg transition-all
        ${
          page === 1
            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
        }`}
      >
        Prev
      </button>

      <span className="text-blue-700 font-semibold px-3 py-1 bg-blue-100 rounded-lg shadow-sm">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-3 py-1.5 rounded-lg transition-all
        ${
          page === totalPages
            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
        }`}
      >
        Next
      </button>
    </div>
  );
}
