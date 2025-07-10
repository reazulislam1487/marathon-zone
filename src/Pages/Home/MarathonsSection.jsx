import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const MarathonsSection = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://marathon-server-side-five.vercel.app/all-marathons")
      .then((res) => {
        setMarathons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading marathons:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-blue-600 text-xl font-semibold animate-pulse">
          Loading marathons...
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-12">
        Marathon Events
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {marathons.map((event) => (
          <div
            key={event._id}
            className="flex flex-col bg-white shadow-lg rounded-3xl overflow-hidden transform transition hover:shadow-2xl hover:-translate-y-1 duration-300"
          >
            {/* Image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-6 pb-0 flex-1 space-y-2">
              <h3 className="text-2xl font-bold text-blue-800">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Registration:</strong>{" "}
                <span className="block mt-1">
                  {new Date(event.startRegDate).toLocaleDateString()} &rarr;{" "}
                  {new Date(event.endRegDate).toLocaleDateString()}
                </span>
              </p>
            </div>

            {/* Button fixed at bottom */}
            <div className="p-6">
              <Link
                to={`/marathons/my-marathons/${event._id}`}
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-3 rounded-lg transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/marathons"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-sm text-white px-6 py-3 rounded-lg font-medium transition"
        >
          See More
        </Link>
      </div>
    </section>
  );
};

export default MarathonsSection;
