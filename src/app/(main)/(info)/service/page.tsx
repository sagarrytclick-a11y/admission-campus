"use client";
import React from 'react';
import { GraduationCap, FileText, DollarSign, BookOpen, TrendingUp, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FAQ from "@/app/Components/FAQ";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
            Admission Guidance
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Your Complete Indian
            <span className="block text-blue-600">Admission Solution</span>
          </h1>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
            From college selection to entrance exam preparation, counseling to admission guidance - 
            we handle every aspect of your Indian education journey with expertise and care.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            <span>95% Success Rate</span>
            <span>500+ Indian Colleges</span>
            <span>25+ States</span>
            <span>10k+ Students</span>
          </div>
        </div>
      </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Services
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Expert support for every step of your Indian college admission journey
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* University Admissions */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <GraduationCap size={24} className="text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  College Admissions
                </h3>
                <p className="text-slate-600 mb-4">
                  Strategic guidance for top Indian colleges. We match your profile with perfect institutions.
                </p>
                <a href="#" className="text-blue-600 font-medium flex items-center gap-1">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>

              {/* Visa Assistance */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <FileText size={24} className="text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Entrance Exam Prep
                </h3>
                <p className="text-slate-600 mb-4">
                  Expert preparation for JEE, NEET, CAT, and other Indian entrance exams with 95% success rate.
                </p>
                <a href="#" className="text-blue-600 font-medium flex items-center gap-1">
                  Get Started <ArrowRight size={16} />
                </a>
              </div>

              {/* Accommodation */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Home size={24} className="text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Hostel & Accommodation
                </h3>
                <p className="text-slate-600 mb-4">
                  Pre-arranged housing solutions in verified locations near your college campus.
                </p>
                <a href="#" className="text-blue-600 font-medium flex items-center gap-1">
                  Find Housing <ArrowRight size={16} />
                </a>
              </div>

              {/* Scholarships */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <DollarSign size={24} className="text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Scholarships & Aid
                </h3>
                <p className="text-slate-600 mb-4">
                  Access to exclusive scholarships and financial aid opportunities worth crores.
                </p>
                <a href="#" className="text-blue-600 font-medium flex items-center gap-1">
                  Explore Funds <ArrowRight size={16} />
                </a>
              </div>

              {/* Test Prep */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-pink-300 transition-colors">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen size={24} className="text-pink-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Test Preparation
                </h3>
                <p className="text-slate-600 mb-4">
                  Comprehensive preparation for JEE Main, JEE Advanced, NEET, CAT, and other entrance exams.
                </p>
                <a href="#" className="text-pink-600 font-medium flex items-center gap-1">
                  Start Learning <ArrowRight size={16} />
                </a>
              </div>

              {/* Career Counseling */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-cyan-300 transition-colors">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp size={24} className="text-cyan-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Career Counseling
                </h3>
                <p className="text-slate-600 mb-4">
                  Personalized career guidance and roadmap creation for your success in Indian industries.
                </p>
                <a href="#" className="text-cyan-600 font-medium flex items-center gap-1">
                  Get Advice <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Proven Results
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our track record speaks for itself. Join thousands of successful students.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10,000</div>
                <div className="text-sm text-slate-500 mt-1">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500</div>
                <div className="text-sm text-slate-500 mt-1">College Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">25</div>
                <div className="text-sm text-slate-500 mt-1">States Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">₹50Cr</div>
                <div className="text-sm text-slate-500 mt-1">Scholarships</div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-slate-500 text-sm mt-3">Free consultation • No commitment required</p>
            </div>
          </div>
        </section>
      <FAQ />
    </div>
  );
};

export default ServicesPage;