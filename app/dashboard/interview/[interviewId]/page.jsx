"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";

import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

const Interview = () => {
  const params = useParams();

  const [interviewData, setInterviewData] = useState();

  const [webCamEnabled, setwebCamEnabled] = useState(false);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  useEffect(() => {
    if (params.interviewId) {
      console.log(params.interviewId);
      GetInterviewDetails();
    }

    GetInterviewDetails();
  }, [params.interviewId]);

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5">
          <div className="flex flex-col my-5 p-5 rounded-lg border gap-5">
            <h2 className="text-lg capitalize">
              <strong>Job Role/Job Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg capitalize">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-800">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-900">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setwebCamEnabled(true)}
              onUserMediaError={() => setwebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <div className="flex flex-col items-center">
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                onClick={() => setwebCamEnabled(true)}
                className="w-full"
              >
                Enable Web cam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <Button>Start Interview</Button>
      </div>
    </div>
  );
};

export default Interview;
