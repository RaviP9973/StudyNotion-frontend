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

const ForgotPasswordSkeleton = () => {
  return (
    <div className="max-w-[500px] w-full p-4 lg:p-8">
      {/* Title */}
      <SkeletonBox className="h-9 w-3/4 mb-3 rounded-md" />
      {/* Description */}
      <SkeletonBox className="h-5 w-full mb-2 rounded-md" />
      <SkeletonBox className="h-5 w-5/6 mb-6 rounded-md" />
      
      {/* Form Area */}
      <div className="flex flex-col gap-1 w-full">
        <SkeletonBox className="h-4 w-28 mb-1 rounded-md" />
        <SkeletonBox className="h-12 w-full rounded-lg mb-6" />
      </div>
      
      {/* Button */}
      <SkeletonBox className="h-10 w-full rounded-lg mb-4" />
      
      {/* Back to Login */}
      <div className="flex gap-3 items-center">
        <SkeletonBox className="h-5 w-5 rounded-full" />
        <SkeletonBox className="h-5 w-28 rounded-md" />
      </div>
    </div>
  );
};

export default ForgotPasswordSkeleton;
