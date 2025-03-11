
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { MapPin, Calendar, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const internships = [
  {
    id: 1,
    title: 'Finance Internship',
    company: 'Dalex',
    logo: 'public/lovable-uploads/242ee177-d54e-4746-952d-1276af2e6793.png',
    location: 'Accra, Ghana',
    skills: [
      'Understanding of finance principles',
      'Data analysis proficiency',
      'Knowledge on spreadsheet'
    ],
    qualifications: [
      'A Business Administration Major',
      'Strong academic performance (GPA of 3.0 or higher).'
    ],
    documents: [
      'Resume (including relevant coursework and projects).',
      'Cover letter (explaining your interest in the internship and your career goals).',
      'Internship Letter'
    ]
  },
  {
    id: 2,
    title: 'Software Development Internship',
    company: 'Ghana Web Design',
    logo: 'public/lovable-uploads/37f2e25f-64f5-4220-84d1-e221c2732c25.png',
    location: 'Accra, Ghana',
    skills: [
      'Proficiency in JavaScript and modern frameworks',
      'Understanding of UI/UX principles',
      'Version control with Git'
    ],
    qualifications: [
      'Computer Science or related field',
      'Strong problem-solving abilities',
      'Portfolio of personal projects'
    ],
    documents: [
      'Resume/CV with detailed technical experiences',
      'GitHub profile or code samples',
      'Academic transcripts'
    ]
  },
  {
    id: 3,
    title: 'Marketing Internship',
    company: 'Hyperlink InfoSystem',
    logo: 'public/lovable-uploads/60243461-7892-49c1-9653-985a6bab0c11.png',
    location: 'Kumasi, Ghana',
    skills: [
      'Social media management',
      'Content creation',
      'Basic graphic design'
    ],
    qualifications: [
      'Marketing, Communications, or related field',
      'Creative mindset',
      'Excellent writing skills'
    ],
    documents: [
      'Resume with relevant experiences',
      'Writing samples or portfolio',
      'Reference letters'
    ]
  },
  {
    id: 4,
    title: 'Data Analysis Internship',
    company: 'Friinixel',
    logo: 'public/lovable-uploads/c70abc2b-8621-4b67-a2b5-78765f73e318.png',
    location: 'Tema, Ghana',
    skills: [
      'SQL and database knowledge',
      'Excel or spreadsheet proficiency',
      'Data visualization skills'
    ],
    qualifications: [
      'Statistics, Economics, Computer Science, or related field',
      'Analytical thinking',
      'Attention to detail'
    ],
    documents: [
      'Resume highlighting analytical projects',
      'Academic transcripts',
      'Cover letter explaining interest in data science'
    ]
  }
];

const InternshipCard = ({ internship }: { internship: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
      }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="md:flex">
        <div className="md:w-1/3 bg-blue-50 p-6 flex items-center justify-center">
          <img 
            src={internship.logo} 
            alt={internship.company} 
            className="h-32 w-auto object-contain"
          />
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="uppercase tracking-wide text-sm text-workhive-blue font-semibold">
            {internship.title}
          </div>
          
          <div className="flex items-center mt-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Company Name: {internship.company}
            </h2>
          </div>
          
          <div className="flex items-center mt-2">
            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
            <p className="text-gray-600">Location: {internship.location}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">SKILLS REQUIRED</h3>
            <ul className="space-y-1">
              {internship.skills.map((skill: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 text-workhive-blue mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Qualifications</h3>
            <ul className="space-y-1">
              {internship.qualifications.map((qualification: string, index: number) => (
                <li key={index} className="text-gray-700">{qualification}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Documents Needed</h3>
            <ul className="space-y-1">
              {internship.documents.map((document: string, index: number) => (
                <li key={index} className="text-gray-700">{document}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <Link 
              to={`/application?id=${internship.id}`}
              className="inline-flex items-center btn-primary"
            >
              Apply Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InternshipListings = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center text-gray-800"
        >
          Available Internship Opportunities
        </motion.h1>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {internships.map(internship => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternshipListings;
