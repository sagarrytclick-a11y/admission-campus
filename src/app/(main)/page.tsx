"use client";

import AdmissionCampusAdvantage from "@/app/Components/AdvantageCard";
import CtaSection from "@/app/Components/CtaSection";
import EducationStats from "@/app/Components/EducationStats";
import FAQ from "@/app/Components/FAQ";
import FeaturedSection from "@/app/Components/FeaturedExams";
import Hero from "@/app/Components/Hero";
import { InfiniteMovingCardsDemo } from "@/app/Components/InfiniteMovingCardsDemo";
import LatestBlogs from "@/app/Components/LatestBlogs";
import Services from "@/app/Components/Services";
import StudentTestimonials from "@/app/Components/StudentTestimonials";
import StudyPrograms from "@/app/Components/StudyPrograms";
import ExplorePrograms from "../Components/ExplorePrograms";
import ExploreTopCourses from "../Components/ExploreTopCourses";
import CitySlider from "../Components/CitySlider";

const page = () => {
  return (
    <div className="w-full bg-white text-black overflow-x-hidden">
      <Hero />
      <ExploreTopCourses />
      <CitySlider />
      <ExplorePrograms />
      <FeaturedSection />
      <StudyPrograms />
      <EducationStats />
      <LatestBlogs />
      <Services />
      <AdmissionCampusAdvantage />
      <StudentTestimonials />
      <FAQ />
      <InfiniteMovingCardsDemo />
      <CtaSection />
    </div>
  );
};

export default page;