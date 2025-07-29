// "use client";

// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import { desc, eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import InterviewCard from "./InterviewCard";

// const InterviewList = () => {
//   const { user } = useUser();
//   const [interviewList, setInterviewList] = useState([]);

//   const getInterviewList = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(
//         eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
//       )
//       .orderBy(desc(MockInterview.id));
//     // console.log(result);

//     setInterviewList(result);
//   };

//   useEffect(() => {
//     user && getInterviewList();
//   }, [user]);

//   return (
//     <div>
//       {interviewList.length > 0 ? (
//         <>
//           <h3 className="text-xl font-semibold mb-5">Previous Interviews</h3>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {interviewList.map((interview) => (
//               <InterviewCard key={interview.id} interview={interview} />
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="mt-10 text-center text-gray-400 text-sm">
//           No interviews yet. Start by creating one!
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewList;
"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState, useMemo } from "react";
import InterviewCard from "./InterviewCard";
import { 
  History, 
  Sparkles, 
  Heart, 
  Star,
  BookOpen,
  Wand2,
  Rainbow,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Target,
  ChevronDown,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Download,
  Share2,
  BarChart3,
  Zap,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showStats, setShowStats] = useState(true);

  const getInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getInterviewList();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Advanced filtering and sorting
  const filteredAndSortedInterviews = useMemo(() => {
    let filtered = interviewList.filter(interview => {
      const matchesSearch = interview.jobPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           interview.jobDesc.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === "all" || 
                           (filterBy === "recent" && new Date(interview.createdAt) > new Date(Date.now() - 7*24*60*60*1000)) ||
                           (filterBy === "experienced" && parseInt(interview.jobExperience) >= 5) ||
                           (filterBy === "entry" && parseInt(interview.jobExperience) < 3);
      
      return matchesSearch && matchesFilter;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "position":
          return a.jobPosition.localeCompare(b.jobPosition);
        case "experience":
          return parseInt(b.jobExperience) - parseInt(a.jobExperience);
        default:
          return 0;
      }
    });

    return filtered;
  }, [interviewList, searchTerm, sortBy, filterBy]);

  // Statistics calculations
  const stats = useMemo(() => {
    const total = interviewList.length;
    const thisMonth = interviewList.filter(interview => 
      new Date(interview.createdAt).getMonth() === new Date().getMonth()
    ).length;
    const avgExperience = total > 0 ? 
      (interviewList.reduce((sum, interview) => sum + parseInt(interview.jobExperience), 0) / total).toFixed(1) : 0;
    const topPosition = interviewList.reduce((acc, interview) => {
      acc[interview.jobPosition] = (acc[interview.jobPosition] || 0) + 1;
      return acc;
    }, {});
    const mostCommon = Object.keys(topPosition).reduce((a, b) => 
      topPosition[a] > topPosition[b] ? a : b, "None");

    return { total, thisMonth, avgExperience, mostCommon };
  }, [interviewList]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-full animate-spin opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Loading your magical interviews... ✨
            </p>
            <p className="text-sm text-gray-500">Preparing something amazing for you!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {interviewList.length > 0 ? (
        <div className="space-y-8">
          
          {/* Enhanced Header with Stats */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 via-purple-100/50 to-cyan-100/50 rounded-3xl blur-3xl opacity-60"></div>
            
            {/* Floating Decorations */}
            <div className="absolute top-4 left-8 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute top-2 right-12 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute bottom-4 right-8 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
            
            <div className="relative bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-sm border-2 border-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-8 shadow-2xl">
              
              {/* Main Header */}
              <div className="flex items-center justify-between flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-30 blur-lg"></div>
                    <div className="relative p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                      <History className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                      Interview Dashboard
                      <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
                    </h3>
                    <p className="text-gray-600 font-medium flex items-center gap-1 mt-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      Your personalized interview journey
                      <Rainbow className="w-4 h-4 text-cyan-500" />
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-2xl border-2 border-purple-200 hover:border-purple-400 bg-white/80 text-purple-700 font-bold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-2xl border-2 border-cyan-200 hover:border-cyan-400 bg-white/80 text-cyan-700 font-bold"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              {showStats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-4 rounded-2xl border border-pink-200 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-pink-700">{stats.total}</p>
                        <p className="text-xs font-semibold text-pink-600">Total Interviews</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-2xl border border-purple-200 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-purple-700">{stats.thisMonth}</p>
                        <p className="text-xs font-semibold text-purple-600">This Month</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-4 rounded-2xl border border-cyan-200 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-cyan-700">{stats.avgExperience}y</p>
                        <p className="text-xs font-semibold text-cyan-600">Avg Experience</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-2xl border border-yellow-200 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-yellow-700 capitalize">{stats.mostCommon}</p>
                        <p className="text-xs font-semibold text-yellow-600">Top Role</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Advanced Controls */}
          <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search interviews... ✨"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-400 bg-white/90 font-medium shadow-lg"
                />
              </div>

              {/* Filters and Controls */}
              <div className="flex items-center gap-3 flex-wrap">
                
                {/* Filter Dropdown */}
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-40 rounded-2xl border-2 border-pink-200 bg-white/90 font-medium shadow-lg">
                    <Filter className="w-4 h-4 mr-2 text-pink-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-2 border-pink-200 bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all" className="rounded-xl font-medium">All Interviews 🌟</SelectItem>
                    <SelectItem value="recent" className="rounded-xl font-medium">Recent (7 days) ⚡</SelectItem>
                    <SelectItem value="experienced" className="rounded-xl font-medium">Senior (5+ years) 👑</SelectItem>
                    <SelectItem value="entry" className="rounded-xl font-medium">Entry Level (&lt;3 years) 🌱</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 rounded-2xl border-2 border-purple-200 bg-white/90 font-medium shadow-lg">
                    <SortDesc className="w-4 h-4 mr-2 text-purple-500" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-2 border-purple-200 bg-white/95 backdrop-blur-sm">
                    <SelectItem value="newest" className="rounded-xl font-medium">Newest First 🆕</SelectItem>
                    <SelectItem value="oldest" className="rounded-xl font-medium">Oldest First 📅</SelectItem>
                    <SelectItem value="position" className="rounded-xl font-medium">By Position 💼</SelectItem>
                    <SelectItem value="experience" className="rounded-xl font-medium">By Experience 📈</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-white/90 border-2 border-cyan-200 rounded-2xl p-1 shadow-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-xl font-bold ${viewMode === "grid" ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'text-cyan-600 hover:bg-cyan-50'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-xl font-bold ${viewMode === "list" ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'text-cyan-600 hover:bg-cyan-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-semibold text-gray-600">
                  Showing {filteredAndSortedInterviews.length} of {interviewList.length} interviews
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="text-sm font-medium text-gray-600 hover:text-purple-600"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                {showStats ? 'Hide' : 'Show'} Stats
              </Button>
            </div>
          </div>

          {/* Interview Cards */}
          {filteredAndSortedInterviews.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" 
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}>
              {filteredAndSortedInterviews.map((interview, index) => (
                <div 
                  key={interview.id} 
                  className="w-full"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <InterviewCard interview={interview} />
                </div>
              ))}
            </div>
          ) : (
            /* No Search Results */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-600 mb-2">No interviews found</h4>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setFilterBy("all");
                  setSortBy("newest");
                }}
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold"
              >
                <Zap className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          )}

          {/* Enhanced Footer */}
          <div className="text-center mt-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-6 py-3 rounded-2xl border border-yellow-200 shadow-lg">
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">
                Keep growing! You've completed {stats.total} interviews! 
              </span>
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            </div>
            
            <p className="text-xs text-gray-500 font-medium">
              Track your progress • Build confidence • Land your dream job ✨
            </p>
          </div>
        </div>
      ) : (
        
        /* Enhanced Empty State */
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto">
            
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="relative w-40 h-40 mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-cyan-100 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                <div className="absolute top-6 left-12 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-8 right-10 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute bottom-8 left-10 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
                
                <div className="text-8xl animate-bounce">🚀</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                  Ready to Launch Your Career?
                </h3>
                
                <p className="text-gray-600 font-medium leading-relaxed text-lg">
                  Your interview adventure starts here! ✨<br/>
                  Create your first mock interview and begin your journey to success.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-3xl border-2 border-pink-200 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-gray-700">Getting started is easy!</span>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Practice makes perfect • Build confidence • Ace your interviews
                </p>
              </div>
              
              <div className="flex justify-center gap-3 mt-8">
                <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewList;