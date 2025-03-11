
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    firstName: '',
    surname: '',
    otherName: '',
    email: '',
    phone: '',
    degree: '',
    country: '',
    region: '',
    city: '',
    resume: null,
    transcript: null,
    internshipLetter: null
  });
  
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [transcriptUploaded, setTranscriptUploaded] = useState(false);
  const [letterUploaded, setLetterUploaded] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 30 * 1024 * 1024) { // 30MB in bytes
        toast({
          title: "File too large",
          description: "Maximum file size is 30MB",
          variant: "destructive"
        });
        return;
      }
      
      setFormState(prev => ({ ...prev, [fileType]: file }));
      
      switch (fileType) {
        case 'resume':
          setResumeUploaded(true);
          break;
        case 'transcript':
          setTranscriptUploaded(true);
          break;
        case 'internshipLetter':
          setLetterUploaded(true);
          break;
      }
      
      toast({
        title: "File uploaded",
        description: "Your file has been successfully uploaded",
        variant: "default"
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formState.firstName || 
      !formState.surname || 
      !formState.email || 
      !formState.phone ||
      !formState.country ||
      !formState.region ||
      !formState.city ||
      !resumeUploaded
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically send the form data to your backend
    console.log(formState);
    
    // Show success message
    toast({
      title: "Application submitted",
      description: "Your application has been successfully submitted",
      variant: "default"
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-5xl"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bold mb-8 text-center text-gray-800"
        >
          Internship Application
        </motion.h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-semibold mb-4 border-b pb-2"
            >
              Name
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  placeholder="First Name"
                  value={formState.firstName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  className="form-input"
                  placeholder="Surname"
                  value={formState.surname}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="otherName" className="block text-sm font-medium text-gray-700 mb-1">
                  Other name
                </label>
                <input
                  type="text"
                  id="otherName"
                  name="otherName"
                  className="form-input"
                  placeholder="Other name"
                  value={formState.otherName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="Phone Number"
                value={formState.phone}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                className="form-input"
                placeholder="Degree"
                value={formState.degree}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Residence */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl font-semibold mb-4 border-b pb-2"
            >
              Residence
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-input"
                  placeholder="Country"
                  value={formState.country}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Region/state
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  className="form-input"
                  placeholder="Region/state"
                  value={formState.region}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City/Town
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-input"
                  placeholder="City/Town"
                  value={formState.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          {/* Attachments */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Attach a resume in Word or PDF format(max file size 30MB)
              </p>
              <div className="flex items-center">
                <label htmlFor="resume" className={`flex items-center gap-2 px-4 py-2 bg-${resumeUploaded ? 'green-500' : 'workhive-blue'} text-white rounded-md cursor-pointer hover:bg-${resumeUploaded ? 'green-600' : 'blue-600'} transition-all duration-200`}>
                  {resumeUploaded ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Resume Uploaded</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Upload Resume</span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".doc,.docx,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'resume')}
                />
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Attach a transcript (max file size 30MB)
              </p>
              <div className="flex items-center">
                <label htmlFor="transcript" className={`flex items-center gap-2 px-4 py-2 bg-${transcriptUploaded ? 'green-500' : 'workhive-blue'} text-white rounded-md cursor-pointer hover:bg-${transcriptUploaded ? 'green-600' : 'blue-600'} transition-all duration-200`}>
                  {transcriptUploaded ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Transcript Uploaded</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Upload Transcript</span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="transcript"
                  name="transcript"
                  accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'transcript')}
                />
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Attach an internship letter (max file size 30MB)
              </p>
              <div className="flex items-center">
                <label htmlFor="internshipLetter" className={`flex items-center gap-2 px-4 py-2 bg-${letterUploaded ? 'green-500' : 'workhive-blue'} text-white rounded-md cursor-pointer hover:bg-${letterUploaded ? 'green-600' : 'blue-600'} transition-all duration-200`}>
                  {letterUploaded ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Letter Uploaded</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Upload Internship Letter</span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="internshipLetter"
                  name="internshipLetter"
                  accept=".doc,.docx,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'internshipLetter')}
                />
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-workhive-blue text-white py-3 px-6 rounded-md font-medium hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md hover:shadow-lg"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ApplicationForm;
