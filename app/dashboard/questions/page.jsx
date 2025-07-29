
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { 
//   LoaderCircle, 
//   Upload, 
//   Code, 
//   MessageSquare, 
//   Brain, 
//   Timer, 
//   Bug, 
//   CheckCircle,
//   Star,
//   Heart,
//   Sparkles,
//   Wand2,
//   Rocket,
//   Trophy,
//   Target,
//   Zap,
//   AlertTriangle,
//   Search,
//   Eye,
//   Lightbulb,
//   HelpCircle
// } from 'lucide-react';
// import { chatSession } from '@/utils/GeminiAIModel';

// const DSAInterviewQuestions = () => {
//   const { user } = useUser();
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [currentPhase, setCurrentPhase] = useState('selection');
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [customProblem, setCustomProblem] = useState('');
//   const [userResponse, setUserResponse] = useState('');
//   const [conversation, setConversation] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showUploadDialog, setShowUploadDialog] = useState(false);
//   const [phaseScores, setPhaseScores] = useState({});
//   const [currentCode, setCurrentCode] = useState('');
//   const [sparkleAnimation, setSparkleAnimation] = useState(false);
//   const [showHintButton, setShowHintButton] = useState(false);
//   const [currentHint, setCurrentHint] = useState('');
//   const [isHintLoading, setIsHintLoading] = useState(false);

//   useEffect(() => {
//     const sparkleInterval = setInterval(() => {
//       setSparkleAnimation(true);
//       setTimeout(() => setSparkleAnimation(false), 1000);
//     }, 4000);
//     return () => clearInterval(sparkleInterval);
//   }, []);

//   const categories = ['All', 'Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching'];

//   const dsaProblems = [
//     {
//       id: 1,
//       title: "Two Sum",
//       difficulty: "Easy",
//       category: "Arrays",
//       description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//       examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\n\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]",
//       constraints: [
//         "2 <= nums.length <= 10⁴",
//         "-10⁹ <= nums[i] <= 10⁹",
//         "-10⁹ <= target <= 10⁹",
//         "Only one valid answer exists."
//       ]
//     },
//     {
//       id: 2,
//       title: "Valid Parentheses",
//       difficulty: "Easy", 
//       category: "Strings",
//       description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
//       examples: "Input: s = '()'\nOutput: true\n\nInput: s = '()[]{}'\nOutput: true\n\nInput: s = '(]'\nOutput: false",
//       constraints: [
//         "1 <= s.length <= 10⁴",
//         "s consists of parentheses only '()[]{}'."
//       ]
//     },
//     {
//       id: 3,
//       title: "Binary Tree Inorder Traversal",
//       difficulty: "Medium",
//       category: "Trees",
//       description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
//       examples: "Input: root = [1,null,2,3]\nOutput: [1,3,2]\n\nInput: root = []\nOutput: []\n\nInput: root = [1]\nOutput: [1]",
//       constraints: [
//         "The number of nodes in the tree is in the range [0, 100].",
//         "-100 <= Node.val <= 100"
//       ]
//     },
//     {
//       id: 4,
//       title: "Longest Common Subsequence",
//       difficulty: "Medium",
//       category: "Dynamic Programming", 
//       description: "Given two strings text1 and text2, return the length of their longest common subsequence.",
//       examples: "Input: text1 = 'abcde', text2 = 'ace'\nOutput: 3\n\nInput: text1 = 'abc', text2 = 'abc'\nOutput: 3\n\nInput: text1 = 'abc', text2 = 'def'\nOutput: 0",
//       constraints: [
//         "1 <= text1.length, text2.length <= 1000",
//         "text1 and text2 consist of only lowercase English characters."
//       ]
//     },
//     {
//       id: 5,
//       title: "Number of Islands",
//       difficulty: "Medium",
//       category: "Graphs",
//       description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
//       examples: "Input: grid = [['1','1','0'],['1','1','0'],['0','0','1']]\nOutput: 2\n\nInput: grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]\nOutput: 1",
//       constraints: [
//         "m == grid.length",
//         "n == grid[i].length",
//         "1 <= m, n <= 300",
//         "grid[i][j] is '0' or '1'."
//       ]
//     }
//   ];

//   const filteredProblems = selectedCategory === 'All' 
//     ? dsaProblems 
//     : dsaProblems.filter(problem => problem.category === selectedCategory);

//   const phaseConfig = {
//     selection: { icon: Code, title: "Choose Problem", color: "from-blue-400 to-indigo-500" },
//     intuition: { icon: Brain, title: "Intuition", color: "from-purple-400 to-pink-500" },
//     algorithm: { icon: MessageSquare, title: "Algorithm", color: "from-green-400 to-emerald-500" },
//     complexity: { icon: Timer, title: "Complexity", color: "from-yellow-400 to-orange-500" },
//     coding: { icon: Code, title: "Coding", color: "from-red-400 to-rose-500" },
//     debugging: { icon: Bug, title: "Debugging", color: "from-orange-400 to-amber-500" },
//     evaluation: { icon: Eye, title: "Code", color: "from-indigo-400 to-purple-500" },
//     feedback: { icon: CheckCircle, title: "Final", color: "from-emerald-400 to-teal-500" }
//   };

//   const startInterview = async (problem) => {
//     setSelectedProblem(problem);
//     setCurrentPhase('intuition');
//     setConversation([]);
//     setShowHintButton(false);
//     setCurrentHint('');
    
//     const constraintsText = problem.constraints ? problem.constraints.join('\n• ') : 'No specific constraints provided.';
    
//     const initialPrompt = `You are conducting a DSA interview for the problem: "${problem.title}".

//     Problem: ${problem.description}
//     Examples: ${problem.examples}
//     Constraints: ${constraintsText}

//     You are starting the INTUITION PHASE. In this phase, you should ONLY ask about the candidate's high-level approach and thinking process. DO NOT ask about:
//     - Specific algorithm implementation details
//     - Data structures to use
//     - Code or syntax
//     - Time/space complexity analysis
//     - Step-by-step algorithm

//     ONLY ask about:
//     - Their overall approach/strategy
//     - High-level thinking
//     - General direction to solve the problem

//     Start by asking: "What's your high-level approach to solve this problem? Just explain your general thinking and strategy."

//     Keep it short and conversational.`;

//     setLoading(true);
//     try {
//       const result = await chatSession.sendMessage(initialPrompt);
//       const aiResponse = result.response.text();
      
//       setConversation([{
//         type: 'ai',
//         message: aiResponse,
//         phase: 'intuition'
//       }]);
//     } catch (error) {
//       console.error('Error starting interview:', error);
//     }
//     setLoading(false);
//   };

//   const generateHint = async () => {
//     setIsHintLoading(true);
//     setCurrentHint('');
    
//     try {
//       let hintPrompt = '';
      
//       switch(currentPhase) {
//         case 'intuition':
//           hintPrompt = `The user is struggling with the intuition phase for ${selectedProblem.title}. 
//           Problem: ${selectedProblem.description}
          
//           Provide a helpful hint about the general approach. Examples:
//           - For Two Sum: "Think about what you've seen so far as you iterate through the array"
//           - For Valid Parentheses: "Consider what happens when you see an opening bracket vs closing bracket"
//           - For trees: "Think about which traversal order gives you the result you need"
          
//           Give ONE helpful hint about the high-level approach. Keep it short and don't give away the solution.`;
//           break;
          
//         case 'algorithm':
//           hintPrompt = `The user needs help with the algorithm phase for ${selectedProblem.title}.
//           Problem: ${selectedProblem.description}
          
//           Provide a hint about the specific algorithm or data structure:
//           - For Two Sum: "A HashMap can help you store what you've seen and check for complements"
//           - For Valid Parentheses: "A Stack is perfect for keeping track of opening brackets"
//           - For trees: "Recursion or a stack can help you traverse the tree"
          
//           Give ONE specific hint about the algorithm approach.`;
//           break;
          
//         case 'complexity':
//           hintPrompt = `The user needs help with complexity analysis for ${selectedProblem.title}.
          
//           Provide a hint about analyzing time/space complexity:
//           - "Count how many times you visit each element"
//           - "Think about the space used by your data structures"
//           - "Consider nested loops vs single passes"
          
//           Give ONE hint about complexity analysis.`;
//           break;
          
//         case 'coding':
//           hintPrompt = `The user needs help implementing the code for ${selectedProblem.title}.
          
//           Provide a coding hint:
//           - "Start with the basic structure - initialization, loop, return"
//           - "Remember to handle edge cases like empty input"
//           - "Check your variable names and loop boundaries"
          
//           Give ONE helpful coding hint.`;
//           break;
          
//         case 'debugging':
//           hintPrompt = `The user needs help debugging their solution for ${selectedProblem.title}.
          
//           Provide a debugging hint:
//           - "Trace through the first example step by step"
//           - "Check if your solution handles edge cases"
//           - "Verify your return format matches the expected output"
          
//           Give ONE debugging hint.`;
//           break;
          
//         case 'evaluation':
//           hintPrompt = `The user needs help understanding their code for ${selectedProblem.title}.
          
//           Provide a hint about code understanding:
//           - "Think about what each line of your code is doing"
//           - "Consider what would happen if you changed one small part"
//           - "Think about edge cases your code handles"
          
//           Give ONE hint about code understanding.`;
//           break;
//       }
      
//       const result = await chatSession.sendMessage(hintPrompt);
//       setCurrentHint(result.response.text());
//     } catch (error) {
//       console.error('Error generating hint:', error);
//       setCurrentHint('Unable to generate hint. Please try again.');
//     }
//     setIsHintLoading(false);
//   };

//   const handleUserInput = async () => {
//     if (!userResponse.trim()) return;
    
//     const newUserMessage = {
//       type: 'user',
//       message: userResponse,
//       phase: currentPhase
//     };
    
//     setConversation(prev => [...prev, newUserMessage]);
//     setShowHintButton(false);
//     setCurrentHint('');
//     setLoading(true);
    
//     try {
//       let prompt = '';
      
//       switch(currentPhase) {
//         case 'intuition':
//           prompt = `You are in the INTUITION PHASE. The user responded: "${userResponse}"

//           Evaluate if their high-level approach shows good understanding. You should ONLY care about:
//           - Do they have a general strategy?
//           - Does their thinking make sense for this problem?
//           - Are they on the right track conceptually?

//           DO NOT evaluate:
//           - Specific algorithms or data structures
//           - Implementation details
//           - Complexity analysis

//           If their intuition is good enough, respond with: "Great! Let's discuss the specific algorithm now."
          
//           If their intuition needs work, ask ONE follow-up question about their general approach and end with: "HINT_NEEDED"
          
//           Keep response short and focused only on high-level thinking.`;
//           break;
          
//         case 'algorithm':
//           prompt = `You are in the ALGORITHM PHASE. The user responded: "${userResponse}"

//           Evaluate if they can explain the specific algorithm. You should ONLY care about:
//           - Can they explain the step-by-step process?
//           - Do they mention appropriate data structures?
//           - Is the algorithm correct?

//           DO NOT ask about:
//           - Time/space complexity
//           - Code implementation
//           - High-level intuition (already covered)

//           If their algorithm is clear and correct, respond with: "Excellent! Now let's analyze the complexity."
          
//           If their algorithm needs work, ask ONE specific question about the algorithm steps and end with: "HINT_NEEDED"
          
//           Keep response short and focused only on algorithm details.`;
//           break;
          
//         case 'complexity':
//           prompt = `You are in the COMPLEXITY PHASE. The user responded: "${userResponse}"

//           Evaluate their complexity analysis. You should ONLY care about:
//           - Can they identify time complexity?
//           - Can they identify space complexity?
//           - Is their analysis correct?

//           DO NOT ask about:
//           - Algorithm details (already covered)
//           - Code implementation
//           - Intuition

//           If their complexity analysis is correct, respond with: "Perfect! Let's implement the solution."
          
//           If their complexity analysis needs work, ask ONE question about time/space complexity and end with: "HINT_NEEDED"
          
//           Keep response short and focused only on complexity.`;
//           break;
          
//         case 'coding':
//           // Store the user's code for the evaluation phase
//           if (userResponse.includes('def ') || userResponse.includes('function ') || userResponse.includes('class ') || userResponse.includes('public ') || userResponse.includes('for ') || userResponse.includes('while ') || userResponse.includes('if ') || userResponse.includes('return')) {
//             setCurrentCode(userResponse);
//           }
          
//           prompt = `You are in the CODING PHASE. The user provided: "${userResponse}"

//           Evaluate their code implementation. You should ONLY care about:
//           - Is the code syntactically correct?
//           - Does it implement the algorithm we discussed?
//           - Are there obvious bugs?

//           DO NOT ask about:
//           - Algorithm explanation (already covered)
//           - Complexity (already covered)
//           - Code understanding (comes later)

//           If their code looks good, respond with: "Great! Let's test this with some examples."
          
//           If their code has issues, point out ONE specific problem and end with: "HINT_NEEDED"
          
//           Keep response short and focused only on code correctness.`;
//           break;
          
//         case 'debugging':
//           prompt = `You are in the DEBUGGING PHASE. The user responded: "${userResponse}"

//           Evaluate their debugging approach. You should ONLY care about:
//           - Can they test their solution?
//           - Can they identify and fix bugs?
//           - Does their solution work for the examples?

//           DO NOT ask about:
//           - Algorithm details (already covered)
//           - Code understanding (comes next)
//           - Complexity (already covered)

//           If their debugging is satisfactory, respond with: "Excellent! Now let's explore your code understanding."
          
//           If they need more debugging help, ask ONE specific debugging question and end with: "HINT_NEEDED"
          
//           Keep response short and focused only on testing/debugging.`;
//           break;

//         case 'evaluation':
//           prompt = `You are in the CODE EVALUATION PHASE. The user responded: "${userResponse}"

//           Current code: ${currentCode}
          
//           Evaluate their code understanding. You should ONLY ask about:
//           - Understanding of what their code does
//           - How small modifications would affect the solution
//           - Edge cases their code handles

//           Examples of good evaluation questions:
//           - "What if we removed this line - would it still work?"
//           - "How would you modify this to solve a similar problem?"
//           - "Why is this particular line necessary?"

//           If they show good code understanding, respond with: "Excellent understanding! Let's get your final feedback."
          
//           If they need to understand their code better, ask ONE specific question about code understanding and end with: "HINT_NEEDED"
          
//           Keep response short and focused only on code understanding.`;
//           break;
//       }
      
//       const result = await chatSession.sendMessage(prompt);
//       const aiResponse = result.response.text();
      
//       // Check if hint is needed
//       if (aiResponse.includes('HINT_NEEDED')) {
//         setShowHintButton(true);
//         const cleanResponse = aiResponse.replace('HINT_NEEDED', '').trim();
//         setConversation(prev => [...prev, {
//           type: 'ai',
//           message: cleanResponse,
//           phase: currentPhase
//         }]);
//       } else {
//         // Check for phase transitions based on specific keywords
//         let nextPhase = currentPhase;
//         if (aiResponse.toLowerCase().includes('specific algorithm now') && currentPhase === 'intuition') {
//           nextPhase = 'algorithm';
//         } else if (aiResponse.toLowerCase().includes('analyze the complexity') && currentPhase === 'algorithm') {
//           nextPhase = 'complexity';
//         } else if (aiResponse.toLowerCase().includes('implement the solution') && currentPhase === 'complexity') {
//           nextPhase = 'coding';
//         } else if (aiResponse.toLowerCase().includes('test this with some examples') && currentPhase === 'coding') {
//           nextPhase = 'debugging';
//         } else if (aiResponse.toLowerCase().includes('explore your code understanding') && currentPhase === 'debugging') {
//           nextPhase = 'evaluation';
//         } else if (aiResponse.toLowerCase().includes('final feedback') && currentPhase === 'evaluation') {
//           nextPhase = 'feedback';
//         }
        
//         setCurrentPhase(nextPhase);
//         setConversation(prev => [...prev, {
//           type: 'ai',
//           message: aiResponse,
//           phase: nextPhase
//         }]);
//       }
      
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
    
//     setUserResponse('');
//     setLoading(false);
//   };

//   const handleCustomProblem = async () => {
//     if (!customProblem.trim()) return;
    
//     const problem = {
//       id: 'custom',
//       title: "Custom Problem",
//       difficulty: "Unknown",
//       category: "Custom",
//       description: customProblem,
//       examples: "Custom problem uploaded by user",
//       constraints: ["Custom constraints as specified in the problem"]
//     };
    
//     setShowUploadDialog(false);
//     await startInterview(problem);
//   };

//   const generateFinalFeedback = async () => {
//     setLoading(true);
    
//     const prompt = `Generate final comprehensive feedback based on this entire interview conversation: ${JSON.stringify(conversation)}
    
//     Provide detailed scores (1-10) for:
//     1. Problem-solving intuition and approach
//     2. Algorithm design and explanation  
//     3. Complexity analysis accuracy
//     4. Code implementation quality
//     5. Debugging and testing skills
//     6. Code understanding and flexibility
//     7. Overall communication throughout the interview
    
//     Include specific strengths, areas for improvement, and overall assessment.
    
//     Format as a comprehensive interview feedback report.`;
    
//     try {
//       const result = await chatSession.sendMessage(prompt);
//       const feedback = result.response.text();
      
//       setConversation(prev => [...prev, {
//         type: 'ai',
//         message: feedback,
//         phase: 'feedback'
//       }]);
//       setCurrentPhase('feedback');
//     } catch (error) {
//       console.error('Error generating feedback:', error);
//     }
//     setLoading(false);
//   };

//   if (currentPhase !== 'selection' && selectedProblem) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
//         {/* Floating decorative elements */}
//         <div className="absolute top-10 left-20 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
//         <div className="absolute top-20 right-32 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
//         <div className="absolute top-32 left-40 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
        
//         <div className="max-w-6xl mx-auto">
//           {/* Cute Header */}
//           <div className="relative group mb-8">
//             <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
//             <div className="relative bg-gradient-to-br from-white via-pink-50/50 to-purple-50/50 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
//               {/* Floating decorations */}
//               <div className="absolute top-4 right-6 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
//               <div className="absolute top-6 right-12 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="relative">
//                     <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-xl">
//                       <Code className="w-8 h-8 text-white" />
//                     </div>
//                     {sparkleAnimation && (
//                       <div className="absolute -top-1 -right-1">
//                         <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <h1 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
//                       {selectedProblem.title}
//                       <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
//                     </h1>
//                     <div className="flex items-center gap-3 mt-2">
//                       <div className={`px-4 py-1.5 rounded-full text-white font-bold text-sm shadow-lg ${
//                         selectedProblem.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
//                         selectedProblem.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
//                         'bg-gradient-to-r from-red-400 to-rose-500'
//                       }`}>
//                         {selectedProblem.difficulty} ✨
//                       </div>
//                       <div className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-200 text-purple-700 font-bold text-sm">
//                         {selectedProblem.category} 💖
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <Button 
//                   variant="outline" 
//                   onClick={() => setCurrentPhase('selection')}
//                   className="px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Heart className="w-4 h-4 text-pink-400" />
//                     Back to Problems
//                   </div>
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Compact Phase Progress */}
//           <div className="relative group mb-6">
//             <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-xl opacity-15 blur-md"></div>
//             <div className="relative bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 rounded-xl shadow-lg p-4 border border-white/40 backdrop-blur-sm">
//               <div className="flex items-center gap-3 overflow-x-auto justify-center">
//                 {Object.entries(phaseConfig).map(([phase, config], index) => {
//                   const Icon = config.icon;
//                   const isActive = currentPhase === phase;
//                   const isCompleted = Object.keys(phaseConfig).indexOf(currentPhase) > index;
                  
