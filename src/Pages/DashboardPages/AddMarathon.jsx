// import React, { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const AddMarathon = () => {
//   const { user } = useAuth();

//   // Separate state for dates
//   const [startRegDate, setStartRegDate] = useState(null);
//   const [endRegDate, setEndRegDate] = useState(null);
//   const [startDate, setStartDate] = useState(null);

//   const handleAddMarathon = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData.entries());

//     // Add/convert necessary fields
//     const newMarathon = {
//       ...data,
//       startRegDate: startRegDate ? startRegDate.toISOString() : null,
//       endRegDate: endRegDate ? endRegDate.toISOString() : null,
//       startDate: startDate ? startDate.toISOString() : null,
//       createdAt: new Date(),
//       registrationCount: 0,
//       createdBy: user?.email || "anonymous",
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/marathons",
//         newMarathon
//       );
//       if (res.data.insertedId) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Marathon added successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         form.reset();
//         setStartRegDate(null);
//         setEndRegDate(null);
//         setStartDate(null);
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Something went wrong!", "error");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4 text-green-700">
//         Add New Marathon
//       </h2>
//       <form onSubmit={handleAddMarathon} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Marathon Title"
//           className="w-full p-3 border rounded-lg"
//           required
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Start Registration Date
//             </label>
//             <DatePicker
//               selected={startRegDate}
//               onChange={(date) => setStartRegDate(date)}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               End Registration Date
//             </label>
//             <DatePicker
//               selected={endRegDate}
//               onChange={(date) => setEndRegDate(date)}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Marathon Start Date
//             </label>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//         </div>

//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           className="w-full p-3 border rounded-lg"
//           required
//         />

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Running Distance
//           </label>
//           <select
//             name="distance"
//             className="w-full p-3 border rounded-lg"
//             defaultValue="10k"
//             required
//           >
//             <option value="3k">3k</option>
//             <option value="10k">10k</option>
//             <option value="25k">25k</option>
//           </select>
//         </div>

//         <textarea
//           name="description"
//           placeholder="Description"
//           rows="4"
//           className="w-full p-3 border rounded-lg"
//           required
//         />

//         <input
//           type="text"
//           name="image"
//           placeholder="Image URL"
//           className="w-full p-3 border rounded-lg"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold"
//         >
//           Add Marathon
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMarathon;
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import usePageTitle from "../../hooks/usePageTitle";

const AddMarathon = () => {
  usePageTitle("Add Marathon");

  const { user } = useAuth();

  // Separate state for dates
  const [startRegDate, setStartRegDate] = useState(null);
  const [endRegDate, setEndRegDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const handleAddMarathon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add/convert necessary fields
    const newMarathon = {
      ...data,
      startRegDate: startRegDate ? startRegDate.toISOString() : null,
      endRegDate: endRegDate ? endRegDate.toISOString() : null,
      startDate: startDate ? startDate.toISOString() : null,
      createdAt: new Date(),
      registrationCount: 0,
      createdBy: user?.email || "anonymous",
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/marathons",
        newMarathon
      );
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Marathon added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        setStartRegDate(null);
        setEndRegDate(null);
        setStartDate(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl text-center font-bold mb-6 text-blue-700">
        Add New Marathon
      </h2>
      <form onSubmit={handleAddMarathon} className="space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Marathon Title"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Start Registration Date
            </label>
            <DatePicker
              selected={startRegDate}
              onChange={(date) => setStartRegDate(date)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              End Registration Date
            </label>
            <DatePicker
              selected={endRegDate}
              onChange={(date) => setEndRegDate(date)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Marathon Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Running Distance
          </label>
          <select
            name="distance"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue="10k"
            required
          >
            <option value="3k">3k</option>
            <option value="10k">10k</option>
            <option value="25k">25k</option>
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition"
        >
          Add Marathon
        </button>
      </form>
    </div>
  );
};

export default AddMarathon;
