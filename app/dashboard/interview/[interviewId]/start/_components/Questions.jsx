// import { Lightbulb, Volume2 } from "lucide-react";

// const Questions = ({ mockInterviewQns, activeQnIndex }) => {
//   const textToSpeech = (text) => {
//     if ("speechSynthesis" in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     } else {
//       alert("Sorry, your browser does not support text to speech!");
//     }
//   };

//   return (
//     mockInterviewQns && (
//       <div className="p-5 border rounded-lg my-10">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {mockInterviewQns &&
//             mockInterviewQns.map((qn, index) => (
//               <h2
//                 key={index}
//                 className={`p-2  rounded-full text-xs md:text-sm text-center cursor-pointer ${
//                   activeQnIndex === index
//                     ? "bg-primary text-white"
//                     : "bg-secondary"
//                 }`}
//               >
//                 Question #{index + 1}
//               </h2>
//             ))}
//         </div>
//         <h2 className="my-5 md:text-lg">
//           {mockInterviewQns[activeQnIndex]?.Question}
//         </h2>
//         <Volume2
//           className="cursor-pointer text-green-500"
//           onClick={() =>
//             textToSpeech(mockInterviewQns[activeQnIndex]?.Question)
//           }
//         />

//         <div className="border rounded-lg p-5 bg-blue-100 mt-20">
//           <h2 className="flex gap-2 items-center text-primary">
//             <Lightbulb />
//             <strong>Note :</strong>
//           </h2>
//           <h2 className="text-sm text-primary my-2">
//             {process.env.NEXT_PUBLIC_QUESTION_NOTE}
//           </h2>
//         </div>
//       </div>
//     )
//   );
// };

// export default Questions;


import { Lightbulb, Volume2, Sparkles, Heart, Star, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const Questions = ({ mockInterviewQns, activeQnIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);

  useEffect(() => {
    // Sparkle animation every 5 seconds
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 5000);

    return () => clearInterval(sparkleInterval);
  }, []);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true);
      const speech = new SpeechSynthesisUtterance(text);
      speech.onend = () => setIsPlaying(false);
      speech.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech! 🥺");
    }
  };

  const getQuestionColors = (index) => {
    const colors = [
      "from-pink-400 to-rose-500",
      "from-purple-400 to-indigo-500", 
      "from-cyan-400 to-blue-500",
      "from-emerald-400 to-teal-500",
      "from-yellow-400 to-orange-500",
      "from-violet-400 to-purple-500"
    ];
    return colors[index % colors.length];
  };

  return (
    mockInterviewQns && (
      <div className="relative">
        {/* Floating decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute -top-1 -right-4 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-4 right-2 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-40"></div>

        <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl border-2 border-pink-200 shadow-2xl p-8 my-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 rounded-3xl opacity-30 blur-lg"></div>
          
          <div className="relative">
            {/* Cute Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <h1 className="text-2xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Interview Questions ✨
                </h1>
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Choose a question and let's practice together! 💪
              </p>
            </div>

            {/* Question Numbers Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {mockInterviewQns &&
                mockInterviewQns.map((qn, index) => (
                  <div
                    key={index}
                    className={`relative transform transition-all duration-300 hover:scale-110 cursor-pointer group ${
                      activeQnIndex === index ? "scale-110" : ""
                    }`}
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${getQuestionColors(index)} rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300`}></div>
                    
                    <div
                      className={`relative px-4 py-3 rounded-2xl text-center font-bold text-sm border-2 shadow-lg transition-all duration-300 ${
                        activeQnIndex === index
                          ? `bg-gradient-to-r ${getQuestionColors(index)} text-white border-white shadow-2xl`
                          : "bg-white/90 text-gray-700 border-white/50 hover:bg-white hover:shadow-xl"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Q{index + 1}</span>
                        {activeQnIndex === index && (
                          <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                        )}
                      </div>
                    </div>

                    {/* Active indicator */}
                    {activeQnIndex === index && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <span className="text-xs text-white font-bold">✨</span>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Current Question Display */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-cyan-50 rounded-2xl p-6 mb-6 border-2 border-purple-200 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`bg-gradient-to-r ${getQuestionColors(activeQnIndex)} p-3 rounded-2xl shadow-lg`}>
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-black text-lg text-gray-800">
                      Question #{activeQnIndex + 1}
                    </h3>
                    <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                    {mockInterviewQns[activeQnIndex]?.Question}
                  </p>
                </div>
              </div>

              {/* Audio Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => textToSpeech(mockInterviewQns[activeQnIndex]?.Question)}
                  className="group relative"
                >
                  <div className="absolute -inset-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                  
                  <div className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-white shadow-xl transform group-hover:scale-110 transition-all duration-300 border-2 border-white ${
                    isPlaying 
                      ? "bg-gradient-to-r from-orange-400 to-red-500 animate-pulse" 
                      : "bg-gradient-to-r from-green-400 to-emerald-500"
                  }`}>
                    <Volume2 className={`w-5 h-5 ${isPlaying ? "animate-bounce" : ""}`} />
                    <span>{isPlaying ? "Playing... 🎵" : "Listen to Question 🔊"}</span>
                    {!isPlaying && <span className="text-yellow-300">✨</span>}
                  </div>
                </button>
              </div>
            </div>

            {/* Cute Note Section */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200 rounded-3xl opacity-40 group-hover:opacity-60 blur-lg transition-all duration-300"></div>
              
              <div className="relative bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-3 rounded-2xl shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    {sparkleAnimation && (
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-black text-blue-700 text-lg">Important Note</h3>
                      <Star className="w-4 h-4 text-yellow-400" />
                    </div>
                    
                    <p className="text-blue-700 leading-relaxed font-medium">
                      {process.env.NEXT_PUBLIC_QUESTION_NOTE || "Practice makes perfect! Take your time to think through each question carefully. Remember, this is a safe space to learn and grow! 🌟"}
                    </p>
                    
                    <div className="flex items-center gap-1 mt-3">
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-blue-600 font-semibold">You've got this! 💪</span>
                      <Heart className="w-4 h-4 text-pink-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Questions;