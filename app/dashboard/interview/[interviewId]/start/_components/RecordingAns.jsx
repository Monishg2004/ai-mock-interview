// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Webcam from "react-webcam";
// import useSpeechToText from "react-hook-speech-to-text";
// import { useUser } from "@clerk/nextjs";

// import {
//   AlertTriangleIcon,
//   CheckCircleIcon,
//   Mic,
//   StopCircleIcon,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { chatSession } from "@/utils/GeminiAIModel";
// import { db } from "@/utils/db";
// import moment from "moment";
// import { UserAnswer } from "@/utils/schema";

// const RecordingAns = ({ mockInterviewQns, activeQnIndex, interviewData }) => {
//   const [userAns, setUserAns] = useState("");
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);

//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect(() => {
//     results.forEach((result) => {
//       setUserAns((prev) => prev + result?.transcript);
//     });
//   }, [results]);

//   useEffect(() => {
//     if (!isRecording && userAns.length > 10) {
//       updateUserAns();
//     }
//   }, [userAns]);

//   const startStopRecording = async () => {
//     if (isRecording) {
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   const updateUserAns = async () => {
//     console.log("User Answer: ", userAns);

//     setLoading(true);
//     const feedbackPrompt =
//       "Question: " +
//       mockInterviewQns[activeQnIndex]?.Question +
//       ", User Answer: " +
//       userAns +
//       ". Based on the question and user answer, please provide a rating and feedback for improvement. " +
//       "Provide your response in JSON format with 'rating' and 'feedback' fields. " +
//       "Keep the feedback brief (3-5 lines) and focus on areas of improvement.";

//     const result = await chatSession.sendMessage(feedbackPrompt);

//     const mockJsonResponse = result.response
//       .text()
//       .replace("```json", "")
//       .replace("```", "");

//     const jsonResponse = JSON.parse(mockJsonResponse);

//     const resp = await db.insert(UserAnswer).values({
//       mockIdRef: interviewData?.mockId,
//       question: mockInterviewQns[activeQnIndex]?.Question,
//       correctAns: mockInterviewQns[activeQnIndex]?.Answer,
//       userAns: userAns,
//       feedback: jsonResponse?.feedback,
//       rating: jsonResponse?.rating,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//       createdAt: moment().format("DD-MM-YYYY"),
//     });

//     if (resp) {
//       toast(
//         <div className="flex items-center">
//           <CheckCircleIcon className="text-green-500 mr-1 size-4" /> Your answer
//           has been saved successfully.
//         </div>
//       );
//       setUserAns("");
//       setResults([]);
//     }

//     setResults([]);
//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
//         <Image
//           src="/webcam.png"
//           width={200}
//           height={200}
//           className="absolute"
//           alt="Webcam"
//           priority
//         />
//         <Webcam
//           mirrored={true}
//           style={{
//             width: "100%",
//             height: 300,
//             zIndex: 10,
//           }}
//         />
//       </div>
//       <Button
//         disabled={loading}
//         variant="outline"
//         className="my-10 "
//         onClick={startStopRecording}
//       >
//         {isRecording ? (
//           <>
//             <h2 className="flex items-center gap-x-2 text-red-500 animate-pulse">
//               <StopCircleIcon />
//               Stop Recording
//             </h2>
//           </>
//         ) : (
//           <h2 className="flex items-center gap-x-2 text-primary">
//             <Mic />
//             Record Answer...
//           </h2>
//         )}
//       </Button>
//     </div>
//   );
// };

// export default RecordingAns;
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { useUser } from "@clerk/nextjs";

import {
  AlertTriangle,
  CheckCircle,
  Mic,
  StopCircle,
  Heart,
  Star,
  Sparkles,
  Video,
  Volume2,
  Smile,
  Camera
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import moment from "moment";
import { UserAnswer } from "@/utils/schema";

const RecordingAns = ({ mockInterviewQns, activeQnIndex, interviewData }) => {
  const [userAns, setUserAns] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [recordingPulse, setRecordingPulse] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.forEach((result) => {
      setUserAns((prev) => prev + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAns.length > 10) {
      updateUserAns();
    }
  }, [userAns]);

  useEffect(() => {
    // Sparkle animation every 3 seconds
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 3000);

    // Recording pulse animation
    if (isRecording) {
      const pulseInterval = setInterval(() => {
        setRecordingPulse(prev => !prev);
      }, 800);
      return () => {
        clearInterval(sparkleInterval);
        clearInterval(pulseInterval);
      };
    }

    return () => clearInterval(sparkleInterval);
  }, [isRecording]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAns = async () => {
    console.log("User Answer: ", userAns);

    setLoading(true);
    const feedbackPrompt =
      "Question: " +
      mockInterviewQns[activeQnIndex]?.Question +
      ", User Answer: " +
      userAns +
      ". Based on the question and user answer, please provide a rating and feedback for improvement. " +
      "Provide your response in JSON format with 'rating' and 'feedback' fields. " +
      "Keep the feedback brief (3-5 lines) and focus on areas of improvement.";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    const jsonResponse = JSON.parse(mockJsonResponse);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQns[activeQnIndex]?.Question,
      correctAns: mockInterviewQns[activeQnIndex]?.Answer,
      userAns: userAns,
      feedback: jsonResponse?.feedback,
      rating: jsonResponse?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast(
        <div className="flex items-center gap-2 p-2">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-1 rounded-full">
            <CheckCircle className="text-white w-4 h-4" />
          </div>
          <span className="font-semibold text-green-700">
            Your answer has been saved successfully! ✨
          </span>
        </div>
      );
      setUserAns("");
      setResults([]);
    }

    setResults([]);
    setLoading(false);
  };

  return (
    <div className="relative">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute top-20 right-16 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute top-32 right-32 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-40"></div>

      <div className="flex items-center justify-center flex-col">
        {/* Cute Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Video className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Record Your Answer
            </h2>
            <Camera className="w-6 h-6 text-cyan-500" />
          </div>
          <p className="text-gray-600 font-medium">
            Look confident and speak clearly! You're doing amazing! 💪✨
          </p>
        </div>

        {/* Webcam Container */}
        <div className="relative group">
          {/* Outer glow effect */}
          <div className={`absolute -inset-6 rounded-3xl opacity-40 blur-2xl transition-all duration-1000 ${
            isRecording 
              ? "bg-gradient-to-r from-red-400 via-pink-400 to-rose-500 animate-pulse" 
              : "bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300"
          }`}></div>
          
          {/* Main webcam container */}
          <div className={`relative flex flex-col justify-center items-center rounded-3xl p-8 border-4 shadow-2xl transition-all duration-500 transform ${
            isRecording 
              ? "bg-gradient-to-br from-red-50 to-pink-50 border-red-300 scale-105" 
              : "bg-gradient-to-br from-gray-900 to-black border-pink-300 hover:scale-102"
          }`}>
            
            {/* Decorative frame corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-pink-400 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-purple-400 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-cyan-400 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-pink-400 rounded-br-lg"></div>

            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
                  <div className={`w-3 h-3 bg-white rounded-full ${recordingPulse ? 'animate-ping' : ''}`}></div>
                  <span className="text-sm font-bold">RECORDING LIVE ✨</span>
                </div>
              </div>
            )}

            {/* Webcam placeholder/overlay */}
            <div className="relative">
              <Image
                src="/webcam.png"
                width={200}
                height={200}
                className="absolute z-10 opacity-20"
                alt="Webcam Overlay"
                priority
              />
              
              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <Webcam
                  mirrored={true}
                  style={{
                    width: "100%",
                    height: 300,
                    zIndex: 15,
                  }}
                  className="rounded-2xl"
                />
                
                {/* Cute overlay elements */}
                {!isRecording && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <Smile className="w-5 h-5 text-pink-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sparkle effect */}
            {sparkleAnimation && !isRecording && (
              <div className="absolute top-4 left-4 z-20">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Recording Button */}
        <div className="mt-12 flex flex-col items-center">
          {/* Status text */}
          <div className="mb-4 text-center">
            {isRecording ? (
              <div className="flex items-center gap-2 text-red-600">
                <Volume2 className="w-5 h-5 animate-bounce" />
                <span className="font-bold">Listening to your amazing answer... 🎤</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-600">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="font-medium">Ready when you are! 😊</span>
              </div>
            )}
          </div>

          {/* Main button */}
          <div className="relative group">
            <div className={`absolute -inset-4 rounded-3xl opacity-40 blur-xl transition-all duration-500 ${
              isRecording 
                ? "bg-gradient-to-r from-red-400 to-pink-500 animate-pulse" 
                : loading 
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500" 
                  : "bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 group-hover:opacity-60"
            }`}></div>

            <Button
              disabled={loading}
              onClick={startStopRecording}
              className={`relative px-8 py-6 rounded-2xl font-black text-lg shadow-2xl border-3 border-white transform transition-all duration-300 ${
                isRecording
                  ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white scale-110 animate-pulse"
                  : loading
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white hover:scale-110"
              }`}
            >
              <div className="flex items-center gap-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Magic... ✨</span>
                  </>
                ) : isRecording ? (
                  <>
                    <StopCircle className="w-6 h-6 animate-bounce" />
                    <span>Stop Recording</span>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6" />
                    <span>Start Recording</span>
                    <Star className="w-5 h-5 text-yellow-300" />
                  </>
                )}
              </div>
            </Button>
          </div>

          {/* Cute encouragement text */}
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-cyan-50 rounded-2xl px-6 py-3 border-2 border-pink-200 shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Take your time and speak from the heart! 💖
                </span>
                <Heart className="w-4 h-4 text-pink-400" />
              </div>
            </div>
          </div>

          {/* Real-time transcript preview */}
          {(interimResult || userAns) && (
            <div className="mt-6 max-w-md">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 border-2 border-purple-200 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-bold text-purple-700">Live Transcript:</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {userAns + (interimResult || "")}
                  {isRecording && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .border-3 {
          border-width: 3px;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default RecordingAns;