//                   return (
//                     <div key={phase} className="flex items-center gap-1 min-w-fit">
//                       <div className="flex flex-col items-center gap-1">
//                         <div className={`relative w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md transform transition-all duration-300 ${
//                           isActive ? `bg-gradient-to-br ${config.color} scale-105 shadow-lg` : 
//                           isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 
//                           'bg-gradient-to-br from-gray-300 to-gray-400'
//                         }`}>
//                           <Icon size={14} />
//                           {isActive && (
//                             <div className="absolute -top-0.5 -right-0.5">
//                               <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
//                                 <span className="text-xs">✨</span>
//                               </div>
//                             </div>
//                           )}
//                           {isCompleted && (
//                             <div className="absolute -bottom-0.5 -right-0.5">
//                               <CheckCircle className="w-3 h-3 text-white bg-green-500 rounded-full" />
//                             </div>
//                           )}
//                         </div>
//                         <span className={`font-bold text-xs text-center ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
//                           {config.title}
//                         </span>
//                       </div>
//                       {index < Object.keys(phaseConfig).length - 2 && (
//                         <div className="w-4 h-0.5 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mx-1 opacity-50"></div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {/* Compact Problem Description with Constraints */}
//             <div className="lg:col-span-1">
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-15 blur-md"></div>
//                 <div className="relative bg-gradient-to-br from-white via-cyan-50/20 to-blue-50/20 rounded-xl shadow-lg border border-white/40 backdrop-blur-sm overflow-hidden">
                  
