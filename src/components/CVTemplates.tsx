import React from "react";
import { Card } from "@/components/ui/card";

interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website?: string;
    bio?: string;
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
    achievements?: string[];
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
  skills: {
    technical: string[];
    soft: string[];
    languages?: string[];
  };
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
}

// Modern Minimalist Template
export const MinimalistTemplate: React.FC<{ data: CVData }> = ({ data }) => (
  <div className="max-w-[800px] mx-auto bg-white p-8 shadow-lg">
    {/* Header */}
    <header className="text-center mb-8 border-b pb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
      <p className="text-lg text-gray-600 mb-4">{data.personalInfo.title}</p>
      <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
        <span>{data.personalInfo.email}</span>
        <span>•</span>
        <span>{data.personalInfo.phone}</span>
        <span>•</span>
        <span>{data.personalInfo.location}</span>
      </div>
      {data.personalInfo.bio && (
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">{data.personalInfo.bio}</p>
      )}
    </header>

    {/* Two Column Layout */}
    <div className="grid grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="col-span-1">
        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Technical</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.soft.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {data.skills.languages && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.languages.map((lang, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="font-medium text-gray-900">{edu.school}</h3>
              <p className="text-sm text-gray-600">{edu.degree} in {edu.field}</p>
              <p className="text-sm text-gray-500">
                {edu.startDate} - {edu.endDate}
              </p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>

        {/* Certifications */}
        {data.certifications && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-medium text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-gray-500">{cert.date}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Right Column */}
      <div className="col-span-2">
        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        {data.projects && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-6">
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm mt-1 inline-block hover:underline"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  </div>
);

// Creative Template
export const CreativeTemplate: React.FC<{ data: CVData }> = ({ data }) => (
  <div className="max-w-[800px] mx-auto bg-gradient-to-br from-indigo-50 to-white p-8 shadow-lg">
    {/* Header */}
    <header className="relative mb-12 pb-6">
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-100 rounded-full -z-10 opacity-50" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
      <p className="text-xl text-indigo-600 mb-4">{data.personalInfo.title}</p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {data.personalInfo.email}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {data.personalInfo.phone}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {data.personalInfo.location}
        </span>
      </div>
      {data.personalInfo.bio && (
        <p className="mt-6 text-gray-700 max-w-2xl leading-relaxed">{data.personalInfo.bio}</p>
      )}
    </header>

    {/* Main Content */}
    <div className="grid grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="col-span-4 space-y-8">
        {/* Skills */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-600 mb-4">Skills</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Technical</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.soft.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-600 mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <h3 className="font-medium text-gray-900">{edu.school}</h3>
              <p className="text-sm text-gray-600">{edu.degree} in {edu.field}</p>
              <p className="text-sm text-indigo-500">
                {edu.startDate} - {edu.endDate}
              </p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      </div>

      {/* Right Column */}
      <div className="col-span-8">
        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-indigo-600 mb-6">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-8 last:mb-0 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">{exp.position}</h3>
                  <p className="text-indigo-600">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                    <span className="text-indigo-500 mt-1">•</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        {data.projects && (
          <section>
            <h2 className="text-lg font-semibold text-indigo-600 mb-6">Projects</h2>
            <div className="grid grid-cols-1 gap-6">
              {data.projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-medium text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-sm inline-flex items-center gap-1 hover:text-indigo-700"
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);

// Professional Template
export const ProfessionalTemplate: React.FC<{ data: CVData }> = ({ data }) => (
  <div className="max-w-[800px] mx-auto bg-white p-8 shadow-lg">
    {/* Header */}
    <header className="border-b-2 border-gray-900 pb-6 mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
      <p className="text-xl text-gray-700 mb-4">{data.personalInfo.title}</p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-gray-600">{data.personalInfo.email}</p>
          <p className="text-gray-600">{data.personalInfo.phone}</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-gray-600">{data.personalInfo.location}</p>
          <a href={data.personalInfo.linkedin} className="text-blue-600 hover:underline">
            LinkedIn Profile
          </a>
        </div>
      </div>
    </header>

    {/* Summary */}
    {data.personalInfo.bio && (
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.personalInfo.bio}</p>
      </section>
    )}

    {/* Experience */}
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Professional Experience</h2>
      {data.experience.map((exp) => (
        <div key={exp.id} className="mb-6">
          <div className="grid grid-cols-[1fr,auto] gap-4 mb-2">
            <div>
              <h3 className="font-bold text-gray-900">{exp.position}</h3>
              <p className="text-gray-700">{exp.company}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">{exp.location}</p>
              <p className="text-gray-600">
                {exp.startDate} - {exp.endDate}
              </p>
            </div>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {exp.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    {/* Education */}
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>
      {data.education.map((edu) => (
        <div key={edu.id} className="mb-4">
          <div className="grid grid-cols-[1fr,auto] gap-4">
            <div>
              <h3 className="font-bold text-gray-900">{edu.school}</h3>
              <p className="text-gray-700">{edu.degree} in {edu.field}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                {edu.startDate} - {edu.endDate}
              </p>
              {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          </div>
        </div>
      ))}
    </section>

    {/* Skills */}
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.technical.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.soft.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Projects */}
    {data.projects && (
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notable Projects</h2>
        <div className="space-y-6">
          {data.projects.map((project) => (
            <div key={project.id}>
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <p className="text-gray-700 mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
); 