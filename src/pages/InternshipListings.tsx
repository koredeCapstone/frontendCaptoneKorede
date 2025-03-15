import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock data for internship listings
const internshipListings = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    description: "Join our team to build modern web applications using React, TypeScript, and more.",
    requirements: "Knowledge of JavaScript, React, and CSS. Familiarity with TypeScript is a plus.",
    applicationDeadline: "2023-12-15",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "DataSystems",
    location: "New York, NY (Hybrid)",
    description: "Work on server-side applications and RESTful APIs in a fast-paced environment.",
    requirements: "Experience with Node.js, Express, and databases (SQL or NoSQL).",
    applicationDeadline: "2023-12-20",
  },
  {
    id: 3,
    title: "Full Stack Developer Intern",
    company: "WebSolutions",
    location: "Chicago, IL (On-site)",
    description: "Develop both client and server-side features for our web applications.",
    requirements: "Knowledge of JavaScript, React, Node.js, and databases.",
    applicationDeadline: "2023-12-25",
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    company: "CreativeMinds",
    location: "Los Angeles, CA (Remote)",
    description: "Create user-centered designs and improve user experiences for our products.",
    requirements: "Proficiency in design tools like Figma or Adobe XD. Basic understanding of HTML/CSS.",
    applicationDeadline: "2023-12-30",
  },
];

const InternshipListings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center text-gray-800"
        >
          Available Internship Positions
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internshipListings.map((listing) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{listing.title}</CardTitle>
                  <CardDescription>{listing.company} • {listing.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{listing.description}</p>
                  <div className="text-sm text-gray-500">
                    <p className="font-semibold mb-2">Requirements:</p>
                    <p>{listing.requirements}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Deadline: {new Date(listing.applicationDeadline).toLocaleDateString()}
                  </div>
                  <Link to="/application">
                    <Button>Apply Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter and Footer Section with Wave Background */}
        <div className="relative mt-16">
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
        </div>
      </div>
    </div>
  );
};

export default InternshipListings;