//                   <div className="p-4">
//                     <div className="flex items-center gap-2 mb-3">
//                       <div className="p-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-md">
//                         <Target className="w-4 h-4 text-white" />
//                       </div>
//                       <h3 className="text-lg font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
//                         Problem 📋
//                       </h3>
//                     </div>
                    
//                     <div className="space-y-3">
//                       <p className="text-xs text-gray-700 leading-relaxed font-medium bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-blue-100">
//                         {selectedProblem.description}
//                       </p>
                      
//                       <div>
//                         <h4 className="font-bold mb-2 text-gray-800 text-sm flex items-center gap-1">
//                           <Sparkles className="w-3 h-3 text-yellow-500" />
//                           Examples
//                         </h4>
//                         <pre className="text-xs bg-gradient-to-br from-gray-100 to-blue-100 p-3 rounded-lg border border-blue-200 whitespace-pre-wrap font-mono text-gray-800 shadow-inner max-h-24 overflow-y-auto">
//                           {selectedProblem.examples}
//                         </pre>
//                       </div>

//                       {/* Compact Constraints Section */}
//                       {selectedProblem.constraints && (
//                         <div>
//                           <h4 className="font-bold mb-2 text-gray-800 text-sm flex items-center gap-1">
//                             <AlertTriangle className="w-3 h-3 text-orange-500" />
//                             Constraints
//                           </h4>
//                           <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200 shadow-inner max-h-32 overflow-y-auto">
//                             <ul className="space-y-1">
//                               {selectedProblem.constraints.map((constraint, index) => (
//                                 <li key={index} className="text-xs text-gray-700 font-medium flex items-start gap-1">
//                                   <span className="text-orange-500 font-bold text-xs">•</span>
//                                   <span className="font-mono bg-white/60 px-1 py-0.5 rounded text-orange-800 text-xs leading-tight">
//                                     {constraint}
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Expanded Interview Conversation */}
//             <div className="lg:col-span-3">
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl opacity-15 blur-md"></div>
//                 <div className="relative bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 rounded-xl shadow-lg border border-white/40 backdrop-blur-sm h-[600px]">
                  
//                   <div className="p-6 h-full flex flex-col">
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg shadow-md">
//                         <MessageSquare className="w-5 h-5 text-white" />
//                       </div>
//                       <h3 className="text-xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
//                         Interview Discussion 💬
//                         <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
//                       </h3>
                      
