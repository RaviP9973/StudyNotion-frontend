import React from "react";
import { motion } from "motion/react";

// Shimmer skeleton block with a sweeping gradient animation
const SkeletonBox = ({ className }) => (
  <div className={`relative overflow-hidden rounded-md ${className}`}>
    {/* Base layer */}
    <div className="absolute inset-0 bg-richblack-700" />
    {/* Shimmer sweep */}
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

// Stagger wrapper — each child fades in with a slight delay
const StaggerContainer = ({ children, className }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.08 } },
    }}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 8 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    }}
  >
    {children}
  </motion.div>
);

// Matches the CourseCard layout: thumbnail + title + instructor + rating + price
export const CourseCardSkeleton = () => (
  <StaggerContainer className="flex flex-col gap-2">
    <StaggerItem>
      <SkeletonBox className="h-[250px] w-full rounded-xl mb-4" />
    </StaggerItem>
    <StaggerItem>
      <SkeletonBox className="h-5 w-3/4" />
    </StaggerItem>
    <StaggerItem>
      <SkeletonBox className="h-4 w-1/2" />
    </StaggerItem>
    <StaggerItem>
      <div className="flex gap-x-3 items-center">
        <SkeletonBox className="h-4 w-10" />
        <SkeletonBox className="h-4 w-28" />
        <SkeletonBox className="h-4 w-16" />
      </div>
    </StaggerItem>
    <StaggerItem>
      <SkeletonBox className="h-5 w-20" />
    </StaggerItem>
  </StaggerContainer>
);

// Skeleton for a course slider section (3 cards side by side on desktop)
export const CourseSliderSkeleton = () => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.15 } },
    }}
  >
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
        }}
      >
        <CourseCardSkeleton />
      </motion.div>
    ))}
  </motion.div>
);

// Skeleton for the catalog header banner
export const CatalogHeaderSkeleton = () => (
  <div className="w-full bg-richblack-800">
    <StaggerContainer className="py-10 w-11/12 mx-auto">
      <StaggerItem>
        <SkeletonBox className="h-4 w-48 mb-4" />
      </StaggerItem>
      <StaggerItem>
        <SkeletonBox className="h-8 w-64 mb-4" />
      </StaggerItem>
      <StaggerItem>
        <SkeletonBox className="h-4 w-full max-w-xl" />
      </StaggerItem>
      <StaggerItem>
        <SkeletonBox className="h-4 w-3/4 max-w-md mt-2" />
      </StaggerItem>
    </StaggerContainer>
  </div>
);

// Full catalog page skeleton
const CatalogPageSkeleton = () => (
  <motion.div
    className="text-white mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {/* Header */}
    <CatalogHeaderSkeleton />

    <div className="w-11/12 mx-auto">
      {/* Section 1: Courses to get you started */}
      <div className="my-10">
        <SkeletonBox className="h-8 w-72 mb-4" />
        <div className="flex gap-x-3 w-full border-b border-richblack-600 mb-8">
          <SkeletonBox className="h-6 w-28 mb-2" />
          <SkeletonBox className="h-6 w-12 mb-2" />
        </div>
        <CourseSliderSkeleton />
      </div>

      {/* Section 2: Top courses */}
      <div className="my-10">
        <SkeletonBox className="h-8 w-80 mb-4" />
        <CourseSliderSkeleton />
      </div>

      {/* Section 3: Frequently bought */}
      <div className="my-10">
        <SkeletonBox className="h-8 w-64 mb-4" />
        <div className="py-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
                }}
              >
                <CourseCardSkeleton />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default CatalogPageSkeleton;
