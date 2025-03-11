import React from "react";
import { motion } from "framer-motion";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { BookmarkIcon } from "@radix-ui/react-icons";

interface InternshipCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  logo?: string;
  deadline: string;
  isNew?: boolean;
}

const InternshipCard = ({
  title,
  company,
  location,
  type,
  salary,
  skills,
  logo,
  deadline,
  isNew,
}: InternshipCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 bg-white hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            {logo ? (
              <img src={logo} alt={company} className="w-full h-full object-cover" />
            ) : (
              <div className="text-2xl font-bold text-gray-400">{company[0]}</div>
            )}
          </div>

          {/* Content */}
          <div className="flex-grow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {title}
                  {isNew && (
                    <Badge className="ml-2 bg-green-100 text-green-800">New</Badge>
                  )}
                </h3>
                <p className="text-gray-600">{company}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-workhive-blue"
              >
                <BookmarkIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Details */}
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-gray-100">
                {location}
              </Badge>
              <Badge variant="secondary" className="bg-gray-100">
                {type}
              </Badge>
              <Badge variant="secondary" className="bg-gray-100">
                {salary}
              </Badge>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-workhive-blue border-workhive-blue/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Apply by{" "}
                <span className="font-medium text-gray-900">{deadline}</span>
              </p>
              <Button>View Details</Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default InternshipCard; 