// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
//       <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
//         Welcome to <span className="text-blue-600"> AI Interview Mocker</span>
//       </h1>
//       <p className="text-gray-600 mb-10 max-w-md">
//         Practice job interviews with AI, get instant feedback, and improve your
//         performance — anytime, anywhere.
//       </p>
//       <div className="flex gap-4">
//         <Link href="/sign-in">
//           <Button className="px-6 py-2">Login</Button>
//         </Link>
//         <Link href="/sign-up">
//           <Button variant="outline" className="px-6 py-2">
//             Register
//           </Button>
//         </Link>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Brain, 
  Video, 
  Code, 
  FileText, 
  Star, 
  Heart, 
  Sparkles, 
  Wand2, 
  Rocket, 
  Trophy, 
  Crown, 
  Target,
  PlayCircle,
  CheckCircle,
  MessageSquare,
  Camera,
  Mic,
  BarChart3,
  Zap,
  ArrowRight,
  Shield,
  Award,
  TrendingUp,
  ChevronDown,
  MonitorPlay,
  Headphones,
  BookOpen,
  Lightbulb,
  Coffee,
  Timer,
  Smile
} from "lucide-react";

export default function Home() {
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 4000);

    const demoInterval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoScenarios.length);
    }, 4000);

    return () => {
      clearInterval(sparkleInterval);
      clearInterval(demoInterval);
    };
  }, []);

  const demoScenarios = [
    {
      title: "Mock Interview in Action",
      description: "Watch AI generate questions in real-time",
      icon: <Brain className="w-6 h-6" />,
      preview: "AI: 'Tell me about your experience with React...'",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "DSA Problem Solving",
      description: "Step-by-step coding interview practice",
      icon: <Code className="w-6 h-6" />,
      preview: "Problem: Two Sum - Let's break it down...",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Resume Analysis",
      description: "Smart parsing of your experience",
      icon: <FileText className="w-6 h-6" />,
      preview: "Found 3 projects, 5 skills, generating questions...",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Video Practice Session",
      description: "Record and review your responses",
      icon: <Video className="w-6 h-6" />,
      preview: "🔴 Recording... Confidence level: Rising!",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const interactiveFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant AI Feedback",
      description: "Get detailed analysis in seconds, not days",
      highlight: "3x faster than human reviewers",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <MonitorPlay className="w-8 h-8" />,
      title: "Live Interview Simulation",
      description: "Practice with realistic interview environments",
      highlight: "Feels like the real thing",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Speech-to-Text Magic",
      description: "Speak naturally, we'll handle the typing",
      highlight: "99% accuracy rate",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Adaptive Learning",
      description: "Questions get smarter as you improve",
      highlight: "Personalized difficulty curve",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const beforeAfter = [
    {
      before: "😰 Nervous about interviews",
      after: "😎 Confident and prepared",
      icon: <Smile className="w-6 h-6" />
    },
    {
      before: "🤔 Unsure about answers",
      after: "💡 Clear, structured responses",
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      before: "⏰ Limited practice time",
      after: "🚀 Practice anytime, anywhere",
      icon: <Timer className="w-6 h-6" />
    },
    {
      before: "📚 Generic interview prep",
      after: "🎯 Personalized to your profile",
      icon: <Target className="w-6 h-6" />
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Floating decorative elements */}
      <div className="fixed top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60 z-10"></div>
      <div className="fixed top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60 z-10"></div>
      <div className="fixed top-32 left-32 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60 z-10"></div>
      <div className="fixed bottom-20 right-40 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60 z-10"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 via-purple-400/10 to-cyan-400/10"></div>
        <div className="absolute top-20 left-20 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-32 right-32 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-40 left-40 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Main Content */}
          <div className="text-left">
            <div className="relative inline-block group mb-8">
              <div className="absolute -inset-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 group-hover:opacity-40 blur-2xl transition-all duration-500"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-2xl transform group-hover:rotate-12 transition-all duration-500">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-8 h-8 text-yellow-400" />
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      PersonaIQ
                    </span>
                    <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                  </div>
                  {sparkleAnimation && (
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-10 h-10 text-yellow-400 animate-spin" />
                    </div>
                  )}
                </div>
                
                <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
                  Interview Like a Pro,
                  <br />
                  <span className="flex items-center gap-3 mt-2">
                    Land Like a 
                    <Rocket className="w-12 h-12 text-cyan-500 animate-pulse" />
                    Star
                  </span>
                </h1>
              </div>
            </div>

            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-8 leading-relaxed">
              <Sparkles className="inline w-6 h-6 text-purple-500 mr-2" />
              Stop stressing about interviews! Our AI-powered platform makes 
              interview prep <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">fun, personalized, and incredibly effective</span>. 
              Practice anytime, get instant feedback, and watch your confidence soar! ✨
            </p>

            {/* Quick Benefits */}
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { icon: <Timer className="w-5 h-5" />, text: "Practice in just 10 minutes" },
                { icon: <Zap className="w-5 h-5" />, text: "Get instant AI feedback" },
                { icon: <Shield className="w-5 h-5" />, text: "100% personalized to you" },
                { icon: <Coffee className="w-5 h-5" />, text: "No boring generic questions" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/70 rounded-xl shadow-lg backdrop-blur-sm border border-purple-200">
                  <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg">
                    {benefit.icon}
                    <span className="text-white"></span>
                  </div>
                  <span className="font-bold text-gray-800">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-40 group-hover:opacity-60 blur-lg transition-all duration-300"></div>
                <Link href="/sign-up">
                  <Button className="relative px-8 py-4 text-lg font-black rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white shadow-2xl transform hover:scale-110 transition-all duration-300 border-0 w-full sm:w-auto">
                    <div className="flex items-center gap-3">
                      <PlayCircle className="w-6 h-6" />
                      <span>Try Free Now</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </Button>
                </Link>
              </div>
              
              <Link href="/sign-in">
                <Button className="px-8 py-4 text-lg font-black rounded-2xl bg-white hover:bg-gray-50 border-2 border-purple-300 hover:border-purple-500 text-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-pink-400" />
                    <span>I Have Account</span>
                  </div>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl p-8 border-2 border-white/50 shadow-2xl backdrop-blur-sm">
              
              {/* Decorations */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute top-8 right-10 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg">
                    <MonitorPlay className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Live Demo Magic ✨
                  </h3>
                </div>
                <p className="text-gray-600 font-medium">See PersonaIQ in action!</p>
              </div>

              {/* Demo Carousel */}
              <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl p-6 mb-6 min-h-48">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-300 text-center">
                    PersonaIQ Interview Session
                  </div>
                </div>
                
                <div className="text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-gradient-to-r ${demoScenarios[activeDemo].color} rounded-lg`}>
                      {demoScenarios[activeDemo].icon}
                      <span className="text-white"></span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{demoScenarios[activeDemo].title}</h4>
                      <p className="text-gray-300 text-sm">{demoScenarios[activeDemo].description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400">PersonaIQ Active</span>
                    </div>
                    <p className="text-cyan-300">{demoScenarios[activeDemo].preview}</p>
                  </div>
                </div>
              </div>

              {/* Demo Navigation Dots */}
              <div className="flex justify-center gap-2">
                {demoScenarios.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveDemo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeDemo 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="p-2 bg-white/80 rounded-full shadow-lg">
            <ChevronDown className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-pink-100/30 to-cyan-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Floating decorations */}
          <div className="absolute top-8 left-8 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-16 right-16 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-8 right-20 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

          <div className="text-center mb-20">
            <div className="relative inline-block group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-xl">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-6">
                  <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                  What Makes Us Special
                  <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
                </h2>
                <p className="text-xl font-bold text-gray-700 max-w-4xl mx-auto flex items-center justify-center gap-2">
                  <Rocket className="w-6 h-6 text-cyan-500" />
                  Experience the future of interview preparation with these game-changing features! 🚀
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {interactiveFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
                <div className={`relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl p-8 border-2 border-white/50 shadow-2xl backdrop-blur-sm transform transition-all duration-500 ${hoveredFeature === index ? 'scale-110 -rotate-2' : 'hover:scale-105'}`}>
                  
                  {/* Decorations */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-300 rounded-full animate-bounce opacity-60"></div>

                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-xl transform group-hover:rotate-12 transition-all duration-300`}>
                    {feature.icon}
                    <span className="text-white"></span>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-3 flex items-center gap-2">
                    {feature.title}
                    <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
                  </h3>
                  
                  <p className="text-gray-700 font-medium leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-20 border border-current`}>
                    <span className="text-sm font-bold">{feature.highlight}</span>
                  </div>

                  {hoveredFeature === index && (
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-purple-100/20 to-cyan-100/20 rounded-3xl pointer-events-none flex items-center justify-center">
                      <div className="text-6xl animate-bounce">✨</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After Transformation */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Floating decorations */}
          <div className="absolute top-8 left-8 w-4 h-4 bg-cyan-300 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-16 right-16 w-3 h-3 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>

          <div className="text-center mb-20">
            <div className="relative inline-block group">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-400 via-orange-400 to-green-400 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-green-500 rounded-2xl shadow-xl">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-green-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-6">
                  <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
                  Your Interview Transformation
                  <Sparkles className="w-8 h-8 text-green-500 animate-pulse" />
                </h2>
                <p className="text-xl font-bold text-gray-700 max-w-4xl mx-auto flex items-center justify-center gap-2">
                  <Wand2 className="w-6 h-6 text-orange-500" />
                  Watch how PersonaIQ transforms your interview game completely! 🎯
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beforeAfter.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-400 via-orange-400 to-green-400 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-green-50/30 rounded-3xl p-8 border-2 border-white/50 shadow-2xl backdrop-blur-sm transform hover:scale-110 transition-all duration-300">
                  
                  {/* Decorations */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-orange-300 rounded-full animate-pulse opacity-60"></div>
                  
                  <div className="text-center">
                    <div className="p-4 bg-gradient-to-r from-red-500 to-green-500 rounded-2xl w-fit mx-auto mb-6 shadow-xl">
                      {item.icon}
                      <span className="text-white"></span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                        <p className="font-bold text-red-800 text-sm">BEFORE</p>
                        <p className="text-gray-700 font-medium">{item.before}</p>
                      </div>
                      
                      <div className="flex justify-center">
                        <ArrowRight className="w-8 h-8 text-gray-400 transform rotate-90 md:rotate-0" />
                      </div>
                      
                      <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                        <p className="font-bold text-green-800 text-sm">AFTER</p>
                        <p className="text-gray-700 font-medium">{item.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating decorations */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
        <div className="absolute top-16 right-16 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-20 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-16 right-32 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="relative inline-block group mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-white/40 rounded-3xl blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl">
                  <Award className="w-12 h-12 text-white" />
                </div>
                {sparkleAnimation && (
                  <div className="absolute -top-4 -right-4">
                    <Sparkles className="w-12 h-12 text-yellow-300 animate-spin" />
                  </div>
                )}
              </div>
              <h2 className="text-5xl font-black text-white flex items-center justify-center gap-3 mb-8">
                <Star className="w-10 h-10 text-yellow-300 animate-pulse" />
                Ready to Ace Every Interview?
                <Heart className="w-10 h-10 text-pink-300 animate-pulse" />
              </h2>
            </div>
          </div>
          
          <p className="text-2xl font-bold text-white/90 mb-12 flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-300" />
            Join the interview revolution! Start practicing in under 2 minutes ⚡
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-white/30 to-white/50 rounded-2xl blur-lg"></div>
              <Link href="/sign-up">
                <Button className="relative bg-white text-pink-600 font-black px-12 py-6 text-xl rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 inline-flex items-center gap-3 border-0">
                  <PlayCircle className="w-6 h-6" />
                  <span>Start Free Practice</span>
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </Button>
              </Link>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/30 rounded-2xl blur-lg"></div>
              <Link href="/dashboard/howitworks">
                <Button className="relative border-3 border-white text-white font-black px-12 py-6 text-xl rounded-2xl hover:bg-white hover:text-pink-600 transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-3 backdrop-blur-sm">
                  <MonitorPlay className="w-6 h-6" />
                  <span>See How It Works</span>
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-white/80 text-lg font-medium">
            <p className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              No credit card required • Start free forever • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}