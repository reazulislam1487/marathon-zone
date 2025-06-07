import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";

const MyApplyList = () => {
  const { user } = useAuth(); // Replace with your actual auth context
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

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Registrations</h2>
      {marathons.length === 0 ? (
        <p>No marathons found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((marathon, index) => (
                <tr key={marathon._id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{marathon.marathonTitle}</td>
                  <td className="p-2 border">
                    {new Date(marathon.marathonStartDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{marathon.location}</td>
                  <td className="p-2 border space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
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
