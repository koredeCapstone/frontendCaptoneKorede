import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-workhive-blue/20 to-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-workhive-blue/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative pt-32 pb-16 md:pt-40 md:pb-24"
        style={{ opacity, scale }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Perfect{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-workhive-blue to-blue-600 bg-clip-text text-transparent">
                  Internship
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-workhive-blue to-blue-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Connect with top companies, build your skills, and kickstart your career journey with WorkHive.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative flex items-center">
                <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for internships, companies, or skills..."
                  className="w-full py-3 pl-12 pr-4 text-gray-900 border border-gray-200 rounded-l-lg focus:outline-none focus:border-workhive-blue focus:ring-1 focus:ring-workhive-blue"
                />
                <Button size="lg" className="rounded-l-none bg-workhive-blue text-white hover:bg-workhive-blue/90">
                  Search
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-workhive-blue text-white hover:bg-workhive-blue/90 group"
              >
                Browse Internships
                <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 hover:bg-workhive-blue/5"
              >
                For Employers
              </Button>
            </motion.div>

            {/* Stats with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              <Stat number="1000+" label="Active Internships" />
              <Stat number="500+" label="Partner Companies" />
              <Stat number="10k+" label="Student Success Stories" className="col-span-2 md:col-span-1" />
            </motion.div>
          </div>

          {/* Featured Companies with better animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20"
          >
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-sm text-gray-500 text-center mb-8"
            >
              Trusted by leading companies
            </motion.p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  className="w-32 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Stat = ({ number, label, className = "" }: { number: string; label: string; className?: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`text-center ${className} p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-shadow`}
  >
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="text-3xl font-bold bg-gradient-to-r from-workhive-blue to-blue-600 bg-clip-text text-transparent mb-2"
    >
      {number}
    </motion.div>
    <p className="text-gray-600">{label}</p>
  </motion.div>
);

export default Hero; 