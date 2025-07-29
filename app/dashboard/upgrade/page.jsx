// "use client";

// import { useState, useRef, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { Upload, FileText, Mic, MicOff, Camera, CameraOff, Send, AlertCircle, List, Eye, EyeOff } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { chatSession } from "@/utils/GeminiAIModel";
// import { LoaderCircle } from "lucide-react";

// const ResumeInterviewPlatform = () => {
//   const [activeTab, setActiveTab] = useState("upload");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [extractedData, setExtractedData] = useState(null);
//   const [rawText, setRawText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [feedback, setFeedback] = useState(null);
//   const [selectedProjectOrInternship, setSelectedProjectOrInternship] = useState("");
//   const [questionType, setQuestionType] = useState("context");
  
//   // Speech recognition states
//   const [isListening, setIsListening] = useState(false);
//   const [speechSupported, setSpeechSupported] = useState(false);
//   const [transcript, setTranscript] = useState("");

//   // Hint visibility states
//   const [showHints, setShowHints] = useState(false);
//   const [hasSubmitted, setHasSubmitted] = useState(false);

//   // Recording states
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioURL, setAudioURL] = useState("");

//   const { user } = useUser();
//   const router = useRouter();
//   const fileInputRef = useRef();
//   const videoRef = useRef();
//   const mediaRecorderRef = useRef();
//   const recognitionRef = useRef();
//   const audioChunksRef = useRef([]);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         setSpeechSupported(true);
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = true;
//         recognitionRef.current.interimResults = true;
//         recognitionRef.current.lang = 'en-US';

//         recognitionRef.current.onresult = (event) => {
//           let finalTranscript = '';

//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             const transcript = event.results[i][0].transcript;
//             if (event.results[i].isFinal) {
//               finalTranscript += transcript + ' ';
//             }
//           }

//           if (finalTranscript) {
//             setUserAnswer(prev => prev + finalTranscript);
//             setTranscript(prev => prev + finalTranscript);
//           }
//         };

//         recognitionRef.current.onerror = (event) => {
//           console.error('Speech recognition error:', event.error);
//           setIsListening(false);
//           setError(`Speech recognition error: ${event.error}`);
//         };

//         recognitionRef.current.onend = () => {
//           setIsListening(false);
//         };
//       }
//     }
//   }, []);

//   // Reset states when moving to new question
//   const resetQuestionStates = () => {
//     setUserAnswer("");
//     setFeedback(null);
//     setTranscript("");
//     setShowHints(false);
//     setHasSubmitted(false);
//     setAudioBlob(null);
//     setAudioURL("");
//   };

//   // Load PDF.js dynamically
//   const loadPDFJS = async () => {
//     try {
//       if (!window.pdfjsLib) {
//         return new Promise((resolve, reject) => {
//           const script = document.createElement('script');
//           script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
//           script.onload = () => {
//             window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
//             resolve(window.pdfjsLib);
//           };
//           script.onerror = reject;
//           document.head.appendChild(script);
//         });
//       }
//       return window.pdfjsLib;
//     } catch (error) {
//       console.error('Failed to load PDF.js:', error);
//       throw new Error('PDF library failed to load');
//     }
//   };

//   // Extract text from PDF
//   const extractTextFromPDF = async (file) => {
//     try {
//       console.log('Starting PDF extraction for file:', file.name, 'Size:', file.size);
      
//       const pdfjsLib = await loadPDFJS();
//       const arrayBuffer = await file.arrayBuffer();
      
//       console.log('PDF.js loaded, processing arrayBuffer...');
      
//       const loadingTask = pdfjsLib.getDocument({
//         data: arrayBuffer,
//         cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
//         cMapPacked: true,
//         verbosity: 0
//       });
      
//       const pdf = await loadingTask.promise;
//       console.log('PDF loaded, pages:', pdf.numPages);
      
//       let fullText = '';
      
//       for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 10); pageNum++) {
//         try {
//           const page = await pdf.getPage(pageNum);
//           const textContent = await page.getTextContent();
          
//           const pageText = textContent.items
//             .filter(item => item.str && item.str.trim())
//             .map(item => item.str.trim())
//             .join(' ');
          
//           if (pageText.trim()) {
//             fullText += pageText + '\n\n';
//           }
          
//           console.log(`Page ${pageNum} extracted, length:`, pageText.length);
//         } catch (pageError) {
//           console.warn(`Error extracting page ${pageNum}:`, pageError);
//         }
//       }
      
//       if (fullText.trim()) {
//         console.log('PDF extraction successful, total length:', fullText.length);
//         return cleanExtractedText(fullText);
//       }
      
//       throw new Error('No text content found in PDF');
      
//     } catch (error) {
//       console.error('PDF extraction failed:', error);
//       throw error;
//     }
//   };

//   // Clean extracted text
//   const cleanExtractedText = (text) => {
//     return text
//       .replace(/\s+/g, ' ')
//       .replace(/([.!?])\s+([A-Z])/g, '$1\n$2')
//       .replace(/\n\s*\n\s*\n/g, '\n\n')
//       .replace(/[^\x20-\x7E\n]/g, '')
//       .trim();
//   };

//   // Extract resume data using AI
//   const extractResumeData = async (text) => {
//     const prompt = `
//       Analyze this resume text and extract structured information in JSON format.
      
//       Resume Text:
//       ${text}
      
//       Extract and return ONLY a JSON object with this structure:
//       {
//         "personalInfo": {
//           "name": "Full Name",
//           "email": "email@example.com", 
//           "phone": "phone number",
//           "location": "city, country"
//         },
//         "projects": [
//           {
//             "title": "Project Name",
//             "description": "Brief description",
//             "techStack": ["tech1", "tech2"],
//             "duration": "time period",
//             "keyFeatures": ["feature1", "feature2"]
//           }
//         ],
//         "experience": [
//           {
//             "company": "Company Name",
//             "role": "Position Title",
//             "duration": "time period", 
//             "responsibilities": "main responsibilities",
//             "techUsed": ["tech1", "tech2"]
//           }
//         ],
//         "internships": [
//           {
//             "company": "Company Name",
//             "role": "Position Title",
//             "duration": "time period",
//             "responsibilities": "main responsibilities", 
//             "techUsed": ["tech1", "tech2"]
//           }
//         ],
//         "education": [
//           {
//             "institution": "University Name",
//             "degree": "Degree Type",
//             "field": "Field of Study",
//             "year": "graduation year"
//           }
//         ],
//         "techStack": ["JavaScript", "React", "Node.js"],
//         "certifications": ["Certification Name"],
//         "achievements": ["Achievement description"],
//         "skills": {
//           "programming": ["language1", "language2"],
//           "frontend": ["framework1", "framework2"],
//           "backend": ["framework1", "framework2"],
//           "databases": ["db1", "db2"],
//           "tools": ["tool1", "tool2"]
//         }
//       }
      
//       Extract ONLY information present in the resume. If a section is empty, use empty array [].
//       Return only the JSON object, no additional text.
//     `;

//     const result = await chatSession.sendMessage(prompt);
//     const response = result.response.text()
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     return JSON.parse(response);
//   };

//   // Handle file upload
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       setError("Please upload a PDF file only");
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       setError("File size should be less than 10MB");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResumeFile(file);

//     try {
//       const extractedText = await extractTextFromPDF(file);
      
//       if (!extractedText || extractedText.length < 50) {
//         throw new Error("Extracted text is too short or empty. This might be an image-based PDF.");
//       }

//       setRawText(extractedText);
//       const structuredData = await extractResumeData(extractedText);
      
//       const hasValidData = structuredData.personalInfo || 
//                           (structuredData.techStack && structuredData.techStack.length > 0) || 
//                           (structuredData.projects && structuredData.projects.length > 0) ||
//                           (structuredData.experience && structuredData.experience.length > 0);
      
//       if (!hasValidData) {
//         throw new Error("Could not extract meaningful information from the resume");
//       }

//       setExtractedData(structuredData);
//       setActiveTab("review");
      
//     } catch (error) {
//       console.error("Error processing PDF:", error);
      
//       if (error.message.includes("image-based") || error.message.includes("No text content")) {
//         setError("This PDF appears to be image-based or scanned. Please try converting it to text-based PDF or use manual input.");
//       } else if (error.message.includes("PDF library")) {
//         setError("PDF processing library failed to load. Please try manual input or refresh the page.");
//       } else if (error.message.includes("too short")) {
//         setError("Could not extract enough text from PDF. Please try manual input.");
//       } else {
//         setError(`PDF processing failed: ${error.message}. Please try manual input.`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle manual text input
//   const handleManualInput = async () => {
//     if (!rawText.trim()) {
//       setError("Please paste your resume content");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const structuredData = await extractResumeData(rawText);
      
//       const hasValidData = structuredData.personalInfo || 
//                           (structuredData.techStack && structuredData.techStack.length > 0) || 
//                           (structuredData.projects && structuredData.projects.length > 0) ||
//                           (structuredData.experience && structuredData.experience.length > 0);

//       if (!hasValidData) {
//         throw new Error("Could not extract meaningful information from the text. Please check the format.");
//       }

//       setExtractedData(structuredData);
//       setActiveTab("review");

//     } catch (error) {
//       console.error("Error processing manual input:", error);
//       setError("Failed to process resume content. Please check the format and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate interview questions
//   const generateQuestions = async () => {
//     if (!extractedData) {
//       setError("No resume data available");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       let prompt = "";
      
//       if (questionType === "context" && selectedProjectOrInternship) {
//         const allItems = [
//           ...(extractedData.projects || []), 
//           ...(extractedData.experience || []), 
//           ...(extractedData.internships || [])
//         ];
        
//         const selectedItem = allItems.find(item => 
//           item.title === selectedProjectOrInternship || 
//           item.company === selectedProjectOrInternship
//         );
        
