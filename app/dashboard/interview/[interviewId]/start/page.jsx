// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { eq } from "drizzle-orm";

// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import Questions from "./_components/Questions";
// import RecordingAns from "./_components/RecordingAns";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const StartInterview = () => {
//   const params = useParams();

//   const [interviewData, setInterviewData] = useState();
//   const [mockInterviewQns, setMockInterviewQns] = useState();
//   const [activeQnIndex, setActiveQnIndex] = useState(0);

//   const GetInterviewDetails = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, params.interviewId));

//     const jsonMockResp = JSON.parse(result[0].jsonMockResp);

//     console.log(jsonMockResp);

//     setMockInterviewQns(jsonMockResp);
//     setInterviewData(result[0]);
//   };

//   useEffect(() => {
//     if (params.interviewId) {
//       console.log(params.interviewId);
//       GetInterviewDetails();
//     }

//     GetInterviewDetails();
//   }, [params.interviewId]);

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Questions */}
//         <Questions
//           mockInterviewQns={mockInterviewQns}
//           activeQnIndex={activeQnIndex}
//         />

//         {/* Video / Audio */}
//         <RecordingAns
//           mockInterviewQns={mockInterviewQns}
//           activeQnIndex={activeQnIndex}
//           interviewData={interviewData}
//         />
//       </div>

//       <div className="flex justify-end gap-6">
//         {activeQnIndex > 0 && (
//           <Button onClick={() => setActiveQnIndex(activeQnIndex - 1)}>
//             Previous Question
//           </Button>
//         )}
//         {activeQnIndex != mockInterviewQns?.length - 1 && (
//           <Button onClick={() => setActiveQnIndex(activeQnIndex + 1)}>
//             Next Question
//           </Button>
//         )}
//         {activeQnIndex == mockInterviewQns?.length - 1 && (
//           <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
//             <Button>End Interview</Button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StartInterview;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import Questions from "./_components/Questions";
import RecordingAns from "./_components/RecordingAns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Heart, 
  Star, 
  Sparkles, 
  Trophy,
  BarChart3,
  Clock
} from "lucide-react";

const StartInterview = () => {
  const params = useParams();

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQns, setMockInterviewQns] = useState();
  const [activeQnIndex, setActiveQnIndex] = useState(0);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);

    console.log(jsonMockResp);

    setMockInterviewQns(jsonMockResp);
    setInterviewData(result[0]);
  };

  useEffect(() => {
    if (params.interviewId) {
      console.log(params.interviewId);
      GetInterviewDetails();
    }

    GetInterviewDetails();
  }, [params.interviewId]);

  useEffect(() => {
    // Sparkle animation every 4 seconds
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 4000);

    return () => clearInterval(sparkleInterval);
  }, []);

  const progressPercentage = mockInterviewQns 
    ? ((activeQnIndex + 1) / mockInterviewQns.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="fixed top-24 left-8 w-5 h-5 bg-pink-300 rounded-full animate-bounce opacity-30"></div>
      <div className="fixed top-32 right-12 w-4 h-4 bg-purple-300 rounded-full animate-pulse opacity-30"></div>
      <div className="fixed top-40 right-40 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-30"></div>
      <div className="fixed bottom-32 left-16 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="fixed bottom-20 right-24 w-3 h-3 bg-rose-300 rounded-full animate-pulse opacity-30" style={{animationDelay: '2s'}}></div>

      <div className="relative p-6 md:p-8 max-w-7xl mx-auto">
        {/* Cute Header with Progress */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-pink-200 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h1 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Interview in Progress
                </h1>
                <Trophy className="w-8 h-8 text-yellow-500" />
                {sparkleAnimation && (
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                )}
              </div>

              {/* Progress Bar */}
              {mockInterviewQns && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-bold text-gray-700">
                        Question {activeQnIndex + 1} of {mockInterviewQns.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 font-medium">
                        {Math.round(progressPercentage)}% Complete
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 h-3 rounded-full shadow-lg transition-all duration-700 ease-out relative overflow-hidden"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-600 font-medium">
                You're doing amazing! Keep going strong! 💪✨
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Questions Section */}
          <div className="order-2 lg:order-1">
            <Questions
              mockInterviewQns={mockInterviewQns}
              activeQnIndex={activeQnIndex}
            />
          </div>

          {/* Video/Audio Recording Section */}
          <div className="order-1 lg:order-2">
            <RecordingAns
              mockInterviewQns={mockInterviewQns}
              activeQnIndex={activeQnIndex}
              interviewData={interviewData}
            />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-pink-200 shadow-2xl">
            <div className="relative -inset-2 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 rounded-3xl opacity-30 blur-lg absolute"></div>
            
            <div className="relative flex items-center justify-center gap-4">
              {/* Previous Button */}
              {activeQnIndex > 0 && (
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                  
                  <Button
                    onClick={() => setActiveQnIndex(activeQnIndex - 1)}
                    className="relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronLeft className="w-5 h-5" />
                      <span>Previous</span>
                    </div>
                  </Button>
                </div>
              )}

              {/* Question Counter */}
              <div className="mx-4">
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 px-6 py-3 rounded-2xl border-2 border-yellow-300 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-black text-yellow-700">
                      {activeQnIndex + 1} / {mockInterviewQns?.length || '...'}
                    </span>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Next Button */}
              {activeQnIndex !== mockInterviewQns?.length - 1 && (
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                  
                  <Button
                    onClick={() => setActiveQnIndex(activeQnIndex + 1)}
                    className="relative bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white"
                  >
                    <div className="flex items-center gap-2">
                      <span>Next</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </Button>
                </div>
              )}

              {/* End Interview Button */}
              {activeQnIndex === mockInterviewQns?.length - 1 && (
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl opacity-40 group-hover:opacity-60 blur-xl transition-all duration-300"></div>
                  
                  <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                    <Button className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-black px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-3 border-white">
                      <div className="flex items-center gap-3">
                        <Flag className="w-6 h-6" />
                        <span className="text-lg">Finish Interview</span>
                        <Heart className="w-5 h-5 text-pink-200" />
                      </div>
                      
                      {/* Celebration particles */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-sm">🎉</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="text-center mt-8">
          <div className="inline-block bg-gradient-to-r from-pink-50 via-purple-50 to-cyan-50 rounded-2xl px-6 py-3 border-2 border-pink-200 shadow-lg">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Remember: Every great journey starts with a single step! You're crushing it! 🌟
              </span>
              <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default StartInterview;