import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Framer Motion card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const AllMarathons = () => {
  usePageTitle("All Marathons");

  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const instance = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    instance(`/marathons?sort=${sortOrder}`)
      .then((res) => {
        setMarathons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch marathons:", err);
        setLoading(false);
      });
  }, [sortOrder, instance]);

  if (loading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-10"
      >
        All Marathons
      </motion.h2>

      {/* Sort Dropdown */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-right"
      >
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Newest Marathons</option>
          <option value="asc">Oldest Marathons</option>
        </select>
      </motion.div>

      {/* Marathon Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {marathons.map((marathon, index) => (
          <motion.div
            key={marathon._id}
            className="flex flex-col bg-white shadow-lg rounded-3xl overflow-hidden transform transition hover:shadow-2xl hover:-translate-y-1 duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            variants={cardVariants}
          >
            {/* Image */}
            <img
              src={marathon.image}
              alt={marathon.title}
              className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-6 pb-0 flex-1 space-y-2">
              <h3 className="text-2xl font-bold text-blue-800">
                {marathon.title}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {marathon.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Registration:</strong>
                <span className="block mt-1">
                  {new Date(marathon.startRegDate).toLocaleDateString()} →{" "}
                  {new Date(marathon.endRegDate).toLocaleDateString()}
                </span>
              </p>
            </div>

            {/* Button */}
            <div className="p-6">
              <Link
                to={`/marathons/my-marathons/${marathon._id}`}
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-3 rounded-lg transition"
              >
                See Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AllMarathons;
