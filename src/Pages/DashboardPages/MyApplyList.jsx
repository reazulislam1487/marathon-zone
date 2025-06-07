import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";

const MyApplyList = () => {
  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-marathons?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMarathons(data);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
        My Registered Marathons
      </h2>

      {marathons.length === 0 ? (
        <p className="text-center text-gray-500">No marathons found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-green-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((marathon, index) => (
                <tr
                  key={marathon._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {marathon.marathonTitle}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(marathon.marathonStartDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{marathon.location}</td>
                  <td className="px-4 py-3 text-center space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                      title="Edit"
                    >
                      <FaEdit className="inline-block" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition cursor-pointer"
                      title="Delete"
                    >
                      <FaTrash className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;
