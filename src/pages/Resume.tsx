import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, TrashIcon, CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import ResumePreview from "@/components/ResumePreview";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MinimalistTemplate, CreativeTemplate, ProfessionalTemplate } from '@/components/CVTemplates';

interface CVData {
  personalInfo: {
    fullName: string;
    title?: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    bio?: string;
  };
  education: Education[];
  experience: Experience[];
  skills: {
    technical: string[];
    soft: string[];
    languages?: string[];
  };
  projects: Project[];
  publications?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  type: "resume" | "cv";
  component?: React.ComponentType<{ data: CVData }>;
}

const templates: Template[] = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and minimal design with a focus on readability",
    image: "images/templates/minimalist.jpg",
    type: "resume",
    component: MinimalistTemplate as React.ComponentType<{ data: CVData }>
  },
  {
    id: "creative",
    name: "Creative",
    description: "Modern and eye-catching design for creative professionals",
    image: "images/templates/creative.jpg",
    type: "resume",
    component: CreativeTemplate as React.ComponentType<{ data: CVData }>
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional and formal design for corporate settings",
    image: "images/templates/prof.jpg",
    type: "resume",
    component: ProfessionalTemplate as React.ComponentType<{ data: CVData }>
  },
  {
    id: "cv-minimalist",
    name: "Minimalist CV",
    description: "Clean and minimal design with a focus on readability",
    image: "images/templates/cv.jpg",
    type: "cv",
    component: MinimalistTemplate as React.ComponentType<{ data: CVData }>
  },
  {
    id: "cv-creative",
    name: "Creative CV",
    description: "Modern and eye-catching design for creative professionals",
    image: "images/templates/creative.jpg",
    type: "cv",
    component: CreativeTemplate as React.ComponentType<{ data: CVData }>
  },
  {
    id: "cv-professional",
    name: "Professional CV",
    description: "Traditional and formal design for corporate settings",
    image: "images/templates/prof.jpg",
    type: "cv",
    component: ProfessionalTemplate as React.ComponentType<{ data: CVData }>
  }
];

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

// Sample data for preview
const sampleData: CVData = {
  personalInfo: {
    fullName: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development, specializing in React and Node.js. Committed to writing clean, maintainable code and building scalable applications."
  },
  education: [
    {
      id: "1",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015",
      endDate: "2019",
      gpa: "3.8"
    }
  ],
  experience: [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020",
      endDate: "Present",
      description: [
        "Led a team of 5 developers in building a microservices-based e-commerce platform",
        "Reduced API response time by 40% through implementation of Redis caching",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      id: "2",
      company: "StartUp Co.",
      position: "Software Engineer",
      location: "San Francisco, CA",
      startDate: "2019",
      endDate: "2020",
      description: [
        "Developed and maintained React-based front-end applications",
        "Implemented CI/CD pipeline using GitHub Actions",
        "Collaborated with UX team to improve user experience"
      ]
    }
  ],
  skills: {
    technical: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "GraphQL"],
    soft: ["Leadership", "Problem Solving", "Communication", "Team Collaboration"],
    languages: ["English (Native)", "Spanish (Intermediate)"]
  },
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB",
      technologies: ["React", "Node.js", "MongoDB", "Redux"],
      link: "https://github.com/alexj/ecommerce"
    }
  ]
};

