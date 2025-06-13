import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";
import axios from "axios";
import Swal from "sweetalert2";

const MyApplyList = () => {
  usePageTitle("My Apply List");

  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const filteredMarathons = marathons.filter((marathon) =>
    marathon.marathonTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://marathon-server-side-five.vercel.app/my-applylist?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setMarathons(data);
          setLoading(false);
        });
    }
  }, [user?.email, user?.accessToken]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://marathon-server-side-five.vercel.app/my-applylist/${id}`
          )
          .then(() => {
            setMarathons((prev) =>
              prev.filter((marathon) => marathon._id !== id)
            );
            Swal.fire({
              title: "Deleted",
              text: "Your marathon has been deleted.",
              icon: "success",
              timer: 1000,
            });
          })
          .catch((err) => {
            console.error("Failed to delete marathon:", err);
            Swal.fire("Error", "Failed to delete the marathon.", "error");
          });
      }
    });
  };

  const openUpdateModal = (registration) => {
    setSelectedRegistration(registration);
    setShowUpdateModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phone: form.phone.value,
      additionalInfo: form.additionalInfo.value,
    };

    axios
      .put(
        `https://marathon-server-side-five.vercel.app/my-applylist/${selectedRegistration._id}`,
        updatedData
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire(
            "Success!",
            "Registration updated successfully.",
            "success"
          );

          setMarathons((prev) =>
            prev.map((m) =>
              m._id === selectedRegistration._id ? { ...m, ...updatedData } : m
            )
          );
          setShowUpdateModal(false);
        } else {
          Swal.fire("No Change", "No update was made to the marathon.", "info");
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        Swal.fire("Error", "Failed to update registration.", "error");
      });
  };
  if (loading) return <Loading />;

  return (
    <div className="px-8 py-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        My Registered Marathons
      </h2>

      {marathons.length === 0 ? (
        <p className="text-center text-gray-500">No marathons found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="mb-6 mt-1 text-center">
            <input
              type="text"
              placeholder="Search by Title..."
              className="px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="min-w-full">
            <table className="w-full table-auto bg-white border border-gray-200 shadow-md rounded-lg text-sm">
              <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-5 py-4 text-left">#</th>
                  <th className="px-5 py-4 text-left">Title</th>
                  <th className="px-5 py-4 text-left">Date</th>
                  <th className="px-5 py-4 text-left">Location</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMarathons.map((marathon, index) => (
                  <tr
                    key={marathon._id}
                    className="border-t hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-5 py-4">{index + 1}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {marathon.marathonTitle}
                    </td>
                    <td className="px-5 py-4">
                      {new Date(
                        marathon.marathonStartDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">{marathon.location}</td>
                    <td className="px-5 py-3 text-center space-x-5">
                      <button
                        onClick={() => openUpdateModal(marathon)}
                        className="text-blue-600 hover:text-blue-800 transition cursor-pointer text-lg"
                        title="Edit"
                      >
                        <FaEdit className="inline-block" />
                      </button>
                      <button
                        onClick={() => handleDelete(marathon._id)}
                        className="text-red-600 hover:text-red-800 transition cursor-pointer text-lg"
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
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl w-full max-w-lg animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <h3 className="col-span-1 sm:col-span-2 text-xl sm:text-2xl font-semibold text-blue-700 text-center mb-1">
              Update Registration
            </h3>

            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                defaultValue={selectedRegistration.firstName}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                defaultValue={selectedRegistration.lastName}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={selectedRegistration.phone}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/*  Additional info */}
            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Additional Info
              </label>
              <input
                type="text"
                name="additionalInfo"
                defaultValue={selectedRegistration.additionalInfo}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email (readonly) */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={selectedRegistration.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            {/* Marathon Title (readonly) */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Marathon title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={selectedRegistration.marathonTitle}
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            {/* Start Date (readonly) */}
            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                defaultValue={selectedRegistration.marathonStartDate?.slice(
                  0,
                  10
                )}
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-4 cursor-pointer py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Want to apply a new marathon?{" "}
          <a href="/marathons" className="text-blue-600 hover:underline">
            Click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default MyApplyList;
