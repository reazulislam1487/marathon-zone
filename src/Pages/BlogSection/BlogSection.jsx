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
      "A guide to finding the right fit, cushioning, and style so you can run longer, faster, and injury‑free.",
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
  <section className="py-20 px-4 ">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto text-center mb-12"
    >
      <h2 className="text-5xl font-extrabold text-blue-600">From Our Blog</h2>
      <p className="mt-4 text-textSecondary">
        Stay up‑to‑date with the latest running tips, event news, and inspiring
        stories.
      </p>
    </motion.div>

    <div className="grid gap-8 md:grid-cols-3 max-w-7xl px-4 mx-auto">
      {blogPosts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-textPrimary mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-textSecondary mb-4">{post.date}</p>
            <p className="text-gray-700 mb-6 leading-relaxed">{post.excerpt}</p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Read More <FaArrowRight className="ml-2" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default BlogSection;
