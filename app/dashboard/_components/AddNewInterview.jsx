
"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { 
  LoaderCircle, 
  Plus, 
  Sparkles, 
  Heart, 
  Star,
  Briefcase,
  Code,
  Clock,
  Wand2,
  Rocket
} from "lucide-react";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import moment from "moment";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    jobPosition: "",
    jobDesc: "",
    jobExperience: "",
  });

  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
    const InputPrompt =
      "Job Position: " +
      jobPosition +
      "Job Description:" +
      jobDesc +
      "YearsOfExperience:" +
      jobExperience +
      ",Depends on this information please give me" +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      "Interview question with Answered in json Format, GiveQuestion and Answered as field in JSON";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\*\*Note\:\*\*(.|\n)*/, "")
      .trim();

    console.log("MockJsonResponse", MockJsonResponse);

    setJsonResponse(MockJsonResponse);

    if (!MockJsonResponse) {
      alert("Please Try Again");
      setLoading(false);
      return;
    }

    const resp = await db
      .insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResponse,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      })
      .returning({
        mockId: MockInterview.mockId,
      });

    console.log("inserted id:", resp);
    setForm({
      jobPosition: "",
      jobDesc: "",
      jobExperience: "",
    });
    setOpenDialog(false);
    router.push(`/dashboard/interview/${resp[0]?.mockId}`);
    setLoading(false);
  };

  return (
    <div>
      {/* Super Cute Add Interview Card */}
      <div
        className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
        onClick={() => setOpenDialog(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Magical Background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500"></div>
        
        {/* Main Card */}
        <div className="relative p-12 border-3 border-dashed border-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 rounded-3xl bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 hover:from-pink-100 hover:via-purple-100 hover:to-cyan-100 transition-all duration-300 text-center shadow-2xl">
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-4 left-6 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-6 right-8 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-4 left-8 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
          <div className="absolute bottom-6 right-6 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>

          {/* Main Icon */}
          <div className="relative mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-all duration-300">
            <Plus className="w-10 h-10 text-white group-hover:scale-125 transition-transform duration-300" />
            {isHovered && (
              <div className="absolute -top-2 -right-2 animate-spin">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            )}
          </div>

          {/* Cute Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              Add New Interview
              <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
            </h2>
            <p className="text-sm font-semibold text-gray-600 flex items-center justify-center gap-1">
              <Wand2 className="w-4 h-4 text-purple-500" />
              Create your magical interview experience
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </p>
          </div>

          {/* Cute Hover Effect */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 via-purple-100/50 to-cyan-100/50 rounded-3xl flex items-center justify-center">
              <div className="text-6xl animate-bounce">✨</div>
            </div>
          )}
        </div>
      </div>

      {/* Super Cute Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl p-0 border-0 bg-transparent shadow-none">
          <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 rounded-3xl border-3 border-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 shadow-2xl overflow-hidden">
            
            {/* Decorative Header Background */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-10"></div>
            
            {/* Floating Decorations */}
            <div className="absolute top-4 left-6 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-12 right-16 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>

            <DialogHeader className="relative p-8 pb-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <DialogTitle className="text-3xl font-black text-center bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                Plan Your Dream Interview
                <Heart className="w-6 h-6 text-pink-400" />
              </DialogTitle>
              
              <DialogDescription className="text-center text-gray-600 font-medium flex items-center justify-center gap-1 mt-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Fill in the magical details to create your personalized interview ✨
              </DialogDescription>

              <form onSubmit={onSubmit} className="space-y-6 mt-8 px-2">
                
                {/* Job Role Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-bold text-gray-700">
                    <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl">
                      <Briefcase className="w-4 h-4 text-white" />
                    </div>
                    Dream Job Role ✨
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="e.g., Frontend Developer, Data Scientist, Product Manager..."
                      onChange={(e) => setJobPosition(e.target.value)}
                      required
                      className="pl-4 pr-12 py-4 rounded-2xl border-2 border-pink-200 focus:border-pink-400 bg-white/80 backdrop-blur-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-lg"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Heart className="w-5 h-5 text-pink-300" />
                    </div>
                  </div>
                </div>

                {/* Tech Stack Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-bold text-gray-700">
                    <div className="p-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    Amazing Tech Stack 🚀
                  </label>
                  <div className="relative">
                    <Textarea
                      placeholder="e.g., React, TypeScript, Node.js, Python, AWS..."
                      onChange={(e) => setJobDesc(e.target.value)}
                      required
                      className="pl-4 pr-12 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-lg min-h-[100px] resize-none"
                    />
                    <div className="absolute right-4 top-4">
                      <Code className="w-5 h-5 text-purple-300" />
                    </div>
                  </div>
                </div>

                {/* Experience Input */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-bold text-gray-700">
                    <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    Years of Awesome Experience 💫
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="e.g., 2, 5, 10..."
                      max="50"
                      onChange={(e) => setJobExperience(e.target.value)}
                      required
                      className="pl-4 pr-12 py-4 rounded-2xl border-2 border-cyan-200 focus:border-cyan-400 bg-white/80 backdrop-blur-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-lg"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Star className="w-5 h-5 text-cyan-300" />
                    </div>
                  </div>
                </div>

                {/* Cute Action Buttons */}
                <div className="flex justify-end gap-4 pt-6">
                  <Button 
                    variant="ghost" 
                    onClick={() => setOpenDialog(false)}
                    className="px-6 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                  >
                    Maybe Later 💭
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="px-8 py-3 rounded-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin w-5 h-5" />
                        <span>Creating Magic...</span>
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Rocket className="w-5 h-5" />
                        <span>Start My Dream Interview</span>
                        <Heart className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;