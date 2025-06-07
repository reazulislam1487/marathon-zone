import React from "react";
import { FaRunning } from "react-icons/fa";

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

const MarathonEvents = () => {
  return (
    <section className="py-12 px-4 md:px-12 bg-gradient-to-b from-green-50 to-white">
      {/* Title with Logo */}
      <div className="flex items-center justify-center mb-12 gap-3">
        <FaRunning className="text-green-700 text-4xl animate-bounce" />
        <h2 className="text-4xl font-bold text-green-700 text-center">
          Upcoming Marathon Events
        </h2>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {marathonEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl border border-green-100 hover:border-green-300 transition duration-300 p-6 group transform hover:-translate-y-1 hover:scale-[1.02]"
          >
            <h3 className="text-2xl font-semibold text-green-600 group-hover:text-green-800 transition mb-2">
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
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-medium">
                {event.distance}
              </span>
            </p>
            <p className="text-gray-600">
              <strong>Register by:</strong> {event.registrationDeadline}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarathonEvents;
