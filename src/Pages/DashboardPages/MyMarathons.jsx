import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";

const MyMarathons = () => {
  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch marathons created by this user
  useEffect(() => {
    if (user.email) {
      axios
        .get("http://localhost:3000/marathons", {
          params: { email: user.email },
        })
        .then((res) => setMarathons(res.data))
        .catch((err) => console.error("Failed to fetch marathons:", err));
    }
  }, [user.email]);

  // Handle update form submission (using FormData)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("location", form.location.value);
    formData.append("date", form.date.value);

    try {
      await axios.patch(
        `http://localhost:3000/marathons/${selectedMarathon._id}`,
        formData
      );

      setShowUpdateModal(false);
      setSelectedMarathon(null);

      // Update list in UI
      const updatedList = marathons.map((m) =>
        m._id === selectedMarathon._id
          ? {
              ...m,
              title: form.title.value,
              location: form.location.value,
              date: form.date.value,
            }
          : m
      );
      setMarathons(updatedList);
      setLoading(false);
    } catch (err) {
      console.error("Failed to update marathon:", err);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/marathons/${selectedMarathon._id}`
      );
      setMarathons(marathons.filter((m) => m._id !== selectedMarathon._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete marathon:", err);
    }
  };
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📝 My Marathons</h2>
      {marathons.length === 0 ? (
        <p>No marathons found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {marathons.map((marathon) => (
              <tr key={marathon._id}>
                <td className="border px-4 py-2">{marathon.title}</td>
                <td className="border px-4 py-2">{marathon.location}</td>
                <td className="border px-4 py-2">{marathon.date}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedMarathon(marathon);
                      setShowUpdateModal(true);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMarathon(marathon);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedMarathon && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded w-96 shadow-md"
          >
            <h3 className="text-lg font-bold mb-4">Update Marathon</h3>
            <input
              name="title"
              defaultValue={selectedMarathon.title}
              placeholder="Title"
              className="w-full border mb-2 p-2 rounded"
              required
            />
            <input
              name="location"
              defaultValue={selectedMarathon.location}
              placeholder="Location"
              className="w-full border mb-2 p-2 rounded"
              required
            />
            <input
              type="date"
              name="date"
              defaultValue={selectedMarathon.date}
              className="w-full border mb-4 p-2 rounded"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMarathon && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-80 shadow-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete "{selectedMarathon.title}"?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMarathons;
