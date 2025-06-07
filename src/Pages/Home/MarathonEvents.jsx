import React from "react";
import { FaRunning } from "react-icons/fa";
import { motion } from "framer-motion";

const marathonEvents = [
  {
    id: 1,
    name: "Dhaka Mega Marathon",
    date: "July 15, 2025",
    location: "Dhaka, Bangladesh",
    distance: "25K",
    registrationDeadline: "June 30, 2025",
  },
  {
    id: 2,
    name: "Cox's Bazar Beach Run",
    date: "August 5, 2025",
    location: "Cox's Bazar, Bangladesh",
    distance: "10K",
    registrationDeadline: "July 20, 2025",
  },
  {
    id: 3,
    name: "Sylhet Hill Challenge",
    date: "September 10, 2025",
    location: "Sylhet, Bangladesh",
    distance: "3K",
    registrationDeadline: "August 25, 2025",
  },
  {
    id: 4,
    name: "Barisal River Dash",
    date: "October 1, 2025",
    location: "Barisal, Bangladesh",
    distance: "10K",
    registrationDeadline: "September 10, 2025",
  },
  {
    id: 5,
    name: "Rajshahi Heritage Sprint",
    date: "October 25, 2025",
    location: "Rajshahi, Bangladesh",
    distance: "25K",
    registrationDeadline: "October 5, 2025",
  },
  {
    id: 6,
    name: "Khulna Urban 3K",
    date: "November 12, 2025",
    location: "Khulna, Bangladesh",
    distance: "3K",
    registrationDeadline: "October 30, 2025",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const MarathonEvents = () => {
  return (
    <section className="py-20 px-4 md:px-12  text-gray-800">
      {/* Section Title */}
      <div className="flex items-center justify-center mb-14 gap-4">
        <FaRunning className="text-blue-600 text-4xl animate-pulse" />
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-black text-center"
        >
          Upcoming <span className="text-blue-600">Marathon Events</span>
        </motion.h2>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {marathonEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="group p-6 bg-white border rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            variants={cardVariants}
          >
            <h3 className="text-2xl font-semibold text-blue-700 group-hover:text-blue-900 mb-3">
              {event.name}
            </h3>
            <p className="text-gray-600 mb-1">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Distance:</strong>{" "}
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                {event.distance}
              </span>
            </p>
            <p className="text-gray-600">
              <strong>Register by:</strong> {event.registrationDeadline}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MarathonEvents;
