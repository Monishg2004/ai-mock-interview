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
import { LoaderCircle } from "lucide-react";

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
      .replace("```json", "")
      .replace("```", "");

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
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job Interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, job description
                    and years of experience.
                  </h2>
                  <div className="mt-7 my-3.5">
                    <label htmlFor="jobrole" className="block mb-2">
                      Job Role/Job Position
                    </label>
                    <Input
                      placeholder="Eg. Fullstack Developer"
                      onChange={(e) => setJobPosition(e.target.value)}
                      required
                    />
                  </div>
                  <div className="my-3.5">
                    <label htmlFor="jobdesc" className="block mb-2">
                      Job Description/Tech Stack (In Short)
                    </label>
                    <Textarea
                      placeholder="Eg. React, Angular, NodeJs, Mysql etc"
                      onChange={(e) => setJobDesc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="my-3.5">
                    <label htmlFor="jobrole" className="block mb-2">
                      Years of Experience
                    </label>
                    <Input
                      placeholder="Eg. 5"
                      type="number"
                      max="50"
                      onChange={(e) => setJobExperience(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-x-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    className="outline-none border-none"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
