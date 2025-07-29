
"use client";

import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { Sparkles, Heart } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50">
      <div className="p-6 md:p-8 mx-auto max-w-7xl">
        
        {/* Simple Header */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h2>
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <p className="text-gray-600 text-sm">
              Create and start your AI-powered mock interviews ✨
            </p>
          </div>
        </div>

        {/* Add New Interview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <AddNewInterview />
        </div>

        {/* Interview List */}
        <section>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-pink-400" />
              <h3 className="text-xl font-semibold text-gray-800">Your Interviews</h3>
            </div>
            <InterviewList />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;