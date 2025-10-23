import { ProjectSubmissionForm } from "@/components/ProjectSubmissionForm";
import { DuplicateDetectionModal } from "@/components/modals/DuplicateDetectionModal";
import { AcceptabilityScoreModal } from "@/components/modals/AcceptabilityScoreModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SubmitProject() {
  const { toast } = useToast();
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [showAcceptability, setShowAcceptability] = useState(false);
  const [currentProject, setCurrentProject] = useState({ title: "", description: "" });

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

  const acceptabilityFactors = [
    {
      name: "Technical Feasibility",
      status: "pass" as const,
      message: "Project scope is technically achievable within the given timeframe",
    },
    {
      name: "Innovation Level",
      status: "pass" as const,
      message: "Demonstrates significant innovation and originality",
    },
    {
      name: "Resource Requirements",
      status: "warning" as const,
      message: "May require additional hardware resources - consider optimization",
    },
    {
      name: "Team Composition",
      status: "pass" as const,
      message: "Team has complementary skills for project requirements",
    },
  ];

  const suggestions = [
    "Include more specific technical implementation details in your proposal",
    "Add a detailed timeline with milestones and deliverables",
    "Consider using cloud resources instead of specialized hardware to reduce costs",
  ];

  const handleCheckDuplicates = (title: string, description: string) => {
    setCurrentProject({ title, description });
    setShowDuplicates(true);
  };

  const handleSubmit = (data: any) => {
    setCurrentProject({ title: data.title, description: data.description });
    setShowAcceptability(true);
  };

  const handleFinalSubmit = () => {
    setShowAcceptability(false);
    toast({
      title: "Project Submitted",
      description: "Your project has been submitted for review",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Submit New Project</h1>
        <p className="text-muted-foreground">Complete the form below to submit your FYP proposal</p>
      </div>

      <ProjectSubmissionForm
        onCheckDuplicates={handleCheckDuplicates}
        onSubmit={handleSubmit}
        onSaveDraft={(data) => toast({ title: "Draft Saved", description: "Your project draft has been saved" })}
      />

      <DuplicateDetectionModal
        open={showDuplicates}
        onClose={() => setShowDuplicates(false)}
        currentProject={currentProject}
        similarProjects={similarProjects}
        onContinueAnyway={() => {
          setShowDuplicates(false);
          setShowAcceptability(true);
        }}
        onModifyProject={() => setShowDuplicates(false)}
      />

      <AcceptabilityScoreModal
        open={showAcceptability}
        onClose={() => setShowAcceptability(false)}
        score={82}
        factors={acceptabilityFactors}
        suggestions={suggestions}
      />
    </div>
  );
}
