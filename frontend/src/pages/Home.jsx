import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

function HomePage() {
  // Animation variants for reusable animations
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  };

  const slideInFromLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const slideInFromRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-base-100 via-base-200 to-base-300"
    >
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg"
            >
              <SparklesIcon className="size-6 text-white" />
            </motion.div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Talent IQ
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
            </div>
          </Link>

          {/* AUTH BTN */}
          <SignInButton mode="modal">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <span>Get Started</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              >
                <ArrowRightIcon className="size-4 inline ml-1" />
              </motion.span>
            </motion.button>
          </SignInButton>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="badge badge-primary badge-lg">
              <ZapIcon className="size-4" />
              Real-time Collaboration
            </motion.div>

            <motion.h1 
              variants={slideInFromLeft}
              className="text-5xl lg:text-7xl font-black leading-tight"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Code Together,
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-base-content/70 leading-relaxed max-w-xl"
            >
              The ultimate platform for collaborative coding interviews and pair programming.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </motion.p>

            {/* FEATURE PILLS */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              {[
                { icon: CheckIcon, text: "Live Video Chat", color: "text-success" },
                { icon: CheckIcon, text: "Code Editor", color: "text-success" },
                { icon: CheckIcon, text: "Multi-Language", color: "text-success" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="badge badge-lg badge-outline cursor-default"
                >
                  <feature.icon className={`size-4 ${feature.color}`} />
                  {feature.text}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg group"
                >
                  Start Coding Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  >
                    <ArrowRightIcon className="size-5" />
                  </motion.span>
                </motion.button>
              </SignInButton>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-lg"
              >
                <VideoIcon className="size-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* STATS */}
            <motion.div 
              variants={scaleIn}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg"
            >
              {[
                { value: "10K+", label: "Active Users", color: "text-primary" },
                { value: "50K+", label: "Sessions", color: "text-secondary" },
                { value: "99.9%", label: "Uptime", color: "text-accent" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="stat"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3, delay: index * 0.5 }}
                    className={`stat-value ${stat.color}`}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="stat-title">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={slideInFromRight}
            initial="initial"
            animate="animate"
          >
            <motion.img
              src="/hero.png"
              alt="CodeCollab Platform"
              whileHover={{ 
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 cursor-pointer"
            />
          </motion.div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            Everything You Need to <span className="text-primary font-mono">Succeed</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-base-content/70 max-w-2xl mx-auto"
          >
            Powerful features designed to make your coding interviews seamless and productive
          </motion.p>
        </div>

        {/* FEATURES GRID */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { icon: VideoIcon, title: "HD Video Call", desc: "Crystal clear video and audio for seamless communication during interviews" },
            { icon: Code2Icon, title: "Live Code Editor", desc: "Collaborate in real-time with syntax highlighting and multiple language support" },
            { icon: UsersIcon, title: "Easy Collaboration", desc: "Share your screen, discuss solutions, and learn from each other in real-time" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.2 }
              }}
              className="card bg-base-100 shadow-xl cursor-pointer"
            >
              <div className="card-body items-center text-center">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4"
                >
                  <feature.icon className="size-8 text-primary" />
                </motion.div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="text-base-content/70">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HomePage;