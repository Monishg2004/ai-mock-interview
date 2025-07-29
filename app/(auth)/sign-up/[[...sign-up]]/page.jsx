import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="AI Interview Mocker"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to AI Interview Mocker 🦑
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Practice makes perfect. Let's refine your interview skills
              together.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to AI Interview Mocker 🦑
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Practice makes perfect. Let's refine your interview skills
                together.
              </p>
            </div>

            <SignUp fallbackRedirectUrl="/dashboard" />
          </div>
        </main>
      </div>
    </section>
  );
}

// "use client";

// import { SignUp, useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { 
//   Brain, 
//   Code, 
//   Target, 
//   Users, 
//   Award, 
//   Sparkles, 
//   Star, 
//   Heart, 
//   Rocket,
//   LoaderCircle,
//   AlertTriangle,
//   CheckCircle,
//   Wand2,
//   Crown,
//   Zap,
//   UserPlus,
//   Gift,
//   Shield,
//   TrendingUp,
//   Lightbulb,
//   Globe,
//   Clock,
//   ArrowRight
// } from "lucide-react";

// export default function Page() {
//   const { isSignedIn, isLoaded } = useUser();
//   const router = useRouter();
//   const [isRedirecting, setIsRedirecting] = useState(false);
//   const [sparkleAnimation, setSparkleAnimation] = useState(false);

//   useEffect(() => {
//     const sparkleInterval = setInterval(() => {
//       setSparkleAnimation(true);
//       setTimeout(() => setSparkleAnimation(false), 1000);
//     }, 3000);
//     return () => clearInterval(sparkleInterval);
//   }, []);

//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       setIsRedirecting(true);
//       // Add a small delay to prevent infinite redirects
//       const timer = setTimeout(() => {
//         router.push("/dashboard");
//       }, 100);
//       return () => clearTimeout(timer);
//     }
//   }, [isSignedIn, isLoaded, router]);

//   // Show loading state while checking authentication
//   if (!isLoaded || isRedirecting) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-6">
//         {/* Floating decorative elements */}
//         <div className="fixed top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
//         <div className="fixed top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
//         <div className="fixed bottom-20 right-40 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
        
//         <div className="text-center">
//           <div className="relative group">
//             <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-30 blur-xl"></div>
//             <div className="relative bg-gradient-to-br from-white via-pink-50/50 to-purple-50/50 rounded-3xl shadow-2xl p-12 border-2 border-white/50 backdrop-blur-sm">
//               <div className="p-6 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-xl mb-6 w-fit mx-auto">
//                 <LoaderCircle className="w-12 h-12 text-white animate-spin" />
//               </div>
//               <h2 className="text-2xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
//                 {isRedirecting ? "Setting up your account..." : "Loading..."}
//               </h2>
//               <div className="flex items-center justify-center gap-2">
//                 <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
//                 <span className="text-gray-600 font-medium">Please wait</span>
//                 <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isSignedIn) {
//     return null;
//   }

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
//       {/* Floating decorative elements */}
//       <div className="fixed top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
//       <div className="fixed top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
//       <div className="fixed top-32 left-32 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
//       <div className="fixed bottom-20 right-40 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
//       <div className="fixed bottom-32 left-20 w-2 h-2 bg-green-300 rounded-full animate-pulse opacity-60"></div>

//       <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        
//         {/* Left Side - Hero Section */}
//         <section className="relative flex h-32 items-end bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 lg:col-span-5 lg:h-full xl:col-span-6">
          
//           {/* Background Image with Overlay */}
//           <div className="absolute inset-0">
//             <img
//               alt="AI Interview Mocker"
//               src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
//               className="h-full w-full object-cover opacity-40"
//             />
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-cyan-900/50"></div>
//           </div>

//           {/* Floating decorative elements on hero */}
//           <div className="absolute top-20 left-20 w-6 h-6 bg-pink-400/30 rounded-full animate-bounce"></div>
//           <div className="absolute top-40 right-32 w-4 h-4 bg-purple-400/30 rounded-full animate-pulse"></div>
//           <div className="absolute bottom-40 left-40 w-5 h-5 bg-cyan-400/30 rounded-full animate-ping"></div>

//           <div className="hidden lg:relative lg:block lg:p-12 z-10">
            
