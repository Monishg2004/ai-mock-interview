// "use client";

// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { eq } from "drizzle-orm";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Feedback = () => {
//   const params = useParams();
//   const router = useRouter();

//   const [feedbackList, setFeedbackList] = useState([]);

//   useEffect(() => {
//     if (params.interviewId) {
//       const getFeedback = async () => {
//         const result = await db
//           .select()
//           .from(UserAnswer)
//           .where(eq(UserAnswer.mockIdRef, params.interviewId))
//           .orderBy(UserAnswer.id);
//         setFeedbackList(result);
//       };
//       getFeedback();
//     }
//   }, [params.interviewId]);

//   const averageRating =
//     feedbackList.length > 0
//       ? (
//           feedbackList.reduce((sum, item) => {
//             const rating = parseFloat(item.rating.split("/")[0]);
//             return !isNaN(rating) && rating > 0 ? sum + rating : sum;
//           }, 0) / feedbackList.length
//         ).toFixed(1)
//       : "N/A";

//   return (
//     <div className="p-6 md:p-10 max-w-4xl mx-auto">
//       {feedbackList.length === 0 ? (
//         <h2 className="text-xl font-semibold text-gray-400 text-center">
//           ⚠️ No Interview Feedback Available
//         </h2>
//       ) : (
//         <>
//           <div className="text-center mb-6">
//             <h2 className="text-3xl font-bold text-green-600">🎉 Great Job!</h2>
//             <p className="text-xl font-semibold mt-2">
//               Here's your interview feedback summary.
//             </p>
//             <p className="text-lg text-gray-600 mt-1">
//               Overall Rating:{" "}
//               <span className="text-blue-600 font-bold">
//                 {averageRating} / 5
//               </span>
//             </p>
//             <p className="text-sm text-muted-foreground mt-2">
//               Below you'll find each question, your answer, the correct answer,
//               and personalized feedback to improve.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {feedbackList.map((item, index) => (
//               <Collapsible key={index}>
//                 <CollapsibleTrigger className="w-full px-4 py-3 bg-secondary rounded-lg text-left hover:bg-gray-100 transition flex justify-between items-center text-md font-medium">
//                   <span>
//                     Q{index + 1}. {item.question}
//                   </span>
//                   <ChevronsUpDown className="h-5 w-5 text-gray-500" />
//                 </CollapsibleTrigger>

//                 <CollapsibleContent className="bg-white border rounded-lg p-4 space-y-3 shadow-sm">
//                   <div className="text-sm bg-gray-50 border-l-4 border-yellow-400 p-3 rounded">
//                     <strong>📊 Rating:</strong> {item.rating}
//                   </div>

//                   <div className="text-sm bg-red-50 border-l-4 border-red-400 p-3 rounded">
//                     <strong>❌ Your Answer:</strong> {item.userAns}
//                   </div>

//                   <div className="text-sm bg-green-50 border-l-4 border-green-500 p-3 rounded">
//                     <strong>✅ Correct Answer:</strong> {item.correctAns}
//                   </div>

//                   <div className="text-sm bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
//                     <strong>💡 Feedback:</strong> {item.feedback}
//                   </div>
//                 </CollapsibleContent>
//               </Collapsible>
//             ))}
//           </div>
//         </>
//       )}

//       <div className="flex justify-center mt-8">
//         <Button
//           onClick={() => router.replace("/dashboard")}
//           className="px-6 py-2"
//         >
//           ⬅ Go to Dashboard
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Feedback;

