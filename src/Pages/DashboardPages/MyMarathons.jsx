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
        .get("http://localhost:3000/marathons", {
          params: { email: user.email },
        })
        .then((res) => {
          setMarathons(res.data);
          setLoading(false);
        })
        .catch((err) => console.error("Failed to fetch marathons:", err));
    }
  }, [user.email]);

  const handleUpdate = async (e) => {
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

    try {
      await axios.put(
        `http://localhost:3000/my-marathons/${selectedMarathon._id}`,
        updatedData
      );

      const updatedList = marathons.map((m) =>
        m._id === selectedMarathon._id ? { ...m, ...updatedData } : m
      );
      setMarathons(updatedList);
      setShowUpdateModal(false);
      setSelectedMarathon(null);

      Swal.fire("Success", "Marathon updated successfully!", "success");
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Failed to update marathon.", "error");
    }
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
          .delete(`http://localhost:3000/my-marathons/${id}`)
          .then(() => {
            // Update UI
            setMarathons((prev) =>
              prev.filter((marathon) => marathon._id !== id)
            );

            // Success alert
            Swal.fire("Deleted!", "Your marathon has been deleted.", "success");
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
                <th className="px-5 py-4 text-left">#</th>
                <th className="px-5 py-4 text-left">Title</th>
                <th className="px-5 py-4 text-left">Location</th>
                <th className="px-5 py-4 text-left">Date</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((marathon, index) => (
                <tr
                  key={marathon._id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-5 py-3">{index + 1}</td>
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
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <h3 className="md:col-span-2 text-xl font-semibold text-blue-700 text-center mb-4">
              ✏️ Update Marathon
            </h3>

            <input
              name="title"
              defaultValue={selectedMarathon.title}
              placeholder="Title"
              required
              className="input"
              readOnly
            />
            <input
              name="location"
              defaultValue={selectedMarathon.location}
              placeholder="Location"
              required
              className="input"
            />

            {/* Distance Dropdown */}
            <select
              name="distance"
              defaultValue={selectedMarathon.distance}
              required
              className="input"
            >
              <option value="5k">5k</option>
              <option value="10k">10k</option>
              <option value="25k">25k</option>
            </select>
            <input
              name="image"
              defaultValue={selectedMarathon.image}
              placeholder="Image URL"
              required
              className="input"
            />
            <input
              name="createdBy"
              defaultValue={selectedMarathon.createdBy}
              placeholder="Created By Email"
              required
              className="input"
              readOnly
            />
            <input
              name="description"
              defaultValue={selectedMarathon.description}
              placeholder="Description"
              required
              className="input"
            />
            <label className="text-sm text-gray-600 col-span-2">
              Start Registration Date
            </label>
            <input
              name="startRegDate"
              type="date"
              defaultValue={selectedMarathon.startRegDate?.slice(0, 10)}
              required
              className="input col-span-2"
            />

            <label className="text-sm text-gray-600 col-span-2">
              End Registration Date
            </label>
            <input
              name="endRegDate"
              type="date"
              defaultValue={selectedMarathon.endRegDate?.slice(0, 10)}
              required
              className="input col-span-2"
            />

            <label className="text-sm text-gray-600 col-span-2">
              Start Marathon Date
            </label>
            <input
              name="startDate"
              type="date"
              defaultValue={selectedMarathon.startDate?.slice(0, 10)}
              required
              className="input col-span-2"
              readOnly
            />

            <div className="md:col-span-2 flex justify-end mt-4 space-x-4">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {/* {showDeleteModal && selectedMarathon && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-bold mb-5 text-red-600 text-center">
              Confirm Delete
            </h3>
            <p className="text-gray-700 mb-6 text-center text-base">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                "{selectedMarathon.title}"
              </span>
              ?
            </p>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MyMarathons;
