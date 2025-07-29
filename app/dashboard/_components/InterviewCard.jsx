// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import React from "react";
// import Feedback from "../interview/[interviewId]/feedback/page";

// const InterviewCard = ({ interview }) => {
//   const router = useRouter();

//   const onStart = () => {
//     router.push(`/dashboard/interview/${interview.mockId}`);
//   };

//   const onFeedback = () => {
//     router.push(`/dashboard/interview/${interview.mockId}/feedback`);
//   };

//   return (
//     <div className="border shadow-sm rounded-lg p-3">
//       <h2 className="font-bold text-primary capitalize">
//         {interview?.jobPosition}
//       </h2>
//       <h2 className="font-bold text-gray-600">
//         {interview?.jobExperience} Years of Experience
//       </h2>
//       <h2 className="text-xs text-gray-400">
//         Created at : {interview?.createdAt}
//       </h2>

//       <div className="flex justify-between mt-2 gap-5">
//         <Button
//           size="sm"
//           variant="outline"
//           className="w-full"
//           onClick={onFeedback}
//         >
//           Feedback
//         </Button>
//         <Button size="sm" className="w-full" onClick={onStart}>
//           Start
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  Play, 
  MessageCircle, 
  Star,
  Heart,
  Sparkles,
  Trophy,
  Target,
  Zap
} from "lucide-react";

const InterviewCard = ({ interview }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const onStart = () => {
    router.push(`/dashboard/interview/${interview.mockId}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview.mockId}/feedback`);
  };

  return (
    <div 
      className="relative group transform transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Magical Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>
      
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 border-2 border-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 shadow-xl rounded-2xl p-6 backdrop-blur-sm group-hover:shadow-2xl transition-all duration-300">
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-5 right-8 w-2 h-2 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-3 left-3 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Job Position */}
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl shadow-lg">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-black text-lg bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent capitalize flex items-center gap-1">
                {interview?.jobPosition}
                <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
              </h2>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg shadow-md">
                <Trophy className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-bold text-gray-700 flex items-center gap-1">
                {interview?.jobExperience} Years Experience
                <Zap className="w-3 h-3 text-yellow-500" />
              </h3>
            </div>

            {/* Created Date */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg shadow-md">
                <Calendar className="w-3 h-3 text-white" />
              </div>
              <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                Created: {interview?.createdAt}
                <Heart className="w-3 h-3 text-pink-400" />
              </p>
            </div>
          </div>

          {/* Cute Status Badge */}
          <div className="flex items-center gap-1 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 rounded-full border border-green-200 shadow-sm">
            <Target className="w-3 h-3 text-green-600" />
            <span className="text-xs font-bold text-green-700">Ready</span>
          </div>
        </div>

        {/* Cute Divider */}
        <div className="w-full h-0.5 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 rounded-full mb-4 opacity-60"></div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Feedback Button */}
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-12 rounded-2xl border-2 border-purple-200 hover:border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 hover:text-purple-800 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={onFeedback}
          >
            <div className="flex items-center gap-2">
              <div className="p-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
              <span>Feedback</span>
              <Heart className="w-3 h-3 text-pink-400 animate-pulse" />
            </div>
          </Button>

          {/* Start Button */}
          <Button 
            size="sm" 
            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            onClick={onStart}
          >
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded-lg">
                <Play className="w-3 h-3 text-white" />
              </div>
              <span>Start Now</span>
              <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
            </div>
          </Button>
        </div>

        {/* Hover Effect Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-purple-100/20 to-cyan-100/20 rounded-2xl flex items-center justify-center pointer-events-none">
            <div className="text-4xl animate-bounce">✨</div>
          </div>
        )}

        {/* Corner Sparkle Animation */}
        {isHovered && (
          <div className="absolute -top-1 -right-1 animate-spin">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        )}

        {/* Bottom Right Cute Element */}
        <div className="absolute bottom-2 right-2 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;