//         if (!selectedItem) {
//           throw new Error("Selected project/experience not found");
//         }

//         prompt = `
//           Based on this specific project/experience from resume: ${JSON.stringify(selectedItem)}
          
//           Generate exactly 5 interview questions that test:
//           1. Technical understanding of technologies used
//           2. Problem-solving approach and challenges
//           3. Impact and results achieved
//           4. Design decisions made
//           5. Lessons learned and improvements
          
//           Return ONLY a JSON array:
//           [
//             {
//               "question": "Interview question here",
//               "suggestedApproach": "How to approach this question",
//               "keyPoints": ["point 1", "point 2", "point 3"]
//             }
//           ]
          
//           Make questions specific to the actual technologies mentioned.
//         `;
//       } else {
//         prompt = `
//           Based on this complete resume: ${JSON.stringify(extractedData)}
          
//           Generate exactly 5 comprehensive interview questions covering:
//           1. Career journey and motivations
//           2. Technical skills and experience  
//           3. Leadership and teamwork
//           4. Problem-solving abilities
//           5. Future goals and growth
          
//           Return ONLY a JSON array:
//           [
//             {
//               "question": "Interview question here", 
//               "suggestedApproach": "How to approach this question",
//               "keyPoints": ["point 1", "point 2", "point 3"]
//             }
//           ]
          
//           Base questions on actual experience in the resume.
//         `;
//       }

//       const result = await chatSession.sendMessage(prompt);
//       const response = result.response.text()
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();
      
//       const generatedQuestions = JSON.parse(response);
      
//       if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
//         throw new Error("Failed to generate questions");
//       }

//       setQuestions(generatedQuestions);
//       resetQuestionStates();
//       setActiveTab("interview");
      
//     } catch (error) {
//       console.error("Error generating questions:", error);
//       setError("Failed to generate questions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Speech recognition controls
//   const startListening = () => {
//     if (recognitionRef.current && speechSupported) {
//       setTranscript("");
//       setIsListening(true);
//       recognitionRef.current.start();
//     } else {
//       setError("Speech recognition is not supported in your browser");
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   // Camera controls
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: true, 
//         audio: false  // Separate audio for recording
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setIsCameraOn(true);
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       setError("Could not access camera. Please check permissions.");
//     }
//   };

//   const stopCamera = () => {
//     const stream = videoRef.current?.srcObject;
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       if (videoRef.current) {
//         videoRef.current.srcObject = null;
//       }
//     }
//     setIsCameraOn(false);
//   };

//   // Audio recording controls (fixed)
//   const startRecording = async () => {
//     try {
//       // Stop speech recognition if it's running
//       if (isListening) {
//         stopListening();
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       audioChunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//         const audioUrl = URL.createObjectURL(audioBlob);
//         setAudioBlob(audioBlob);
//         setAudioURL(audioUrl);
        
//         // Stop all tracks
//         stream.getTracks().forEach(track => track.stop());
//       };

//       mediaRecorderRef.current.onerror = (event) => {
//         console.error('MediaRecorder error:', event.error);
//         setError('Recording error: ' + event.error);
//       };

//       mediaRecorderRef.current.start(100); // Collect data every 100ms
//       setIsRecording(true);
//       setError(""); // Clear any previous errors
      
//     } catch (error) {
//       console.error("Error starting recording:", error);
//       setError("Could not start recording. Please check microphone permissions.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // Submit answer for evaluation
//   const submitAnswer = async () => {
//     if (!userAnswer.trim()) {
//       setError("Please provide an answer");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const currentQuestion = questions[currentQuestionIndex];
//       const prompt = `
//         Question: ${currentQuestion.question}
//         User Answer: ${userAnswer}
//         Resume Context: ${JSON.stringify(extractedData)}
        
//         Evaluate this answer on a scale of 1-10 for:
//         1. Communication (clarity, structure, flow)
//         2. Technical Clarity (accuracy, depth)
//         3. Confidence (assertiveness, conviction)
        
//         Return ONLY this JSON:
//         {
//           "scores": {
//             "communication": 8,
//             "technicalClarity": 7,
//             "confidence": 6
//           },
//           "overallScore": 7,
//           "strengths": ["What was done well"],
//           "suggestions": ["Specific improvements"],
//           "missingPoints": ["Important points not covered"]
//         }
//       `;

//       const result = await chatSession.sendMessage(prompt);
//       const response = result.response.text()
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();
      
//       const evaluationResult = JSON.parse(response);
//       setFeedback(evaluationResult);
//       setHasSubmitted(true);
//       setActiveTab("feedback");
      
//     } catch (error) {
//       console.error("Error evaluating answer:", error);
//       setError("Failed to evaluate answer. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigation functions
//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       resetQuestionStates();
//       setActiveTab("interview");
//     } else {
//       setActiveTab("complete");
//     }
//   };

//   const retryQuestion = () => {
//     resetQuestionStates();
//     setActiveTab("interview");
//   };

//   // Jump to specific question
//   const jumpToQuestion = (index) => {
//     setCurrentQuestionIndex(index);
//     resetQuestionStates();
//     setActiveTab("interview");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             🎯 Resume-Based Interview Preparation
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Upload your resume and get personalized interview questions with AI-powered feedback
//           </p>
//         </div>

//         {error && (
//           <Alert className="mb-6 border-red-200 bg-red-50">
//             <AlertCircle className="h-4 w-4 text-red-600" />
//             <AlertDescription className="text-red-800">
//               {error}
//               {error.includes("PDF") && (
//                 <div className="mt-2">
//                   <Button 
//                     onClick={() => setActiveTab("manual-input")}
//                     variant="outline"
//                     size="sm"
//                     className="ml-2"
//                   >
//                     Try Manual Input
//                   </Button>
//                 </div>
//               )}
//             </AlertDescription>
//           </Alert>
//         )}

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-6">
//             <TabsTrigger value="upload">📄 Upload</TabsTrigger>
//             <TabsTrigger value="manual-input">✍️ Manual</TabsTrigger>
//             <TabsTrigger value="review" disabled={!extractedData}>🔍 Review</TabsTrigger>
//             <TabsTrigger value="configure" disabled={!extractedData}>⚙️ Configure</TabsTrigger>
//             <TabsTrigger value="interview" disabled={questions.length === 0}>🎤 Interview</TabsTrigger>
//             <TabsTrigger value="feedback" disabled={!feedback}>📊 Feedback</TabsTrigger>
//           </TabsList>

//           {/* Upload Tab */}
//           <TabsContent value="upload" className="mt-6">
//             <Card className="max-w-2xl mx-auto">
//               <CardHeader className="text-center">
//                 <CardTitle className="flex items-center justify-center gap-2">
//                   <Upload className="h-6 w-6" />
//                   Upload Your Resume
//                 </CardTitle>
//                 <CardDescription>
//                   Upload your PDF resume for automatic text extraction
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div 
//                   className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                   <p className="text-lg font-medium text-gray-700">
//                     {resumeFile ? resumeFile.name : "Click to upload your resume (PDF only)"}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-2">
//                     Supported format: PDF (Max size: 10MB)
//                   </p>
//                 </div>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept=".pdf"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                 />
//                 {loading && (
//                   <div className="flex items-center justify-center">
//                     <LoaderCircle className="animate-spin mr-2 h-6 w-6" />
//                     <span>Processing PDF...</span>
//                   </div>
//                 )}
//                 <div className="text-center">
//                   <Button 
//                     onClick={() => setActiveTab("manual-input")}
//                     variant="outline"
//                     className="mt-4"
//                   >
//                     Or paste resume content manually →
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Manual Input Tab */}
//           <TabsContent value="manual-input" className="mt-6">
//             <Card className="max-w-4xl mx-auto">
//               <CardHeader className="text-center">
//                 <CardTitle>📝 Paste Your Resume Content</CardTitle>
//                 <CardDescription>
//                   Copy and paste your complete resume content here (recommended for best results)
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Textarea
//                   placeholder="Paste your complete resume content here...

// Example format:
// John Doe
// Software Developer
// Email: john@example.com
// Phone: +1234567890

// PROJECTS:
// E-commerce Platform
// - Built full-stack platform using React, Node.js, MongoDB
// - Technologies: React, Node.js, MongoDB, Express

// EXPERIENCE:
// ABC Company - Software Developer (2022-2024)
// - Developed web applications using React and TypeScript

// SKILLS:
// JavaScript, React, Node.js, Python, MongoDB, SQL

