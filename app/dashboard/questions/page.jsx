"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, ListChecks } from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    question: "Explain the concept of closures in JavaScript.",
    category: "Frontend",
    difficulty: "Medium",
  },
  {
    id: 2,
    question: "What is normalization in databases?",
    category: "Backend",
    difficulty: "Easy",
  },
  {
    id: 3,
    question: "What happens during a context switch in OS?",
    category: "CS Fundamentals",
    difficulty: "Hard",
  },
];

export default function QuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "DSA",
    "HR",
    "System Design",
  ];

  const filteredQuestions =
    selectedCategory === "All"
      ? mockQuestions
      : mockQuestions.filter((q) => q.category === selectedCategory);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Brain className="text-primary" /> Practice Interview Questions
      </h1>
      <p className="text-muted-foreground">
        Select a category and start preparing with real questions.
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="cursor-pointer"
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Question Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="font-semibold">{q.question}</h2>
            <div className="text-sm text-gray-500 mt-1">
              {q.category} • {q.difficulty}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Practice Now
            </Button>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-gray-500 italic">
          No questions found for this category.
        </div>
      )}
    </div>
  );
}
