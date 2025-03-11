import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Skill {
  id: string;
  name: string;
  progress: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  badges: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  skills: string[];
  duration: string;
  progress: number;
}

const mockSkills: Skill[] = [
  {
    id: "1",
    name: "React.js",
    progress: 75,
    level: "Intermediate",
    badges: ["Component Master", "Hook Expert"],
  },
  {
    id: "2",
    name: "TypeScript",
    progress: 60,
    level: "Intermediate",
    badges: ["Type Warrior"],
  },
  {
    id: "3",
    name: "UI/UX Design",
    progress: 45,
    level: "Beginner",
    badges: ["Design Fundamentals"],
  },
];

const mockLearningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Frontend Development Path",
    description: "Master modern frontend development with React and TypeScript",
    skills: ["React.js", "TypeScript", "CSS", "Web Performance"],
    duration: "12 weeks",
    progress: 65,
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    description: "Learn essential UI/UX design principles and tools",
    skills: ["Figma", "User Research", "Design Systems"],
    duration: "8 weeks",
    progress: 30,
  },
];

const SkillsAssessment = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Skills & Learning</h1>

        {/* Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Your Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockSkills.map((skill) => (
              <Card key={skill.id} className="p-6 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <span className="inline-block px-2 py-1 text-sm rounded bg-blue-100 text-blue-800">
                      {skill.level}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Take Assessment
                  </Button>
                </div>
                <Progress value={skill.progress} className="mb-4" />
                <div className="flex flex-wrap gap-2">
                  {skill.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Learning Paths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Learning Paths</h2>
          <div className="space-y-6">
            {mockLearningPaths.map((path) => (
              <Card key={path.id} className="p-6 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{path.title}</h3>
                    <p className="text-gray-600 mb-2">{path.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Duration: {path.duration}</span>
                      <span>•</span>
                      <span>{path.skills.length} skills</span>
                    </div>
                  </div>
                  <Button>Continue Learning</Button>
                </div>
                <Progress value={path.progress} className="mb-2" />
                <p className="text-sm text-gray-600">{path.progress}% complete</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {path.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsAssessment; 