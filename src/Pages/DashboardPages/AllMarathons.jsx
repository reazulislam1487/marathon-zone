import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router";

import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllMarathons = () => {
  usePageTitle("All Marathons");

  const { user } = useAuth();

  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const instance = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    instance(`/marathons?sort=${sortOrder}`, {
      params: { email: user.email },
    })
      .then((res) => {
        setMarathons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch marathons:", err);
        setLoading(false);
      });
  }, [sortOrder, user?.accessToken, user.email, instance]); // Re-fetch when sortOrder or accessToken changes

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
        All Marathons
      </h2>

      {/* Sorting Dropdown */}
      <div className="mb-6 text-right">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Newest Marathons</option>
          <option value="asc">Oldest Marathons</option>
        </select>
      </div>

      {/* Marathon Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {marathons.map((marathon) => (
          <div
            key={marathon._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <img
              src={marathon.image}
              alt={marathon.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-2xl font-bold text-blue-800">
                {marathon.title}
              </h3>
              <p className="text-gray-600">
                <strong>Location:</strong> {marathon.location}
              </p>
              <p className="text-gray-600">
                <strong>Registration:</strong> <br />
                {new Date(marathon.startRegDate).toLocaleDateString()} →{" "}
                {new Date(marathon.endRegDate).toLocaleDateString()}
              </p>
              <Link
                to={`/marathons/my-marathons/${marathon._id}`}
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer text-sm px-5 py-2.5 rounded-lg transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMarathons;
