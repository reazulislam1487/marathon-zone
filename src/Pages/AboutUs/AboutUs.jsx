import { motion } from "framer-motion";
import { FaBullseye, FaLink, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  const features = [
    {
      icon: <FaBullseye />,
      title: "Our Mission",
      text: "Inspire active living and community participation by streamlining the marathon experience.",
    },
    {
      icon: <FaLink />,
      title: "Why Choose Us?",
      text: "Secure, user-friendly dashboard with real-time updates and easy registration tracking.",
    },
    {
      icon: <FaRocket />,
      title: "What We Offer",
      text: "Full event visibility, countdown timers, filtering options, and seamless registration.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 px-4  ">
      {/* Decorative SVG wave */}
      <div className="absolute -top-24 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-40 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M0,256L48,234.7C96,213,192,171,288,144C384,117,480,107,576,128C672,149,768,203,864,229.3C960,256,1056,256,1152,224C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-6">
          About Marathon Zone
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-16">
          <strong className="text-gray-900">Marathon Zone</strong> bridges the
          gap between marathon organizers and runners. We make event management
          simple and registration effortless.
        </p>

        {/* Vertical Timeline Layout */}
        <div className="relative border-l-4 border-blue-200 pl-6 md:pl-12 space-y-12">
          {features.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative flex items-center gap-6 bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Timeline Dot */}
              <span className="absolute -left-[38px] md:-left-[46px] w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-md"></span>

              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 text-2xl flex-shrink-0 shadow-sm">
                {card.icon}
              </div>

              {/* Text Content */}
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
