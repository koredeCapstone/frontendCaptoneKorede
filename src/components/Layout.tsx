import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname === path;
  };

  const getLinkClasses = (path: string) => {
    return `relative text-gray-700 hover:text-blue-600 transition-colors py-2 ${
      isActive(path) ? 'text-blue-600' : ''
    } ${
      isActive(path) ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' : ''
    }`;
  };

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
                className={getLinkClasses('/')}
              >
                Home
              </Link>
              <Link
                to="/internships"
                className={getLinkClasses('/internships')}
              >
                Internships
              </Link>
              <Link
                to="/companies"
                className={getLinkClasses('/companies')}
              >
                Companies
              </Link>
              <Link
                to="/testimonials"
                className={getLinkClasses('/testimonials')}
              >
                Testimonials
              </Link>
              <Link
                to="/application"
                className={getLinkClasses('/application')}
              >
                Apply Now
              </Link>
              <Link
                to="/post-internship"
                className={getLinkClasses('/post-internship')}
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