//             {/* Logo */}
//             <div className="relative group mb-8">
//               <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-50 blur-lg"></div>
//               <div className="relative bg-gradient-to-br from-white/10 to-purple-500/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-xl shadow-xl">
//                     <Brain className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-black text-white">AI Interview</h3>
//                     <p className="text-white/80 text-sm font-medium">Mocker Platform</p>
//                   </div>
//                   {sparkleAnimation && (
//                     <Sparkles className="w-6 h-6 text-yellow-400 animate-spin ml-auto" />
//                   )}
//                 </div>
//               </div>
//             </div>

//             <h2 className="text-4xl font-black text-white mb-6 leading-tight">
//               Start Your Journey with 
//               <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                 AI Interview Mastery ✨
//               </span>
//             </h2>

//             <p className="text-xl leading-relaxed text-white/90 font-medium mb-8">
//               Join thousands of successful candidates who've mastered their interviews 
//               with our AI-powered platform. Your dream job awaits! 🚀
//             </p>

//             {/* Success Stats */}
//             <div className="grid grid-cols-2 gap-6 mb-8">
//               <div className="text-center">
//                 <div className="text-3xl font-black text-white mb-2">10K+</div>
//                 <p className="text-white/80 text-sm font-medium">Successful Interviews</p>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-black text-white mb-2">95%</div>
//                 <p className="text-white/80 text-sm font-medium">Success Rate</p>
//               </div>
//             </div>

//             {/* What you'll get */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
//                   <CheckCircle className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-white font-bold">Personalized AI feedback</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg">
//                   <Target className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-white font-bold">Industry-specific questions</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
//                   <TrendingUp className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-white font-bold">Progress tracking & analytics</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
//                   <Crown className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-white font-bold">Premium interview strategies</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Right Side - Sign Up Form */}
//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//           <div className="max-w-xl lg:max-w-3xl w-full">
            
//             {/* Mobile Header */}
//             <div className="relative -mt-16 block lg:hidden mb-8">
//               <div className="text-center">
//                 <div className="relative group inline-block mb-6">
//                   <div className="absolute -inset-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-30 blur-xl"></div>
//                   <div className="relative inline-flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 text-white shadow-2xl">
//                     <Brain className="w-10 h-10" />
//                     {sparkleAnimation && (
//                       <div className="absolute -top-2 -right-2">
//                         <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <h1 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-2">
//                   <Star className="w-7 h-7 text-yellow-400 animate-pulse" />
//                   AI Interview Mocker
//                   <Heart className="w-7 h-7 text-pink-400 animate-pulse" />
//                 </h1>

//                 <p className="text-lg leading-relaxed text-gray-600 font-medium">
//                   Start your journey to interview mastery today! ✨
//                 </p>
//               </div>
//             </div>

//             {/* Sign Up Section */}
//             <div className="relative group">
//               <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-2xl"></div>
//               <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden">
                
//                 {/* Decorative elements */}
//                 <div className="absolute top-6 right-6 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
//                 <div className="absolute top-10 right-12 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
//                 <div className="absolute bottom-6 left-6 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 p-8 border-b border-purple-100">
//                   <div className="text-center">
//                     <div className="flex items-center justify-center gap-3 mb-4">
//                       <div className="p-3 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-xl shadow-xl">
//                         <UserPlus className="w-8 h-8 text-white" />
//                       </div>
//                     </div>
                    
//                     <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3">
//                       Join the Community! 🎉
//                     </h2>
                    
//                     <p className="text-gray-600 font-medium flex items-center justify-center gap-2 mb-4">
//                       <Gift className="w-4 h-4 text-purple-500" />
//                       Create your account and start practicing interviews for free
//                       <Sparkles className="w-4 h-4 text-pink-500" />
//                     </p>

