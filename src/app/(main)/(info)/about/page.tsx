"use client"
import React from 'react';
import { Check, Award, Users, ArrowRight } from 'lucide-react';
import { useFormModal } from '@/context/FormModalContext';

// --- Types ---
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Expert {
  name: string;
  role: string;
  image: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Data ---
const timeline: TimelineItem[] = [
  { year: "2012", title: "Foundation in London", description: "Established to bridge the gap between talented students and top UK universities." },
  { year: "2016", title: "Global Expansion", description: "Expanded operations to Canada, Australia, and the US, partnering with 150+ institutions." },
  { year: "2022", title: "Digital Transformation", description: "Launched our AI-powered student portal to streamline applications." },
];

const experts: Expert[] = [
  { name: "James Carter", role: "Senior Counselor (UK)", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop" },
  { name: "Sarah Jenkins", role: "Visa Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" },
  { name: "Michael Chen", role: "University Relations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" },
  { name: "Priya Patel", role: "Student Success Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" },
];

const values = [
  {
    title: "Integrity in Every Recommendation",
    description:
      "We believe education decisions shape lives. Our guidance is driven by honesty, transparency, and what is truly best for the student — not commissions or shortcuts.",
    subtext:
      "This principle has earned us trust across generations of students and parents."
  },
  {
    title: "Experience-Driven Expertise",
    description:
      "With 50+ years in international education counseling, our advice is grounded in real outcomes, evolving regulations, and deep institutional knowledge.",
    subtext:
      "Experience allows us to anticipate challenges before they arise."
  },
  {
    title: "Student-Centric Approach",
    description:
      "Every student’s journey is unique. We focus on individual goals, academic strengths, financial considerations, and long-term career outcomes.",
    subtext:
      "Personalized counseling has been central to our success for decades."
  },
  {
    title: "Long-Term Responsibility",
    description:
      "Our role does not end with admissions. We take responsibility for guiding students toward sustainable academic and professional futures.",
    subtext:
      "Our legacy is built on student success, not volume."
  }
];

const legacyTimeline = [
  {
    year: "1974",
    title: "Foundation Built on Academic Integrity",
    description:
      "Established with a singular mission — to provide honest, student-first guidance for overseas education when reliable information was limited."
  },
  {
    year: "1988",
    title: "National Expansion Across India",
    description:
      "Expanded counseling services nationwide, helping thousands of students make informed academic decisions with confidence."
  },
  {
    year: "2002",
    title: "Global University Partnerships",
    description:
      "Built strong partnerships with leading universities across the UK, USA, Canada, Australia, and Europe."
  },
  {
    year: "2012",
    title: "Trusted by Generations of Families",
    description:
      "Became a legacy brand, trusted by students, parents, and institutions across multiple generations."
  },
  {
    year: "Today",
    title: "50+ Years of Proven Student Success",
    description:
      "With five decades of experience, we continue to guide students globally with transparency, expertise, and measurable outcomes."
  }
];

export default function AboutPage() {
  const { openModal } = useFormModal();
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
            About Us
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            25 Years of Guiding Students
            <span className="block text-blue-600">Toward Indian Excellence</span>
          </h1>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
            For over two decades, we have helped students and families navigate
            Indian college admissions with clarity, integrity, and confidence.
            Our guidance is built on experience — not trends.
          </p>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">25+</div>
              <div className="text-sm text-slate-500 mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">100K+</div>
              <div className="text-sm text-slate-500 mt-1">Students Guided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">500+</div>
              <div className="text-sm text-slate-500 mt-1">College Partners</div>
            </div>
          </div>
          
          <button
            onClick={openModal}
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Learn About Our Legacy
          </button>
        </div>
      </section>



      {/* Stats Bar */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Experience", value: "25+" },
              { label: "Partner Colleges", value: "500+" },
              { label: "Admission Success Rate", value: "95%" },
              { label: "Students Placed", value: "10,000+" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                From Vision to <span className="text-blue-600">Reality</span>
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                Founded in 1998, Admission Campus began with a simple mission: to make quality Indian education accessible to every ambitious student, regardless of their background or location.
              </p>
              <p className="text-slate-600 text-lg mb-8">
                Today, we are proud to have helped over 10,000 students from 25+ states achieve their dreams of studying at top Indian colleges including IITs, NITs, AIIMS, and other premier institutions.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-slate-700 font-medium">95% Admission Success Rate</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">₹50Cr+ in Scholarships Secured</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-slate-700 font-medium">500+ College Partnerships</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">4.9 / 5</div>
                <div className="text-sm text-slate-600">Rated by Indian students & families</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
              Our Legacy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              25 Years of Guiding Students
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              For over two decades, we have helped students navigate Indian
              college admissions with integrity, expertise, and long-term success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                year: "1998",
                title: "Foundation Built on Educational Integrity",
                description: "Established with a singular mission — to provide honest, student-first guidance for Indian college admissions."
              },
              {
                year: "2008",
                title: "National Expansion Across India",
                description: "Expanded counseling services nationwide, helping thousands of students secure admissions in top colleges."
              },
              {
                year: "2015",
                title: "Premier College Partnerships",
                description: "Built strong partnerships with leading IITs, NITs, AIIMS, and other top Indian institutions."
              },
              {
                year: "2020",
                title: "Digital Transformation",
                description: "Launched our AI-powered admission portal to streamline college applications and exam preparation."
              },
              {
                year: "Today",
                title: "25+ Years of Proven Student Success",
                description: "With over two decades of experience, we continue to guide students across India with transparency and expertise."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="text-sm font-semibold text-blue-600 mb-3">{item.year}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Our Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Principles Shaped by 25 Years of Experience
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Over two decades, our values have been refined through experience,
              responsibility, and a deep understanding of student aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Integrity in Every Recommendation",
                description: "We believe education decisions shape lives. Our guidance is driven by honesty, transparency, and what is truly best for the student."
              },
              {
                title: "Experience-Driven Expertise",
                description: "With 25+ years in Indian education counseling, our advice is grounded in real outcomes and deep institutional knowledge."
              },
              {
                title: "Student-Centric Approach",
                description: "Every student's journey is unique. We focus on individual goals, academic strengths, and long-term career outcomes in India."
              },
              {
                title: "Long-Term Responsibility",
                description: "Our role does not end with admissions. We take responsibility for guiding students toward sustainable academic and professional futures in India."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their futures with our guidance.
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started Today
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
