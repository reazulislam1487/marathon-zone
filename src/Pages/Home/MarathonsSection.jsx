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
      <div className="text-center py-20 text-xl text-green-600 font-semibold">
        Loading upcoming marathons...
      </div>
    );
  }

  return (
    <section className="py-12 px-4 md:px-12 bg-green-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">
        Upcoming Marathon Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {marathons.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-green-600 group-hover:text-green-800">
                {event.title}
              </h3>
              <p className="text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Registration:</strong>{" "}
                {new Date(event.startRegDate).toLocaleDateString()} →{" "}
                {new Date(event.endRegDate).toLocaleDateString()}
              </p>
              <Link to={`/marathons/my-marathons/${event._id}`}>
                <button className="mt-3 inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarathonsSection;