// EDUCATION:
// Bachelor of Computer Science, XYZ University (2022)"
//                   value={rawText}
//                   onChange={(e) => setRawText(e.target.value)}
//                   className="min-h-80"
//                 />
//                 <Button 
//                   onClick={handleManualInput}
//                   disabled={loading || !rawText.trim()}
//                   className="w-full"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
//                       Processing Resume...
//                     </>
//                   ) : (
//                     "Process Resume Content"
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Review Tab */}
//           <TabsContent value="review" className="mt-6">
//             {extractedData && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>👤 Personal Information</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-2">
//                         <p><strong>Name:</strong> {extractedData.personalInfo?.name || "Not found"}</p>
//                         <p><strong>Email:</strong> {extractedData.personalInfo?.email || "Not found"}</p>
//                         <p><strong>Phone:</strong> {extractedData.personalInfo?.phone || "Not found"}</p>
//                         {extractedData.personalInfo?.location && (
//                           <p><strong>Location:</strong> {extractedData.personalInfo.location}</p>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader>
//                       <CardTitle>🛠️ Technical Skills</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex flex-wrap gap-2">
//                         {(extractedData.techStack || []).length > 0 ? (
//                           extractedData.techStack.map((tech, index) => (
//                             <Badge key={index} variant="default" className="text-sm">{tech}</Badge>
//                           ))
//                         ) : (
//                           <p className="text-gray-500">No technical skills found in resume</p>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>🚀 Projects</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       {(extractedData.projects || []).length > 0 ? (
//                         extractedData.projects.map((project, index) => (
//                           <div key={index} className="p-4 border rounded-lg">
//                             <h3 className="font-semibold">{project.title}</h3>
//                             <p className="text-sm text-gray-600 mt-1">{project.description}</p>
//                             {project.techStack && project.techStack.length > 0 && (
//                               <div className="flex flex-wrap gap-1 mt-2">
//                                 {project.techStack.map((tech, i) => (
//                                   <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         ))
//                       ) : (
//                         <p className="text-gray-500">No projects found</p>
//                       )}
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader>
//                       <CardTitle>💼 Experience</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       {[...(extractedData.experience || []), ...(extractedData.internships || [])].length > 0 ? (
//                         [...(extractedData.experience || []), ...(extractedData.internships || [])].map((exp, index) => (
//                           <div key={index} className="p-4 border rounded-lg">
//                             <h3 className="font-semibold">{exp.company}</h3>
//                             <p className="text-sm font-medium text-blue-600">{exp.role}</p>
//                             <p className="text-sm text-gray-600 mt-1">{exp.responsibilities}</p>
//                           </div>
//                         ))
//                       ) : (
//                         <p className="text-gray-500">No experience found</p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </div>

//                 <div className="text-center">
//                   <Button onClick={() => setActiveTab("configure")} size="lg">
//                     Continue to Configure Interview →
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </TabsContent>

//           {/* Configure Tab */}
//           <TabsContent value="configure" className="mt-6">
//             <Card className="max-w-2xl mx-auto">
//               <CardHeader>
//                 <CardTitle>🎯 Configure Your Interview</CardTitle>
//                 <CardDescription>
//                   Choose the type of questions you want to practice
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium mb-3">Question Type</label>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div 
//                       className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
//                         questionType === "context" ? "border-blue-500 bg-blue-50" : "border-gray-200"
//                       }`}
//                       onClick={() => setQuestionType("context")}
//                     >
//                       <h3 className="font-semibold">🧩 Context-Specific</h3>
//                       <p className="text-sm text-gray-600 mt-1">
//                         Deep dive into a specific project or experience
//                       </p>
//                     </div>
//                     <div 
//                       className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
//                         questionType === "overall" ? "border-blue-500 bg-blue-50" : "border-gray-200"
//                       }`}
//                       onClick={() => setQuestionType("overall")}
//                     >
//                       <h3 className="font-semibold">🌐 Overall Resume</h3>
//                       <p className="text-sm text-gray-600 mt-1">
//                         General questions covering your entire profile
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {questionType === "context" && (
//                   <div>
//                     <label className="block text-sm font-medium mb-3">
//                       Select Project/Experience to Focus On
//                     </label>
//                     <select 
//                       className="w-full p-3 border border-gray-300 rounded-lg"
//                       value={selectedProjectOrInternship}
//                       onChange={(e) => setSelectedProjectOrInternship(e.target.value)}
//                     >
//                       <option value="">Choose a project or experience...</option>
//                       {(extractedData?.projects || []).map((project, index) => (
//                         <option key={`project-${index}`} value={project.title}>
//                           📁 {project.title}
//                         </option>
//                       ))}
//                       {(extractedData?.experience || []).map((exp, index) => (
//                         <option key={`exp-${index}`} value={exp.company}>
//                           💼 {exp.company} - {exp.role}
//                         </option>
//                       ))}
//                       {(extractedData?.internships || []).map((internship, index) => (
//                         <option key={`internship-${index}`} value={internship.company}>
//                           🎓 {internship.company} - {internship.role}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 <Button 
//                   onClick={generateQuestions} 
//                   disabled={loading || (questionType === "context" && !selectedProjectOrInternship)}
//                   className="w-full"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
//                       Generating Questions...
//                     </>
//                   ) : (
//                     "Generate Interview Questions"
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Interview Tab with Hidden Hints */}
//           <TabsContent value="interview" className="mt-6">
//             {questions.length > 0 && (
//               <div className="max-w-7xl mx-auto">
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  
//                   {/* Questions Sidebar */}
//                   <div className="lg:col-span-1">
//                     <Card className="sticky top-6">
//                       <CardHeader>
//                         <CardTitle className="flex items-center gap-2 text-lg">
//                           <List className="h-5 w-5" />
//                           All Questions
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-3">
//                         {questions.map((q, index) => (
//                           <div
//                             key={index}
//                             className={`p-3 rounded-lg border cursor-pointer transition-colors ${
//                               index === currentQuestionIndex
//                                 ? 'border-blue-500 bg-blue-50'
//                                 : 'border-gray-200 hover:border-gray-300'
//                             }`}
//                             onClick={() => jumpToQuestion(index)}
//                           >
//                             <div className="flex items-start gap-2">
//                               <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
//                                 index === currentQuestionIndex
//                                   ? 'bg-blue-500 text-white'
//                                   : 'bg-gray-200 text-gray-600'
//                               }`}>
//                                 {index + 1}
//                               </span>
//                               <p className="text-sm line-clamp-3">{q.question}</p>
//                             </div>
//                           </div>
//                         ))}
                        
//                         <div className="pt-3 border-t">
//                           <div className="text-sm text-gray-600 mb-2">Progress</div>
//                           <Progress value={(currentQuestionIndex + 1) / questions.length * 100} className="h-2" />
//                           <div className="text-xs text-gray-500 mt-1">
//                             {currentQuestionIndex + 1} of {questions.length} questions
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>

//                   {/* Main Interview Content */}
//                   <div className="lg:col-span-3">
//                     <div className="mb-6">
//                       <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-2xl font-bold">
//                           Question {currentQuestionIndex + 1}
//                         </h2>
//                         <Badge variant="secondary" className="text-sm">
//                           {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
//                         </Badge>
//                       </div>
                      
//                       <Card className="mb-6">
//                         <CardContent className="p-6">
//                           <h3 className="text-xl font-semibold mb-4">
//                             {questions[currentQuestionIndex]?.question}
//                           </h3>
                          
//                           {/* Show/Hide Hints Button */}
//                           <div className="mb-4">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => setShowHints(!showHints)}
//                               className="flex items-center gap-2"
//                             >
//                               {showHints ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                               {showHints ? "Hide Hints" : "Show Hints"}
//                             </Button>
//                           </div>

//                           {/* Hints - Only show if showHints is true */}
//                           {showHints && (
//                             <>
//                               {questions[currentQuestionIndex]?.suggestedApproach && (
//                                 <div className="bg-blue-50 p-4 rounded-lg mb-4">
//                                   <h4 className="font-medium text-blue-800 mb-2">💡 Suggested Approach:</h4>
//                                   <p className="text-sm text-blue-700">
//                                     {questions[currentQuestionIndex].suggestedApproach}
//                                   </p>
//                                 </div>
//                               )}
//                               {questions[currentQuestionIndex]?.keyPoints && (
//                                 <div className="bg-green-50 p-4 rounded-lg">
//                                   <h4 className="font-medium text-green-800 mb-2">🔑 Key Points to Cover:</h4>
//                                   <ul className="text-sm text-green-700 space-y-1">
//                                     {questions[currentQuestionIndex].keyPoints.map((point, index) => (
//                                       <li key={index}>• {point}</li>
//                                     ))}
//                                   </ul>
//                                 </div>
//                               )}
//                             </>
//                           )}
//                         </CardContent>
//                       </Card>

//                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         {/* Video Practice */}
//                         <Card>
//                           <CardHeader>
//                             <CardTitle className="flex items-center gap-2">
//                               📹 Video Practice
//                             </CardTitle>
//                           </CardHeader>
//                           <CardContent>
//                             <div className="relative">
//                               <video 
//                                 ref={videoRef}
//                                 autoPlay
//                                 muted
//                                 className="w-full h-48 bg-gray-900 rounded-lg object-cover"
//                               />
//                               <div className="flex gap-2 mt-4">
//                                 <Button
//                                   variant={isCameraOn ? "destructive" : "default"}
//                                   onClick={isCameraOn ? stopCamera : startCamera}
//                                   size="sm"
//                                 >
//                                   {isCameraOn ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
//                                   {isCameraOn ? "Stop Camera" : "Start Camera"}
//                                 </Button>
//                                 <Button
//                                   variant={isRecording ? "destructive" : "default"}
//                                   onClick={isRecording ? stopRecording : startRecording}
//                                   size="sm"
//                                   disabled={isListening} // Prevent conflict with speech recognition
//                                 >
//                                   {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                                   {isRecording ? "Stop Recording" : "Record Audio"}
//                                 </Button>
//                               </div>
                              
//                               {/* Audio playback */}
//                               {audioURL && (
//                                 <div className="mt-3">
//                                   <audio controls className="w-full">
//                                     <source src={audioURL} type="audio/wav" />
//                                     Your browser does not support audio playback.
//                                   </audio>
//                                 </div>
//                               )}
//                             </div>
//                           </CardContent>
//                         </Card>

//                         {/* Answer Section */}
//                         <Card>
//                           <CardHeader>
//                             <CardTitle className="flex items-center justify-between">
//                               ✍️ Your Answer
//                               {speechSupported && (
//                                 <Button
//                                   variant={isListening ? "destructive" : "outline"}
//                                   onClick={isListening ? stopListening : startListening}
//                                   size="sm"
//                                   disabled={isRecording} // Prevent conflict with audio recording
//                                 >
//                                   {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                                   {isListening ? "Stop Listening" : "Voice to Text"}
//                                 </Button>
//                               )}
//                             </CardTitle>
//                           </CardHeader>
//                           <CardContent>
//                             {isListening && (
//                               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                                 <div className="flex items-center gap-2">
//                                   <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                                   <span className="text-sm text-red-700 font-medium">Listening... Speak now</span>
//                                 </div>
//                               </div>
//                             )}

//                             {isRecording && (
//                               <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                                 <div className="flex items-center gap-2">
//                                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                                   <span className="text-sm text-green-700 font-medium">Recording audio...</span>
//                                 </div>
//                               </div>
//                             )}
                            
//                             <Textarea
//                               placeholder="Type your answer here or use 'Voice to Text' to speak your response..."
//                               value={userAnswer}
//                               onChange={(e) => setUserAnswer(e.target.value)}
//                               className="min-h-32 mb-4"
//                             />
                            
//                             {transcript && (
//                               <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                                 <div className="text-sm text-blue-700">
//                                   <strong>Recent speech:</strong> {transcript.slice(-100)}...
//                                 </div>
//                               </div>
//                             )}
                            
//                             <Button
//                               onClick={submitAnswer}
//                               disabled={!userAnswer.trim() || loading}
//                               className="w-full"
//                             >
//                               {loading ? (
//                                 <>
//                                   <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
//                                   Evaluating...
//                                 </>
//                               ) : (
//                                 <>
//                                   <Send className="mr-2 h-4 w-4" />
//                                   Submit Answer
//                                 </>
//                               )}
//                             </Button>
//                           </CardContent>
//                         </Card>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </TabsContent>

//           {/* Feedback Tab */}
//           <TabsContent value="feedback" className="mt-6">
//             {feedback && (
//               <div className="max-w-4xl mx-auto space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-2xl">📊 Your Performance</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-3 gap-6 mb-6">
//                       <div className="text-center">
//                         <div className="text-3xl font-bold text-blue-600 mb-2">
//                           {feedback.scores?.communication || 0}/10
//                         </div>
//                         <div className="text-sm text-gray-600">Communication</div>
//                         <Progress value={(feedback.scores?.communication || 0) * 10} className="mt-2" />
//                       </div>
//                       <div className="text-center">
//                         <div className="text-3xl font-bold text-green-600 mb-2">
//                           {feedback.scores?.technicalClarity || 0}/10
//                         </div>
//                         <div className="text-sm text-gray-600">Technical Clarity</div>
//                         <Progress value={(feedback.scores?.technicalClarity || 0) * 10} className="mt-2" />
//                       </div>
//                       <div className="text-center">
//                         <div className="text-3xl font-bold text-purple-600 mb-2">
//                           {feedback.scores?.confidence || 0}/10
//                         </div>
//                         <div className="text-sm text-gray-600">Confidence</div>
//                         <Progress value={(feedback.scores?.confidence || 0) * 10} className="mt-2" />
//                       </div>
//                     </div>

//                     <div className="text-center mb-6">
//                       <div className="text-4xl font-bold text-gray-800">
//                         Overall: {feedback.overallScore || 0}/10
//                       </div>
//                     </div>

//                     {feedback.strengths && feedback.strengths.length > 0 && (
//                       <div className="bg-green-50 p-4 rounded-lg mb-4">
//                         <h4 className="font-semibold text-green-800 mb-3">✅ Strengths:</h4>
//                         <ul className="space-y-2">
//                           {feedback.strengths.map((strength, index) => (
//                             <li key={index} className="text-sm text-green-700">• {strength}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {feedback.suggestions && feedback.suggestions.length > 0 && (
//                       <div className="bg-yellow-50 p-4 rounded-lg mb-4">
//                         <h4 className="font-semibold text-yellow-800 mb-3">💡 Suggestions:</h4>
//                         <ul className="space-y-2">
//                           {feedback.suggestions.map((suggestion, index) => (
//                             <li key={index} className="text-sm text-yellow-700">• {suggestion}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {feedback.missingPoints && feedback.missingPoints.length > 0 && (
//                       <div className="bg-red-50 p-4 rounded-lg mb-4">
//                         <h4 className="font-semibold text-red-800 mb-3">❌ Missing Points:</h4>
//                         <ul className="space-y-2">
//                           {feedback.missingPoints.map((point, index) => (
//                             <li key={index} className="text-sm text-red-700">• {point}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     <div className="flex gap-4 mt-6">
//                       {currentQuestionIndex < questions.length - 1 ? (
//                         <Button onClick={nextQuestion} className="flex-1">
//                           Next Question →
//                         </Button>
//                       ) : (
//                         <Button onClick={() => setActiveTab("complete")} className="flex-1">
//                           Complete Interview
//                         </Button>
//                       )}
//                       <Button variant="outline" onClick={retryQuestion}>
//                         Retry Question
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             )}
//           </TabsContent>

