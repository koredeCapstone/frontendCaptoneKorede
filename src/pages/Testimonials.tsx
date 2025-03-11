
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: 'Mary Dede',
    time: '1 month ago',
    photo: 'public/lovable-uploads/d16ade33-6220-4c7a-98b1-cb25428ba07f.png',
    text: 'The internship provided invaluable experience in the tech industry and boosted my confidence immensely.',
    rating: 5
  },
  {
    id: 2,
    name: 'Samuel Antwi',
    time: '3 months ago',
    photo: 'public/lovable-uploads/e9c1987b-7d6d-4b15-80a7-66165cbf2ce6.png',
    text: 'I gained hands-on skills that have been crucial in my career development. Highly recommend this program!',
    rating: 5
  },
  {
    id: 3,
    name: 'Adama Abdul-Samed',
    time: '2 weeks ago',
    photo: 'public/lovable-uploads/f36fc91b-16b9-4cdb-aae5-fa4d947ef43b.png',
    text: 'A fantastic opportunity to learn and grow. The mentorship was outstanding and insightful.',
    rating: 5
  },
  {
    id: 4,
    name: 'Taiwo Bodeeya',
    time: '5 weeks ago',
    photo: 'public/lovable-uploads/c70abc2b-8621-4b67-a2b5-78765f73e318.png',
    text: 'Challenging yet rewarding experience. It opened doors to numerous opportunities in my field.',
    rating: 5
  },
  {
    id: 5,
    name: 'Ishmeal Evonlah',
    time: '1 month ago',
    photo: 'public/lovable-uploads/bdc031ad-9542-45b3-b175-4fa8f80a47e5.png',
    text: 'The supportive environment made it easy to thrive and learn. I acquired important industry connections.',
    rating: 5
  },
  {
    id: 6,
    name: 'Kezia Osei Sarpong',
    time: '2 months ago',
    photo: 'public/lovable-uploads/c70abc2b-8621-4b67-a2b5-78765f73e318.png',
    text: 'A well-structured internship that enhanced my skills and provided practical insights into the industry.',
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="testimonial-card"
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img 
            src={testimonial.photo} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
          <p className="text-xs text-gray-500">{testimonial.time}</p>
        </div>
      </div>
      
      <div className="flex mb-2">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <p className="text-gray-700 text-sm">{testimonial.text}</p>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center text-gray-800"
        >
          Success Stories from Our Interns
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3">
              <img 
                className="h-full w-full object-cover md:w-full" 
                src="public/lovable-uploads/f40994f2-ec42-4297-91a5-4d1bb6009195.png" 
                alt="Featured intern" 
              />
            </div>
            <div className="p-8 md:w-2/3">
              <div className="text-center">
                <p className="mt-2 text-gray-600">
                  Meet our remarkable intern, John Doe, who recently completed a transformative internship with our team. 
                  Over the past few months, John has not only contributed significantly to our projects but has also gained 
                  invaluable insights into the industry.
                </p>
                <p className="mt-4 text-gray-600">
                  Throughout this internship, John has developed key skills in project management, teamwork, and design thinking. 
                  We are thrilled to announce that he has accepted a full-time position with us as a Junior Designer starting next month.
                </p>
                <div className="mt-6">
                  <Link 
                    to="/application" 
                    className="inline-flex items-center btn-primary"
                  >
                    Apply Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-4">
                  <Link 
                    to="/internships" 
                    className="text-workhive-blue hover:text-blue-700 inline-flex items-center text-sm"
                  >
                    Read More Success Stories
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
