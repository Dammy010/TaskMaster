import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { UserPlus, ClipboardList, CheckCircle } from "lucide-react";

const LandingPage = () => {
  const { user, loading } = useAuth(); 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300 scroll-smooth">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-32">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Organize Your Tasks Effortlessly
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            A sleek, simple, and powerful task manager to boost your productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? "/home" : "/register"}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 mb-3 rounded-full text-lg shadow transition"
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </Link>
          </div>
        </motion.div>
      </main>

      <section
        id="how-it-works"
        className="bg-white dark:bg-gray-900 py-24 px-6 border-t border-gray-200 dark:border-gray-700 scroll-mt-20"
      >
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
            How It Works
          </h2>

          <div
            className={`grid gap-10 ${
              user ? "md:grid-cols-2 justify-center" : "md:grid-cols-3"
            }`}
          >
            {!user && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex items-center justify-center mb-4">
                  <UserPlus className="text-blue-600 dark:text-blue-400 w-10 h-10" />
                </div>
                <h3 className="font-semibold text-xl text-blue-600 dark:text-blue-400 mb-2">
                  1. Sign Up or Login
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create your free account and securely log in to access your tasks from anywhere.
                </p>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center mb-4">
                <ClipboardList className="text-blue-600 dark:text-blue-400 w-10 h-10" />
              </div>
              <h3 className="font-semibold text-xl text-blue-600 dark:text-blue-400 mb-2">
                {user ? "1." : "2."} Add and Manage Tasks
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quickly add tasks with deadlines, priorities, and time slots that match your schedule.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="text-blue-600 dark:text-blue-400 w-10 h-10" />
              </div>
              <h3 className="font-semibold text-xl text-blue-600 dark:text-blue-400 mb-2">
                {user ? "2." : "3."} Stay Effortlessly Productive
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Let the system handle the rest — your tasks automatically mark themselves as complete once their due time is reached, helping you stay focused and organized without lifting a finger.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