//                       {/* Current Phase Indicator */}
//                       <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200">
//                         {React.createElement(phaseConfig[currentPhase]?.icon || Code, { className: "w-4 h-4 text-indigo-600" })}
//                         <span className="text-sm font-bold text-indigo-700 capitalize">{currentPhase} Phase ✨</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex-1 overflow-y-auto space-y-4 mb-4">
//                       {conversation.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                           <div className={`max-w-lg px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
//                             msg.type === 'user' 
//                               ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-pink-200' 
//                               : 'bg-gradient-to-r from-gray-100 to-purple-100 text-gray-800 border-2 border-purple-200'
//                           }`}>
//                             <p className="text-sm font-medium whitespace-pre-wrap">{msg.message}</p>
//                             {/* Phase indicator for AI messages */}
//                             {msg.type === 'ai' && msg.phase && (
//                               <div className="mt-2 text-xs opacity-75 flex items-center gap-1">
//                                 {React.createElement(phaseConfig[msg.phase]?.icon || Code, { className: "w-3 h-3" })}
//                                 <span className="capitalize">{msg.phase} Phase</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                       {loading && (
//                         <div className="flex justify-start">
//                           <div className="bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-3 rounded-2xl border-2 border-yellow-200 shadow-lg">
//                             <div className="flex items-center gap-2">
//                               <LoaderCircle className="animate-spin h-4 w-4 text-orange-500" />
//                               <span className="text-sm font-medium text-orange-700">
//                                 AI is evaluating your {currentPhase} response... 🤔
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {/* Hint Display */}
//                       {currentHint && (
//                         <div className="flex justify-start">
//                           <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-3 rounded-2xl border-2 border-blue-200 shadow-lg max-w-lg">
//                             <div className="flex items-start gap-2">
//                               <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                               <div>
//                                 <h4 className="text-sm font-bold text-blue-800 mb-1">💡 Hint:</h4>
//                                 <p className="text-sm text-blue-700">{currentHint}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     {currentPhase !== 'feedback' && (
//                       <div className="space-y-4">
//                         {currentPhase === 'coding' ? (
//                           <div className="relative">
//                             <Textarea
//                               placeholder="Write your magical code here... ✨"
//                               value={userResponse}
//                               onChange={(e) => setUserResponse(e.target.value)}
//                               className="min-h-24 font-mono text-sm rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-gradient-to-br from-white to-purple-50 shadow-lg"
//                             />
//                             <div className="absolute top-3 right-3">
//                               <Code className="w-4 h-4 text-purple-400" />
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="relative">
//                             <Textarea
//                               placeholder={`Share your ${currentPhase} thoughts here... 💭`}
//                               value={userResponse}
//                               onChange={(e) => setUserResponse(e.target.value)}
//                               className="min-h-16 rounded-2xl border-2 border-pink-200 focus:border-pink-400 bg-gradient-to-br from-white to-pink-50 shadow-lg font-medium"
//                             />
//                             <div className="absolute top-3 right-3">
//                               {React.createElement(phaseConfig[currentPhase]?.icon || Heart, { className: "w-4 h-4 text-pink-400" })}
//                             </div>
//                           </div>
//                         )}
//                         <div className="flex gap-3">
//                           <Button 
//                             onClick={handleUserInput} 
//                             disabled={loading || !userResponse.trim()}
//                             className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
//                           >
//                             {loading ? (
//                               <div className="flex items-center gap-2">
//                                 <LoaderCircle className="animate-spin w-4 h-4" />
//                                 <span>Processing...</span>
//                                 <Sparkles className="w-4 h-4 animate-pulse" />
//                               </div>
//                             ) : (
//                               <div className="flex items-center gap-2">
//                                 <Rocket className="w-4 h-4" />
//                                 <span>Send Response</span>
//                                 <Heart className="w-4 h-4 animate-pulse" />
//                               </div>
//                             )}
//                           </Button>
                          
//                           {/* Hint Button */}
//                           {showHintButton && (
//                             <Button 
//                               onClick={generateHint} 
//                               disabled={isHintLoading}
//                               className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
//                             >
//                               <div className="flex items-center gap-2">
//                                 {isHintLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
//                                 <span>{isHintLoading ? 'Getting...' : 'Get Hint'}</span>
//                               </div>
//                             </Button>
//                           )}
                          
//                           {currentPhase === 'evaluation' && (
//                             <Button 
//                               onClick={generateFinalFeedback} 
//                               className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
//                             >
//                               <div className="flex items-center gap-2">
//                                 <Trophy className="w-4 h-4" />
//                                 <span>Get Feedback</span>
//                               </div>
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
//       {/* Floating decorative elements */}
//       <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
//       <div className="absolute top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
//       <div className="absolute top-32 left-32 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
//       <div className="absolute bottom-20 right-40 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
      
//       <div className="max-w-6xl mx-auto">
//         {/* Cute Header */}
//         <div className="text-center mb-12">
//           <div className="relative inline-block group">
//             <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
//             <div className="relative">
//               <div className="flex items-center justify-center gap-4 mb-4">
//                 <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-2xl transform group-hover:rotate-12 transition-all duration-300">
//                   <Brain className="w-10 h-10 text-white" />
//                 </div>
//                 {sparkleAnimation && (
//                   <div className="absolute -top-2 -right-2">
//                     <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
//                   </div>
//                 )}
//               </div>
//               <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-3">
//                 <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
//                 DSA Interview Mastery
//                 <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
//               </h1>
//               <p className="text-lg font-bold text-gray-700 flex items-center justify-center gap-2">
//                 <Wand2 className="w-5 h-5 text-purple-500" />
//                 Complete structured DSA interview with phase-by-phase guidance ✨
//                 <Sparkles className="w-5 h-5 text-yellow-500" />
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Cute Upload Button */}
//         <div className="flex justify-center mb-10">
//           <div className="relative group">
//             <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
//             <Button 
//               onClick={() => setShowUploadDialog(true)}
//               className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 border-0"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/20 rounded-xl">
//                   <Upload className="w-5 h-5" />
//                 </div>
//                 <span>Upload Custom Problem</span>
//                 <Rocket className="w-5 h-5 animate-pulse" />
//               </div>
//             </Button>
//           </div>
//         </div>

//         {/* Cute Category Filter */}
//         <div className="relative group mb-10">
//           <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
//           <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl shadow-xl p-8 border-2 border-white/50 backdrop-blur-sm">
//             {/* Decorations */}
//             <div className="absolute top-4 right-4 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
//             <div className="absolute bottom-4 left-4 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
            
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl shadow-lg">
//                 <Target className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
//                 Choose Your Adventure 🎯
//                 <Zap className="w-5 h-5 text-yellow-500" />
//               </h2>
//             </div>
            
