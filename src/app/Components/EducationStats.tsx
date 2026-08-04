import React from "react";
import { GraduationCap, TrendingUp, Users, Award, ShieldCheck } from "lucide-react";

export default function EducationStats() {
  const stats = [
    {
      icon: GraduationCap,
      value: "10,000+",
      label: "Students Admitted",
      description: "Guided students into reputed colleges and universities across the globe."
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate",
      description: "Consistently high approval rate in admissions and counselling process."
    },
    {
      icon: Users,
      value: "500+",
      label: "Indian Colleges",
      description: "Direct tie-ups with premier universities and colleges across India."
    },
    {
      icon: Award,
      value: "₹40+ Cr",
      label: "Scholarships",
      description: "Merit-based and need-based scholarships secured for our students."
    }
  ];

  return (
    <section className="py-20 bg-white font-sans text-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        
        {/* Simple Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#007BFF] mb-3">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Our Global Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#1E293B]">
            Numbers That Inspire
          </h2>
          <p className="text-[#64748B] text-sm max-w-2xl mx-auto font-medium leading-relaxed">
            Our commitment to student success is reflected in our data. 
            We turn academic dreams into reality for thousands of students.
          </p>
        </div>

        {/* Stats Grid - Clean & Minimal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-8 text-center bg-[#F8FAFC] border border-slate-100 rounded-lg hover:border-[#007BFF] transition-all flex flex-col items-center"
            >
              {/* Simple Icon Container */}
              <div className="w-12 h-12 mb-6 rounded-md bg-white border border-slate-100 text-[#007BFF] flex items-center justify-center group-hover:bg-[#007BFF] group-hover:text-white transition-all shadow-sm">
                <stat.icon size={22} />
              </div>

              {/* Simple Big Number */}
              <div className="text-4xl font-bold text-[#1E293B] mb-2 tracking-tight">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-[10px] font-bold text-[#007BFF] uppercase tracking-widest mb-4">
                {stat.label}
              </div>

              <p className="text-[#64748B] text-xs leading-relaxed font-medium">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Simple Bottom Trust Badge */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-[#F8FAFC] border border-slate-100 rounded-lg px-8 py-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="student" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-[#007BFF] flex items-center justify-center text-white font-bold text-[10px]">
                +10k
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <div className="font-bold text-[#1E293B] text-lg mb-0.5">Trusted by 10,000+ Students</div>
              <div className="text-xs text-[#64748B] font-medium">Empowering the next generation of Indian leaders</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}