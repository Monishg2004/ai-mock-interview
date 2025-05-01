"use client";

import { Brain, Video, MessageSquare, Star } from "lucide-react";

const steps = [
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "1. Choose a Category",
    description:
      "Select from domains like Frontend, Backend, DSA, System Design, and more to begin a tailored interview session.",
  },
  {
    icon: <Video className="w-8 h-8 text-green-500" />,
    title: "2. Record Your Interview",
    description:
      "Answer each question while your camera records. This mimics a real interview environment and prepares you better.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
    title: "3. Get AI-Powered Feedback",
    description:
      "Our AI analyzes your answers, tone, and content to give constructive feedback, ratings, and tips to improve.",
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    title: "4. Track Progress & Improve",
    description:
      "View past mock interviews, see your average rating, and track areas that need improvement over time.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold text-center text-primary">
        How It Works
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Here's a step-by-step guide to help you understand how our AI-powered
        interview simulator works — built to prepare you for real-world success.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 bg-white shadow-sm flex gap-4 items-start"
          >
            <div className="flex-shrink-0">{step.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
