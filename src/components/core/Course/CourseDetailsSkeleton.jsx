import React from "react";
import { motion } from "motion/react";

// Shimmer skeleton block
const SkeletonBox = ({ className }) => (
  <div className={`relative overflow-hidden rounded-md ${className}`}>
    <div className="absolute inset-0 bg-richblack-700" />
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 60%, transparent 100%)",
      }}
      animate={{ x: ["-100%", "100%"] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 0.3,
      }}
    />
  </div>
);

const CourseDetailsSkeleton = () => (
  <div className="flex flex-col items-center text-white mx-auto w-full">
    {/* Header section */}
    <div className="bg-richblack-800 w-full relative">
      <div className="py-12 w-11/12 lg:w-10/12 mx-auto">
        <div className="w-full lg:w-[65%] flex flex-col gap-3">
          {/* Breadcrumb */}
          <SkeletonBox className="h-4 w-48" />
          {/* Title */}
          <SkeletonBox className="h-8 w-80" />
          {/* Description */}
          <SkeletonBox className="h-4 w-full max-w-lg" />
          <SkeletonBox className="h-4 w-3/4 max-w-md" />
          {/* Rating row */}
          <div className="flex flex-row flex-wrap gap-2">
            <SkeletonBox className="h-5 w-10" />
            <SkeletonBox className="h-5 w-28" />
            <SkeletonBox className="h-5 w-24" />
            <SkeletonBox className="h-5 w-24" />
          </div>
          {/* Instructor */}
          <SkeletonBox className="h-4 w-44" />
          {/* Date + language */}
          <div className="flex gap-x-3">
            <SkeletonBox className="h-4 w-36" />
            <SkeletonBox className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>

    {/* Course details card placeholder */}
    <div className="w-11/12 lg:w-10/12 mt-4">
      <div className="w-full lg:w-[30%] lg:ml-auto">
        <SkeletonBox className="h-[200px] w-full rounded-xl" />
        <div className="mt-4 flex flex-col gap-3">
          <SkeletonBox className="h-6 w-24" />
          <SkeletonBox className="h-10 w-full rounded-lg" />
          <SkeletonBox className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>

    {/* What you'll learn */}
    <div className="w-11/12 lg:w-10/12 mt-8">
      <div className="w-full lg:w-[65%] border border-richblack-600 p-4 rounded-lg">
        <SkeletonBox className="h-7 w-48 mb-4" />
        <div className="flex flex-col gap-2">
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-5/6" />
          <SkeletonBox className="h-4 w-4/6" />
          <SkeletonBox className="h-4 w-3/4" />
        </div>
      </div>
    </div>

    {/* Course content */}
    <div className="w-11/12 lg:w-10/12 mt-8">
      <SkeletonBox className="h-7 w-40 mb-4" />
      <div className="flex flex-col sm:flex-row justify-between w-full lg:w-[65%] gap-2 mb-4">
        <div className="flex gap-3">
          <SkeletonBox className="h-4 w-24" />
          <SkeletonBox className="h-4 w-24" />
        </div>
        <SkeletonBox className="h-4 w-16" />
      </div>

      {/* Accordion skeletons */}
      <div className="w-full lg:w-[65%] flex flex-col gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBox key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    </div>

    {/* Author */}
    <div className="w-11/12 lg:w-10/12 mt-8 mb-10">
      <div className="w-full lg:w-[65%] flex flex-col gap-3">
        <SkeletonBox className="h-7 w-20" />
        <div className="flex items-center gap-3">
          <SkeletonBox className="h-12 w-12 rounded-full" />
          <SkeletonBox className="h-5 w-36" />
        </div>
        <SkeletonBox className="h-4 w-full max-w-md" />
      </div>
    </div>
  </div>
);

export default CourseDetailsSkeleton;
