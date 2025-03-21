import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link } from "react-router-dom";
interface Position {
  id: number;
  name: string;
  location: string;
  positions: string[];
  logo: string;
}

interface Company {
  id: number;
  name: string;
  location: string;
  positions: string[];
  logo: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  companies: Company[];
}

const companyCategories = [
  {
    id: 'tech',
    name: 'Technology & IT',
    description: 'Discover the world of finance with internships in investment banking, financial analysis, and more.',
    companies: [
      {
        id: 1,
        name: 'Ghana Web Design Ltd',
        location: 'Accra, Ghana',
        positions: ['Frontend Developer', 'Graphic & Web Designer', 'UI/UX Designer'],
        logo: '/images/ghana web.png'
      },
      {
        id: 2,
        name: 'Hyperlink InfoSystem',
        location: 'Kumasi, Ghana',
        positions: ['Backend Developer', 'DevOps Engineer', 'QA Engineer'],
        logo: '/images/hyperlink.png'
      },
      {
        id: 3,
        name: 'Eragatek',
        location: 'Accra, Ghana',
        positions: ['Software Engineer', 'Mobile Developer', 'System Administrator'],
        logo: '/images/garris.png'
      },
      {
        id: 4,
        name: 'Friinixel',
        location: 'Tema, Ghana',
        positions: ['Frontend Developer', 'UI/UX Designer', 'Product Manager'],
        logo: '/images/finixel.png'
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medicine',
    description: 'Explore internships in technology, software development, and IT support.',
    companies: [
      {
        id: 5,
        name: 'BIMA Ghana',
        location: 'Accra, Ghana',
        positions: ['Medical Officer', 'Health Advisor', 'Medical Research'],
        logo: '/images/bima.png'
      },
      {
        id: 6,
        name: 'Komfo Anokye Teaching Hospital',
        location: 'Kumasi, Ghana',
        positions: ['Healthcare Assistant', 'Medical Research', 'Medical Advisor'],
        logo: '/images/kkomfo anokye.png'
      },
      {
        id: 7,
        name: 'Geno Lab',
        location: 'Accra, Ghana',
        positions: ['Lab Technician', 'Research Assistant', 'Medical Data Analyst'],
        logo: '/images/genelab.png'
      },
      {
        id: 8,
        name: 'Korle Bu Teaching Hospital',
        location: 'Accra, Ghana',
        positions: ['Healthcare Assistant', 'Medical Research', 'Medical Advisor'],
        logo: '/images/korle bu.png'
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    description: 'Find experience in banking with internships focused on customer service and financial advising.',
    companies: [
      {
        id: 9,
        name: 'United Bank for Africa',
        location: 'Accra, Ghana',
        positions: ['Accounting and Auditing', 'Banking Operations', 'Financial Analysis'],
        logo: '/images/uba.png'
      },
      {
        id: 10,
        name: 'Access Bank',
        location: 'Kumasi, Ghana',
        positions: ['Wealth Management', 'Customer Service', 'Financial Analyst'],
        logo: '/images/access.png'
      },
      {
        id: 11,
        name: 'Bank Of Ghana',
        location: 'Accra, Ghana',
        positions: ['Financial Regulation', 'Treasury', 'Policy Analysis'],
        logo: '/images/bank of ghana.png'
      },
      {
        id: 12,
        name: 'Dalex Finance',
        location: 'Accra, Ghana',
        positions: ['Investment Banking', 'Credit Analysis', 'Financial Research'],
        logo: '/images/dalex.png'
      }
    ]
  }
];

const CompanyCard = ({ company }: { company: Company }) => {
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
      className="workhive-card p-4"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Internship Offers</div>
          <div className="text-xs text-gray-500">{company.location}</div>
        </div>
        
        <div className="flex-grow flex items-center justify-center py-4">
          <div className="h-24 w-24 flex items-center justify-center overflow-hidden">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <ul className="text-xs text-gray-600 mb-4">
            {company.positions.map((position: string, index: number) => (
              <li key={index} className="mb-1">{position}</li>
            ))}
          </ul>
          <Link to="/application">
          <button className="btn-primary w-full py-2 text-sm">
            Apply Now
          </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ category }: { category: Category }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.1
          } 
        }
      }}
      className="mb-12"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h2>
        <p className="text-gray-600 mb-6">{category.description}</p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.companies.map((company: Company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </motion.section>
  );
};

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCategories = companyCategories.map(category => ({
    ...category,
    companies: category.companies.filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.positions.some(position => 
        position.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.companies.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search companies or job titles..."
              className="form-input pl-10 py-3 w-full shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <CategorySection key={category.id} category={category} />
          ))
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
