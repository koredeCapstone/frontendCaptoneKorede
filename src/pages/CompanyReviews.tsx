import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

interface CompanyReview {
  id: string;
  companyName: string;
  position: string;
  rating: number;
  review: string;
  pros: string[];
  cons: string[];
  date: string;
  helpful: number;
  salary: string;
  author: {
    name: string;
    university: string;
  };
}

const mockReviews: CompanyReview[] = [
  {
    id: "1",
    companyName: "Tech Corp",
    position: "Frontend Developer Intern",
    rating: 4.5,
    review: "Great learning experience with supportive mentors. The team was very welcoming and I got to work on real projects.",
    pros: ["Great mentorship", "Real project experience", "Good work-life balance"],
    cons: ["Limited remote work options", "Complex onboarding process"],
    date: "2024-03-01",
    helpful: 24,
    salary: "$25/hour",
    author: {
      name: "Alex M.",
      university: "Tech University",
    },
  },
  {
    id: "2",
    companyName: "Innovation Labs",
    position: "UX Design Intern",
    rating: 5,
    review: "Incredible internship program with focus on both personal and professional growth. Got to work with cutting-edge design tools.",
    pros: ["Modern tech stack", "Excellent culture", "Career growth opportunities"],
    cons: ["Fast-paced environment", "High expectations"],
    date: "2024-02-15",
    helpful: 18,
    salary: "$28/hour",
    author: {
      name: "Sarah K.",
      university: "Design Institute",
    },
  },
];

const CompanyReviews = () => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarFilledIcon key={i} className="w-5 h-5 text-yellow-400" />);
      } else if (i - rating < 1) {
        stars.push(<StarFilledIcon key={i} className="w-5 h-5 text-yellow-400 opacity-50" />);
      } else {
        stars.push(<StarIcon key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Reviews</h1>
          <Button>Write a Review</Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {mockReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{review.companyName}</h2>
                    <p className="text-gray-600">{review.position}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 mb-4">{review.review}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Pros</h3>
                      <div className="flex flex-wrap gap-2">
                        {review.pros.map((pro, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                            {pro}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Cons</h3>
                      <div className="flex flex-wrap gap-2">
                        {review.cons.map((con, index) => (
                          <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                            {con}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Salary: {review.salary}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                    <span>•</span>
                    <span>{review.helpful} found this helpful</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{review.author.name}</p>
                    <p className="text-gray-500">{review.author.university}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Helpful
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyReviews; 