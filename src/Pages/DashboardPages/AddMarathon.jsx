import React, { useState } from "react";
import DatePicker from "react-datepicker";
// import axios from "axios";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

import useAuth from "../../hooks/useAuth";
import usePageTitle from "../../hooks/usePageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddMarathon = () => {
  usePageTitle("Add Marathon");

  const { user } = useAuth();
  const instance = useAxiosSecure();

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
      const res = await instance.post("/marathons", newMarathon);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Marathon added successfully!",
          showConfirmButton: false,
          timer: 1000,
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
          type="url"
          name="image"
          placeholder="Image URL"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 cursor-pointer px-8 rounded-lg font-semibold transition"
        >
          Add Marathon
        </button>
      </form>
    </div>
  );
};

export default AddMarathon;
