import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 ">
      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 50 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        ></motion.div>
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: -50 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-64 -right-32 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-0 items-center">
        {/* Left Side - Illustration & Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent leading-tight">
            Let’s Talk <br />
            <span className="text-gray-800">About Your Next Run</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-lg">
            Have questions, ideas, or need assistance? We’re always ready to
            help. Send us a message and we’ll get back to you in no time.
          </p>
          <div className="hidden lg:block">
            <img
              src="https://c8.alamy.com/comp/2BRCC01/flat-style-marathon-banner-design-with-energetic-runner-on-blue-background-2BRCC01.jpg"
              alt="Contact Illustration"
              className="w-96"
            />
          </div>
        </motion.div>

        {/* Right Side - Contact Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative backdrop-blur-xl bg-white/80 p-8 rounded-3xl shadow-xl border border-white/40"
        >
          {/* Contact Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
            {[
              { icon: <FaMapMarkerAlt />, label: "123 Marathon St., RunCity" },
              { icon: <FaPhoneAlt />, label: "+1 (234) 567-8901" },
              { icon: <FaEnvelope />, label: "support@marathonzone.com" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 text-xl mb-2">
                  {item.icon}
                </div>
                <p className="text-gray-700 text-sm">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                rows="4"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
