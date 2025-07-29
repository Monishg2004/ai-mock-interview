"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Target, 
  Rocket, 
  Calendar, 
  BookOpen, 
  Code, 
  Users, 
  Trophy, 
  Star, 
  Heart, 
  Sparkles, 
  Wand2, 
  Brain, 
  CheckCircle, 
  Clock, 
  PlayCircle, 
  Download, 
  Copy, 
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  Zap,
  Award,
  TrendingUp,
  FileText,
  MessageSquare,
  Shield,
  Crown,
  Send,
  Mic,
  MicOff,
  LoaderCircle,
  MapPin,
  GitBranch,
  Database,
  Cpu,
  Globe,
  Settings
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { chatSession } from "@/utils/GeminiAIModel";

const CareerRoadmapBuilder = () => {
  const [careerGoal, setCareerGoal] = useState("");
  const [currentLevel, setCurrentLevel] = useState("fresher");
  const [timeCommitment, setTimeCommitment] = useState("2-3 hours");
  const [preferredLearning, setPreferredLearning] = useState("mixed");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  const recognitionRef = useRef();

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
            setCareerGoal(prev => prev + finalTranscript);
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

  const generateRoadmap = async () => {
    if (!careerGoal.trim()) return;

    setLoading(true);

    try {
      const prompt = `
        Create a comprehensive career roadmap for someone who wants to become: "${careerGoal}"
        
        Current Level: ${currentLevel}
        Time Commitment: ${timeCommitment} per day
        Learning Preference: ${preferredLearning}
        
        Generate a detailed JSON response with this structure:
        {
          "careerTitle": "Clean career title",
          "overview": "Brief overview of the career path",
          "totalDuration": "Expected time to achieve goal",
          "phases": [
            {
              "phase": "Phase name",
              "duration": "time needed",
              "description": "what you'll achieve",
              "learningPath": {
                "dsa": ["specific DSA topics to learn"],
                "systemDesign": ["system design concepts"],
                "projects": ["hands-on project ideas"],
                "technologies": ["technologies to master"]
              },
              "interviewSkills": {
                "hr": ["HR interview preparation topics"],
                "technical": ["technical interview focus areas"],
                "resume": ["resume improvement points"],
                "practice": ["specific practice recommendations"]
              },
              "schedule": {
                "daily": "suggested daily routine",
                "weekly": ["weekly goals and milestones"],
                "resources": ["recommended learning resources"]
              },
              "milestones": ["key achievements for this phase"]
            }
          ],
          "finalGoals": ["ultimate career objectives"],
          "tips": ["personalized tips for success"],
          "commonMistakes": ["mistakes to avoid"],
          "salaryExpectation": "expected salary range",
          "jobMarket": "current job market insights"
        }
        
        Make it specific to their level and time commitment. Focus on practical, actionable advice.
        For freshers, include foundational concepts. For experienced, focus on advanced topics.
      `;

      const result = await chatSession.sendMessage(prompt);
      const response = result.response.text()
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const roadmapData = JSON.parse(response);
      setRoadmap(roadmapData);
      
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }

    setLoading(false);
  };

  const toggleTaskCompletion = (taskId) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const calculateProgress = () => {
    if (!roadmap) return 0;
    const totalTasks = roadmap.phases.reduce((acc, phase) => {
      return acc + phase.milestones.length;
    }, 0);
    return totalTasks > 0 ? (completedTasks.size / totalTasks) * 100 : 0;
  };

  const downloadRoadmap = () => {
    if (!roadmap) return;
    
    const roadmapText = `
# ${roadmap.careerTitle} - Career Roadmap

## Overview
${roadmap.overview}

**Total Duration:** ${roadmap.totalDuration}
**Expected Salary:** ${roadmap.salaryExpectation}

## Learning Path

${roadmap.phases.map((phase, index) => `
### Phase ${index + 1}: ${phase.phase}
**Duration:** ${phase.duration}
**Description:** ${phase.description}

#### Learning Path:
- **DSA:** ${phase.learningPath.dsa.join(', ')}
- **System Design:** ${phase.learningPath.systemDesign.join(', ')}
- **Technologies:** ${phase.learningPath.technologies.join(', ')}

#### Projects:
${phase.learningPath.projects.map(project => `- ${project}`).join('\n')}

#### Interview Skills:
- **HR Focus:** ${phase.interviewSkills.hr.join(', ')}
- **Technical Focus:** ${phase.interviewSkills.technical.join(', ')}
- **Resume Points:** ${phase.interviewSkills.resume.join(', ')}

#### Schedule:
- **Daily:** ${phase.schedule.daily}
- **Weekly Goals:** ${phase.schedule.weekly.join(', ')}

#### Milestones:
${phase.milestones.map(milestone => `- ${milestone}`).join('\n')}
`).join('\n')}

## Final Goals
${roadmap.finalGoals.map(goal => `- ${goal}`).join('\n')}

## Tips for Success
${roadmap.tips.map(tip => `- ${tip}`).join('\n')}

## Common Mistakes to Avoid
${roadmap.commonMistakes.map(mistake => `- ${mistake}`).join('\n')}

## Job Market Insights
${roadmap.jobMarket}
    `;

    const element = document.createElement("a");
    const file = new Blob([roadmapText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${roadmap.careerTitle.replace(/\s+/g, '_')}_roadmap.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyRoadmap = () => {
    if (!roadmap) return;
    
    const roadmapText = `${roadmap.careerTitle} Career Roadmap\n\n${roadmap.overview}\n\nTotal Duration: ${roadmap.totalDuration}`;
    navigator.clipboard.writeText(roadmapText);
  };

  const resetRoadmap = () => {
    setRoadmap(null);
    setCareerGoal("");
    setCompletedTasks(new Set());
    setExpandedPhase(null);
  };

  if (roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
        {/* Floating decorative elements */}
        <div className="fixed top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
        <div className="fixed top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
        <div className="fixed bottom-20 right-40 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative group mb-12">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
              
              {/* Decorations */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                      <Crown className="w-10 h-10 text-white" />
                    </div>
                    {sparkleAnimation && (
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                      {roadmap.careerTitle} Roadmap 🎯
                      <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </h1>
                    <p className="text-lg font-bold text-gray-700 mt-2">
                      Duration: {roadmap.totalDuration} • Progress: {Math.round(calculateProgress())}% ✨
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={copyRoadmap}
                    size="sm"
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white rounded-xl shadow-lg border-0"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button 
                    onClick={downloadRoadmap}
                    size="sm"
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl shadow-lg border-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    onClick={resetRoadmap}
                    size="sm"
                    className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-xl shadow-lg border-0"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    New Goal
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="relative group mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-lg"></div>
            <div className="relative bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 rounded-2xl shadow-xl p-8 border-2 border-white/50 backdrop-blur-sm">
              
              {/* Decorations */}
              <div className="absolute top-3 right-3 w-3 h-3 bg-green-300 rounded-full animate-pulse opacity-60"></div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl w-fit mx-auto mb-4 shadow-xl">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    Overall Progress
                  </h3>
                  <div className="relative mb-4">
                    <Progress value={calculateProgress()} className="h-4 rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20"></div>
                  </div>
                  <p className="text-4xl font-black text-green-600">{Math.round(calculateProgress())}%</p>
                </div>

                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl w-fit mx-auto mb-4 shadow-xl">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    Expected Salary
                  </h3>
                  <p className="text-2xl font-black text-blue-600">{roadmap.salaryExpectation}</p>
                </div>

                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl w-fit mx-auto mb-4 shadow-xl">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Total Phases
                  </h3>
                  <p className="text-4xl font-black text-purple-600">{roadmap.phases.length}</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
                <h4 className="text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Career Overview ✨
                </h4>
                <p className="text-gray-700 font-medium leading-relaxed">{roadmap.overview}</p>
              </div>
            </div>
          </div>

          {/* Learning Phases */}
          <div className="space-y-8">
            {roadmap.phases.map((phase, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-sm overflow-hidden">
                  
                  {/* Decorations */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>

                  {/* Phase Header */}
                  <div 
                    className="p-8 cursor-pointer"
                    onClick={() => setExpandedPhase(expandedPhase === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">
                          {index + 1}
                        </div>
                        <div>
                          <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                            {phase.phase}
                            <Star className="w-6 h-6 text-yellow-400" />
                          </h2>
                          <p className="text-lg font-bold text-gray-700 mt-1">
                            Duration: {phase.duration} • {phase.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-600 mb-1">
                            {phase.milestones.filter(m => completedTasks.has(`${index}-${m}`)).length} / {phase.milestones.length}
                          </div>
                          <Progress 
                            value={(phase.milestones.filter(m => completedTasks.has(`${index}-${m}`)).length / phase.milestones.length) * 100} 
                            className="h-2 w-24" 
                          />
                        </div>
                        {expandedPhase === index ? 
                          <ChevronDown className="w-8 h-8 text-purple-600" /> : 
                          <ChevronRight className="w-8 h-8 text-purple-600" />
                        }
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedPhase === index && (
                    <div className="px-8 pb-8">
                      <Tabs defaultValue="learning" className="w-full">
                        <div className="relative group mb-6">
                          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-xl opacity-20 blur-lg"></div>
                          <TabsList className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-2 border-white/50 shadow-lg rounded-xl p-1 backdrop-blur-sm grid w-full grid-cols-4">
                            <TabsTrigger value="learning" className="rounded-lg font-bold text-sm">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Learning
                            </TabsTrigger>
                            <TabsTrigger value="interview" className="rounded-lg font-bold text-sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Interview
                            </TabsTrigger>
                            <TabsTrigger value="schedule" className="rounded-lg font-bold text-sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule
                            </TabsTrigger>
                            <TabsTrigger value="milestones" className="rounded-lg font-bold text-sm">
                              <Trophy className="w-4 h-4 mr-2" />
                              Milestones
                            </TabsTrigger>
                          </TabsList>
                        </div>

                        {/* Learning Path Tab */}
                        <TabsContent value="learning">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* DSA */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg">
                                    <Code className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-blue-800">DSA Focus 🧮</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.learningPath.dsa.map((topic, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-blue-700">
                                      <CheckCircle className="w-4 h-4 text-blue-500" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* System Design */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
                                    <Database className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-green-800">System Design 🏗️</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.learningPath.systemDesign.map((topic, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-green-700">
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Technologies */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                                    <Cpu className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-purple-800">Technologies 💻</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {phase.learningPath.technologies.map((tech, i) => (
                                    <Badge key={i} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Projects */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg">
                                    <Rocket className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-orange-800">Projects 🚀</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.learningPath.projects.map((project, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-orange-700">
                                      <PlayCircle className="w-4 h-4 text-orange-500" />
                                      {project}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Interview Skills Tab */}
                        <TabsContent value="interview">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* HR Interview */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg shadow-lg">
                                    <Users className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-pink-800">HR Interview 👥</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.interviewSkills.hr.map((skill, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-pink-700">
                                      <Heart className="w-4 h-4 text-pink-500" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Technical Interview */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg">
                                    <Brain className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-cyan-800">Technical Interview 🧠</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.interviewSkills.technical.map((skill, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-cyan-700">
                                      <Zap className="w-4 h-4 text-cyan-500" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Resume Points */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-lg">
                                    <FileText className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-emerald-800">Resume Focus 📄</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.interviewSkills.resume.map((point, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                                      <Award className="w-4 h-4 text-emerald-500" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Practice Recommendations */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg">
                                    <Target className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-yellow-800">Practice Tips 🎯</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.interviewSkills.practice.map((tip, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-yellow-700">
                                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Schedule Tab */}
                        <TabsContent value="schedule">
                          <div className="space-y-6">
                            {/* Daily Schedule */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                                    <Clock className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-indigo-800">Daily Routine ⏰</h4>
                                </div>
                                <p className="text-indigo-700 font-medium leading-relaxed">{phase.schedule.daily}</p>
                              </div>
                            </div>

                            {/* Weekly Goals */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-lg">
                                    <Calendar className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-teal-800">Weekly Goals 📅</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.schedule.weekly.map((goal, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-teal-700">
                                      <CheckCircle className="w-4 h-4 text-teal-500" />
                                      {goal}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Resources */}
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-xl opacity-20 blur-lg"></div>
                              <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border-2 border-rose-200 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg shadow-lg">
                                    <BookOpen className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-lg font-black text-rose-800">Learning Resources 📚</h4>
                                </div>
                                <ul className="space-y-2">
                                  {phase.schedule.resources.map((resource, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-rose-700">
                                      <Globe className="w-4 h-4 text-rose-500" />
                                      {resource}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Milestones Tab */}
                        <TabsContent value="milestones">
                          <div className="space-y-4">
                            {phase.milestones.map((milestone, i) => (
                              <div key={i} className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-20 blur-lg"></div>
                                <div className={`relative rounded-xl p-4 border-2 shadow-lg cursor-pointer transition-all duration-300 ${
                                  completedTasks.has(`${index}-${milestone}`)
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                                    : 'bg-gradient-to-br from-gray-50 to-green-50 border-gray-200 hover:border-green-300'
                                }`}
                                onClick={() => toggleTaskCompletion(`${index}-${milestone}`)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                      completedTasks.has(`${index}-${milestone}`)
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500'
                                        : 'border-gray-300 hover:border-green-400'
                                    }`}>
                                      {completedTasks.has(`${index}-${milestone}`) && (
                                        <CheckCircle className="w-4 h-4 text-white" />
                                      )}
                                    </div>
                                    <p className={`font-medium transition-all duration-300 ${
                                      completedTasks.has(`${index}-${milestone}`)
                                        ? 'text-green-800 line-through'
                                        : 'text-gray-800'
                                    }`}>
                                      {milestone}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Success Tips & Market Insights */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Tips for Success */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
                
                {/* Decorations */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Success Tips 💡
                  </h2>
                </div>
                
                <ul className="space-y-4">
                  {roadmap.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-800 font-medium leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Common Mistakes & Market Insights */}
            <div className="space-y-8">
              {/* Common Mistakes */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white via-red-50/30 to-pink-50/30 rounded-2xl shadow-xl p-6 border-2 border-white/50 backdrop-blur-sm">
                  
                  {/* Decorations */}
                  <div className="absolute top-3 right-3 w-3 h-3 bg-red-300 rounded-full animate-pulse opacity-60"></div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-black bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                      Avoid These Mistakes ⚠️
                    </h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {roadmap.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm font-medium text-red-700">
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 mt-0.5">
                          !
                        </div>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Job Market Insights */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-white via-green-50/30 to-teal-50/30 rounded-2xl shadow-xl p-6 border-2 border-white/50 backdrop-blur-sm">
                  
                  {/* Decorations */}
                  <div className="absolute top-3 right-3 w-3 h-3 bg-green-300 rounded-full animate-pulse opacity-60"></div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                      Job Market Insights 📈
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 font-medium leading-relaxed">{roadmap.jobMarket}</p>
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
      <div className="fixed top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
      <div className="fixed top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
      <div className="fixed bottom-20 right-40 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative group mb-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm text-center">
            
            {/* Decorations */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
            
            <div className="relative inline-block group mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                  <MapPin className="w-12 h-12 text-white" />
                </div>
                {sparkleAnimation && (
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                  </div>
                )}
              </div>
              
              <h1 className="text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-6">
                <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
                AI Career Roadmap Builder
                <Heart className="w-10 h-10 text-pink-400 animate-pulse" />
              </h1>
              
              <p className="text-xl font-bold text-gray-700 max-w-3xl mx-auto leading-relaxed">
                <Wand2 className="inline w-6 h-6 text-purple-500 mr-2" />
                Tell us your dream career goal and get a personalized learning path with interview prep, 
                practice schedules, and everything you need to succeed! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-3xl opacity-20 blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
            
            {/* Decorations */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-cyan-300 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-60"></div>

            <div className="space-y-8">
              {/* Career Goal Input */}
              <div>
                <label className="block text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  What's your dream career goal? 🎯
                </label>
                
                <div className="relative mb-4">
                  <Textarea
                    placeholder="Tell us your career aspiration! Examples:
• 'I want to become a Full Stack Developer at Google'
• 'Frontend Engineer specializing in React'
• 'Data Scientist in fintech industry'
• 'Backend Developer with microservices expertise'
• 'Mobile App Developer for iOS and Android'"
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="min-h-32 rounded-2xl border-2 border-cyan-200 focus:border-cyan-400 bg-gradient-to-br from-white to-cyan-50 shadow-lg font-medium placeholder:text-gray-400 pr-16 text-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Heart className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>

                {/* Voice Input */}
                {speechSupported && (
                  <div className="flex gap-3 mb-6">
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      onClick={isListening ? stopListening : startListening}
                      className={`rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 ${
                        isListening 
                          ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white border-0' 
                          : 'border-2 border-cyan-200 hover:border-cyan-400 bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 text-cyan-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        <span>{isListening ? "Stop Listening" : "Speak Your Goal"}</span>
                      </div>
                    </Button>

                    {isListening && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-700 font-bold">Listening... Speak now! 🎤</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Settings Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Current Level */}
                <div>
                  <label className="block text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                    <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    Current Level 📈
                  </label>
                  <select 
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    className="w-full p-4 border-2 border-green-200 focus:border-green-400 bg-gradient-to-r from-white to-green-50 rounded-xl shadow-lg font-medium text-gray-700"
                  >
                    <option value="fresher">🌱 Complete Fresher</option>
                    <option value="beginner">📚 Some Basics Known</option>
                    <option value="intermediate">💪 1-2 Years Experience</option>
                    <option value="experienced">🚀 3+ Years Experience</option>
                  </select>
                </div>

                {/* Time Commitment */}
                <div>
                  <label className="block text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                    <div className="p-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    Daily Time ⏰
                  </label>
                  <select 
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(e.target.value)}
                    className="w-full p-4 border-2 border-orange-200 focus:border-orange-400 bg-gradient-to-r from-white to-orange-50 rounded-xl shadow-lg font-medium text-gray-700"
                  >
                    <option value="1-2 hours">⏱️ 1-2 hours</option>
                    <option value="2-3 hours">⏰ 2-3 hours</option>
                    <option value="3-4 hours">🕒 3-4 hours</option>
                    <option value="4+ hours">🚀 4+ hours</option>
                  </select>
                </div>

                {/* Learning Preference */}
                <div>
                  <label className="block text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                    <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    Learning Style 📚
                  </label>
                  <select 
                    value={preferredLearning}
                    onChange={(e) => setPreferredLearning(e.target.value)}
                    className="w-full p-4 border-2 border-purple-200 focus:border-purple-400 bg-gradient-to-r from-white to-purple-50 rounded-xl shadow-lg font-medium text-gray-700"
                  >
                    <option value="theory">📖 Theory First</option>
                    <option value="practical">💻 Hands-on Projects</option>
                    <option value="mixed">⚖️ Balanced Approach</option>
                    <option value="fast-track">⚡ Fast Track</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center pt-4">
                <div className="relative group inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-40 group-hover:opacity-60 blur-lg transition-all duration-300"></div>
                  <Button
                    onClick={generateRoadmap}
                    disabled={!careerGoal.trim() || loading}
                    className="relative px-12 py-6 text-xl font-black rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white shadow-2xl transform hover:scale-110 transition-all duration-300 border-0 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <LoaderCircle className="animate-spin w-6 h-6" />
                        <span>Creating Your Roadmap...</span>
                        <Sparkles className="w-6 h-6 animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Rocket className="w-6 h-6" />
                        <span>Build My Career Roadmap</span>
                        <Trophy className="w-6 h-6 animate-pulse" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="relative group mt-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
            
            {/* Decorations */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-emerald-300 rounded-full animate-bounce opacity-60"></div>
            
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                What You'll Get ✨
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <BookOpen className="w-6 h-6" />,
                  title: "Learning Path",
                  description: "Complete roadmap with DSA, System Design, and Projects",
                  color: "from-blue-500 to-indigo-500"
                },
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: "Interview Skills",
                  description: "HR prep, technical focus areas, and resume optimization",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: <Calendar className="w-6 h-6" />,
                  title: "Practice Schedule",
                  description: "Daily routines, weekly goals, and milestone tracking",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl w-fit mx-auto mb-4 shadow-xl`}>
                    {feature.icon}
                    <span className="text-white"></span>
                  </div>
                  <h3 className="text-lg font-black text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 font-medium text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmapBuilder;