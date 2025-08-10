import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips to Train for Your First Marathon",
    date: "July 5, 2025",
    excerpt:
      "Discover essential training strategies, nutrition advice, and recovery tips to help you cross that finish line with confidence.",
    image: "https://i.postimg.cc/Y0CfLSSP/Marathon-Tips-For-Beginners-5.jpg",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Running Shoes",
    date: "June 28, 2025",
    excerpt:
      "A guide to finding the right fit, cushioning, and style so you can run longer, faster, and injury-free.",
    image:
      "https://i.postimg.cc/zX3FJ36b/11062b-1f39976c4733405ab8cd34cf27b3cce5-mv2-d-7360-4912-s-4-2.jpg",
  },
  {
    id: 3,
    title: "Top 5 Marathon Routes Around the World",
    date: "June 15, 2025",
    excerpt:
      "From city streets to mountain trails, explore some of the most iconic and scenic marathon courses you need on your bucket list.",
    image: "https://i.postimg.cc/900ZFN85/twin-cities-marathon-1.jpg",
  },
];

const BlogSection = () => (
  <section className="py-20 px-4 bg-gray-50">
    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto text-center mb-14"
    >
      <h2 className="text-5xl font-extrabold text-blue-600">From Our Blog</h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Stay up-to-date with the latest running tips, event news, and inspiring stories.
      </p>
    </motion.div>

    {/* Blog Grid */}
    <div className="grid gap-12 md:grid-cols-3 max-w-7xl mx-auto">
      {blogPosts.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
          className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Image with overlay date */}
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover"
            />
            <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow">
              {post.date}
            </span>
          </div>

          {/* Text Content */}
          <div className="p-6 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-700 mb-6 flex-grow leading-relaxed">
              {post.excerpt}
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 font-semibold hover:underline group"
            >
              Read More
              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default BlogSection;
