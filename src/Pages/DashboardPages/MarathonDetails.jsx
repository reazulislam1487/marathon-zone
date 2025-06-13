import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
// import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../../style.css";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRulerHorizontal,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MarathonDetails = () => {
  usePageTitle("Marathon Details ");

  const { id } = useParams();
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const instance = useAxiosSecure();

  useEffect(() => {
    instance(`/marathons/${id}`,)
      .then((res) => {
        setMarathon(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch marathon:", err);
        setLoading(false);
      });
  }, [id, instance]);
  // console.log(id);

  if (loading) return <Loading />;

  if (!marathon) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        <p>Marathon not found</p>
      </div>
    );
  }

  const regStart = new Date(marathon.startRegDate);
  const regEnd = new Date(marathon.endRegDate);
  const today = new Date();
  const marathonStartDate = new Date(marathon.startDate);

  const isRegistrationOpen =
    // today >= regStart && today <= regEnd && marathonStartDate < today;
    today >= regStart && today <= regEnd && today < marathonStartDate;

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  const renderTime = (dimension, time) => (
    <div className="text-center text-blue-700 font-bold">
      <div className="text-3xl">{time}</div>
      <div className="text-sm">{dimension}</div>
    </div>
  );

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const now = Date.now() / 1000;
  const marathonStart = new Date(marathon.startDate).getTime() / 1000;
  const remainingTime = Math.max(marathonStart - now, 0);
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={marathon.image}
            alt={marathon.title}
            className="w-full h-64 object-cover"
          />

          <div className="p-6 space-y-4">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              {marathon.title}
            </h2>

            <p className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-blue-600" />
              <span className="font-semibold">Location:</span>{" "}
              {marathon.location}
            </p>

            <p className="flex items-start gap-2 text-gray-700">
              <MdOutlineDateRange className="text-blue-600 mt-1" />
              <span>
                <span className="font-semibold">Registration Period:</span>
                <br />
                {regStart.toLocaleDateString()} → {regEnd.toLocaleDateString()}
              </span>
            </p>

            <p className="flex items-center gap-2 text-gray-700">
              <FaCalendarAlt className="text-blue-600" />
              <span className="font-semibold">Marathon Date:</span>{" "}
              {marathonStartDate.toLocaleDateString()}
            </p>

            <p className="flex items-center gap-2 text-gray-700">
              <FaRulerHorizontal className="text-blue-600" />
              <span className="font-semibold">Running Distance:</span>{" "}
              {marathon.distance}
            </p>

            <p className="flex items-start gap-2 text-gray-700">
              <FaClipboardList className="text-blue-600 mt-1" />
              <span>
                <span className="font-semibold">Description:</span>
                <br />
                {marathon.description}
              </span>
            </p>

            <p className="flex items-center gap-2 text-blue-700 font-semibold">
              <FaUsers />
              Total Registered: {marathon.registrationCount}
            </p>

            <div className="mt-6">
              {isRegistrationOpen ? (
                <Link
                  to={`/marathons/register/${marathon._id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 cursor-pointer rounded-lg transition duration-200 shadow"
                >
                  Register Now
                </Link>
              ) : (
                <p className="text-red-500 font-semibold">
                  Registration is closed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-20">
        <h1 className="text-center text-3xl font-bold animate-bounce bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Countdown
        </h1>

        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-wrap justify-center gap-6">
          <CountdownCircleTimer
            {...timerProps}
            colors="#2563eb"
            duration={daysDuration}
            initialRemainingTime={remainingTime}
          >
            {({ elapsedTime }) =>
              renderTime("Days", getTimeDays(daysDuration - elapsedTime))
            }
          </CountdownCircleTimer>

          <CountdownCircleTimer
            {...timerProps}
            colors="#3b82f6"
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            onComplete={(totalElapsedTime) => ({
              shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
            })}
          >
            {({ elapsedTime }) =>
              renderTime("Hours", getTimeHours(daySeconds - elapsedTime))
            }
          </CountdownCircleTimer>

          <CountdownCircleTimer
            {...timerProps}
            colors="#60a5fa"
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={(totalElapsedTime) => ({
              shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
            })}
          >
            {({ elapsedTime }) =>
              renderTime("Minutes", getTimeMinutes(hourSeconds - elapsedTime))
            }
          </CountdownCircleTimer>

          <CountdownCircleTimer
            {...timerProps}
            colors="#93c5fd"
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => ({
              shouldRepeat: remainingTime - totalElapsedTime > 0,
            })}
          >
            {({ elapsedTime }) =>
              renderTime("Seconds", getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetails;
