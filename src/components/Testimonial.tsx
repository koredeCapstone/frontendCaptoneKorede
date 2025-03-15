import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Kwame Mensah",
    role: "Software Engineer",
    company: "Ghana Web Design Ltd",
    image: "/images/testimonials/kwame.jpg",
    testimonial: "WorkHive helped me land my dream internship at a top tech company. The platform's user-friendly interface and extensive company listings made my job search incredibly efficient."
  },
  {
    name: "Abena Osei",
    role: "Medical Intern",
    company: "Korle Bu Teaching Hospital",
    image: "/images/testimonials/abena.jpg",
    testimonial: "As a medical student, finding the right internship was crucial. WorkHive connected me with leading healthcare institutions and made the application process seamless."
  },
  {
    name: "Kofi Addo",
    role: "Financial Analyst",
    company: "Bank of Ghana",
    image: "/images/testimonials/kofi.jpg",
    testimonial: "The quality of opportunities on WorkHive is outstanding. I found my current position through the platform, and it has been a perfect match for my career goals."
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
          <p className="text-sm text-gray-500">{testimonial.company}</p>
        </div>
      </div>
      <div className="relative">
        <svg
          className="absolute left-0 top-0 transform -translate-x-3 -translate-y-3 h-8 w-8 text-gray-200"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="relative text-gray-600 italic pl-6">{testimonial.testimonial}</p>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from students and recent graduates who found their perfect internship opportunities through WorkHive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 