//                     {/* Quick Benefits */}
//                     <div className="grid grid-cols-3 gap-4 mt-6">
//                       <div className="text-center">
//                         <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg w-fit mx-auto mb-2 shadow-lg">
//                           <Clock className="w-4 h-4 text-white" />
//                         </div>
//                         <p className="text-xs font-bold text-gray-700">Setup in 2 min</p>
//                       </div>
//                       <div className="text-center">
//                         <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg w-fit mx-auto mb-2 shadow-lg">
//                           <Shield className="w-4 h-4 text-white" />
//                         </div>
//                         <p className="text-xs font-bold text-gray-700">100% Secure</p>
//                       </div>
//                       <div className="text-center">
//                         <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg w-fit mx-auto mb-2 shadow-lg">
//                           <Gift className="w-4 h-4 text-white" />
//                         </div>
//                         <p className="text-xs font-bold text-gray-700">Free Forever</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Sign Up Form Container */}
//                 <div className="p-8">
//                   <div className="relative">
                    
//                     {/* Custom styling for Clerk SignUp component */}
//                     <style jsx global>{`
//                       .cl-rootBox {
//                         width: 100%;
//                       }
//                       .cl-card {
//                         background: transparent !important;
//                         box-shadow: none !important;
//                         border: none !important;
//                       }
//                       .cl-headerTitle {
//                         color: #7c3aed !important;
//                         font-weight: 800 !important;
//                         font-size: 1.5rem !important;
//                       }
//                       .cl-headerSubtitle {
//                         color: #6b7280 !important;
//                         font-weight: 500 !important;
//                       }
//                       .cl-formFieldInput {
//                         border-radius: 12px !important;
//                         border: 2px solid #e5e7eb !important;
//                         padding: 12px 16px !important;
//                         font-weight: 500 !important;
//                         transition: all 0.3s ease !important;
//                       }
//                       .cl-formFieldInput:focus {
//                         border-color: #8b5cf6 !important;
//                         box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
//                       }
//                       .cl-formButtonPrimary {
//                         background: linear-gradient(to right, #ec4899, #8b5cf6, #06b6d4) !important;
//                         border: none !important;
//                         border-radius: 12px !important;
//                         padding: 12px 24px !important;
//                         font-weight: 700 !important;
//                         font-size: 1rem !important;
//                         transition: all 0.3s ease !important;
//                         text-transform: none !important;
//                       }
//                       .cl-formButtonPrimary:hover {
//                         transform: scale(1.05) !important;
//                         box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3) !important;
//                       }
//                       .cl-socialButtonsBlockButton {
//                         border-radius: 12px !important;
//                         border: 2px solid #e5e7eb !important;
//                         padding: 12px !important;
//                         font-weight: 600 !important;
//                         transition: all 0.3s ease !important;
//                       }
//                       .cl-socialButtonsBlockButton:hover {
//                         border-color: #8b5cf6 !important;
//                         transform: translateY(-2px) !important;
//                         box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15) !important;
//                       }
//                       .cl-dividerLine {
//                         background: linear-gradient(to right, #ec4899, #8b5cf6, #06b6d4) !important;
//                         height: 2px !important;
//                       }
//                       .cl-dividerText {
//                         background: linear-gradient(to right, #ec4899, #8b5cf6, #06b6d4) !important;
//                         -webkit-background-clip: text !important;
//                         background-clip: text !important;
//                         color: transparent !important;
//                         font-weight: 700 !important;
//                       }
//                       .cl-footerActionLink {
//                         color: #8b5cf6 !important;
//                         font-weight: 600 !important;
//                       }
//                       .cl-footerActionLink:hover {
//                         color: #7c3aed !important;
//                       }
//                       .cl-alert {
//                         border-radius: 12px !important;
//                         border: 2px solid #fca5a5 !important;
//                         background: #fef2f2 !important;
//                       }
//                       .cl-alertText {
//                         color: #dc2626 !important;
//                         font-weight: 500 !important;
//                       }
//                       .cl-formFieldLabel {
//                         color: #374151 !important;
//                         font-weight: 600 !important;
//                       }
//                     `}</style>

