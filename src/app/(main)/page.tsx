"use client";

import AdvantageCard from "@/app/Components/AdvantageCard";
import CtaSection from "@/app/Components/CtaSection";
import EducationStats from "@/app/Components/EducationStats";
import FAQ from "@/app/Components/FAQ";
import FeaturedSection from "@/app/Components/FeaturedExams";
import Hero from "@/app/Components/Hero";
// import { InfiniteMovingCardsDemo } from "@/app/Components/InfiniteMovingCardsDemo";
import LatestBlogs from "@/app/Components/LatestBlogs";
import Services from "@/app/Components/Services";
import StudentTestimonials from "@/app/Components/StudentTestimonials";
import StudyPrograms from "@/app/Components/StudyPrograms";
import ExplorePrograms from "../Components/ExplorePrograms";
import ExploreTopCourses from "../Components/ExploreTopCourses";
import CitySlider from "../Components/CitySlider";
import MedicalSection from "@/app/Components/MedicalSection";
import NeetPredictorSection from "@/app/Components/NeetPredictorSection";
import MdMsHomeSection from "@/app/Components/MdMsHomeSection";

const page = () => {
  return (
    <div className="w-full bg-[#F4F7FC] text-[#0F172A] overflow-x-hidden">
      <Hero />
      <MdMsHomeSection />
      <MedicalSection />
      <NeetPredictorSection />
      <CitySlider />
      <FeaturedSection />
      <ExploreTopCourses />
      <ExplorePrograms />
      <StudyPrograms />
      <EducationStats />
      <LatestBlogs />
      <Services />
      <AdvantageCard />
      <StudentTestimonials />
      <FAQ />
      <CtaSection />
    </div>
  );
};

export default page;