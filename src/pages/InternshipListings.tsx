
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-workhive-blue">WorkHive</Link>
          <div className="flex space-x-4">
            <Link to="/internships">
              <Button variant="ghost">Internships</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Available Internships</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internshipListings.map((internship) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: internship.id * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{internship.title}</CardTitle>
                    <CardDescription>{internship.company} • {internship.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{internship.description}</p>
                    <div className="text-sm text-gray-600">
                      <p className="font-semibold">Requirements:</p>
                      <p>{internship.requirements}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Deadline: {new Date(internship.applicationDeadline).toLocaleDateString()}
                    </div>
                    <Link to="/login">
                      <Button>Apply Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default InternshipListings;
