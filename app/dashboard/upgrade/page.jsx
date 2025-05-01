"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheck, Lock, Star } from "lucide-react";

export default function UpgradePage() {
  const features = [
    {
      icon: <BadgeCheck className="w-6 h-6 text-green-500" />,
      title: "Unlimited Mock Interviews",
      description:
        "Practice as many interviews as you want without limitations.",
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      title: "AI Feedback with Video Analysis",
      description:
        "Get smart, real-time feedback based on your answers and facial expressions.",
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "Access to Premium Questions",
      description:
        "Get exclusive questions curated for top roles and companies.",
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary">
        Upgrade to Premium
      </h1>
      <p className="text-center text-muted-foreground">
        Unlock the full potential of your interview preparation.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-xl shadow-sm bg-white flex gap-4 items-start"
          >
            {feature.icon}
            <div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button size="lg" className="text-lg px-8 py-6">
          Upgrade Now – ₹499/month
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Cancel anytime. No hidden charges.
        </p>
      </div>
    </div>
  );
}
