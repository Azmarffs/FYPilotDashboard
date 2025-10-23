import { SupervisorProfileModal } from "../modals/SupervisorProfileModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SupervisorProfileModalExample() {
  const [open, setOpen] = useState(false);

  const supervisor = {
    name: "Dr. Sarah Ahmed",
    department: "Computer Science",
    expertise: ["Machine Learning", "AI", "Data Science", "Neural Networks", "Deep Learning"],
    matchScore: 95,
    successRate: 92,
    projectsSupervised: 24,
    publications: 45,
    researchAreas: ["Computer Vision", "NLP", "Reinforcement Learning"],
    pastProjects: [
      "Real-time Object Detection using YOLO",
      "Sentiment Analysis for Urdu Language",
      "Predictive Analytics for Healthcare",
    ],
  };

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>View Supervisor Profile</Button>
      <SupervisorProfileModal open={open} onClose={() => setOpen(false)} supervisor={supervisor} />
    </div>
  );
}
