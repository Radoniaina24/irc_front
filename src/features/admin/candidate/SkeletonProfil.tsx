import React from "react";

const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const SkeletonCandidateProfile = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-sans">
      {/* HEADER SKELETON */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-10">
        <SkeletonBox className="h-6 w-1/3 mb-2 bg-white/30" />
        <SkeletonBox className="h-4 w-1/4 bg-white/20" />
        <div className="mt-4 inline-block">
          <SkeletonBox className="h-5 w-24 rounded-full bg-white/30" />
        </div>
      </div>

      {/* CONTENT SKELETON */}
      <div className="space-y-10">
        {/* EDUCATION SECTION */}
        <section>
          <SkeletonBox className="h-6 w-36 mb-4 bg-indigo-200" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow border-l-4 border-indigo-300 space-y-3"
              >
                <SkeletonBox className="h-5 w-2/3" />
                <SkeletonBox className="h-4 w-1/2" />
                <SkeletonBox className="h-3 w-1/3" />
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section>
          <SkeletonBox className="h-6 w-36 mb-4 bg-indigo-200" />
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow border-l-4 border-purple-300 space-y-3"
              >
                <div className="flex justify-between">
                  <SkeletonBox className="h-5 w-1/2" />
                  <SkeletonBox className="h-4 w-1/4" />
                </div>
                <SkeletonBox className="h-3 w-1/3" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATION SECTION */}
        <section>
          <SkeletonBox className="h-6 w-36 mb-4 bg-indigo-200" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-300 space-y-3"
              >
                <SkeletonBox className="h-5 w-2/3" />
                <SkeletonBox className="h-4 w-1/2" />
                <SkeletonBox className="h-3 w-1/4" />
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section>
          <SkeletonBox className="h-6 w-36 mb-4 bg-indigo-200" />
          <div className="grid md:grid-cols-1 gap-6">
            {[1].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow border-l-4 border-teal-300 space-y-4"
              >
                <SkeletonBox className="h-5 w-3/4" />
                <SkeletonBox className="h-4 w-1/2" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-5/6" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((j) => (
                    <SkeletonBox key={j} className="h-5 w-20 rounded-full" />
                  ))}
                </div>
                <div className="flex gap-4">
                  <SkeletonBox className="h-4 w-32" />
                  <SkeletonBox className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SkeletonCandidateProfile;