"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Star, Heart, Sparkles, Trophy, ArrowLeft, Target, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const Feedback = () => {
  const params = useParams();
  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState([]);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);

  useEffect(() => {
    if (params.interviewId) {
      const getFeedback = async () => {
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, params.interviewId))
          .orderBy(UserAnswer.id);
        setFeedbackList(result);
      };
      getFeedback();
    }

    // Sparkle animation every 4 seconds
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 4000);

    return () => {
      clearInterval(sparkleInterval);
    };
  }, [params.interviewId]);

  const averageRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce((sum, item) => {
            const rating = parseFloat(item.rating.split("/")[0]);
            return !isNaN(rating) && rating > 0 ? sum + rating : sum;
          }, 0) / feedbackList.length
        ).toFixed(1)
      : "N/A";

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 4) return "from-emerald-400 to-green-500";
    if (numRating >= 3) return "from-yellow-400 to-orange-500";
    return "from-pink-400 to-red-500";
  };

  const getRatingEmoji = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 4.5) return "🌟";
    if (numRating >= 4) return "✨";
    if (numRating >= 3) return "⭐";
    return "💫";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 w-6 h-6 bg-pink-300 rounded-full animate-bounce opacity-40"></div>
      <div className="fixed top-32 right-20 w-4 h-4 bg-purple-300 rounded-full animate-pulse opacity-40"></div>
      <div className="fixed top-40 right-40 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-40"></div>
      <div className="fixed bottom-32 left-20 w-5 h-5 bg-yellow-300 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
      <div className="fixed bottom-20 right-32 w-4 h-4 bg-rose-300 rounded-full animate-pulse opacity-40" style={{animationDelay: '2s'}}></div>

      <div className="relative p-6 md:p-10 max-w-5xl mx-auto">
        {feedbackList.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="absolute -inset-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-12 border-2 border-pink-200 shadow-2xl">
                <div className="text-8xl mb-6">🥺</div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Oopsie! No Feedback Yet
                </h2>
                <p className="text-gray-600 text-lg">
                  Looks like you haven't completed any interviews yet! ✨
                </p>
                <div className="mt-6">
                  <Heart className="w-8 h-8 text-pink-400 mx-auto animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Cute Header Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl opacity-30 blur-xl"></div>
                <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-green-200 shadow-2xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Trophy className="w-12 h-12 text-yellow-500" />
                    <div className="text-6xl">🎉</div>
                    <Trophy className="w-12 h-12 text-yellow-500" />
                  </div>
                  
                  <h2 className="text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    Amazing Work, Superstar!
                  </h2>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <p className="text-xl font-bold text-gray-700">
                      Interview Feedback Summary
                    </p>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>

                  {/* Cute Rating Display */}
                  <div className="relative inline-block">
                    <div className={`bg-gradient-to-r ${getRatingColor(averageRating)} p-6 rounded-2xl shadow-xl border-3 border-white`}>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{getRatingEmoji(averageRating)}</div>
                        <div>
                          <p className="text-white font-black text-2xl">
                            {averageRating} / 5.0
                          </p>
                          <p className="text-white/90 text-sm font-semibold">Overall Score</p>
                        </div>
                        <div className="text-3xl">{getRatingEmoji(averageRating)}</div>
                      </div>
                    </div>
                    {sparkleAnimation && (
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mt-6 font-medium bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-xl border border-purple-200">
                    📝 Below you'll find each question with personalized feedback to help you shine even brighter! ✨
                  </p>
                </div>
              </div>
            </div>

            {/* Cute Questions Section */}
            <div className="space-y-6">
              {feedbackList.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 rounded-3xl opacity-50 group-hover:opacity-70 blur-lg transition-all duration-300"></div>
                  
                  <Collapsible className="relative">
                    <CollapsibleTrigger className="w-full bg-white/90 backdrop-blur-lg rounded-2xl border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group">
                      <div className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl p-3 font-black text-lg shadow-lg">
                            Q{index + 1}
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-gray-800 text-lg group-hover:text-purple-700 transition-colors">
                              {item.question}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Target className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-500 font-medium">Click to view details</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`bg-gradient-to-r ${getRatingColor(item.rating.split("/")[0])} text-white px-4 py-2 rounded-xl font-bold shadow-lg`}>
                            {item.rating}
                          </div>
                          <ChevronsUpDown className="h-6 w-6 text-purple-500 group-hover:text-purple-700 transition-colors" />
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="bg-white/95 backdrop-blur-lg border-2 border-white/50 rounded-2xl mt-3 p-6 shadow-xl space-y-4">
                        
                        {/* Rating Section */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-6 border-yellow-400 p-4 rounded-xl shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-xl">
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <strong className="text-yellow-700 font-black">Rating Score</strong>
                              <p className="text-yellow-600 font-bold text-lg">{item.rating} ⭐</p>
                            </div>
                          </div>
                        </div>

                        {/* Your Answer Section */}
                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-l-6 border-pink-400 p-4 rounded-xl shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-2 rounded-xl flex-shrink-0 mt-1">
                              <XCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <strong className="text-pink-700 font-black block mb-2">Your Answer 💭</strong>
                              <p className="text-pink-700 leading-relaxed">{item.userAns}</p>
                            </div>
                          </div>
                        </div>

                        {/* Correct Answer Section */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-6 border-green-500 p-4 rounded-xl shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl flex-shrink-0 mt-1">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <strong className="text-green-700 font-black block mb-2">Perfect Answer ✨</strong>
                              <p className="text-green-700 leading-relaxed">{item.correctAns}</p>
                            </div>
                          </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-6 border-blue-400 p-4 rounded-xl shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-2 rounded-xl flex-shrink-0 mt-1">
                              <Lightbulb className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <strong className="text-blue-700 font-black block mb-2">Personalized Tips 💡</strong>
                              <p className="text-blue-700 leading-relaxed">{item.feedback}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Cute Back Button */}
        <div className="flex justify-center mt-12">
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
            <Button
              onClick={() => router.replace("/dashboard")}
              className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
                <Heart className="w-5 h-5" />
              </div>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .border-3 {
          border-width: 3px;
        }
        .border-l-6 {
          border-left-width: 6px;
        }
      `}</style>
    </div>
  );
};

export default Feedback;