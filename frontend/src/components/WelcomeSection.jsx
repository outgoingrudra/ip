import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { motion } from "framer-motion";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.4
      }
    }
  };

  const sparkleVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, -10, 10, -5, 0],
      scale: [1, 1.1, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const zapVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: [1, 1.2, 1],
      rotate: [0, -5, 5, 0],
      transition: { 
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className="relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          <div>
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 mb-4"
            >
              <motion.div 
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
              >
                <SparklesIcon className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              >
                Welcome back, {user?.firstName || "there"}!
              </motion.h1>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-base-content/60 ml-16"
            >
              Ready to level up your coding skills?
            </motion.p>
          </div>
          
          <motion.button
            onClick={onCreateSession}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl transition-all duration-200 hover:opacity-90 relative overflow-hidden"
          >
            {/* Button shine effect */}
            <motion.div 
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="flex items-center gap-3 text-white font-bold text-lg relative z-10">
              <motion.div
                variants={zapVariants}
                initial="initial"
                whileHover="hover"
              >
                <ZapIcon className="w-6 h-6" />
              </motion.div>
              
              <span>Create Session</span>
              
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <ArrowRightIcon className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default WelcomeSection;