//                     <SignUp 
//                       fallbackRedirectUrl="/dashboard"
//                       signInUrl="/sign-in"
//                       appearance={{
//                         elements: {
//                           rootBox: "w-full",
//                           card: "bg-transparent shadow-none border-0",
//                           headerTitle: "text-2xl font-black text-purple-600",
//                           headerSubtitle: "text-gray-600 font-medium",
//                           socialButtonsBlockButton: "border-2 border-gray-200 hover:border-purple-400 rounded-xl font-semibold transition-all duration-300",
//                           formButtonPrimary: "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 border-0 rounded-xl font-bold transition-all duration-300 transform hover:scale-105",
//                           formFieldInput: "rounded-xl border-2 border-gray-200 focus:border-purple-400 font-medium transition-all duration-300",
//                           formFieldLabel: "text-gray-700 font-semibold",
//                           footerActionLink: "text-purple-600 hover:text-purple-700 font-semibold"
//                         }
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Bottom Benefits */}
//                 <div className="bg-gradient-to-r from-gray-50/50 via-purple-50/50 to-pink-50/50 p-6 border-t border-purple-100">
//                   <div className="text-center mb-4">
//                     <h3 className="text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//                       What you'll get instantly:
//                     </h3>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg">
//                         <Code className="w-4 h-4 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-800">Tech Interview Practice</p>
//                         <p className="text-xs text-gray-600">DSA, System Design & More</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
//                         <Users className="w-4 h-4 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-800">Behavioral Questions</p>
//                         <p className="text-xs text-gray-600">STAR Method & Leadership</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
//                         <Brain className="w-4 h-4 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-800">AI-Powered Feedback</p>
//                         <p className="text-xs text-gray-600">Real-time Improvements</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
//                         <Crown className="w-4 h-4 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-800">Career Roadmaps</p>
//                         <p className="text-xs text-gray-600">Personalized Growth Plans</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Trust Indicators & Social Proof */}
//             <div className="mt-8 space-y-6">
              
//               {/* Trust Badges */}
//               <div className="text-center">
//                 <div className="relative group inline-block">
//                   <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-lg"></div>
//                   <div className="relative bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-4">
//                     <div className="flex items-center justify-center gap-6">
//                       <div className="flex items-center gap-2">
//                         <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
//                           <CheckCircle className="w-4 h-4 text-white" />
//                         </div>
//                         <span className="text-sm font-bold text-gray-700">Secure & Private</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="p-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
//                           <Zap className="w-4 h-4 text-white" />
//                         </div>
//                         <span className="text-sm font-bold text-gray-700">Free to Start</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
//                           <Star className="w-4 h-4 text-white" />
//                         </div>
//                         <span className="text-sm font-bold text-gray-700">AI Powered</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Social Proof */}
//               <div className="relative group">
//                 <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-20 blur-lg"></div>
//                 <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                  
//                   {/* Decorations */}
//                   <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-300 rounded-full animate-pulse opacity-60"></div>
                  
//                   <div className="text-center">
//                     <h3 className="text-lg font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
//                       Join Successful Candidates from Top Companies 🏆
//                     </h3>
                    
//                     <div className="grid grid-cols-4 gap-4">
//                       <div className="text-center">
//                         <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl w-fit mx-auto mb-2 shadow-lg">
//                           <Globe className="w-6 h-6 text-white" />
//                         </div>
//                         <p className="text-xs font-bold text-gray-700">Google</p>
//                       </div>
//                       <div className="text-center">
//                         <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl w-fit mx-auto mb-2 shadow-lg">
//                           <Rocket className="w-6 h-6 text-white" />
//                         </div>
//                         <p className="text-xs font-bold text-gray-700">Meta</p>
//                       </div>
//                       <div className="text-center">
//                         <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl w-fit mx-auto mb-2 shadow-lg">
//                           <TrendingUp className="w-6 h-6 text-white" />
//                         </div>
//                         <p className="text-xs font-bold text-gray-700">Amazon</p>
//                       </div>
//                       <div className="text-center">
//                         <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl w-fit mx-auto mb-2 shadow-lg">
//                           <Crown className="w-6 h-6 text-white" />
//                         </div>
//                         <p className="text-xs font-bold text-gray-700">Apple</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Call to Action */}
//               <div className="text-center">
//                 <div className="relative group inline-block">
//                   <div className="absolute -inset-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
//                   <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
//                     <div className="flex items-center justify-center gap-3 text-gray-700">
//                       <Lightbulb className="w-5 h-5 text-yellow-500" />
//                       <span className="font-bold">Ready to ace your next interview?</span>
//                       <ArrowRight className="w-5 h-5 text-purple-500" />
//                     </div>
//                     <p className="text-sm text-gray-600 font-medium mt-2">
//                       Create your account above and start practicing immediately! 
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// }