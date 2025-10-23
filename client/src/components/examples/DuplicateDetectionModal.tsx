import { DuplicateDetectionModal } from "../modals/DuplicateDetectionModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DuplicateDetectionModalExample() {
  const [open, setOpen] = useState(false);

  const currentProject = {
    title: "AI-Powered Chatbot for Customer Support",
    description: "Developing an intelligent chatbot using NLP and machine learning to handle customer queries automatically.",
  };

  const similarProjects = [
    {
      id: "1",
      title: "Customer Service AI Assistant",
      description: "An NLP-based chatbot system for automated customer support with sentiment analysis.",
      similarity: 87,
      submittedBy: "Ahmed Ali (22I-1234)",
      status: "Approved",
    },
    {
      id: "2",
      title: "Intelligent Virtual Assistant for E-commerce",
      description: "Building a conversational AI assistant using machine learning for online shopping support.",
      similarity: 72,
      submittedBy: "Sara Khan (22I-5678)",
      status: "Under Review",
    },
  ];

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Show Duplicate Detection</Button>
      <DuplicateDetectionModal
        open={open}
        onClose={() => setOpen(false)}
        currentProject={currentProject}
        similarProjects={similarProjects}
        onContinueAnyway={() => {
          console.log("Continuing anyway");
          setOpen(false);
        }}
        onModifyProject={() => {
          console.log("Modifying project");
          setOpen(false);
        }}
      />
    </div>
  );
}