//           {/* Complete Tab */}
//           <TabsContent value="complete" className="mt-6">
//             <Card className="max-w-2xl mx-auto text-center">
//               <CardHeader>
//                 <CardTitle className="text-3xl">🎉 Interview Complete!</CardTitle>
//                 <CardDescription>
//                   Great job completing your resume-based interview practice
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="text-lg">
//                   You've successfully answered all {questions.length} questions based on your resume.
//                 </div>
//                 <div className="flex gap-4 justify-center">
//                   <Button 
//                     onClick={() => window.location.reload()} 
//                     size="lg"
//                   >
//                     Start New Interview
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     onClick={() => router.push("/dashboard")} 
//                     size="lg"
//                   >
//                     Back to Dashboard
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default ResumeInterviewPlatform;

"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { 
  Upload, 
  FileText, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Send, 
  AlertCircle, 
  List, 
  Eye, 
  EyeOff,
  Star,
  Heart,
  Sparkles,
  Wand2,
  Rocket,
  Trophy,
  Target,
  Zap,
  Crown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";

const ResumeInterviewPlatform = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [resumeFile, setResumeFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [selectedProjectOrInternship, setSelectedProjectOrInternship] = useState("");
  const [questionType, setQuestionType] = useState("context");
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  
  // Speech recognition states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Hint visibility states
  const [showHints, setShowHints] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Recording states
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState("");

  const { user } = useUser();
  const router = useRouter();
  const fileInputRef = useRef();
  const videoRef = useRef();
  const mediaRecorderRef = useRef();
  const recognitionRef = useRef();
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 3000);
    return () => clearInterval(sparkleInterval);
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            }
          }

          if (finalTranscript) {
            setUserAnswer(prev => prev + finalTranscript);
            setTranscript(prev => prev + finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setError(`Speech recognition error: ${event.error}`);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  // Reset states when moving to new question
  const resetQuestionStates = () => {
    setUserAnswer("");
    setFeedback(null);
    setTranscript("");
    setShowHints(false);
    setHasSubmitted(false);
    setAudioBlob(null);
    setAudioURL("");
  };

  // Load PDF.js dynamically
  const loadPDFJS = async () => {
    try {
      if (!window.pdfjsLib) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve(window.pdfjsLib);
          };
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      return window.pdfjsLib;
    } catch (error) {
      console.error('Failed to load PDF.js:', error);
      throw new Error('PDF library failed to load');
    }
  };

  // Extract text from PDF
  const extractTextFromPDF = async (file) => {
    try {
      console.log('Starting PDF extraction for file:', file.name, 'Size:', file.size);
      
      const pdfjsLib = await loadPDFJS();
      const arrayBuffer = await file.arrayBuffer();
      
      console.log('PDF.js loaded, processing arrayBuffer...');
      
      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true,
        verbosity: 0
      });
      
      const pdf = await loadingTask.promise;
      console.log('PDF loaded, pages:', pdf.numPages);
      
      let fullText = '';
      
      for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 10); pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          const pageText = textContent.items
            .filter(item => item.str && item.str.trim())
            .map(item => item.str.trim())
            .join(' ');
          
          if (pageText.trim()) {
            fullText += pageText + '\n\n';
          }
          
          console.log(`Page ${pageNum} extracted, length:`, pageText.length);
        } catch (pageError) {
          console.warn(`Error extracting page ${pageNum}:`, pageError);
        }
      }
      
      if (fullText.trim()) {
        console.log('PDF extraction successful, total length:', fullText.length);
        return cleanExtractedText(fullText);
      }
      
      throw new Error('No text content found in PDF');
      
    } catch (error) {
      console.error('PDF extraction failed:', error);
      throw error;
    }
  };

  // Clean extracted text
  const cleanExtractedText = (text) => {
    return text
      .replace(/\s+/g, ' ')
      .replace(/([.!?])\s+([A-Z])/g, '$1\n$2')
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/[^\x20-\x7E\n]/g, '')
      .trim();
  };

  // Extract resume data using AI
  const extractResumeData = async (text) => {
    const prompt = `
      Analyze this resume text and extract structured information in JSON format.
      
      Resume Text:
      ${text}
      
      Extract and return ONLY a JSON object with this structure:
      {
        "personalInfo": {
          "name": "Full Name",
          "email": "email@example.com", 
          "phone": "phone number",
          "location": "city, country"
        },
        "projects": [
          {
            "title": "Project Name",
            "description": "Brief description",
            "techStack": ["tech1", "tech2"],
            "duration": "time period",
            "keyFeatures": ["feature1", "feature2"]
          }
        ],
        "experience": [
          {
            "company": "Company Name",
            "role": "Position Title",
            "duration": "time period", 
            "responsibilities": "main responsibilities",
            "techUsed": ["tech1", "tech2"]
          }
        ],
        "internships": [
          {
            "company": "Company Name",
            "role": "Position Title",
            "duration": "time period",
            "responsibilities": "main responsibilities", 
            "techUsed": ["tech1", "tech2"]
          }
        ],
        "education": [
          {
            "institution": "University Name",
            "degree": "Degree Type",
            "field": "Field of Study",
            "year": "graduation year"
          }
        ],
        "techStack": ["JavaScript", "React", "Node.js"],
        "certifications": ["Certification Name"],
        "achievements": ["Achievement description"],
        "skills": {
          "programming": ["language1", "language2"],
          "frontend": ["framework1", "framework2"],
          "backend": ["framework1", "framework2"],
          "databases": ["db1", "db2"],
          "tools": ["tool1", "tool2"]
        }
      }
      
      Extract ONLY information present in the resume. If a section is empty, use empty array [].
      Return only the JSON object, no additional text.
    `;

    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(response);
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return;
    }

    setLoading(true);
    setError("");
    setResumeFile(file);

    try {
      const extractedText = await extractTextFromPDF(file);
      
      if (!extractedText || extractedText.length < 50) {
        throw new Error("Extracted text is too short or empty. This might be an image-based PDF.");
      }

      setRawText(extractedText);
      const structuredData = await extractResumeData(extractedText);
      
      const hasValidData = structuredData.personalInfo || 
                          (structuredData.techStack && structuredData.techStack.length > 0) || 
                          (structuredData.projects && structuredData.projects.length > 0) ||
                          (structuredData.experience && structuredData.experience.length > 0);
      
      if (!hasValidData) {
        throw new Error("Could not extract meaningful information from the resume");
      }

      setExtractedData(structuredData);
      setActiveTab("review");
      
    } catch (error) {
      console.error("Error processing PDF:", error);
      
      if (error.message.includes("image-based") || error.message.includes("No text content")) {
        setError("This PDF appears to be image-based or scanned. Please try converting it to text-based PDF or use manual input.");
      } else if (error.message.includes("PDF library")) {
        setError("PDF processing library failed to load. Please try manual input or refresh the page.");
      } else if (error.message.includes("too short")) {
        setError("Could not extract enough text from PDF. Please try manual input.");
      } else {
        setError(`PDF processing failed: ${error.message}. Please try manual input.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle manual text input
  const handleManualInput = async () => {
    if (!rawText.trim()) {
      setError("Please paste your resume content");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const structuredData = await extractResumeData(rawText);
      
      const hasValidData = structuredData.personalInfo || 
                          (structuredData.techStack && structuredData.techStack.length > 0) || 
                          (structuredData.projects && structuredData.projects.length > 0) ||
                          (structuredData.experience && structuredData.experience.length > 0);

      if (!hasValidData) {
        throw new Error("Could not extract meaningful information from the text. Please check the format.");
      }

      setExtractedData(structuredData);
      setActiveTab("review");

    } catch (error) {
      console.error("Error processing manual input:", error);
      setError("Failed to process resume content. Please check the format and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate interview questions
  const generateQuestions = async () => {
    if (!extractedData) {
      setError("No resume data available");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let prompt = "";
      
      if (questionType === "context" && selectedProjectOrInternship) {
        const allItems = [
          ...(extractedData.projects || []), 
          ...(extractedData.experience || []), 
          ...(extractedData.internships || [])
        ];
        
        const selectedItem = allItems.find(item => 
          item.title === selectedProjectOrInternship || 
          item.company === selectedProjectOrInternship
        );
        
        if (!selectedItem) {
          throw new Error("Selected project/experience not found");
        }

        prompt = `
          Based on this specific project/experience from resume: ${JSON.stringify(selectedItem)}
          
          Generate exactly 5 interview questions that test:
          1. Technical understanding of technologies used
          2. Problem-solving approach and challenges
          3. Impact and results achieved
          4. Design decisions made
          5. Lessons learned and improvements
          
          Return ONLY a JSON array:
          [
            {
              "question": "Interview question here",
              "suggestedApproach": "How to approach this question",
              "keyPoints": ["point 1", "point 2", "point 3"]
            }
          ]
          
          Make questions specific to the actual technologies mentioned.
        `;
      } else {
        prompt = `
          Based on this complete resume: ${JSON.stringify(extractedData)}
          
          Generate exactly 5 comprehensive interview questions covering:
          1. Career journey and motivations
          2. Technical skills and experience  
          3. Leadership and teamwork
          4. Problem-solving abilities
          5. Future goals and growth
          
          Return ONLY a JSON array:
          [
            {
              "question": "Interview question here", 
              "suggestedApproach": "How to approach this question",
              "keyPoints": ["point 1", "point 2", "point 3"]
            }
          ]
          
          Base questions on actual experience in the resume.
        `;
      }

      const result = await chatSession.sendMessage(prompt);
      const response = result.response.text()
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      
      const generatedQuestions = JSON.parse(response);
      
      if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error("Failed to generate questions");
      }

      setQuestions(generatedQuestions);
      resetQuestionStates();
      setActiveTab("interview");
      
    } catch (error) {
      console.error("Error generating questions:", error);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Speech recognition controls
  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setTranscript("");
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      setError("Speech recognition is not supported in your browser");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Camera controls
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false  
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setError("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    setIsCameraOn(false);
  };

  // Audio recording controls
  const startRecording = async () => {
    try {
      if (isListening) {
        stopListening();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        setError('Recording error: ' + event.error);
      };

      mediaRecorderRef.current.start(100);
      setIsRecording(true);
      setError("");
      
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Could not start recording. Please check microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Submit answer for evaluation
  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      setError("Please provide an answer");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const currentQuestion = questions[currentQuestionIndex];
      const prompt = `
        Question: ${currentQuestion.question}
        User Answer: ${userAnswer}
        Resume Context: ${JSON.stringify(extractedData)}
        
        Evaluate this answer on a scale of 1-10 for:
        1. Communication (clarity, structure, flow)
        2. Technical Clarity (accuracy, depth)
        3. Confidence (assertiveness, conviction)
        
        Return ONLY this JSON:
        {
          "scores": {
            "communication": 8,
            "technicalClarity": 7,
            "confidence": 6
          },
          "overallScore": 7,
          "strengths": ["What was done well"],
          "suggestions": ["Specific improvements"],
          "missingPoints": ["Important points not covered"]
        }
      `;

      const result = await chatSession.sendMessage(prompt);
      const response = result.response.text()
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      
      const evaluationResult = JSON.parse(response);
      setFeedback(evaluationResult);
      setHasSubmitted(true);
      setActiveTab("feedback");
      
    } catch (error) {
      console.error("Error evaluating answer:", error);
      setError("Failed to evaluate answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigation functions
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetQuestionStates();
      setActiveTab("interview");
    } else {
      setActiveTab("complete");
    }
  };

  const retryQuestion = () => {
    resetQuestionStates();
    setActiveTab("interview");
  };

  // Jump to specific question
  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    resetQuestionStates();
    setActiveTab("interview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-32 left-32 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
      <div className="absolute bottom-20 right-40 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Cute Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-2xl transform group-hover:rotate-12 transition-all duration-300">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                {sparkleAnimation && (
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                  </div>
                )}
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-3">
                <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                Resume Magic Interview
                <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
              </h1>
              <p className="text-lg font-bold text-gray-700 flex items-center justify-center gap-2">
                <Wand2 className="w-5 h-5 text-purple-500" />
                Upload your resume and get personalized interview questions with AI-powered feedback ✨
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Cute Error Alert */}
        {error && (
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
            <div className="relative bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl shadow-lg">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-red-800 font-medium">{error}</p>
                  {error.includes("PDF") && (
                    <div className="mt-3">
                      <Button 
                        onClick={() => setActiveTab("manual-input")}
                        size="sm"
                        className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Wand2 className="w-4 h-4" />
                          Try Manual Input
                        </div>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cute Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-20 blur-lg"></div>
            <TabsList className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 border-2 border-white/50 shadow-xl rounded-2xl p-2 backdrop-blur-sm grid w-full grid-cols-6">
              <TabsTrigger value="upload" className="rounded-xl font-bold">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload 📄</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="manual-input" className="rounded-xl font-bold">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Manual ✍️</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="review" disabled={!extractedData} className="rounded-xl font-bold">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Review 🔍</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="configure" disabled={!extractedData} className="rounded-xl font-bold">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Configure ⚙️</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="interview" disabled={questions.length === 0} className="rounded-xl font-bold">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span>Interview 🎤</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="feedback" disabled={!feedback} className="rounded-xl font-bold">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Feedback 📊</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Upload Tab */}
          <TabsContent value="upload" className="mt-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden">
                  
                  {/* Decorations */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute top-6 right-10 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl shadow-lg">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2 mb-3">
                        Upload Your Magic Resume ✨
                        <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                      </h2>
                      <p className="text-gray-600 font-medium flex items-center justify-center gap-1">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        Upload your PDF resume for automatic text extraction 💖
                      </p>
                    </div>

                    <div 
                      className="relative group border-3 border-dashed border-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 rounded-3xl p-16 text-center cursor-pointer bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-cyan-50/50 hover:from-pink-100/50 hover:via-purple-100/50 hover:to-cyan-100/50 transition-all duration-300 shadow-inner"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="absolute top-4 right-4 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
                      <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-300 rounded-full animate-bounce opacity-60"></div>
                      
                      <div className="relative">
                        <div className="p-6 bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-500 rounded-3xl shadow-2xl mx-auto w-fit mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          <FileText className="w-16 h-16 text-white" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-800 mb-3 flex items-center justify-center gap-2">
                          {resumeFile ? resumeFile.name : "Click to upload your resume"}
                          <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
                        </h3>
                        <p className="text-gray-600 font-medium flex items-center justify-center gap-1">
                          <Wand2 className="w-4 h-4 text-purple-500" />
                          Supported format: PDF (Max size: 10MB) ✨
                        </p>
                      </div>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {loading && (
                      <div className="flex items-center justify-center mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-200 shadow-lg">
                        <LoaderCircle className="animate-spin mr-3 h-6 w-6 text-orange-500" />
                        <span className="font-bold text-orange-700 flex items-center gap-2">
                          Processing PDF Magic...
                          <Sparkles className="w-4 h-4 animate-pulse" />
                        </span>
                      </div>
                    )}

                    <div className="text-center mt-8">
                      <Button 
                        onClick={() => setActiveTab("manual-input")}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Wand2 className="w-5 h-5" />
                          <span>Or paste resume content manually</span>
                          <Rocket className="w-5 h-5 animate-pulse" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Manual Input Tab */}
          <TabsContent value="manual-input" className="mt-6">
            <div className="max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden">
                  
                  {/* Decorations */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-cyan-300 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute top-8 right-10 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-60"></div>

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-lg">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center justify-center gap-2 mb-3">
                        Paste Your Resume Content ✍️
                        <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                      </h2>
                      <p className="text-gray-600 font-medium flex items-center justify-center gap-1">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        Copy and paste your complete resume content here for best results 💖
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="relative">
                        <Textarea
                          placeholder="Paste your complete resume content here... ✨

Example format:
John Doe
Software Developer
Email: john@example.com
Phone: +1234567890

PROJECTS:
E-commerce Platform
- Built full-stack platform using React, Node.js, MongoDB
- Technologies: React, Node.js, MongoDB, Express

EXPERIENCE:
ABC Company - Software Developer (2022-2024)
- Developed web applications using React and TypeScript

SKILLS:
JavaScript, React, Node.js, Python, MongoDB, SQL

EDUCATION:
Bachelor of Computer Science, XYZ University (2022)"
                          value={rawText}
                          onChange={(e) => setRawText(e.target.value)}
                          className="min-h-80 rounded-2xl border-2 border-cyan-200 focus:border-cyan-400 bg-gradient-to-br from-white to-cyan-50 shadow-lg font-medium placeholder:text-gray-400"
                        />
                        <div className="absolute top-4 right-4">
                          <Heart className="w-5 h-5 text-cyan-400" />
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleManualInput}
                        disabled={loading || !rawText.trim()}
                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                        size="lg"
                      >
                        {loading ? (
                          <div className="flex items-center gap-3">
                            <LoaderCircle className="animate-spin w-6 h-6" />
                            <span>Processing Resume Magic...</span>
                            <Sparkles className="w-5 h-5 animate-pulse" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Rocket className="w-6 h-6" />
                            <span>Process Resume Content</span>
                            <Heart className="w-6 h-6 animate-pulse" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Review Tab */}
          <TabsContent value="review" className="mt-6">
            {extractedData && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Info Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-rose-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                      
                      {/* Decorations */}
                      <div className="absolute top-3 right-3 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
                      <div className="absolute bottom-3 left-3 w-2 h-2 bg-rose-300 rounded-full animate-bounce opacity-60"></div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl shadow-lg">
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-1">
                            Personal Information 👤
                            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
                          </h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                            <p className="font-bold text-gray-800">Name: <span className="font-medium text-pink-700">{extractedData.personalInfo?.name || "Not found"}</span></p>
                          </div>
                          <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                            <p className="font-bold text-gray-800">Email: <span className="font-medium text-pink-700">{extractedData.personalInfo?.email || "Not found"}</span></p>
                          </div>
                          <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                            <p className="font-bold text-gray-800">Phone: <span className="font-medium text-pink-700">{extractedData.personalInfo?.phone || "Not found"}</span></p>
                          </div>
                          {extractedData.personalInfo?.location && (
                            <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                              <p className="font-bold text-gray-800">Location: <span className="font-medium text-pink-700">{extractedData.personalInfo.location}</span></p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Skills Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                      
                      {/* Decorations */}
                      <div className="absolute top-3 right-3 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
                      <div className="absolute bottom-3 left-3 w-2 h-2 bg-indigo-300 rounded-full animate-bounce opacity-60"></div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl shadow-lg">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-1">
                            Technical Skills 🛠️
                            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                          </h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {(extractedData.techStack || []).length > 0 ? (
                            extractedData.techStack.map((tech, index) => (
                              <div key={index} className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-sm rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                                {tech}
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 font-medium flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-purple-400" />
                              No technical skills found in resume 💭
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Projects Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                      
                      {/* Decorations */}
                      <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-300 rounded-full animate-pulse opacity-60"></div>
                      <div className="absolute bottom-3 left-3 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-60"></div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl shadow-lg">
                            <Rocket className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-1">
                            Projects 🚀
                            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                          </h3>
                        </div>
                        
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                          {(extractedData.projects || []).length > 0 ? (
                            extractedData.projects.map((project, index) => (
                              <div key={index} className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl shadow-lg">
                                <h4 className="font-black text-gray-800 flex items-center gap-2 mb-2">
                                  {project.title}
                                  <Star className="w-4 h-4 text-yellow-400" />
                                </h4>
                                <p className="text-sm text-gray-700 font-medium mb-3">{project.description}</p>
                                {project.techStack && project.techStack.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {project.techStack.map((tech, i) => (
                                      <div key={i} className="px-2 py-1 bg-gradient-to-r from-cyan-200 to-blue-200 text-cyan-800 font-bold text-xs rounded-lg border border-cyan-300">
                                        {tech}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 font-medium flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-cyan-400" />
                              No projects found 💭
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                      
                      {/* Decorations */}
                      <div className="absolute top-3 right-3 w-3 h-3 bg-emerald-300 rounded-full animate-pulse opacity-60"></div>
                      <div className="absolute bottom-3 left-3 w-2 h-2 bg-teal-300 rounded-full animate-bounce opacity-60"></div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl shadow-lg">
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-1">
                            Experience 💼
                            <Heart className="w-4 h-4 text-emerald-400 animate-pulse" />
                          </h3>
                        </div>
                        
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                          {[...(extractedData.experience || []), ...(extractedData.internships || [])].length > 0 ? (
                            [...(extractedData.experience || []), ...(extractedData.internships || [])].map((exp, index) => (
                              <div key={index} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl shadow-lg">
                                <h4 className="font-black text-gray-800 flex items-center gap-2 mb-2">
                                  {exp.company}
                                  <Star className="w-4 h-4 text-yellow-400" />
                                </h4>
                                <p className="text-sm font-bold text-emerald-700 mb-2">{exp.role}</p>
                                <p className="text-sm text-gray-700 font-medium">{exp.responsibilities}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 font-medium flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-emerald-400" />
                              No experience found 💭
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="text-center">
                  <div className="relative group inline-block">
                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                    <Button 
                      onClick={() => setActiveTab("configure")} 
                      className="relative px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 border-0"
                      size="lg"
                    >
                      <div className="flex items-center gap-3">
                        <Rocket className="w-6 h-6" />
                        <span>Continue to Configure Interview</span>
                        <Heart className="w-6 h-6 animate-pulse" />
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Configure Tab */}
          <TabsContent value="configure" className="mt-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden">
                  
                  {/* Decorations */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute top-8 right-10 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl shadow-lg">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-2 mb-3">
                        Configure Your Interview 🎯
                        <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                      </h2>
                      <p className="text-gray-600 font-medium flex items-center justify-center gap-1">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        Choose the type of questions you want to practice ✨
                      </p>
                    </div>

                    <div className="space-y-8">
                      {/* Question Type Selection */}
                      <div>
                        <label className="block text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
                          <Wand2 className="w-5 h-5 text-purple-500" />
                          Question Type Magic ✨
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div 
                            className={`relative group p-6 border-3 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                              questionType === "context" 
                                ? "border-gradient-to-r from-blue-400 to-purple-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl" 
                                : "border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg"
                            }`}
                            onClick={() => setQuestionType("context")}
                          >
                            {/* Decorations */}
                            <div className="absolute top-3 right-3 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
                            
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl shadow-lg">
                                <Target className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1">
                                Context-Specific 🧩
                                {questionType === "context" && <Star className="w-4 h-4 text-yellow-400 animate-pulse" />}
                              </h3>
                            </div>
                            <p className="text-gray-700 font-medium">
                              Deep dive into a specific project or experience with detailed technical questions 💫
                            </p>
                          </div>

                          <div 
                            className={`relative group p-6 border-3 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                              questionType === "overall" 
                                ? "border-gradient-to-r from-emerald-400 to-teal-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl" 
                                : "border-gray-200 bg-gradient-to-br from-gray-50 to-emerald-50 hover:shadow-lg"
                            }`}
                            onClick={() => setQuestionType("overall")}
                          >
                            {/* Decorations */}
                            <div className="absolute top-3 right-3 w-3 h-3 bg-emerald-300 rounded-full animate-pulse opacity-60"></div>
                            
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl shadow-lg">
                                <Crown className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-1">
                                Overall Resume 🌐
                                {questionType === "overall" && <Star className="w-4 h-4 text-yellow-400 animate-pulse" />}
                              </h3>
                            </div>
                            <p className="text-gray-700 font-medium">
                              General questions covering your entire profile and career journey 🚀
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Project/Experience Selection */}
                      {questionType === "context" && (
                        <div>
                          <label className="block text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
                            <Rocket className="w-5 h-5 text-pink-500" />
                            Select Project/Experience to Focus On 💖
                          </label>
                          <div className="relative">
                            <select 
                              className="w-full p-4 border-2 border-pink-200 focus:border-pink-400 bg-gradient-to-r from-white to-pink-50 rounded-2xl shadow-lg font-medium text-gray-700 pr-12"
                              value={selectedProjectOrInternship}
                              onChange={(e) => setSelectedProjectOrInternship(e.target.value)}
                            >
                              <option value="">Choose a project or experience... ✨</option>
                              {(extractedData?.projects || []).map((project, index) => (
                                <option key={`project-${index}`} value={project.title}>
                                  📁 {project.title}
                                </option>
                              ))}
                              {(extractedData?.experience || []).map((exp, index) => (
                                <option key={`exp-${index}`} value={exp.company}>
                                  💼 {exp.company} - {exp.role}
                                </option>
                              ))}
                              {(extractedData?.internships || []).map((internship, index) => (
                                <option key={`internship-${index}`} value={internship.company}>
                                  🎓 {internship.company} - {internship.role}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <Heart className="w-5 h-5 text-pink-400" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Generate Button */}
                      <div className="text-center pt-4">
                        <div className="relative group inline-block">
                          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                          <Button 
                            onClick={generateQuestions} 
                            disabled={loading || (questionType === "context" && !selectedProjectOrInternship)}
                            className="relative px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            size="lg"
                          >
                            {loading ? (
                              <div className="flex items-center gap-3">
                                <LoaderCircle className="animate-spin w-6 h-6" />
                                <span>Generating Questions...</span>
                                <Sparkles className="w-5 h-5 animate-pulse" />
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <Wand2 className="w-6 h-6" />
                                <span>Generate Interview Questions</span>
                                <Rocket className="w-6 h-6 animate-pulse" />
                              </div>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Interview Tab */}
          <TabsContent value="interview" className="mt-6">
            {questions.length > 0 && (
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  
                  {/* Questions Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-6">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
                        <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                          
                          {/* Decorations */}
                          <div className="absolute top-3 right-3 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
                          <div className="absolute bottom-3 left-3 w-2 h-2 bg-pink-300 rounded-full animate-bounce opacity-60"></div>

                          <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl shadow-lg">
                                <List className="w-5 h-5 text-white" />
                              </div>
                              <h3 className="text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-1">
                                All Questions 📝
                                <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                              </h3>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                              {questions.map((q, index) => (
                                <div
                                  key={index}
                                  className={`relative group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                    index === currentQuestionIndex
                                      ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                                      : 'border-gray-200 bg-gradient-to-br from-gray-50 to-purple-50/30 hover:border-purple-300 hover:shadow-lg'
                                  }`}
                                  onClick={() => jumpToQuestion(index)}
                                >
                                  {/* Decorations */}
                                  {index === currentQuestionIndex && (
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                  )}
                                  
                                  <div className="flex items-start gap-3">
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                                      index === currentQuestionIndex
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                        : 'bg-gradient-to-r from-gray-300 to-purple-300 text-gray-700'
                                    }`}>
                                      {index + 1}
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 line-clamp-3 leading-relaxed">{q.question}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="pt-4 border-t-2 border-gradient-to-r from-purple-200 to-pink-200">
                              <div className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                                Progress Magic ✨
                              </div>
                              <div className="relative">
                                <Progress value={(currentQuestionIndex + 1) / questions.length * 100} className="h-3 rounded-full" />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></div>
                              </div>
                              <div className="text-xs font-medium text-gray-600 mt-2 text-center">
                                {currentQuestionIndex + 1} of {questions.length} questions 💖
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Interview Content */}
                  <div className="lg:col-span-3">
                    <div className="mb-8">
                      {/* Question Header */}
                      <div className="relative group mb-8">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-2xl opacity-20 blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 rounded-2xl shadow-xl p-6 border-2 border-white/50 backdrop-blur-sm">
                          
                          {/* Decorations */}
                          <div className="absolute top-4 right-4 w-4 h-4 bg-cyan-300 rounded-full animate-bounce opacity-60"></div>
                          <div className="absolute top-6 right-10 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60"></div>

                          <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                              Question {currentQuestionIndex + 1}
                              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                            </h2>
                            <div className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm rounded-full shadow-lg">
                              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete ✨
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                            {questions[currentQuestionIndex]?.question}
                          </h3>
                          
                          {/* Show/Hide Hints Button */}
                          <div className="mb-6">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowHints(!showHints)}
                              className="rounded-xl border-2 border-purple-200 hover:border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                              <div className="flex items-center gap-2">
                                {showHints ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                <span>{showHints ? "Hide Hints" : "Show Hints"}</span>
                                <Wand2 className="w-4 h-4" />
                              </div>
                            </Button>
                          </div>

                          {/* Hints */}
                          {showHints && (
                            <div className="space-y-4">
                              {questions[currentQuestionIndex]?.suggestedApproach && (
                                <div className="relative group">
                                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-xl opacity-20 blur-lg"></div>
                                  <div className="relative bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200 shadow-lg">
                                    <h4 className="font-black text-blue-800 mb-3 flex items-center gap-2">
                                      💡 Suggested Approach:
                                      <Sparkles className="w-4 h-4 text-yellow-500" />
                                    </h4>
                                    <p className="text-sm text-blue-700 font-medium leading-relaxed">
                                      {questions[currentQuestionIndex].suggestedApproach}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {questions[currentQuestionIndex]?.keyPoints && (
                                <div className="relative group">
                                  <div className="absolute -inset-1 bg-gradient-to-r from-green-300 to-emerald-300 rounded-xl opacity-20 blur-lg"></div>
                                  <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200 shadow-lg">
                                    <h4 className="font-black text-green-800 mb-3 flex items-center gap-2">
                                      🔑 Key Points to Cover:
                                      <Heart className="w-4 h-4 text-green-600" />
                                    </h4>
                                    <ul className="text-sm text-green-700 space-y-2">
                                      {questions[currentQuestionIndex].keyPoints.map((point, index) => (
                                        <li key={index} className="flex items-start gap-2 font-medium">
                                          <Star className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                                          {point}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Video Practice */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl opacity-20 blur-lg"></div>
                          <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-rose-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                            
                            {/* Decorations */}
                            <div className="absolute top-3 right-3 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
                            <div className="absolute bottom-3 left-3 w-2 h-2 bg-rose-300 rounded-full animate-bounce opacity-60"></div>

                            <div className="p-6">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl shadow-lg">
                                  <Camera className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-1">
                                  Video Practice 📹
                                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                                </h3>
                              </div>
                              
                              <div className="relative">
                                <video 
                                  ref={videoRef}
                                  autoPlay
                                  muted
                                  className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl object-cover shadow-xl border-2 border-pink-200"
                                />
                                <div className="flex gap-3 mt-6">
                                  <Button
                                    variant={isCameraOn ? "destructive" : "default"}
                                    onClick={isCameraOn ? stopCamera : startCamera}
                                    className={`flex-1 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ${
                                      isCameraOn 
                                        ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600' 
                                        : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
                                    } text-white border-0`}
                                    size="sm"
                                  >
                                    <div className="flex items-center gap-2">
                                      {isCameraOn ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                                      <span>{isCameraOn ? "Stop Camera" : "Start Camera"}</span>
                                    </div>
                                  </Button>
                                  <Button
                                    variant={isRecording ? "destructive" : "default"}
                                    onClick={isRecording ? stopRecording : startRecording}
                                    disabled={isListening}
                                    className={`flex-1 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ${
                                      isRecording 
                                        ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600' 
                                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                                    } text-white border-0 disabled:opacity-50`}
                                    size="sm"
                                  >
                                    <div className="flex items-center gap-2">
                                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                      <span>{isRecording ? "Stop Recording" : "Record Audio"}</span>
                                    </div>
                                  </Button>
                                </div>
                                
                                {/* Audio playback */}
                                {audioURL && (
                                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 shadow-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="p-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
                                        <Mic className="w-3 h-3 text-white" />
                                      </div>
                                      <span className="text-sm font-bold text-purple-700">Your Recording ✨</span>
                                    </div>
                                    <audio controls className="w-full">
                                      <source src={audioURL} type="audio/wav" />
                                      Your browser does not support audio playback.
                                    </audio>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Answer Section */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-20 blur-lg"></div>
                          <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                            
                            {/* Decorations */}
                            <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-300 rounded-full animate-pulse opacity-60"></div>
                            <div className="absolute bottom-3 left-3 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-60"></div>

                            <div className="p-6">
                              <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl shadow-lg">
                                    <FileText className="w-6 h-6 text-white" />
                                  </div>
                                  <h3 className="text-xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-1">
                                    Your Answer ✍️
                                    <Heart className="w-4 h-4 text-cyan-400 animate-pulse" />
                                  </h3>
                                </div>
                                {speechSupported && (
                                  <Button
                                    variant={isListening ? "destructive" : "outline"}
                                    onClick={isListening ? stopListening : startListening}
                                    disabled={isRecording}
                                    className={`rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ${
                                      isListening 
                                        ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0' 
                                        : 'border-2 border-cyan-200 hover:border-cyan-400 bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 text-cyan-700'
                                    } disabled:opacity-50`}
                                    size="sm"
                                  >
                                    <div className="flex items-center gap-2">
                                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                      <span>{isListening ? "Stop Listening" : "Voice to Text"}</span>
                                    </div>
                                  </Button>
                                )}
                              </div>

                              {/* Status Indicators */}
                              {isListening && (
                                <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl shadow-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-red-700 font-bold flex items-center gap-1">
                                      Listening... Speak now 🎤
                                      <Sparkles className="w-4 h-4 animate-pulse" />
                                    </span>
                                  </div>
                                </div>
                              )}

                              {isRecording && (
                                <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-green-700 font-bold flex items-center gap-1">
                                      Recording audio... 🎵
                                      <Star className="w-4 h-4 animate-pulse" />
                                    </span>
                                  </div>
                                </div>
                              )}
                              
                              <div className="relative mb-6">
                                <Textarea
                                  placeholder="Type your answer here or use 'Voice to Text' to speak your response... ✨"
                                  value={userAnswer}
                                  onChange={(e) => setUserAnswer(e.target.value)}
                                  className="min-h-32 rounded-2xl border-2 border-cyan-200 focus:border-cyan-400 bg-gradient-to-br from-white to-cyan-50 shadow-lg font-medium placeholder:text-gray-400 pr-12"
                                />
                                <div className="absolute top-4 right-4">
                                  <Heart className="w-5 h-5 text-cyan-400" />
                                </div>
                              </div>
                              
                              {transcript && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl shadow-lg">
                                  <div className="text-sm text-blue-700 font-medium">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="p-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg">
                                        <Mic className="w-3 h-3 text-white" />
                                      </div>
                                      <strong>Recent speech: 🗣️</strong>
                                    </div>
                                    {transcript.slice(-100)}...
                                  </div>
                                </div>
                              )}
                              
                              <Button
                                onClick={submitAnswer}
                                disabled={!userAnswer.trim() || loading}
                                className="w-full h-12 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 disabled:opacity-50"
                              >
                                {loading ? (
                                  <div className="flex items-center gap-3">
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    <span>Evaluating Magic...</span>
                                    <Sparkles className="w-4 h-4 animate-pulse" />
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-3">
                                    <Send className="w-5 h-5" />
                                    <span>Submit Answer</span>
                                    <Rocket className="w-5 h-5 animate-pulse" />
                                  </div>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="mt-6">
            {feedback && (
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl opacity-20 blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden">
                    
                    {/* Decorations */}
                    <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute top-8 right-10 w-3 h-3 bg-orange-300 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-red-300 rounded-full animate-ping opacity-60"></div>

                    <div className="p-8">
                      <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                            <Trophy className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center justify-center gap-2 mb-3">
                          Your Performance 📊
                          <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                        </h2>
                      </div>

                      {/* Score Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Communication Score */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-20 blur-lg"></div>
                          <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 shadow-xl text-center">
                            <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl shadow-lg w-fit mx-auto mb-4">
                              <Mic className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-4xl font-black text-blue-600 mb-2">
                              {feedback.scores?.communication || 0}/10
                            </div>
                            <div className="text-sm font-bold text-gray-700 mb-3">Communication ✨</div>
                            <div className="relative">
                              <Progress value={(feedback.scores?.communication || 0) * 10} className="h-3 rounded-full" />
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20"></div>
                            </div>
                          </div>
                        </div>

                        {/* Technical Clarity Score */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-lg"></div>
                          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-xl text-center">
                            <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl shadow-lg w-fit mx-auto mb-4">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-4xl font-black text-green-600 mb-2">
                              {feedback.scores?.technicalClarity || 0}/10
                            </div>
                            <div className="text-sm font-bold text-gray-700 mb-3">Technical Clarity 🚀</div>
                            <div className="relative">
                              <Progress value={(feedback.scores?.technicalClarity || 0) * 10} className="h-3 rounded-full" />
                              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20"></div>
                            </div>
                          </div>
                        </div>

                        {/* Confidence Score */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
                          <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-xl text-center">
                            <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl shadow-lg w-fit mx-auto mb-4">
                              <Crown className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-4xl font-black text-purple-600 mb-2">
                              {feedback.scores?.confidence || 0}/10
                            </div>
                            <div className="text-sm font-bold text-gray-700 mb-3">Confidence 👑</div>
                            <div className="relative">
                              <Progress value={(feedback.scores?.confidence || 0) * 10} className="h-3 rounded-full" />
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Overall Score */}
                      <div className="text-center mb-8">
                        <div className="relative inline-block group">
                          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
                          <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-3xl p-8 border-3 border-yellow-200 shadow-2xl">
                            <div className="flex items-center justify-center gap-3 mb-4">
                              <div className="p-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-xl">
                                <Trophy className="w-10 h-10 text-white" />
                              </div>
                              {sparkleAnimation && (
                                <div className="absolute -top-2 -right-2">
                                  <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                                </div>
                              )}
                            </div>
                            <div className="text-5xl font-black bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                              Overall: {feedback.overallScore || 0}/10
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                              <span className="text-lg font-bold text-gray-700">Amazing Performance!</span>
                              <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Feedback Cards */}
                      <div className="space-y-6">
                        {/* Strengths */}
                        {feedback.strengths && feedback.strengths.length > 0 && (
                          <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-lg"></div>
                            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 shadow-xl">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl shadow-lg">
                                  <Trophy className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-black text-green-800 flex items-center gap-2">
                                  Strengths ✅
                                  <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                                </h4>
                              </div>
                              <ul className="space-y-3">
                                {feedback.strengths.map((strength, index) => (
                                  <li key={index} className="flex items-start gap-3 text-sm text-green-700 font-medium leading-relaxed">
                                    <div className="p-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-1">
                                      <Heart className="w-3 h-3 text-white" />
                                    </div>
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Suggestions */}
                        {feedback.suggestions && feedback.suggestions.length > 0 && (
                          <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-20 blur-lg"></div>
                            <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 shadow-xl">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                                  <Wand2 className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-black text-yellow-800 flex items-center gap-2">
                                  Suggestions 💡
                                  <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                                </h4>
                              </div>
                              <ul className="space-y-3">
                                {feedback.suggestions.map((suggestion, index) => (
                                  <li key={index} className="flex items-start gap-3 text-sm text-yellow-700 font-medium leading-relaxed">
                                    <div className="p-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mt-1">
                                      <Star className="w-3 h-3 text-white" />
                                    </div>
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Missing Points */}
                        {feedback.missingPoints && feedback.missingPoints.length > 0 && (
                          <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
                            <div className="relative bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200 shadow-xl">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl shadow-lg">
                                  <Target className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-black text-red-800 flex items-center gap-2">
                                  Missing Points ❌
                                  <Zap className="w-5 h-5 text-red-500 animate-pulse" />
                                </h4>
                              </div>
                              <ul className="space-y-3">
                                {feedback.missingPoints.map((point, index) => (
                                  <li key={index} className="flex items-start gap-3 text-sm text-red-700 font-medium leading-relaxed">
                                    <div className="p-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mt-1">
                                      <AlertCircle className="w-3 h-3 text-white" />
                                    </div>
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-6 mt-8 justify-center">
                        {currentQuestionIndex < questions.length - 1 ? (
                          <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                            <Button 
                              onClick={nextQuestion} 
                              className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 border-0"
                            >
                              <div className="flex items-center gap-3">
                                <Rocket className="w-5 h-5" />
                                <span>Next Question</span>
                                <Heart className="w-5 h-5 animate-pulse" />
                              </div>
                            </Button>
                          </div>
                        ) : (
                          <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                            <Button 
                              onClick={() => setActiveTab("complete")} 
                              className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 border-0"
                            >
                              <div className="flex items-center gap-3">
                                <Trophy className="w-5 h-5" />
                                <span>Complete Interview</span>
                                <Sparkles className="w-5 h-5 animate-pulse" />
                              </div>
                            </Button>
                          </div>
                        )}
                        <Button 
                          variant="outline" 
                          onClick={retryQuestion}
                          className="px-6 py-4 rounded-2xl font-bold bg-gradient-to-r from-gray-100 to-purple-100 hover:from-gray-200 hover:to-purple-200 border-2 border-purple-200 hover:border-purple-400 text-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          <div className="flex items-center gap-2">
                            <Wand2 className="w-4 h-4" />
                            <span>Retry Question</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Complete Tab */}
          <TabsContent value="complete" className="mt-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 via-cyan-400 to-yellow-400 rounded-3xl opacity-30 group-hover:opacity-50 blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white via-pink-50/30 via-purple-50/30 to-cyan-50/30 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden text-center">
                  
                  {/* Decorative Background */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-pink-400 via-purple-400 via-cyan-400 to-yellow-400 opacity-10"></div>
                  
                  {/* Floating Decorations */}
                  <div className="absolute top-4 left-6 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute top-8 right-8 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute top-12 right-16 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute bottom-8 left-8 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>

                  <div className="relative p-12">
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="p-6 bg-gradient-to-br from-pink-500 via-purple-500 via-cyan-500 to-yellow-500 rounded-3xl shadow-2xl transform group-hover:rotate-12 transition-all duration-300">
                        <Trophy className="w-16 h-16 text-white" />
                      </div>
                      {sparkleAnimation && (
                        <div className="absolute -top-4 -right-4">
                          <Sparkles className="w-12 h-12 text-yellow-400 animate-spin" />
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 via-cyan-600 to-yellow-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-6">
                      <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                      Interview Complete! 🎉
                      <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                    </h2>
                    
                    <p className="text-xl font-bold text-gray-700 mb-8 flex items-center justify-center gap-2">
                      <Sparkles className="w-6 h-6 text-purple-500" />
                      Great job completing your resume-based interview practice ✨
                    </p>
                    
                    <div className="text-lg font-medium text-gray-600 mb-10 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 shadow-lg">
                      You've successfully answered all <span className="font-black text-purple-700">{questions.length}</span> questions based on your resume! 🚀
                    </div>
                    
                    <div className="flex gap-6 justify-center">
                      <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                        <Button 
                          onClick={() => window.location.reload()} 
                          className="relative px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 border-0"
                          size="lg"
                        >
                          <div className="flex items-center gap-3">
                            <Rocket className="w-6 h-6" />
                            <span>Start New Interview</span>
                            <Sparkles className="w-6 h-6 animate-pulse" />
                          </div>
                        </Button>
                      </div>
                      
                      <Button 
                        onClick={() => router.push("/dashboard")} 
                        className="px-10 py-4 rounded-2xl font-bold bg-gradient-to-r from-gray-100 to-purple-100 hover:from-gray-200 hover:to-purple-200 border-2 border-purple-200 hover:border-purple-400 text-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                        size="lg"
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="w-6 h-6 text-pink-400" />
                          <span>Back to Dashboard</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeInterviewPlatform;