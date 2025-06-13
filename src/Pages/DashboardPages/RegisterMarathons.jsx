import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RegisterMarathons = () => {
  usePageTitle("Register Marathon");
  const instance = useAxiosSecure();

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [marathon, setMarathon] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    additionalInfo: "",
  });

  useEffect(() => {
    instance(`/marathons/${id}`)
      .then((res) => setMarathon(res.data))
      .catch((err) => console.error("Failed to fetch marathon:", err));
  }, [id, instance]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      marathonId: id,
      email: user?.email,
      marathonTitle: marathon.title,
      marathonStartDate: marathon.startDate,
      location: marathon.location,
      image: marathon.image,
      ...formData,
    };

    try {
      await instance.post("/registrations", registrationData);
      await instance.patch(`/marathons/${id}`, {
        registrationCount: 1,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        additionalInfo: "",
      });

      navigate("/dashboard/my-applies");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration failed.",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  if (!marathon) return <Loading />;

  return (
    <div className="max-w-2xl  mx-6 md:mx-auto bg-white shadow-lg  p-8 rounded-2xl my-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Register for {marathon.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4.5 text-gray-400" />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-100"
            />
          </div>
        </div>

        {/* Marathon Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Marathon Title
          </label>
          <input
            type="text"
            value={marathon.title}
            readOnly
            className="w-full px-4 py-3 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Marathon Date */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="text"
            value={new Date(marathon.startDate).toLocaleDateString()}
            readOnly
            className="w-full px-4 py-3 border rounded-lg bg-gray-100"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Contact Number
          </label>
          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-4.5 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Additional Info
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us anything else..."
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-medium py-3 rounded-lg transition"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default RegisterMarathons;
