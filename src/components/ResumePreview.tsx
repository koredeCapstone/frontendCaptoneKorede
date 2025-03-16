import React from 'react';
import { MinimalistTemplate, CreativeTemplate, ProfessionalTemplate } from './CVTemplates';

interface ResumePreviewProps {
  template: string;
  type: "resume" | "cv";
  data: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      linkedin: string;
      researchGate?: string;
      googleScholar?: string;
      researchInterests?: string;
    };
    education: Array<{
      id: string;
      school: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      gpa: string;
    }>;
    experience: Array<{
      id: string;
      company: string;
      position: string;
      location: string;
      startDate: string;
      endDate: string;
      description: string[];
    }>;
    projects: Array<{
      id: string;
      name: string;
      description: string;
      technologies: string[];
      link: string;
    }>;
    skills: string[];
    publications?: string;
  };
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ template, type, data }) => {
  // Transform the data to match CVData interface
  const transformedData = {
    personalInfo: {
      ...data.personalInfo,
      title: data.experience[0]?.position || "Professional",
      bio: data.personalInfo.researchInterests || "",
      website: ""
    },
    education: data.education,
    experience: data.experience,
    skills: {
      technical: data.skills.filter((_, i) => i % 2 === 0), // Split skills into technical and soft
      soft: data.skills.filter((_, i) => i % 2 === 1),
    },
    projects: data.projects,
    certifications: []
  };

  // Select template component based on template ID
  const TemplateComponent = 
    template === 'minimalist' ? MinimalistTemplate :
    template === 'creative' ? CreativeTemplate :
    template === 'professional' ? ProfessionalTemplate :
    MinimalistTemplate; // Default to minimalist if template not found

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <TemplateComponent data={transformedData} />
    </div>
  );
};

export default ResumePreview; 