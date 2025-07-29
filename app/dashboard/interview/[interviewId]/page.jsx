// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Webcam from "react-webcam";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { Lightbulb, WebcamIcon } from "lucide-react";

// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { eq } from "drizzle-orm";

// const Interview = () => {
//   const params = useParams();
//   const [interviewData, setInterviewData] = useState();
//   const [webCamEnabled, setWebCamEnabled] = useState(false);

//   const GetInterviewDetails = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, params.interviewId));

//     setInterviewData(result[0]);
//   };

//   useEffect(() => {
//     if (params.interviewId) {
//       // console.log(params.interviewId);
//       GetInterviewDetails();
//     }
//   }, [params.interviewId]);

//   return (
//     <div className="my-10 px-5 md:px-8">
//       <h2 className="font-bold text-3xl mb-6">🎯 Let's Get Started</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-6">
//           <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">
//             <h3 className="text-lg">
//               <strong className="text-primary">Job Role:</strong>{" "}
//               <span className="capitalize">
//                 {interviewData?.jobPosition || "Loading..."}
//               </span>
//             </h3>
//             <h3 className="text-lg">
//               <strong className="text-primary">Tech Stack:</strong>{" "}
//               {interviewData?.jobDesc || "Loading..."}
//             </h3>
//             <h3 className="text-lg">
//               <strong className="text-primary">Experience:</strong>{" "}
//               {interviewData?.jobExperience} year(s)
//             </h3>
//           </div>

//           {/* Info Box */}
//           <div className="p-5 border-l-4 border-yellow-400 bg-yellow-100 rounded-md shadow-sm">
//             <div className="flex items-center gap-2 text-yellow-800 mb-2">
//               <Lightbulb className="h-5 w-5" />
//               <strong>Information</strong>
//             </div>
//             <p className="text-yellow-900 text-sm leading-relaxed">
//               {process.env.NEXT_PUBLIC_INFORMATION}
//             </p>
//           </div>
//         </div>

//         {/* Webcam Section */}
//         <div className="flex flex-col items-center justify-center">
//           {webCamEnabled ? (
//             <Webcam
//               onUserMedia={() => setWebCamEnabled(true)}
//               onUserMediaError={() => setWebCamEnabled(false)}
//               mirrored={true}
//               className="rounded-lg border shadow-md w-full max-w-md h-[300px] object-cover"
//             />
//           ) : (
//             <div className="flex flex-col items-center gap-4 w-full">
//               <div className="w-full max-w-md h-[300px] flex items-center justify-center bg-muted border rounded-lg">
//                 <WebcamIcon className="h-20 w-20 text-muted-foreground" />
//               </div>
//               <Button
//                 variant="outline"
//                 onClick={() => setWebCamEnabled(true)}
//                 className="w-full max-w-md"
//               >
//                 🎥 Enable Webcam and Microphone
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end mt-10">
//         <Link href={`/dashboard/interview/${params.interviewId}/start`}>
//           <Button className="px-8 py-2 text-base">🚀 Start Interview</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Interview;
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Camera, 
  Play, 
  Heart, 
  Star, 
  Sparkles, 
  Trophy,
  Briefcase,
  Code,
  Clock,
  Shield,
  CheckCircle,
  Mic,
  Video
} from "lucide-react";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

