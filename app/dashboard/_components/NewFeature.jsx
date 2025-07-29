"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  MicOff, 
  Code, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  Star,
  Heart,
  Sparkles,
  Wand2,
  Rocket,
  Trophy,
  Target,
  Zap,
  Brain,
  FileText,
  Volume2,
  VolumeX,
  Copy,
  Download,
  ChevronRight,
  ChevronDown,
  LoaderCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chatSession } from "@/utils/GeminiAIModel";

const NewFeature = () => {
  const [currentCode, setCurrentCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [finalAnalysis, setFinalAnalysis] = useState(null);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);
  const [codeHistory, setCodeHistory] = useState([]);
  
  const mediaRecorderRef = useRef();
  const recognitionRef = useRef();
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 3000);

    // Initialize Speech Recognition
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
            setUserInput(prev => prev + finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => clearInterval(sparkleInterval);
  }, []);

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const startRecording = async () => {
    try {
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

      mediaRecorderRef.current.start(100);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCodeBuildRequest = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    
    const newUserMessage = {
      type: 'user',
      message: userInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setConversation(prev => [...prev, newUserMessage]);

    try {
      const prompt = `
        You are a code building assistant. The user is building code step by step.
        
        Current code state:
        ${currentCode || "// No code written yet"}
        
        User request: "${userInput}"
        
        IMPORTANT RULES:
        1. Only respond with the COMPLETE updated code that includes the user's request
        2. Do NOT change any existing code unless specifically asked
        3. Only add what the user requested
        4. Keep the same formatting and structure
        5. If user asks for "function only", provide just the function signature
        6. If user asks to "add variables", add them to existing code
        7. If user asks to "add logic", add the specific logic requested
        8. Do NOT fix errors or improve code unless asked
        9. Return ONLY the code, no explanations
        
        Return the complete updated code:
      `;

      const result = await chatSession.sendMessage(prompt);
      const aiResponse = result.response.text()
        .replace(/```[\w]*\n/g, "")
        .replace(/```/g, "")
        .trim();

      // Save to history
      setCodeHistory(prev => [...prev, {
        step: prev.length + 1,
        userRequest: userInput,
        code: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      }]);

      setCurrentCode(aiResponse);
      
      const aiMessage = {
        type: 'ai',
        message: `Code updated! Added: ${userInput}`,
        code: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      };

      setConversation(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error("Error processing request:", error);
      const errorMessage = {
        type: 'error',
        message: "Sorry, I couldn't process that request. Please try again.",
        timestamp: new Date().toLocaleTimeString()
      };
      setConversation(prev => [...prev, errorMessage]);
    }

    setUserInput("");
    setLoading(false);
  };

  const generateFinalAnalysis = async () => {
    if (!currentCode.trim()) return;

    setLoading(true);
    
    try {
      const prompt = `
        Analyze the user-built code and provide corrections and improvements.
        
        User's Code:
        ${currentCode}
        
        User's Build History:
        ${codeHistory.map(item => `Step ${item.step}: ${item.userRequest}`).join('\n')}
        
        Provide a JSON response with:
        {
          "userCode": "exact user code as built",
          "correctedCode": "properly working version with fixes",
          "mistakes": ["list of specific errors/issues found"],
          "improvements": ["list of suggested improvements"],
          "explanations": ["detailed explanations of what was wrong and how to fix it"]
        }
        
        Focus on:
        - Syntax errors
        - Logic errors  
        - Missing return statements
        - Variable naming issues
        - Code structure problems
        - Best practices violations
      `;

      const result = await chatSession.sendMessage(prompt);
      const response = result.response.text()
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const analysis = JSON.parse(response);
      setFinalAnalysis(analysis);
      setIsComplete(true);
      
    } catch (error) {
      console.error("Error generating analysis:", error);
    }
    
    setLoading(false);
  };

  const resetSession = () => {
    setCurrentCode("");
    setConversation([]);
    setCodeHistory([]);
    setFinalAnalysis(null);
    setIsComplete(false);
    setUserInput("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadCode = (code, filename) => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isComplete && finalAnalysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
        {/* Final Analysis View - Complete tabs interface */}
        <div className="max-w-7xl mx-auto">
          <div className="relative group mb-12">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
                      Code Analysis Complete! 🎉
                    </h1>
                    <p className="text-lg font-bold text-gray-700 mt-2">
                      Here's your complete code analysis and improvements ✨
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={resetSession}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-xl border-0"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  New Session
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="user-code" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="user-code">Your Code</TabsTrigger>
              <TabsTrigger value="correct-code">Corrected Code</TabsTrigger>
              <TabsTrigger value="analysis">Analysis & Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="user-code">
              <Card>
                <CardHeader>
                  <CardTitle>Your Built Code 📝</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                      {finalAnalysis.userCode}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="correct-code">
              <Card>
                <CardHeader>
                  <CardTitle>Corrected Code ✅</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                      {finalAnalysis.correctedCode}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Issues Found 🔍</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {finalAnalysis.mistakes.map((mistake, index) => (
                        <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-800">{mistake}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Suggested Improvements 💡</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {finalAnalysis.improvements.map((improvement, index) => (
                        <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-yellow-800">{improvement}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Explanations 🧠</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {finalAnalysis.explanations.map((explanation, index) => (
                        <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-blue-800">{explanation}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative group mb-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                  {sparkleAnimation && (
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                    AI Code Builder ✨
                  </h1>
                  <p className="text-lg font-bold text-gray-700 mt-2">
                    Build code step by step with AI assistance! 🚀
                  </p>
                </div>
              </div>
              <Button 
                onClick={resetSession}
                variant="outline"
                className="px-6 py-3 rounded-2xl font-bold border-2 border-purple-200 text-purple-700 shadow-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-6 h-6 text-purple-500" />
                  Give Instructions 💬
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Voice Controls */}
                <div className="flex gap-2">
                  {speechSupported && (
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      onClick={isListening ? stopListening : startListening}
                      size="sm"
                      className="flex-1"
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      {isListening ? "Stop" : "Voice"}
                    </Button>
                  )}
                  
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={isRecording ? stopRecording : startRecording}
                    size="sm"
                    className="flex-1"
                  >
                    {isRecording ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    {isRecording ? "Recording" : "Record"}
                  </Button>
                </div>

                {/* Status Indicators */}
                {isListening && (
                  <Alert>
                    <Mic className="h-4 w-4" />
                    <AlertDescription>Listening... Speak now! 🎤</AlertDescription>
                  </Alert>
                )}

                {isRecording && (
                  <Alert>
                    <Volume2 className="h-4 w-4" />
                    <AlertDescription>Recording audio... 🎵</AlertDescription>
                  </Alert>
                )}

                {/* Audio playback */}
                {audioURL && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Your Recording:</p>
                    <audio controls className="w-full">
                      <source src={audioURL} type="audio/wav" />
                    </audio>
                  </div>
                )}

                {/* Text Input */}
                <Textarea
                  placeholder="Type your instruction here... "
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-32"
                />

                {/* Send Button */}
                <Button
                  onClick={handleCodeBuildRequest}
                  disabled={!userInput.trim() || loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin w-5 h-5 mr-2" />
                      Building...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Build Code
                    </>
                  )}
                </Button>

                {/* Complete Button */}
                {currentCode && (
                  <Button
                    onClick={generateFinalAnalysis}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete & Analyze
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Code Display */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-6 h-6 text-purple-500" />
                    Your Code 💻
                  </CardTitle>
                  {currentCode && (
                    <Button 
                      onClick={() => copyToClipboard(currentCode)}
                      size="sm"
                      variant="outline"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 min-h-96">
                  {currentCode ? (
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                      {currentCode}
                    </pre>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-500">
                      <div className="text-center">
                        <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No code yet...</p>
                        <p className="text-sm">Start by giving your first instruction! ✨</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Conversation History */}
            {conversation.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Build History 📝</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {conversation.map((msg, index) => (
                      <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          msg.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : msg.type === 'error'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm font-medium">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFeature;