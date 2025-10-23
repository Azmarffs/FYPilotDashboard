import { ProjectSubmissionForm } from "@/components/ProjectSubmissionForm";
import { DuplicateDetectionModal } from "@/components/modals/DuplicateDetectionModal";
import { AcceptabilityScoreModal } from "@/components/modals/AcceptabilityScoreModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";

export default function SubmitProject() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [showAcceptability, setShowAcceptability] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({ title: "", description: "" });
  const [projectData, setProjectData] = useState<any>(null);

  const submitProjectMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      
      if (data.duplicateCheckResult?.hasDuplicates) {
        setCurrentProject({ title: data.title, description: data.description });
        setShowDuplicates(true);
      } else {
        setShowAcceptability(true);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit project",
        variant: "destructive",
      });
    },
  });

  const handleCheckDuplicates = (title: string, description: string) => {
    setCurrentProject({ title, description });
    setShowDuplicates(true);
  };

  const handleSubmit = (data: any) => {
    if (!user) return;
    
    const fullProjectData = {
      ...data,
      studentId: user.id,
      status: "pending",
    };
    
    setProjectData(fullProjectData);
    submitProjectMutation.mutate(fullProjectData);
  };

  const handleFinalSubmit = () => {
    setShowAcceptability(false);
    toast({
      title: "Project Submitted",
      description: "Your project has been submitted for review",
    });
    setLocation("/projects");
  };

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
        similarProjects={[]}
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
        onSubmit={handleFinalSubmit}
      />
    </div>
  );
}
