"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

import { eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Feedback = () => {
  const params = useParams();

  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  useEffect(() => {
    if (params.interviewId) {
      getFeedback();
    }
  }, []);

  const averageRating =
    feedbackList && feedbackList.length > 0
      ? (
          feedbackList.reduce((sum, item) => {
            const rating = parseFloat(item.rating.split("/")[0]);
            return !isNaN(rating) && rating > 0 ? sum + rating : sum;
          }, 0) / feedbackList.length
        ).toFixed(1)
      : "N/A";

  return (
    <div className="p-10">
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-gray-500">
          No Interview record feedback available
        </h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-primary text-lg">
            Your overall interview rating: <strong>{averageRating}/5</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement.
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index + 1} className="mt-7">
                <CollapsibleTrigger className="flex justify-center p-2 bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                  {item.question} <ChevronsUpDown className="w-5 h-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border bg-red-50 text-sm text-red-900 rounded-lg">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border bg-green-50 text-sm text-green-900 rounded-lg">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>

                    <h2 className="p-2 border bg-blue-50 text-sm text-primary rounded-lg">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")} className="mt-3">
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
