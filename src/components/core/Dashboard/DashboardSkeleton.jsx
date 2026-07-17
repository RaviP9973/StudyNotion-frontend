import React from "react";
import { motion } from "motion/react";

// Shimmer skeleton block
const SkeletonBox = ({ className }) => (
  <div className={`relative overflow-hidden rounded-md ${className}`}>
    <div className="absolute inset-0 bg-richblack-800" />
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 60%, transparent 100%)",
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

const DashboardSkeleton = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900">
      {/* Sidebar Skeleton */}
      <div className="hidden min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 sm:flex">
        <div className="flex flex-col gap-5 px-6">
          <SkeletonBox className="h-10 w-full rounded-md" />
          <SkeletonBox className="h-10 w-full rounded-md" />
          <SkeletonBox className="h-10 w-full rounded-md" />
        </div>
        <div className="mx-6 mt-6 mb-6 h-[1px] bg-richblack-700" />
        <div className="flex flex-col gap-5 px-6">
          <SkeletonBox className="h-10 w-full rounded-md" />
          <SkeletonBox className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <div className="flex flex-col gap-6">
            <SkeletonBox className="h-10 w-48 rounded-md mb-4" />
            
            {/* Generic content blocks */}
            <div className="flex flex-col gap-4 bg-richblack-800 p-8 rounded-md border-[1px] border-richblack-700">
              <div className="flex items-center justify-between">
                <SkeletonBox className="h-6 w-32 rounded-md" />
                <SkeletonBox className="h-8 w-24 rounded-md" />
              </div>
              <div className="flex items-center gap-4 mt-4">
                <SkeletonBox className="h-20 w-20 rounded-full" />
                <div className="flex flex-col gap-2">
                  <SkeletonBox className="h-5 w-40 rounded-md" />
                  <SkeletonBox className="h-4 w-32 rounded-md" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-richblack-800 p-8 rounded-md border-[1px] border-richblack-700">
              <div className="flex items-center justify-between">
                <SkeletonBox className="h-6 w-32 rounded-md" />
                <SkeletonBox className="h-8 w-24 rounded-md" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 mt-4">
                <div className="flex flex-col gap-2">
                  <SkeletonBox className="h-4 w-24 rounded-md" />
                  <SkeletonBox className="h-5 w-40 rounded-md" />
                </div>
                <div className="flex flex-col gap-2">
                  <SkeletonBox className="h-4 w-24 rounded-md" />
                  <SkeletonBox className="h-5 w-40 rounded-md" />
                </div>
                <div className="flex flex-col gap-2">
                  <SkeletonBox className="h-4 w-24 rounded-md" />
                  <SkeletonBox className="h-5 w-40 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
