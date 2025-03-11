import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface DashboardStats {
  profileCompletion: number;
  applicationsSubmitted: number;
  savedInternships: number;
  upcomingDeadlines: Array<{
    company: string;
    position: string;
    deadline: string;
  }>;
  recommendedInternships: Array<{
    id: string;
    company: string;
    position: string;
    matchPercentage: number;
  }>;
}

// Mock data - Replace with actual API calls
const mockDashboardData: DashboardStats = {
  profileCompletion: 75,
  applicationsSubmitted: 5,
  savedInternships: 8,
  upcomingDeadlines: [
    {
      company: "Tech Corp",
      position: "Frontend Developer Intern",
      deadline: "2024-04-15",
    },
    {
      company: "Innovation Labs",
      position: "UX Design Intern",
      deadline: "2024-04-20",
    },
  ],
  recommendedInternships: [
    {
      id: "1",
      company: "Future Tech",
      position: "Software Engineering Intern",
      matchPercentage: 95,
    },
    {
      id: "2",
      company: "Design Studio",
      position: "UI/UX Design Intern",
      matchPercentage: 88,
    },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState<DashboardStats>(mockDashboardData);
  const [user, setUser] = React.useState<{ fullName: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (!parsedUser.isLoggedIn) {
        navigate('/login');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.fullName}!</h1>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
              <Progress value={stats.profileCompletion} className="mb-2" />
              <p className="text-sm text-gray-600">{stats.profileCompletion}% complete</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Applications</h3>
              <p className="text-3xl font-bold text-workhive-blue">{stats.applicationsSubmitted}</p>
              <p className="text-sm text-gray-600">Submitted applications</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Saved</h3>
              <p className="text-3xl font-bold text-workhive-blue">{stats.savedInternships}</p>
              <p className="text-sm text-gray-600">Saved internships</p>
            </Card>
          </motion.div>
        </div>

        {/* Recommended Internships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.recommendedInternships.map((internship) => (
              <Card key={internship.id} className="p-6 bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{internship.position}</h3>
                    <p className="text-gray-600">{internship.company}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {internship.matchPercentage}% Match
                  </span>
                </div>
                <div className="mt-4">
                  <Button className="w-full">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {stats.upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{deadline.position}</h3>
                      <p className="text-gray-600">{deadline.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-medium text-red-600">{deadline.deadline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard; 