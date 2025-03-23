import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex items-center bg-gradient-to-r from-workhive-blue to-workhive-darkBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Kickstart Your Career with the Perfect Internship
              </h1>
              <p className="text-xl mb-8">
                Connect with top companies offering internships in your field. Build your skills, network with professionals, and take the first step toward your dream career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/internships">
                  <Button size="lg" className="bg-white text-workhive-blue hover:bg-workhive-lightGray">
                    Browse Internships
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    className="bg-transparent border-2 border-white hover:bg-white group"
                  >
                    <span className="text-white font-semibold group-hover:text-workhive-blue">
                      Join Us Now
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <img
                src="images/aa.png"
                alt="Students working on laptops"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose WorkHive?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect talented students with companies offering meaningful internship experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Opportunities",
                description: "Access verified internships from top companies across various industries.",
                icon: "🌟",
              },
              {
                title: "Skill Development",
                description: "Find internships that match your career goals and help you develop relevant skills.",
                icon: "📈",
              },
              {
                title: "Networking",
                description: "Connect with professionals and build relationships that last beyond your internship.",
                icon: "🔗",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-16">
              <Link to="/resume">
                <Button size="lg" className="bg-workhive-blue text-white hover:bg-workhive-darkBlue">
                  CV & Resume Guide
                </Button>
              </Link>
             
               
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-workhive-navy py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Internship?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of students who have launched their careers through WorkHive.
            </p>
           
          </motion.div>
        </div>
      </section>

      {/* Newsletter and Footer Section with Wave Background */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/wave-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#000B45',
            opacity: 0.95
          }}
        />
        
        <div className="relative z-10">
          {/* Newsletter Content */}
          <div className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-8 text-white">Subscribe to our newsletter</h2>
              <div className="flex max-w-md mx-auto gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white text-black"
                />
                <Button className="bg-blue-500 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-bold mb-4 text-white">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Overview</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Solutions</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-white">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Guides</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-white">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-white">Plans & Pricing</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Personal</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Business</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Enterprise</a></li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-16 text-center">
              <div className="mb-4">
                <select className="bg-opacity-20 bg-white text-white rounded px-3 py-1 border border-gray-500">
                  <option className="text-black">English</option>
                </select>
              </div>
              <div className="space-x-4 text-gray-300">
                <span>© 2024 Brand, Inc.</span>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
