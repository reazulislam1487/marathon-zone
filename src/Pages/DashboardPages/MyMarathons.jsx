// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
// import Loading from "../Shared/Loading";

// const MyMarathons = () => {
//   const { user } = useAuth();
//   const [marathons, setMarathons] = useState([]);
//   const [selectedMarathon, setSelectedMarathon] = useState(null);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user.email) {
//       axios
//         .get("http://localhost:3000/marathons", {
//           params: { email: user.email },
//         })
//         .then((res) => {
//           setMarathons(res.data);
//           setLoading(false);
//         })
//         .catch((err) => console.error("Failed to fetch marathons:", err));
//     }
//   }, [user.email]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData();
//     formData.append("title", form.title.value);
//     formData.append("location", form.location.value);
//     formData.append("date", form.date.value);

//     try {
//       await axios.patch(
//         `http://localhost:3000/marathons/${selectedMarathon._id}`,
//         formData
//       );

//       setShowUpdateModal(false);
//       setSelectedMarathon(null);

//       const updatedList = marathons.map((m) =>
//         m._id === selectedMarathon._id
//           ? {
//               ...m,
//               title: form.title.value,
//               location: form.location.value,
//               date: form.date.value,
//             }
//           : m
//       );
//       setMarathons(updatedList);
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to update marathon:", err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(
//         `http://localhost:3000/marathons/${selectedMarathon._id}`
//       );
//       setMarathons(marathons.filter((m) => m._id !== selectedMarathon._id));
//       setShowDeleteModal(false);
//     } catch (err) {
//       console.error("Failed to delete marathon:", err);
//     }
//   };

//   if (loading) return <Loading />;

//   return (
//     <div className="px-6 py-8 bg-white rounded-lg shadow-md">
//       <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
//         My Created Marathons
//       </h2>

//       {marathons.length === 0 ? (
//         <p className="text-center text-gray-500">No marathons found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
//             <thead className="bg-green-100 text-gray-700 uppercase text-sm">
//               <tr>
//                 <th className="px-4 py-3 text-left">#</th>
//                 <th className="px-4 py-3 text-left">Title</th>
//                 <th className="px-4 py-3 text-left">Location</th>
//                 <th className="px-4 py-3 text-left">Date</th>
//                 <th className="px-4 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {marathons.map((marathon, index) => (
//                 <tr
//                   key={marathon._id}
//                   className="border-t hover:bg-gray-50 transition"
//                 >
//                   <td className="px-4 py-3">{index + 1}</td>

//                   <td className="px-4 py-3 font-medium text-gray-800">
//                     {marathon.title}
//                   </td>
//                   <td className="px-4 py-3">{marathon.location}</td>
//                   <td className="px-4 py-3">
//                     {new Date(marathon.startDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-3 text-center space-x-3">
//                     <button
//                       onClick={() => {
//                         setSelectedMarathon(marathon);
//                         setShowUpdateModal(true);
//                       }}
//                       className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
//                       title="Update"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedMarathon(marathon);
//                         setShowDeleteModal(true);
//                       }}
//                       className="text-red-600 hover:text-red-800 transition cursor-pointer "
//                       title="Delete"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Update Modal */}
//       {showUpdateModal && selectedMarathon && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <form
//             onSubmit={handleUpdate}
//             className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
//           >
//             <h3 className="text-xl font-bold mb-4 text-center text-green-700">
//               ✏️ Update Marathon
//             </h3>
//             <input
//               name="title"
//               defaultValue={selectedMarathon.title}
//               placeholder="Title"
//               className="w-full border border-gray-300 mb-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//             />
//             <input
//               name="location"
//               defaultValue={selectedMarathon.location}
//               placeholder="Location"
//               className="w-full border border-gray-300 mb-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//             />
//             <input
//               type="date"
//               name="date"
//               defaultValue={selectedMarathon.date}
//               className="w-full border border-gray-300 mb-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//               required
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowUpdateModal(false)}
//                 className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && selectedMarathon && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl">
//             <h3 className="text-lg font-bold mb-4 text-red-600">
//               Confirm Delete
//             </h3>
//             <p className="text-gray-700 mb-4">
//               Are you sure you want to delete{" "}
//               <span className="font-semibold text-gray-900">
//                 "{selectedMarathon.title}"
//               </span>
//               ?
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyMarathons;
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";

const MyMarathons = () => {
  usePageTitle("My Marathons");

  const { user } = useAuth();
  const [marathons, setMarathons] = useState([]);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  if (loading) return <Loading />;

  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        My Created Marathons
      </h2>

      {marathons.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No marathons found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
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
                      onClick={() => {
                        setSelectedMarathon(marathon);
                        setShowDeleteModal(true);
                      }}
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

      {/* Update Modal */}
      {showUpdateModal && selectedMarathon && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center text-blue-700">
              ✏️ Update Marathon
            </h3>
            <input
              name="title"
              defaultValue={selectedMarathon.title}
              placeholder="Title"
              className="w-full border border-gray-300 mb-4 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              name="location"
              defaultValue={selectedMarathon.location}
              placeholder="Location"
              className="w-full border border-gray-300 mb-4 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="date"
              name="date"
              defaultValue={selectedMarathon.date}
              className="w-full border border-gray-300 mb-6 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMarathon && (
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
      )}
    </div>
  );
};

export default MyMarathons;
