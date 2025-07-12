import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-20 relative">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-600 dark:text-white mb-4 text-center"
      >
        About TaskMaster
      </motion.h1>

      {/* Problem it Solves */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg max-w-2xl text-center text-gray-700 dark:text-gray-300 mb-4"
      >
        In today’s fast-paced world, staying organized and productive is harder than ever.
        Many people struggle with forgetting deadlines, losing track of important tasks,
        and being overwhelmed by cluttered schedules. TaskMaster solves this by giving you
        a focused, intelligent way to manage tasks and boost your personal productivity.
      </motion.p>

      {/* Original Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg max-w-2xl text-center text-gray-700 dark:text-gray-300 mb-6"
      >
        TaskMaster is your intelligent, distraction-free productivity partner. It helps you
        stay on top of your goals by managing your tasks efficiently with features like
        due dates, priority tagging, and completion tracking. Designed to work across devices,
        TaskMaster ensures you never miss a beat whether at home, work, or on the go.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Go to Dashboard
        </Link>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-4 text-center text-gray-400 text-xs"
      >
        © {new Date().getFullYear()} TaskMaster — All rights reserved.
      </motion.div>
    </div>
  );
};

export default About;
