import { Link } from "react-router";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-base-200"
    >
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
        </motion.div>

        {/* PROBLEMS LIST */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.15 }
              }}
              whileTap={{ scale: 0.99 }}
              custom={index}
            >
              <Link
                to={`/problem/${problem.id}`}
                className="card bg-base-100 block transition-shadow duration-200 hover:shadow-xl"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between gap-4">
                    {/* LEFT SIDE */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="size-12 rounded-lg bg-primary/10 flex items-center justify-center"
                        >
                          <Code2Icon className="size-6 text-primary" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-bold">{problem.title}</h2>
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
                            >
                              {problem.difficulty}
                            </motion.span>
                          </div>
                          <p className="text-sm text-base-content/60"> {problem.category}</p>
                        </div>
                      </div>
                      <p className="text-base-content/80 mb-3">{problem.description.text}</p>
                    </div>
                    
                    {/* RIGHT SIDE */}
                    <motion.div 
                      className="flex items-center gap-2 text-primary"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="font-medium">Solve</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        <ChevronRightIcon className="size-5" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* STATS FOOTER */}
        <motion.div 
          variants={statVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="mt-12 card bg-base-100 shadow-lg"
        >
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <motion.div 
                className="stat"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
              >
                <div className="stat-title">Total Problems</div>
                <motion.div 
                  className="stat-value text-primary"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    repeatType: "reverse"
                  }}
                >
                  {problems.length}
                </motion.div>
              </motion.div>

              <motion.div 
                className="stat"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
              >
                <div className="stat-title">Easy</div>
                <motion.div 
                  className="stat-value text-success"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    delay: 0.5,
                    repeatType: "reverse"
                  }}
                >
                  {easyProblemsCount}
                </motion.div>
              </motion.div>

              <motion.div 
                className="stat"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
              >
                <div className="stat-title">Medium</div>
                <motion.div 
                  className="stat-value text-warning"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    delay: 1,
                    repeatType: "reverse"
                  }}
                >
                  {mediumProblemsCount}
                </motion.div>
              </motion.div>

              <motion.div 
                className="stat"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
              >
                <div className="stat-title">Hard</div>
                <motion.div 
                  className="stat-value text-error"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    delay: 1.5,
                    repeatType: "reverse"
                  }}
                >
                  {hardProblemsCount}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProblemsPage;