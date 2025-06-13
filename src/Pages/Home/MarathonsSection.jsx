import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const MarathonsSection = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/all-marathons")
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
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Marathon Events
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {marathons.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-2xl font-bold text-blue-800">
                {event.title}
              </h3>
              <p className="text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-600">
                <strong>Registration:</strong> <br />
                {new Date(event.startRegDate).toLocaleDateString()} →{" "}
                {new Date(event.endRegDate).toLocaleDateString()}
              </p>
              <Link
                to={`/marathons/my-marathons/${event._id}`}
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer text-sm px-5 py-2.5 rounded-lg transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className=" mt-5 p-4 text-center">
        <Link
          to="/marathons"
          className="bg-blue-600  text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition"
        >
          See More
        </Link>
      </div>
    </section>
  );
};

export default MarathonsSection;
