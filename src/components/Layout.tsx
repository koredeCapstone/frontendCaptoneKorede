
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-workhive-blue rounded-sm transform rotate-45 translate-x-[2px] translate-y-[2px]"></div>
                  <div className="absolute inset-0 bg-blue-400 rounded-sm transform rotate-45 -translate-x-[2px] -translate-y-[2px]"></div>
                  <div className="absolute inset-0 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="text-xl font-bold text-gray-900">WorkHive</span>
              </Link>
            </motion.div>
            
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex space-x-8"
            >
              <Link to="/" className={isActive('/') ? 'nav-link-active' : 'nav-link'}>
                Home
              </Link>
              <Link to="/internships" className={isActive('/internships') ? 'nav-link-active' : 'nav-link'}>
                Internship Listings
              </Link>
              <Link to="/companies" className={isActive('/companies') ? 'nav-link-active' : 'nav-link'}>
                Companies
              </Link>
              <Link to="/application" className={isActive('/application') ? 'nav-link-active' : 'nav-link'}>
                Application Screen
              </Link>
              <Link to="/testimonials" className={isActive('/testimonials') ? 'nav-link-active' : 'nav-link'}>
                Testimonial Screen
              </Link>
            </motion.nav>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-workhive-blue transition-colors duration-200 flex items-center"
              >
                <span className="hidden sm:inline-block">Sign In</span>
              </Link>
              <Link 
                to="/signup" 
                className="bg-workhive-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
              >
                <span>Sign Up</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>
      
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="text-xl font-bold text-white">WorkHive</span>
              </div>
              <div className="mt-4 flex space-x-4">
                <a href="#" aria-label="Twitter">
                  <svg className="h-6 w-6 text-blue-300 hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg className="h-6 w-6 text-blue-300 hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg className="h-6 w-6 text-blue-300 hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg className="h-6 w-6 text-blue-300 hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <h3 className="text-blue-300 font-semibold">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Features</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">How it works</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">For students</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">For companies</a></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-blue-300 font-semibold">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Blog</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Guides</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Events</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">FAQ</a></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-blue-300 font-semibold">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">About us</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Partners</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Contact</a></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-blue-300 font-semibold">Plans & Pricing</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">For individuals</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">For startups</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">For enterprises</a></li>
                  <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Compare plans</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <select className="bg-blue-800 text-sm text-white py-1 px-3 rounded border border-blue-700 focus:outline-none">
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-300">
              <span>© 2024 Brand, Inc.</span>
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Sitemap</a>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <span className="text-sm text-gray-300">Subscribe to our newsletter</span>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full sm:w-64 px-4 py-2 rounded-l-md focus:outline-none bg-blue-800 border border-blue-700 text-white"
                />
                <button className="bg-workhive-blue hover:bg-blue-500 text-white px-4 py-2 rounded-r-md transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
