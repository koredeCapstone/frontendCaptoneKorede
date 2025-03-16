import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-workhive-blue">
              WorkHive
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/internships"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Internships
              </Link>
              <Link
                to="/companies"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Companies
              </Link>
              <Link
                to="/testimonials"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                to="/apply"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                to="/post-internship"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Post Internship
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