//             <div className="flex flex-wrap gap-3 justify-center">
//               {categories.map(category => (
//                 <Button
//                   key={category}
//                   variant={selectedCategory === category ? "default" : "outline"}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`px-6 py-3 rounded-2xl font-bold transform hover:scale-110 transition-all duration-300 shadow-lg ${
//                     selectedCategory === category
//                       ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-200 border-0'
//                       : 'bg-gradient-to-r from-white to-purple-50 text-purple-700 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl'
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <span>{category}</span>
//                     {selectedCategory === category && <Star className="w-4 h-4 text-yellow-300" />}
//                   </div>
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Problem Grid with Constraints */}
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {filteredProblems.map(problem => (
//             <div key={problem.id} className="relative group transform transition-all duration-300 hover:scale-105">
//               {/* Magical Background */}
//               <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>
              
//               {/* Main Card */}
//               <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 border-2 border-white/50 shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm group-hover:shadow-2xl transition-all duration-300">
                
//                 {/* Floating Decorations */}
//                 <div className="absolute top-3 right-3 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
//                 <div className="absolute top-5 right-8 w-2 h-2 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
//                 <div className="absolute bottom-3 left-3 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

//                 <div className="p-6">
//                   {/* Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <h3 className="text-xl font-black bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
//                       {problem.title}
//                       <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
//                     </h3>
//                     <div className={`px-3 py-1.5 rounded-full text-white font-bold text-sm shadow-lg ${
//                       problem.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
//                       problem.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
//                       'bg-gradient-to-r from-red-400 to-rose-500'
//                     }`}>
//                       {problem.difficulty} ✨
//                     </div>
//                   </div>
                  
//                   <div className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-200 text-purple-700 font-bold text-sm w-fit mb-4">
//                     {problem.category} 💖
//                   </div>

//                   {/* Description */}
//                   <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed font-medium bg-gradient-to-r from-gray-50 to-purple-50 p-4 rounded-xl border border-purple-100">
//                     {problem.description}
//                   </p>

//                   {/* Examples Preview */}
//                   <div className="mb-4">
//                     <h4 className="font-bold mb-2 text-gray-800 text-sm flex items-center gap-1">
//                       <Sparkles className="w-3 h-3 text-yellow-500" />
//                       Example
//                     </h4>
//                     <pre className="text-xs bg-gradient-to-br from-gray-100 to-blue-100 p-3 rounded-xl border border-blue-200 whitespace-pre-wrap font-mono text-gray-800 line-clamp-2">
//                       {problem.examples.split('\n').slice(0, 2).join('\n')}
//                     </pre>
//                   </div>

//                   {/* Constraints Preview */}
//                   <div className="mb-6">
//                     <h4 className="font-bold mb-2 text-gray-800 text-sm flex items-center gap-1">
//                       <AlertTriangle className="w-3 h-3 text-orange-500" />
//                       Key Constraints
//                     </h4>
//                     <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-xl border border-orange-200">
//                       <div className="space-y-1">
//                         {problem.constraints.slice(0, 2).map((constraint, index) => (
//                           <div key={index} className="text-xs text-gray-700 font-medium flex items-start gap-1">
//                             <span className="text-orange-500 font-bold text-xs">•</span>
//                             <span className="font-mono bg-white/60 px-1 py-0.5 rounded text-orange-800 text-xs leading-tight">
//                               {constraint.length > 35 ? `${constraint.substring(0, 35)}...` : constraint}
//                             </span>
//                           </div>
//                         ))}
//                         {problem.constraints.length > 2 && (
//                           <div className="text-xs text-orange-600 font-bold">
//                             +{problem.constraints.length - 2} more constraints...
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Cute Button */}
//                   <Button 
//                     onClick={() => startInterview(problem)}
//                     className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
//                   >
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="p-1 bg-white/20 rounded-lg">
//                         <Rocket className="w-4 h-4" />
//                       </div>
//                       <span>Start Structured Interview</span>
//                       <Heart className="w-4 h-4 animate-pulse" />
//                     </div>
//                   </Button>
//                 </div>

//                 {/* Hover Effect */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-purple-100/20 to-cyan-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
//                   <div className="text-4xl animate-bounce">✨</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Super Cute Custom Problem Dialog */}
//         <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
//           <DialogContent className="max-w-3xl p-0 border-0 bg-transparent shadow-none">
//             <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 rounded-3xl border-3 border-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 shadow-2xl overflow-hidden">
              
//               {/* Decorative Background */}
//               <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-10"></div>
              
//               {/* Floating Decorations */}
//               <div className="absolute top-4 left-6 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
//               <div className="absolute top-8 right-8 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
//               <div className="absolute top-12 right-16 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

//               <DialogHeader className="relative p-8 pb-4">
//                 <div className="flex items-center justify-center gap-3 mb-4">
//                   <div className="p-3 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-2xl shadow-xl">
//                     <Upload className="w-8 h-8 text-white" />
//                   </div>
//                 </div>
                
//                 <DialogTitle className="text-3xl font-black text-center bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
//                   <Star className="w-6 h-6 text-yellow-400" />
//                   Upload Your Magic Problem
//                   <Heart className="w-6 h-6 text-pink-400" />
//                 </DialogTitle>
                
//                 <p className="text-center text-gray-600 font-medium flex items-center justify-center gap-1 mt-2">
//                   <Sparkles className="w-4 h-4 text-purple-500" />
//                   Share your custom DSA challenge with complete structured evaluation ✨
//                 </p>

//                 <div className="space-y-6 mt-8 px-2">
//                   <div className="relative">
//                     <Textarea
//                       placeholder="Paste your amazing DSA problem here (include description, examples, and constraints)... ✨"
//                       value={customProblem}
//                       onChange={(e) => setCustomProblem(e.target.value)}
//                       className="min-h-32 pl-4 pr-16 py-4 rounded-2xl border-2 border-cyan-200 focus:border-cyan-400 bg-white/80 backdrop-blur-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-lg"
//                     />
//                     <div className="absolute right-4 top-4">
//                       <Code className="w-6 h-6 text-cyan-300" />
//                     </div>
//                   </div>
                  
//                   <div className="flex gap-4 pt-4">
//                     <Button 
//                       variant="outline" 
//                       onClick={() => setShowUploadDialog(false)}
//                       className="flex-1 px-6 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
//                     >
//                       Maybe Later 💭
//                     </Button>
                    
//                     <Button 
//                       onClick={handleCustomProblem}
//                       disabled={!customProblem.trim()}
//                       className="flex-1 px-8 py-3 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
//                     >
//                       <div className="flex items-center gap-2">
//                         <Rocket className="w-5 h-5" />
//                         <span>Start Magic Interview</span>
//                         <Heart className="w-4 h-4 animate-pulse" />
//                       </div>
//                     </Button>
//                   </div>
//                 </div>
//               </DialogHeader>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default DSAInterviewQuestions;

"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  LoaderCircle, 
  Upload, 
  Code, 
  MessageSquare, 
  Brain, 
  Timer, 
  Bug, 
  CheckCircle,
  Star,
  Heart,
  Sparkles,
  Wand2,
  Rocket,
  Trophy,
  Target,
  Zap,
  AlertTriangle,
  Search,
  Eye,
  Lightbulb,
  HelpCircle
} from 'lucide-react';
import { chatSession } from '@/utils/GeminiAIModel';

const DSAInterviewQuestions = () => {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPhase, setCurrentPhase] = useState('selection');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [customProblem, setCustomProblem] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [phaseScores, setPhaseScores] = useState({});
  const [currentCode, setCurrentCode] = useState('');
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [showHintButton, setShowHintButton] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [evaluationQuestionCount, setEvaluationQuestionCount] = useState(0); // Track evaluation questions

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 4000);
    return () => clearInterval(sparkleInterval);
  }, []);

  const categories = ['All', 'Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching'];

  const dsaProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\n\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]",
      constraints: [
        "2 <= nums.length <= 10⁴",
        "-10⁹ <= nums[i] <= 10⁹",
        "-10⁹ <= target <= 10⁹",
        "Only one valid answer exists."
      ]
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy", 
      category: "Strings",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: "Input: s = '()'\nOutput: true\n\nInput: s = '()[]{}'\nOutput: true\n\nInput: s = '(]'\nOutput: false",
      constraints: [
        "1 <= s.length <= 10⁴",
        "s consists of parentheses only '()[]{}'."
      ]
    },
    {
      id: 3,
      title: "Binary Tree Inorder Traversal",
      difficulty: "Medium",
      category: "Trees",
      description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      examples: "Input: root = [1,null,2,3]\nOutput: [1,3,2]\n\nInput: root = []\nOutput: []\n\nInput: root = [1]\nOutput: [1]",
      constraints: [
        "The number of nodes in the tree is in the range [0, 100].",
        "-100 <= Node.val <= 100"
      ]
    },
    {
      id: 4,
      title: "Longest Common Subsequence",
      difficulty: "Medium",
      category: "Dynamic Programming", 
      description: "Given two strings text1 and text2, return the length of their longest common subsequence.",
      examples: "Input: text1 = 'abcde', text2 = 'ace'\nOutput: 3\n\nInput: text1 = 'abc', text2 = 'abc'\nOutput: 3\n\nInput: text1 = 'abc', text2 = 'def'\nOutput: 0",
      constraints: [
        "1 <= text1.length, text2.length <= 1000",
        "text1 and text2 consist of only lowercase English characters."
      ]
    },
    {
      id: 5,
      title: "Number of Islands",
      difficulty: "Medium",
      category: "Graphs",
      description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
      examples: "Input: grid = [['1','1','0'],['1','1','0'],['0','0','1']]\nOutput: 2\n\nInput: grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]\nOutput: 1",
      constraints: [
        "m == grid.length",
        "n == grid[i].length",
        "1 <= m, n <= 300",
        "grid[i][j] is '0' or '1'."
      ]
    }
  ];

  const filteredProblems = selectedCategory === 'All' 
    ? dsaProblems 
    : dsaProblems.filter(problem => problem.category === selectedCategory);

  const phaseConfig = {
    selection: { icon: Code, title: "Choose Problem", color: "from-blue-400 to-indigo-500" },
    intuition: { icon: Brain, title: "Intuition", color: "from-purple-400 to-pink-500" },
    algorithm: { icon: MessageSquare, title: "Algorithm", color: "from-green-400 to-emerald-500" },
    complexity: { icon: Timer, title: "Complexity", color: "from-yellow-400 to-orange-500" },
    coding: { icon: Code, title: "Coding", color: "from-red-400 to-rose-500" },
    debugging: { icon: Bug, title: "Debugging", color: "from-orange-400 to-amber-500" },
    evaluation: { icon: Eye, title: "Code", color: "from-indigo-400 to-purple-500" },
    feedback: { icon: CheckCircle, title: "Final", color: "from-emerald-400 to-teal-500" }
  };

  const startInterview = async (problem) => {
    setSelectedProblem(problem);
    setCurrentPhase('intuition');
    setConversation([]);
    setShowHintButton(false);
    setCurrentHint('');
    setEvaluationQuestionCount(0); // Reset evaluation question count
    
    const constraintsText = problem.constraints ? problem.constraints.join('\n• ') : 'No specific constraints provided.';
    
    const initialPrompt = `You are conducting a DSA interview for the problem: "${problem.title}".

    Problem: ${problem.description}
    Examples: ${problem.examples}
    Constraints: ${constraintsText}

    You are starting the INTUITION PHASE. In this phase, you should ONLY ask about the candidate's high-level approach and thinking process. DO NOT ask about:
    - Specific algorithm implementation details
    - Data structures to use
    - Code or syntax
    - Time/space complexity analysis
    - Step-by-step algorithm

    ONLY ask about:
    - Their overall approach/strategy
    - High-level thinking
    - General direction to solve the problem

    Start by asking: "What's your high-level approach to solve this problem? Just explain your general thinking and strategy."

    Keep it short and conversational.`;

    setLoading(true);
    try {
      const result = await chatSession.sendMessage(initialPrompt);
      const aiResponse = result.response.text();
      
      setConversation([{
        type: 'ai',
        message: aiResponse,
        phase: 'intuition'
      }]);
    } catch (error) {
      console.error('Error starting interview:', error);
    }
    setLoading(false);
  };

  const generateHint = async () => {
    setIsHintLoading(true);
    setCurrentHint('');
    
    try {
      let hintPrompt = '';
      
      switch(currentPhase) {
        case 'intuition':
          hintPrompt = `The user is struggling with the intuition phase for ${selectedProblem.title}. 
          Problem: ${selectedProblem.description}
          
          Provide a helpful hint about the general approach. Examples:
          - For Two Sum: "Think about what you've seen so far as you iterate through the array"
          - For Valid Parentheses: "Consider what happens when you see an opening bracket vs closing bracket"
          - For trees: "Think about which traversal order gives you the result you need"
          
          Give ONE helpful hint about the high-level approach. Keep it short and don't give away the solution.`;
          break;
          
        case 'algorithm':
          hintPrompt = `The user needs help with the algorithm phase for ${selectedProblem.title}.
          Problem: ${selectedProblem.description}
          
          Provide a hint about the specific algorithm or data structure:
          - For Two Sum: "A HashMap can help you store what you've seen and check for complements"
          - For Valid Parentheses: "A Stack is perfect for keeping track of opening brackets"
          - For trees: "Recursion or a stack can help you traverse the tree"
          
          Give ONE specific hint about the algorithm approach.`;
          break;
          
        case 'complexity':
          hintPrompt = `The user needs help with complexity analysis for ${selectedProblem.title}.
          
          Provide a hint about analyzing time/space complexity:
          - "Count how many times you visit each element"
          - "Think about the space used by your data structures"
          - "Consider nested loops vs single passes"
          
          Give ONE hint about complexity analysis.`;
          break;
          
        case 'coding':
          hintPrompt = `The user needs help implementing the code for ${selectedProblem.title}.
          
          Provide a coding hint:
          - "Start with the basic structure - initialization, loop, return"
          - "Remember to handle edge cases like empty input"
          - "Check your variable names and loop boundaries"
          
          Give ONE helpful coding hint.`;
          break;
          
        case 'debugging':
          hintPrompt = `The user needs help debugging their solution for ${selectedProblem.title}.
          
          Provide a debugging hint:
          - "Trace through the first example step by step"
          - "Check if your solution handles edge cases"
          - "Verify your return format matches the expected output"
          
          Give ONE debugging hint.`;
          break;
          
        case 'evaluation':
          hintPrompt = `The user needs help understanding their code for ${selectedProblem.title}.
          
          Provide a hint about code understanding:
          - "Think about what each line of your code is doing"
          - "Consider what would happen if you changed one small part"
          - "Think about edge cases your code handles"
          
          Give ONE hint about code understanding.`;
          break;
      }
      
      const result = await chatSession.sendMessage(hintPrompt);
      setCurrentHint(result.response.text());
    } catch (error) {
      console.error('Error generating hint:', error);
      setCurrentHint('Unable to generate hint. Please try again.');
    }
    setIsHintLoading(false);
  };

  const handleUserInput = async () => {
    if (!userResponse.trim()) return;
    
    const newUserMessage = {
      type: 'user',
      message: userResponse,
      phase: currentPhase
    };
    
    setConversation(prev => [...prev, newUserMessage]);
    setShowHintButton(false);
    setCurrentHint('');
    setLoading(true);
    
    try {
      let prompt = '';
      
      switch(currentPhase) {
        case 'intuition':
          prompt = `You are in the INTUITION PHASE. The user responded: "${userResponse}"

          Evaluate if their high-level approach shows good understanding. You should ONLY care about:
          - Do they have a general strategy?
          - Does their thinking make sense for this problem?
          - Are they on the right track conceptually?

          DO NOT evaluate:
          - Specific algorithms or data structures
          - Implementation details
          - Complexity analysis

          If their intuition is good enough, respond with: "Great! Let's discuss the specific algorithm now."
          
          If their intuition needs work, ask ONE follow-up question about their general approach and end with: "HINT_NEEDED"
          
          Keep response short and focused only on high-level thinking.`;
          break;
          
        case 'algorithm':
          prompt = `You are in the ALGORITHM PHASE. The user responded: "${userResponse}"

          Evaluate if they can explain the specific algorithm. You should ONLY care about:
          - Can they explain the step-by-step process?
          - Do they mention appropriate data structures?
          - Is the algorithm correct?

          DO NOT ask about:
          - Time/space complexity
          - Code implementation
          - High-level intuition (already covered)

          If their algorithm is clear and correct, respond with: "Excellent! Now let's analyze the complexity."
          
          If their algorithm needs work, ask ONE specific question about the algorithm steps and end with: "HINT_NEEDED"
          
          Keep response short and focused only on algorithm details.`;
          break;
          
        case 'complexity':
          prompt = `You are in the COMPLEXITY PHASE. The user responded: "${userResponse}"

          Evaluate their complexity analysis. You should ONLY care about:
          - Can they identify time complexity?
          - Can they identify space complexity?
          - Is their analysis correct?

          DO NOT ask about:
          - Algorithm details (already covered)
          - Code implementation
          - Intuition

          If their complexity analysis is correct, respond with: "Perfect! Let's implement the solution."
          
          If their complexity analysis needs work, ask ONE question about time/space complexity and end with: "HINT_NEEDED"
          
          Keep response short and focused only on complexity.`;
          break;
          
        case 'coding':
          // Store the user's code for the evaluation phase
          if (userResponse.includes('def ') || userResponse.includes('function ') || userResponse.includes('class ') || userResponse.includes('public ') || userResponse.includes('for ') || userResponse.includes('while ') || userResponse.includes('if ') || userResponse.includes('return')) {
            setCurrentCode(userResponse);
          }
          
          prompt = `You are in the CODING PHASE. The user provided: "${userResponse}"

          Evaluate their code implementation. You should ONLY care about:
          - Is the code syntactically correct?
          - Does it implement the algorithm we discussed?
          - Are there obvious bugs?

          DO NOT ask about:
          - Algorithm explanation (already covered)
          - Complexity (already covered)
          - Code understanding (comes later)

          If their code looks good, respond with: "Great! Let's test this with some examples."
          
          If their code has issues, point out ONE specific problem and end with: "HINT_NEEDED"
          
          Keep response short and focused only on code correctness.`;
          break;
          
        case 'debugging':
          prompt = `You are in the DEBUGGING PHASE. The user responded: "${userResponse}"

          Evaluate their debugging approach. You should ONLY care about:
          - Can they test their solution?
          - Can they identify and fix bugs?
          - Does their solution work for the examples?

          DO NOT ask about:
          - Algorithm details (already covered)
          - Code understanding (comes next)
          - Complexity (already covered)

          If their debugging is satisfactory, respond with: "Excellent! Now let's explore your code understanding."
          
          If they need more debugging help, ask ONE specific debugging question and end with: "HINT_NEEDED"
          
          Keep response short and focused only on testing/debugging.`;
          break;

        case 'evaluation':
          // INCREMENT the evaluation question count
          const newQuestionCount = evaluationQuestionCount + 1;
          setEvaluationQuestionCount(newQuestionCount);
          
          prompt = `You are in the CODE EVALUATION PHASE. The user responded: "${userResponse}"

          Current code: ${currentCode}
          Question count: ${newQuestionCount}
          
          This is evaluation question #${newQuestionCount}. You should ask MULTIPLE questions (at least 3-4) to thoroughly evaluate their code understanding.

          You should ask about:
          - Understanding of what their code does
          - How small modifications would affect the solution
          - Edge cases their code handles
          - What would happen if certain lines were changed/removed
          - How they would modify the code for similar problems

          Examples of good evaluation questions:
          - "What if we removed this line - would it still work?"
          - "How would you modify this to solve a similar problem?"
          - "Why is this particular line necessary?"
          - "What happens if we change this condition?"
          - "How does your solution handle edge case X?"

          IMPORTANT RULES:
          - If this is question 1-3: ALWAYS ask another evaluation question and end with "HINT_NEEDED"
          - If this is question 4 or higher AND they show good understanding: You may continue asking more questions OR say "You've shown excellent code understanding! You can now generate final feedback when ready."
          - NEVER immediately transition to feedback phase - let the user click the "Get Feedback" button
          - Always ask specific, probing questions about their code

          Keep response short and focused only on code understanding.`;
          break;
      }
      
      const result = await chatSession.sendMessage(prompt);
      const aiResponse = result.response.text();
      
      // Check if hint is needed
      if (aiResponse.includes('HINT_NEEDED')) {
        setShowHintButton(true);
        const cleanResponse = aiResponse.replace('HINT_NEEDED', '').trim();
        setConversation(prev => [...prev, {
          type: 'ai',
          message: cleanResponse,
          phase: currentPhase
        }]);
      } else {
        // Check for phase transitions based on specific keywords (but NOT for evaluation phase)
        let nextPhase = currentPhase;
        if (currentPhase !== 'evaluation') { // Don't automatically transition from evaluation
          if (aiResponse.toLowerCase().includes('specific algorithm now') && currentPhase === 'intuition') {
            nextPhase = 'algorithm';
          } else if (aiResponse.toLowerCase().includes('analyze the complexity') && currentPhase === 'algorithm') {
            nextPhase = 'complexity';
          } else if (aiResponse.toLowerCase().includes('implement the solution') && currentPhase === 'complexity') {
            nextPhase = 'coding';
          } else if (aiResponse.toLowerCase().includes('test this with some examples') && currentPhase === 'coding') {
            nextPhase = 'debugging';
          } else if (aiResponse.toLowerCase().includes('explore your code understanding') && currentPhase === 'debugging') {
            nextPhase = 'evaluation';
            setEvaluationQuestionCount(0); // Reset counter when entering evaluation
          }
        }
        
        setCurrentPhase(nextPhase);
        setConversation(prev => [...prev, {
          type: 'ai',
          message: aiResponse,
          phase: nextPhase
        }]);
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    setUserResponse('');
    setLoading(false);
  };

  const handleCustomProblem = async () => {
    if (!customProblem.trim()) return;
    
    const problem = {
      id: 'custom',
      title: "Custom Problem",
      difficulty: "Unknown",
      category: "Custom",
      description: customProblem,
      examples: "Custom problem uploaded by user",
      constraints: ["Custom constraints as specified in the problem"]
    };
    
    setShowUploadDialog(false);
    await startInterview(problem);
  };

  const generateFinalFeedback = async () => {
    setLoading(true);
    
    const prompt = `Generate final comprehensive feedback based on this entire interview conversation: ${JSON.stringify(conversation)}
    
    Provide detailed scores (1-10) for:
    1. Problem-solving intuition and approach
    2. Algorithm design and explanation  
    3. Complexity analysis accuracy
    4. Code implementation quality
    5. Debugging and testing skills
    6. Code understanding and flexibility
    7. Overall communication throughout the interview
    
    Include specific strengths, areas for improvement, and overall assessment.
    
    Format as a comprehensive interview feedback report.`;
    
    try {
      const result = await chatSession.sendMessage(prompt);
      const feedback = result.response.text();
      
      setConversation(prev => [...prev, {
        type: 'ai',
        message: feedback,
        phase: 'feedback'
      }]);
      setCurrentPhase('feedback');
    } catch (error) {
      console.error('Error generating feedback:', error);
    }
    setLoading(false);
  };

  if (currentPhase !== 'selection' && selectedProblem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-20 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-20 right-32 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 left-40 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
        
        <div className="max-w-6xl mx-auto">
          {/* Cute Header */}
          <div className="relative group mb-8">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-white via-pink-50/50 to-purple-50/50 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
              {/* Floating decorations */}
              <div className="absolute top-4 right-6 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute top-6 right-12 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    {sparkleAnimation && (
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                      {selectedProblem.title}
                      <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                      <div className={`px-4 py-1.5 rounded-full text-white font-bold text-sm shadow-lg ${
                        selectedProblem.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                        selectedProblem.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                        'bg-gradient-to-r from-red-400 to-rose-500'
                      }`}>
                        {selectedProblem.difficulty} ✨
                      </div>
                      <div className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-200 text-purple-700 font-bold text-sm">
                        {selectedProblem.category} 💖
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPhase('selection')}
                  className="px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    Back to Problems
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Compact Phase Progress */}
          <div className="relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-xl opacity-15 blur-md"></div>
            <div className="relative bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 rounded-xl shadow-lg p-4 border border-white/40 backdrop-blur-sm">
              <div className="flex items-center gap-3 overflow-x-auto justify-center">
                {Object.entries(phaseConfig).map(([phase, config], index) => {
                  const Icon = config.icon;
                  const isActive = currentPhase === phase;
                  const isCompleted = Object.keys(phaseConfig).indexOf(currentPhase) > index;
                  
                  return (
                    <div key={phase} className="flex items-center gap-1 min-w-fit">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`relative w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md transform transition-all duration-300 ${
                          isActive ? `bg-gradient-to-br ${config.color} scale-105 shadow-lg` : 
                          isCompleted ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 
                          'bg-gradient-to-br from-gray-300 to-gray-400'
                        }`}>
                          <Icon size={14} />
                          {isActive && (
                            <div className="absolute -top-0.5 -right-0.5">
                              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
                                <span className="text-xs">✨</span>
                              </div>
                            </div>
                          )}
                          {isCompleted && (
                            <div className="absolute -bottom-0.5 -right-0.5">
                              <CheckCircle className="w-3 h-3 text-white bg-green-500 rounded-full" />
                            </div>
                          )}
                        </div>
                        <span className={`font-bold text-xs text-center ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {config.title}
                        </span>
                      </div>
                      {index < Object.keys(phaseConfig).length - 2 && (
                        <div className="w-4 h-0.5 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mx-1 opacity-50"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Compact Problem Description with Constraints */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-15 blur-md"></div>
                <div className="relative bg-gradient-to-br from-white via-cyan-50/20 to-blue-50/20 rounded-xl shadow-lg border border-white/40 backdrop-blur-sm overflow-hidden">
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-md">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        Problem 📋
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-xs text-gray-700 leading-relaxed font-medium bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-blue-100">
                        {selectedProblem.description}
                      </p>
                      
                      <div>
                        <h4 className="font-bold mb-2 text-gray-800 text-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-yellow-500" />
                          Examples
                        </h4>
                        <pre className="text-xs bg-gradient-to-br from-gray-100 to-blue-100 p-3 rounded-lg border border-blue-200 whitespace-pre-wrap font-mono text-gray-800 shadow-inner max-h-24 overflow-y-auto">
                          {selectedProblem.examples}
                        </pre>
                      </div>

                      {/* Compact Constraints Section */}
                      {selectedProblem.constraints && (
                        <div>
                          <h4 className="font-bold mb-2 text-gray-800 text-sm flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-orange-500" />
                            Constraints
                          </h4>
                          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200 shadow-inner max-h-32 overflow-y-auto">
                            <ul className="space-y-1">
                              {selectedProblem.constraints.map((constraint, index) => (
                                <li key={index} className="text-xs text-gray-700 font-medium flex items-start gap-1">
                                  <span className="text-orange-500 font-bold text-xs">•</span>
                                  <span className="font-mono bg-white/60 px-1 py-0.5 rounded text-orange-800 text-xs leading-tight">
                                    {constraint}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Interview Conversation */}
            <div className="lg:col-span-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl opacity-15 blur-md"></div>
                <div className="relative bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 rounded-xl shadow-lg border border-white/40 backdrop-blur-sm h-[600px]">
                  
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg shadow-md">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                        Interview Discussion 💬
                        <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
                      </h3>
                      
                      {/* Current Phase Indicator */}
                      <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200">
                        {React.createElement(phaseConfig[currentPhase]?.icon || Code, { className: "w-4 h-4 text-indigo-600" })}
                        <span className="text-sm font-bold text-indigo-700 capitalize">{currentPhase} Phase ✨</span>
                        {currentPhase === 'evaluation' && evaluationQuestionCount > 0 && (
                          <span className="text-xs text-indigo-600 ml-1">Q{evaluationQuestionCount}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {conversation.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-lg px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                            msg.type === 'user' 
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-pink-200' 
                              : 'bg-gradient-to-r from-gray-100 to-purple-100 text-gray-800 border-2 border-purple-200'
                          }`}>
                            <p className="text-sm font-medium whitespace-pre-wrap">{msg.message}</p>
                            {/* Phase indicator for AI messages */}
                            {msg.type === 'ai' && msg.phase && (
                              <div className="mt-2 text-xs opacity-75 flex items-center gap-1">
                                {React.createElement(phaseConfig[msg.phase]?.icon || Code, { className: "w-3 h-3" })}
                                <span className="capitalize">{msg.phase} Phase</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {loading && (
                        <div className="flex justify-start">
                          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-3 rounded-2xl border-2 border-yellow-200 shadow-lg">
                            <div className="flex items-center gap-2">
                              <LoaderCircle className="animate-spin h-4 w-4 text-orange-500" />
                              <span className="text-sm font-medium text-orange-700">
                                AI is evaluating your {currentPhase} response... 🤔
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hint Display */}
                      {currentHint && (
                        <div className="flex justify-start">
                          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-3 rounded-2xl border-2 border-blue-200 shadow-lg max-w-lg">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-bold text-blue-800 mb-1">💡 Hint:</h4>
                                <p className="text-sm text-blue-700">{currentHint}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {currentPhase !== 'feedback' && (
                      <div className="space-y-4">
                        {currentPhase === 'coding' ? (
                          <div className="relative">
                            <Textarea
                              placeholder="Write your magical code here... ✨"
                              value={userResponse}
                              onChange={(e) => setUserResponse(e.target.value)}
                              className="min-h-24 font-mono text-sm rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-gradient-to-br from-white to-purple-50 shadow-lg"
                            />
                            <div className="absolute top-3 right-3">
                              <Code className="w-4 h-4 text-purple-400" />
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <Textarea
                              placeholder={`Share your ${currentPhase} thoughts here... 💭`}
                              value={userResponse}
                              onChange={(e) => setUserResponse(e.target.value)}
                              className="min-h-16 rounded-2xl border-2 border-pink-200 focus:border-pink-400 bg-gradient-to-br from-white to-pink-50 shadow-lg font-medium"
                            />
                            <div className="absolute top-3 right-3">
                              {React.createElement(phaseConfig[currentPhase]?.icon || Heart, { className: "w-4 h-4 text-pink-400" })}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-3">
                          <Button 
                            onClick={handleUserInput} 
                            disabled={loading || !userResponse.trim()}
                            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin w-4 h-4" />
                                <span>Processing...</span>
                                <Sparkles className="w-4 h-4 animate-pulse" />
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Rocket className="w-4 h-4" />
                                <span>Send Response</span>
                                <Heart className="w-4 h-4 animate-pulse" />
                              </div>
                            )}
                          </Button>
                          
                          {/* Hint Button */}
                          {showHintButton && (
                            <Button 
                              onClick={generateHint} 
                              disabled={isHintLoading}
                              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                            >
                              <div className="flex items-center gap-2">
                                {isHintLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                                <span>{isHintLoading ? 'Getting...' : 'Get Hint'}</span>
                              </div>
                            </Button>
                          )}
                          
                          {/* Get Feedback Button - Show in evaluation phase after a few questions */}
                          {currentPhase === 'evaluation' && evaluationQuestionCount >= 2 && (
                            <Button 
                              onClick={generateFinalFeedback} 
                              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                            >
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                <span>Get Feedback</span>
                              </div>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-32 left-32 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
      <div className="absolute bottom-20 right-40 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Cute Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-2xl transform group-hover:rotate-12 transition-all duration-300">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                {sparkleAnimation && (
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                  </div>
                )}
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-3">
                <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                DSA Interview Mastery
                <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
              </h1>
              <p className="text-lg font-bold text-gray-700 flex items-center justify-center gap-2">
                <Wand2 className="w-5 h-5 text-purple-500" />
                Complete structured DSA interview with phase-by-phase guidance ✨
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Cute Upload Button */}
        <div className="flex justify-center mb-10">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
            <Button 
              onClick={() => setShowUploadDialog(true)}
              className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 border-0"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Upload className="w-5 h-5" />
                </div>
                <span>Upload Custom Problem</span>
                <Rocket className="w-5 h-5 animate-pulse" />
              </div>
            </Button>
          </div>
        </div>

        {/* Cute Category Filter */}
        <div className="relative group mb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
          <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl shadow-xl p-8 border-2 border-white/50 backdrop-blur-sm">
            {/* Decorations */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                Choose Your Adventure 🎯
                <Zap className="w-5 h-5 text-yellow-500" />
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-bold transform hover:scale-110 transition-all duration-300 shadow-lg ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-200 border-0'
                      : 'bg-gradient-to-r from-white to-purple-50 text-purple-700 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{category}</span>
                    {selectedCategory === category && <Star className="w-4 h-4 text-yellow-300" />}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Problem Grid with Constraints */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProblems.map(problem => (
            <div key={problem.id} className="relative group transform transition-all duration-300 hover:scale-105">
              {/* Magical Background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 border-2 border-white/50 shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm group-hover:shadow-2xl transition-all duration-300">
                
                {/* Floating Decorations */}
                <div className="absolute top-3 right-3 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-5 right-8 w-2 h-2 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-black bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                      {problem.title}
                      <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </h3>
                    <div className={`px-3 py-1.5 rounded-full text-white font-bold text-sm shadow-lg ${
                      problem.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
                      problem.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                      'bg-gradient-to-r from-red-400 to-rose-500'
                    }`}>
                      {problem.difficulty} ✨
                    </div>
                  </div>
                  
                  <div className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-200 text-purple-700 font-bold text-sm w-fit mb-4">
                    {problem.category} 💖
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed font-medium bg-gradient-to-r from-gray-50 to-purple-50 p-4 rounded-xl border border-purple-100">
                    {problem.description}
                  </p>

                  {/* Examples Preview */}
                  <div className="mb-4">
                    <h4 className="font-bold mb-2 text-gray-800 text-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      Example
                    </h4>
                    <pre className="text-xs bg-gradient-to-br from-gray-100 to-blue-100 p-3 rounded-xl border border-blue-200 whitespace-pre-wrap font-mono text-gray-800 line-clamp-2">
                      {problem.examples.split('\n').slice(0, 2).join('\n')}
                    </pre>
                  </div>

                  {/* Constraints Preview */}
                  <div className="mb-6">
                    <h4 className="font-bold mb-2 text-gray-800 text-sm flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-orange-500" />
                      Key Constraints
                    </h4>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-xl border border-orange-200">
                      <div className="space-y-1">
                        {problem.constraints.slice(0, 2).map((constraint, index) => (
                          <div key={index} className="text-xs text-gray-700 font-medium flex items-start gap-1">
                            <span className="text-orange-500 font-bold text-xs">•</span>
                            <span className="font-mono bg-white/60 px-1 py-0.5 rounded text-orange-800 text-xs leading-tight">
                              {constraint.length > 35 ? `${constraint.substring(0, 35)}...` : constraint}
                            </span>
                          </div>
                        ))}
                        {problem.constraints.length > 2 && (
                          <div className="text-xs text-orange-600 font-bold">
                            +{problem.constraints.length - 2} more constraints...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cute Button */}
                  <Button 
                    onClick={() => startInterview(problem)}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="p-1 bg-white/20 rounded-lg">
                        <Rocket className="w-4 h-4" />
                      </div>
                      <span>Start Structured Interview</span>
                      <Heart className="w-4 h-4 animate-pulse" />
                    </div>
                  </Button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-purple-100/20 to-cyan-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                  <div className="text-4xl animate-bounce">✨</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Super Cute Custom Problem Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="max-w-3xl p-0 border-0 bg-transparent shadow-none">
            <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 rounded-3xl border-3 border-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 shadow-2xl overflow-hidden">
              
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-10"></div>
              
              {/* Floating Decorations */}
              <div className="absolute top-4 left-6 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute top-12 right-16 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

              <DialogHeader className="relative p-8 pb-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-2xl shadow-xl">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <DialogTitle className="text-3xl font-black text-center bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Upload Your Magic Problem
                  <Heart className="w-6 h-6 text-pink-400" />
                </DialogTitle>
                
                <p className="text-center text-gray-600 font-medium flex items-center justify-center gap-1 mt-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Share your custom DSA challenge with complete structured evaluation ✨
                </p>

                <div className="space-y-6 mt-8 px-2">
                  <div className="relative">
                    <Textarea
                      placeholder="Paste your amazing DSA problem here (include description, examples, and constraints)... ✨"
                      value={customProblem}
                      onChange={(e) => setCustomProblem(e.target.value)}
                      className="min-h-32 pl-4 pr-16 py-4 rounded-2xl border-2 border-cyan-200 focus:border-cyan-400 bg-white/80 backdrop-blur-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-lg"
                    />
                    <div className="absolute right-4 top-4">
                      <Code className="w-6 h-6 text-cyan-300" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowUploadDialog(false)}
                      className="flex-1 px-6 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                    >
                      Maybe Later 💭
                    </Button>
                    
                    <Button 
                      onClick={handleCustomProblem}
                      disabled={!customProblem.trim()}
                      className="flex-1 px-8 py-3 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Rocket className="w-5 h-5" />
                        <span>Start Magic Interview</span>
                        <Heart className="w-4 h-4 animate-pulse" />
                      </div>
                    </Button>
                  </div>
                </div>
              </DialogHeader>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DSAInterviewQuestions;