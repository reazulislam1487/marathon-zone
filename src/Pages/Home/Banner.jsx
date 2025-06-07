import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-96">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <motion.img
            src="https://i.ibb.co/0RjtNc6N/613569c08c96ecf954710544fb7692f5c36023458c7e8480300a6202586fa339-rimg-w1200-h675-dc2a341a-gmir-v-174.jpg"
            animate={{ y: [150, 100, 150] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="max-w-sm border-blue-500 border-s-8 border-b-8 rounded-t-4xl rounded-br-4xl shadow-2xl"
          />
          <motion.img
            src="https://i.ibb.co/j9y3KD60/marathon-runner-crosses-finish-line-closeup-view-foot-running-shoe-achievement-perseverance-sunny-da.jpg"
            animate={{ x: [150, 100, 150] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="max-w-sm border-blue-500 border-s-8 border-b-8 rounded-t-4xl rounded-br-4xl shadow-2xl"
          />
        </div>
        <div className="flex-1">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{
              scale: 1,
              transition: { duration: 2 },
            }}
            className="text-5xl font-bold"
          >
            Run with {""}
            <motion.span
              animate={{
                color: ["#FF6347", "#8B4513", "#C2B280", "#E6E6FA", "#228B22	"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              heart
            </motion.span>{" "}
            , finish with pride
          </motion.h1>

          <p className="py-6">
            The marathon is a celebration of perseverance, strength, and the
            unyielding spirit to go the distance — every step forward is a
            victory.
          </p>
          <Link to="/marathons">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log("hover started!")}
              className="btn btn-primary animate-pulse"
            >
              Find Marathons
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
