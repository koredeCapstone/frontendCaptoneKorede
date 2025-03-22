import React from 'react';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface Testimonial {
  id: number;
  name: string;
  time: string;
  photo: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mary Dede',
    time: '1 month ago',
    photo: '/images/testimonials/mary.png',
    text: 'The internship provided invaluable experience in the tech industry and boosted my confidence immensely.',
    rating: 5
  },
  {
    id: 2,
    name: 'Samuel Antwi',
    time: '3 months ago',
    photo: '/images/testimonials/p1.jpg',
    text: 'I gained hands-on skills that have been crucial in my career development. Highly recommend this program!',
    rating: 5
  },
  {
    id: 3,
    name: 'Adama Abdul-Samed',
    time: '2 weeks ago',
    photo: '/images/testimonials/p2.jpg',
    text: 'A fantastic opportunity to learn and grow. The mentorship was outstanding and insightful.',
    rating: 5
  },
  {
    id: 4,
    name: 'Taiwo Bodeeya',
    time: '5 weeks ago',
    photo: '/images/testimonials/p3.jpg',
    text: 'Challenging yet rewarding experience. It opened doors to numerous opportunities in my field.',
    rating: 5
  },
  {
    id: 5,
    name: 'Ishmeal Evonlah',
    time: '1 month ago',
    photo: '/images/testimonials/man.png',
    text: 'The supportive environment made it easy to thrive and learn. I acquired important industry connections.',
    rating: 5
  },
  {
    id: 6,
    name: 'Kezia Osei Sarpong',
    time: '2 months ago',
    photo: '/images/testimonials/g.png',
    text: 'A well-structured internship that enhanced my skills and provided practical insights into the industry.',
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
          <img 
            src={testimonial.photo} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-800">{testimonial.name}</h4>
          <p className="text-xs text-gray-500">{testimonial.time}</p>
        </div>
      </div>
      
      <div className="flex mb-2">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <p className="text-sm text-gray-700">{testimonial.text}</p>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">What Our Interns Say</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Featured Success Story */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden mb-16">
          <div className="flex flex-col">
            <div className="w-full h-[400px] relative">
              <img 
                className="w-full h-full object-cover" 
                src="/images/testimonials/tp.jpg" 
                alt="Featured intern" 
              />
            </div>
            <div className="p-8 text-center max-w-2xl mx-auto">
              <p className="text-gray-600 mb-4">
                Meet our remarkable intern, Kelsey Doe, who recently completed a transformative internship with our team. 
                Over the past few months, Kelsey has not only contributed significantly to our projects but has also gained 
                invaluable insights into the industry.
              </p>
              <p className="text-gray-600 mb-8">
                Throughout this internship, Kelsey has developed key skills in project management, teamwork, and design thinking. 
                We are thrilled to announce that she has accepted a full-time position with us as a Junior Designer starting next month.
              </p>
              <Link to="/application">
                <Button className="bg-blue-500 text-white hover:bg-blue-600 mb-4 w-full max-w-xs">
                  Apply Now
                </Button>
              </Link>
              <a href="#" className="text-blue-500 hover:text-blue-600 text-sm">
                Read More Success Stories
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter and Footer Section with Wave Background */}
        <div className="relative">
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

export default Testimonials;