const Interview = () => {
  const params = useParams();
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  useEffect(() => {
    if (params.interviewId) {
      GetInterviewDetails();
    }
  }, [params.interviewId]);

  useEffect(() => {
    // Sparkle animation every 3 seconds
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 3000);

    // Check if ready to start
    setIsReady(webCamEnabled && interviewData);

    return () => clearInterval(sparkleInterval);
  }, [webCamEnabled, interviewData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 w-5 h-5 bg-pink-300 rounded-full animate-bounce opacity-40"></div>
      <div className="fixed top-32 right-16 w-4 h-4 bg-purple-300 rounded-full animate-pulse opacity-40"></div>
      <div className="fixed top-40 right-40 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-40"></div>
      <div className="fixed bottom-32 left-20 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
      <div className="fixed bottom-20 right-32 w-3 h-3 bg-rose-300 rounded-full animate-pulse opacity-40" style={{animationDelay: '2s'}}></div>

      <div className="relative px-6 py-10 md:px-8 max-w-7xl mx-auto">
        {/* Cute Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="absolute -inset-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-2xl"></div>
            
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-pink-200 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-10 h-10 text-yellow-500" />
                <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Let's Get Started!
                </h1>
                <Trophy className="w-10 h-10 text-yellow-500" />
                {sparkleAnimation && (
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                )}
              </div>
              
              <p className="text-gray-600 font-medium text-lg">
                Time to show off your amazing skills! You've got this! 💪✨
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          
          {/* Interview Details Section */}
          <div className="space-y-6">
            {/* Job Details Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-3xl opacity-40 group-hover:opacity-60 blur-lg transition-all duration-300"></div>
              
              <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-200 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl shadow-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Interview Details
                  </h2>
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>

                <div className="space-y-4">
                  {/* Job Role */}
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-pink-400 to-rose-500 p-2 rounded-xl">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-pink-700">Job Role:</span>
                        <p className="text-lg font-black text-pink-800 capitalize">
                          {interviewData?.jobPosition || "Loading your awesome role..."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-2 rounded-xl">
                        <Code className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-purple-700">Tech Stack:</span>
                        <p className="text-lg font-black text-purple-800">
                          {interviewData?.jobDesc || "Loading tech details..."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-xl">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-cyan-700">Experience Level:</span>
                        <p className="text-lg font-black text-cyan-800">
                          {interviewData?.jobExperience} year(s) of expertise
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-200 via-orange-200 to-amber-200 rounded-2xl opacity-40 group-hover:opacity-60 blur-lg transition-all duration-300"></div>
              
              <div className="relative bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-300 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    {sparkleAnimation && (
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-4 h-4 text-yellow-400 animate-bounce" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-black text-xl text-yellow-800">Important Tips</h3>
                      <Shield className="w-5 h-5 text-yellow-600" />
                    </div>
                    
                    <p className="text-yellow-900 leading-relaxed font-medium">
                      {process.env.NEXT_PUBLIC_INFORMATION || "Take your time, speak clearly, and remember - this is practice! Every question is an opportunity to learn and grow. You're here to succeed, and we believe in you! 🌟"}
                    </p>
                    
                    <div className="flex items-center gap-1 mt-4">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className="text-sm font-bold text-yellow-700">Relax and be yourself! 💖</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Webcam Setup Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative group w-full max-w-lg">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-300"></div>
              
              <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-6 border-2 border-green-200 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Video className="w-6 h-6 text-green-600" />
                    <h3 className="text-2xl font-black bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
                      Camera Setup
                    </h3>
                    <Mic className="w-6 h-6 text-cyan-600" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    Let's make sure you look and sound amazing! 📹
                  </p>
                </div>

                {webCamEnabled ? (
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-cyan-500 rounded-2xl opacity-20 blur-lg"></div>
                    
                    <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                      <Webcam
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        className="w-full h-[300px] object-cover"
                      />
                      
                      {/* Success indicator */}
                      <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      
                      {/* Live indicator */}
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        ● LIVE
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-300">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-bold text-sm">Camera & Mic Ready! ✅</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 border-2 border-dashed border-gray-300 mb-6">
                      <Camera className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">
                        Camera preview will appear here
                      </p>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-cyan-500 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                      
                      <Button
                        onClick={() => setWebCamEnabled(true)}
                        className="relative bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white"
                      >
                        <div className="flex items-center gap-3">
                          <Video className="w-5 h-5" />
                          <span>Enable Camera & Mic</span>
                          <Star className="w-4 h-4 text-yellow-300" />
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Start Interview Button */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className={`absolute -inset-4 rounded-3xl blur-xl transition-all duration-500 ${
              isReady 
                ? "bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-50 group-hover:opacity-70" 
                : "bg-gradient-to-r from-gray-300 to-gray-400 opacity-30"
            }`}></div>
            
            <Link href={isReady ? `/dashboard/interview/${params.interviewId}/start` : "#"}>
              <Button 
                disabled={!isReady}
                className={`relative px-12 py-6 rounded-3xl font-black text-xl shadow-2xl border-3 border-white transform transition-all duration-300 ${
                  isReady
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white hover:scale-110"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Play className="w-8 h-8" />
                  <span>Start Your Amazing Interview!</span>
                  <Heart className="w-6 h-6 text-pink-200" />
                </div>
                
                {isReady && (
                  <>
                    {/* Celebration particles */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-lg">🚀</span>
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-sm">✨</span>
                    </div>
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Encouragement Footer */}
        {!isReady && (
          <div className="text-center mt-8">
            <div className="inline-block bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl px-6 py-3 border-2 border-yellow-200 shadow-lg">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-700">
                  Please enable your camera to start the interview! 📸
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default Interview;