const Resume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"resume" | "cv">("resume");
  const [showForm, setShowForm] = useState(false);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    researchGate: "",
    googleScholar: "",
    researchInterests: "",
  });
  const [publications, setPublications] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    setEducation([...education, newEducation]);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: [""],
    };
    setExperience([...experience, newExperience]);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
    };
    setProjects([...projects, newProject]);
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${personalInfo.fullName.replace(/\s+/g, '_')}_${activeTab}.pdf`);
  };

  const filteredTemplates = templates.filter(template => template.type === activeTab);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowForm(true);
  };

  const handleBack = () => {
    setShowPreview(false);
    setSelectedTemplate(null);
  };

  if (showPreview && selectedTemplate) {
    const SelectedTemplate = templates.find(t => t.id === selectedTemplate)?.component;
    if (!SelectedTemplate) return null;

    const templateData = {
      ...sampleData,
      projects: sampleData.projects.map(p => ({
        ...p,
        link: p.link || ''
      }))
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Button
            onClick={handleBack}
            className="mb-8"
            variant="outline"
          >
            ← Back to Templates
          </Button>
          <SelectedTemplate data={templateData} />
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={() => {
              setShowForm(false);
              setSelectedTemplate(null);
            }}
            className="mb-6"
            variant="outline"
          >
            ← Back to Templates
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Template Preview Side */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Template Preview</h2>
              <div className="aspect-w-4 aspect-h-5 mb-4">
                {selectedTemplate && (
                  <ResumePreview
                    template={selectedTemplate}
                    type={activeTab}
                    data={{
                      personalInfo,
                      education,
                      experience,
                      skills: skills,
                      projects: projects.map(p => ({
                        id: p.id,
                        name: p.name,
                        description: p.description,
                        technologies: p.technologies,
                        link: p.link || ''
                      })) as { id: string; name: string; description: string; technologies: string[]; link: string }[],
                      publications
                    }}
                  />
                )}
              </div>
              <Button 
                onClick={() => setShowPreview(true)} 
                className="w-full mt-4"
              >
                View Full Preview
              </Button>
            </div>

            {/* Form Side */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Information</h2>
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="fullName"
                      placeholder="Full Name"
                      value={personalInfo.fullName}
                      onChange={handlePersonalInfoChange}
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                    />
                    <Input
                      name="phone"
                      placeholder="Phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                    />
                    <Input
                      name="location"
                      placeholder="Location"
                      value={personalInfo.location}
                      onChange={handlePersonalInfoChange}
                    />
                    <Input
                      name="linkedin"
                      placeholder="LinkedIn URL"
                      value={personalInfo.linkedin}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                </div>

                {/* Education Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                    <Button onClick={addEducation} size="sm">
                      <PlusIcon className="h-4 w-4 mr-1" /> Add Education
                    </Button>
                  </div>
                  {education.map((edu, index) => (
                    <div key={edu.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="School"
                          value={edu.school}
                          onChange={(e) => {
                            const newEducation = [...education];
                            newEducation[index].school = e.target.value;
                            setEducation(newEducation);
                          }}
                        />
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEducation = [...education];
                            newEducation[index].degree = e.target.value;
                            setEducation(newEducation);
                          }}
                        />
                        <Input
                          placeholder="Field of Study"
                          value={edu.field}
                          onChange={(e) => {
                            const newEducation = [...education];
                            newEducation[index].field = e.target.value;
                            setEducation(newEducation);
                          }}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Start Date"
                            value={edu.startDate}
                            onChange={(e) => {
                              const newEducation = [...education];
                              newEducation[index].startDate = e.target.value;
                              setEducation(newEducation);
                            }}
                          />
                          <Input
                            placeholder="End Date"
                            value={edu.endDate}
                            onChange={(e) => {
                              const newEducation = [...education];
                              newEducation[index].endDate = e.target.value;
                              setEducation(newEducation);
                            }}
                          />
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setEducation(education.filter((_, i) => i !== index));
                        }}
                      >
                        <TrashIcon className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Experience Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
                    <Button onClick={addExperience} size="sm">
                      <PlusIcon className="h-4 w-4 mr-1" /> Add Experience
                    </Button>
                  </div>
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const newExperience = [...experience];
                            newExperience[index].company = e.target.value;
                            setExperience(newExperience);
                          }}
                        />
                        <Input
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => {
                            const newExperience = [...experience];
                            newExperience[index].position = e.target.value;
                            setExperience(newExperience);
                          }}
                        />
                        <Input
                          placeholder="Location"
                          value={exp.location}
                          onChange={(e) => {
                            const newExperience = [...experience];
                            newExperience[index].location = e.target.value;
                            setExperience(newExperience);
                          }}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) => {
                              const newExperience = [...experience];
                              newExperience[index].startDate = e.target.value;
                              setExperience(newExperience);
                            }}
                          />
                          <Input
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) => {
                              const newExperience = [...experience];
                              newExperience[index].endDate = e.target.value;
                              setExperience(newExperience);
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Textarea
                            placeholder="Description (use bullet points)"
                            value={exp.description.join('\n')}
                            onChange={(e) => {
                              const newExperience = [...experience];
                              newExperience[index].description = e.target.value.split('\n');
                              setExperience(newExperience);
                            }}
                            rows={4}
                          />
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setExperience(experience.filter((_, i) => i !== index));
                        }}
                      >
                        <TrashIcon className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Skills Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSkill(e);
                        }
                      }}
                    />
                    <Button onClick={addSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => {
                            setSkills(skills.filter((_, i) => i !== index));
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
                    <Button onClick={addProject} size="sm">
                      <PlusIcon className="h-4 w-4 mr-1" /> Add Project
                    </Button>
                  </div>
                  {projects.map((project, index) => (
                    <div key={project.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 gap-4">
                        <Input
                          placeholder="Project Name"
                          value={project.name}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].name = e.target.value;
                            setProjects(newProjects);
                          }}
                        />
                        <Textarea
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].description = e.target.value;
                            setProjects(newProjects);
                          }}
                        />
                        <Input
                          placeholder="Technologies (comma-separated)"
                          value={project.technologies.join(', ')}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].technologies = e.target.value.split(',').map(t => t.trim());
                            setProjects(newProjects);
                          }}
                        />
                        <Input
                          placeholder="Project Link"
                          value={project.link || ''}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].link = e.target.value || undefined;
                            setProjects(newProjects);
                          }}
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setProjects(projects.filter((_, i) => i !== index));
                        }}
                      >
                        <TrashIcon className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h1>
            <p className="text-lg text-gray-600">Select a professional template to get started</p>
          </div>

          {/* Template Type Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
              <button
                onClick={() => setActiveTab("resume")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "resume"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Resume Templates
              </button>
              <button
                onClick={() => setActiveTab("cv")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "cv"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                CV Templates
              </button>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                <Card className="overflow-hidden">
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        setShowForm(true);
                      }}
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Use Template
                    </Button>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Preview</h1>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Edit
              </Button>
              <Button onClick={handleDownloadPDF}>
                Download PDF
              </Button>
            </div>
          </div>

          <div ref={previewRef}>
            <ResumePreview
              template={selectedTemplate || "modern-resume"}
              type={activeTab}
              data={{
                personalInfo,
                education,
                experience,
                projects,
                skills,
                publications,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your CV Template</h1>
          <p className="text-gray-600 mb-8">
            Select a template that best represents your professional style
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="aspect-w-4 aspect-h-3 mb-4">
                  <div className={`w-full h-full bg-gradient-to-br ${
                    template.id === 'minimalist' ? 'from-gray-100 to-gray-200' :
                    template.id === 'creative' ? 'from-indigo-100 to-purple-100' :
                    'from-blue-100 to-gray-100'
                  } rounded-lg`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {template.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tips for a Great CV
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Keep it concise and relevant to the position
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Use action verbs to describe your achievements
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Quantify your accomplishments with numbers when possible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Proofread carefully for grammar and spelling
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Customize your CV for each job application
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume; 