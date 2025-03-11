import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-workhive-blue to-blue-600 bg-clip-text text-transparent"
            >
              WorkHive
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/internships">Find Internships</NavLink>
            <NavLink href="/companies">Companies</NavLink>
            <NavLink href="/resources">Resources</NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button className="bg-workhive-blue text-white hover:bg-workhive-blue/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    to={href}
    className="text-gray-600 hover:text-workhive-blue transition-colors relative group"
  >
    {children}
    <motion.div
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-workhive-blue group-hover:w-full transition-all duration-300"
      whileHover={{ width: "100%" }}
    />
  </Link>
);

export default Navbar; 