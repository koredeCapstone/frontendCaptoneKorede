import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Application = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    firstName: "",
    surname: "",
    otherName: "",
    email: "",
    phone: "",
    degree: "",
    country: "",
    region: "",
    city: "",
    resume: null as File | null,
    transcript: null as File | null,
    internshipLetter: null as File | null,
  });

  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [transcriptUploaded, setTranscriptUploaded] = useState(false);
  const [letterUploaded, setLetterUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 30 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 30MB",
          variant: "destructive",
        });
        return;
      }

      setFormState((prev) => ({ ...prev, [fileType]: file }));

      switch (fileType) {
        case "resume":
          setResumeUploaded(true);
          break;
        case "transcript":
          setTranscriptUploaded(true);
          break;
        case "internshipLetter":
          setLetterUploaded(true);
          break;
      }

      toast({
        title: "File uploaded",
        description: "Your file has been successfully uploaded",
        variant: "default",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      !resumeUploaded ||
      !transcriptUploaded ||
      !letterUploaded
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload all required files",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("firstName", formState.firstName);
      formData.append("surname", formState.surname);
      formData.append("otherName", formState.otherName);
      formData.append("email", formState.email);
      formData.append("phoneNumber", formState.phone);
      formData.append("degree", formState.degree);
      formData.append("country", formState.country);
      formData.append("region", formState.region);
      formData.append("city", formState.city);

      if (formState.resume) {
        formData.append("resume", formState.resume);
      }
      if (formState.transcript) {
        formData.append("transcript", formState.transcript);
      }
      if (formState.internshipLetter) {
        formData.append("internshipLetter", formState.internshipLetter);
      }

      const response = await fetch("http://localhost:3000/api/upload/upload-internship", {
        method: "POST",
        body: formData,
        credentials: "include", // Still include credentials in case the user is logged in
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok && data.success) {
        toast({
          title: "Application submitted",
          description: data.message || "Your application has been successfully submitted",
          variant: "default",
        });

        setFormState({
          firstName: "",
          surname: "",
          otherName: "",
          email: "",
          phone: "",
          degree: "",
          country: "",
          region: "",
          city: "",
          resume: null,
          transcript: null,
          internshipLetter: null,
        });
        setResumeUploaded(false);
        setTranscriptUploaded(false);
        setLetterUploaded(false);
      } else {
        if (data.message.includes("An application with this email has already been submitted")) {
          toast({
            title: "Submission error",
            description: "An application with this email has already been submitted.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Submission failed",
            description: data.message || "Failed to submit your application",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              Personal Information
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                  Surname *
                </label>
                <Input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Surname"
                  value={formState.surname}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="otherName" className="block text-sm font-medium text-gray-700 mb-1">
                  Other Name
                </label>
                <Input
                  type="text"
                  id="otherName"
                  name="otherName"
                  placeholder="Other Name (Optional)"
                  value={formState.otherName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl font-semibold mb-4 border-b pb-2"
            >
              Contact Information
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                  Degree *
                </label>
                <Input
                  type="text"
                  id="degree"
                  name="degree"
                  placeholder="Degree"
                  value={formState.degree}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={formState.country}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Region *
                </label>
                <Input
                  type="text"
                  id="region"
                  name="region"
                  placeholder="Region"
                  value={formState.region}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formState.city}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl font-semibold mb-4 border-b pb-2"
            >
              Documents
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "resume")}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="resume"
                    className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                      ${resumeUploaded ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"} ${
                      isSubmitting ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {resumeUploaded ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">
                      {resumeUploaded ? "Resume Uploaded" : "Upload Resume"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Transcript Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Transcript *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="transcript"
                    name="transcript"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "transcript")}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="transcript"
                    className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                      ${transcriptUploaded ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"} ${
                      isSubmitting ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {transcriptUploaded ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">
                      {transcriptUploaded ? "Transcript Uploaded" : "Upload Transcript"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Internship Letter Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internship Letter *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="internshipLetter"
                    name="internshipLetter"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "internshipLetter")}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="internshipLetter"
                    className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                      ${letterUploaded ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"} ${
                      isSubmitting ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {letterUploaded ? (
                      <Check className="w-6 h-6 text-green-500" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">
                      {letterUploaded ? "Letter Uploaded" : "Upload Letter"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" className="px-8" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Application;