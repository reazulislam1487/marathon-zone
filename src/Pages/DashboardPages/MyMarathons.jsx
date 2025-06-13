import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";
import Swal from "sweetalert2";

const MyMarathons = () => {
  usePageTitle("My Marathons");

  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.email) {
      axios
        .get(
          `https://marathon-server-side-five.vercel.app/marathons?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
              "Content-Type": "application/json",
            },
          },
          {
            params: { email: user.email },
          }
        )
        .then((res) => {
          setMarathons(res.data);
          setLoading(false);
        })
        .catch((err) => console.error("Failed to fetch marathons:", err));
    }
  }, [user.email, user?.accessToken]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      title: form.title.value,
      location: form.location.value,
      distance: form.distance.value,
      description: form.description.value,
      image: form.image.value,
      startRegDate: form.startRegDate.value,
      endRegDate: form.endRegDate.value,
      startDate: form.startDate.value,
      createdBy: form.createdBy.value,
    };

    axios
      .put(
        `https://marathon-server-side-five.vercel.app/my-marathons/${selectedMarathon._id}`,
        updatedData
      )
      .then((res) => {
        const data = res.data;

        if (data.modifiedCount > 0) {
          // Update frontend state only if update was successful
          const updatedList = marathons.map((m) =>
            m._id === selectedMarathon._id ? { ...m, ...updatedData } : m
          );
          setMarathons(updatedList);
          setShowUpdateModal(false);
          setSelectedMarathon(null);

          Swal.fire("Updated!", "Your marathon has been updated.", "success");
        } else {
          Swal.fire("No Change", "No update was made to the marathon.", "info");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        Swal.fire("Error", "Failed to update marathon.", "error");
      });
  };

  const handleDelete = async (id) => {
    console.log(id);

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
            `https://marathon-server-side-five.vercel.app/my-marathons/${id}`
          )
          .then(() => {
            // Update UI
            setMarathons((prev) =>
              prev.filter((marathon) => marathon._id !== id)
            );

            // Success alert
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

  if (loading) return <Loading />;

  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        My Created Marathons
      </h2>

      {marathons.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No marathons found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[640px] table-auto bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-blue-100 text-blue-800 uppercase text-sm font-semibold">
              <tr>
                <th className="px-5 py-4 text-left">Image</th>
                <th className="px-5 py-4 text-left">Title</th>
                <th className="px-5 py-4 text-left">Location</th>
                <th className="px-5 py-4 text-left">Date</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((marathon) => (
                <tr
                  key={marathon._id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-2 py-2">
                    {" "}
                    <img
                      className="w-20 h-15 rounded"
                      src={marathon.image}
                      alt="My Photo"
                    ></img>{" "}
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {marathon.title}
                  </td>
                  <td className="px-5 py-3">{marathon.location}</td>
                  <td className="px-5 py-3">
                    {new Date(marathon.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-center space-x-5">
                    <button
                      onClick={() => {
                        setSelectedMarathon(marathon);
                        setShowUpdateModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition cursor-pointer text-lg"
                      title="Update"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(marathon._id)}
                      className="text-red-600 hover:text-red-800 transition cursor-pointer text-lg"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showUpdateModal && selectedMarathon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl w-full max-w-2xl animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <h3 className="col-span-1 sm:col-span-2 text-xl sm:text-2xl font-semibold text-blue-700 text-center mb-1">
              Update Marathon
            </h3>

            {/* Title (readonly) */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={selectedMarathon.title}
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={selectedMarathon.location}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Distance */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Distance
              </label>
              <select
                name="distance"
                defaultValue={selectedMarathon.distance}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5k">5k</option>
                <option value="10k">10k</option>
                <option value="25k">25k</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={selectedMarathon.image}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Created By (readonly) */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Created By
              </label>
              <input
                type="email"
                name="createdBy"
                defaultValue={selectedMarathon.createdBy}
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Description
              </label>
              <input
                type="text"
                name="description"
                defaultValue={selectedMarathon.description}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Start Registration Date */}
            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Start Registration Date
              </label>
              <input
                type="date"
                name="startRegDate"
                defaultValue={selectedMarathon.startRegDate?.slice(0, 10)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Registration Date */}
            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                End Registration Date
              </label>
              <input
                type="date"
                name="endRegDate"
                defaultValue={selectedMarathon.endRegDate?.slice(0, 10)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Marathon Start Date (readonly) */}
            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Start Marathon Date
              </label>
              <input
                type="date"
                name="startDate"
                defaultValue={selectedMarathon.startDate?.slice(0, 10)}
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="col-span-1 sm:col-span-2 flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Want to create a new marathon?{" "}
          <a href="/dashboard" className="text-blue-600 hover:underline">
            Click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default MyMarathons;
