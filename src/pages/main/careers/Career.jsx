import React from "react";

import { useState } from "react";
import {
  Building2,
  Users2,
  Trophy,
  Briefcase,
  ArrowRight,
  MapPin,
} from "lucide-react";

const Career = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobOpenings = [
    {
      id: 1,
      title: "Real Estate Agent",
      location: "Dhaka, BD",
      type: "Full-time",
      experience: "2+ years",
      description:
        "We're looking for motivated real estate agents to join our growing team. You'll help clients find their dream homes while building your own successful career.",
    },
    {
      id: 2,
      title: "Property Manager",
      location: "Khulna, BD",
      type: "Full-time",
      experience: "3+ years",
      description:
        "Join us as a Property Manager to oversee residential properties, maintain client relationships, and ensure smooth operations.",
    },
    {
      id: 3,
      title: "Real Estate Marketing Specialist",
      location: "CTG, BD",
      type: "Full-time",
      experience: "2+ years",
      description:
        "Create compelling marketing strategies for our properties and enhance our brand presence across all channels.",
    },
  ];

  const benefits = [
    {
      title: "Competitive Commission",
      description: "Industry-leading commission splits and bonus structures",
      icon: Trophy,
    },
    {
      title: "Professional Development",
      description: "Continuous learning and certification support",
      icon: Users2,
    },
    {
      title: "Modern Tools & Resources",
      description: "Access to cutting-edge real estate technology and tools",
      icon: Building2,
    },
    {
      title: "Work Flexibility",
      description:
        "Balance your work and personal life with flexible schedules",
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Join Our Growing Team
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Build your career with one of the most trusted names in real
              estate. We are looking for talented individuals to help us shape
              the future of property.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <benefit.icon className="w-12 h-12 text-[#f1913d] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Openings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Current Openings
        </h2>
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {jobOpenings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex gap-4 flex-col justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="flex gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {job.type}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {job.experience}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="flex items-center text-white bg-[#e07d2d] rounded-lg p-2 border border-[#e07d2d] 
                  hover:text-[#e07d2d] font-bold hover:bg-white transition-colors"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application CTA */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Don't See the Right Fit?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team.
              Send us your resume and we'll keep you in mind for future
              opportunities.
            </p>
            <button className="bg-[#f1913d] text-white px-8 py-3 rounded-md font-medium hover:bg-[#e07d2d] transition-colors">
              Submit Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
