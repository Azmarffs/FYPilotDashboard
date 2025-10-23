import { EvaluationForm } from "@/components/EvaluationForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Evaluations() {
  const { toast } = useToast();
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const evaluations = [
    {
      id: "1",
      projectTitle: "AI-Powered Student Performance Predictor",
      studentName: "John Doe",
      defenseDate: "Nov 15, 2025",
      status: "pending" as const,
    },
    {
      id: "2",
      projectTitle: "Blockchain Document Verification",
      studentName: "Jane Smith",
      defenseDate: "Nov 18, 2025",
      status: "pending" as const,
    },
    {
      id: "3",
      projectTitle: "Smart Traffic Management System",
      studentName: "Ali Hassan",
      defenseDate: "Nov 10, 2025",
      status: "completed" as const,
      score: 87,
    },
  ];

  const criteria = [
    {
      id: "technical",
      name: "Technical Implementation",
      description: "Quality of code, architecture, and technical execution",
      maxScore: 25,
    },
    {
      id: "innovation",
      name: "Innovation & Creativity",
      description: "Originality of approach and creative problem-solving",
      maxScore: 20,
    },
    {
      id: "documentation",
      name: "Documentation",
      description: "Quality of technical documentation and user guides",
      maxScore: 15,
    },
    {
      id: "presentation",
      name: "Presentation & Communication",
      description: "Clarity of presentation and ability to explain concepts",
      maxScore: 20,
    },
    {
      id: "impact",
      name: "Impact & Feasibility",
      description: "Practical value and real-world applicability",
      maxScore: 20,
    },
  ];

  const statusColors = {
    pending: "bg-warning/10 text-warning border-warning/20",
    completed: "bg-success/10 text-success border-success/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Evaluations</h1>
        <p className="text-muted-foreground">Submit and manage project evaluations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {evaluations.map((evaluation) => (
          <Card key={evaluation.id} className="p-6 hover-elevate">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{evaluation.projectTitle}</h3>
                <p className="text-sm text-muted-foreground">By: {evaluation.studentName}</p>
              </div>
              <Badge className={`${statusColors[evaluation.status]} capitalize`}>
                {evaluation.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Defense: {evaluation.defenseDate}</span>
              </div>
              {evaluation.score && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Score: {evaluation.score}/100</span>
                </div>
              )}
            </div>

            {evaluation.status === "pending" ? (
              <Button
                className="w-full"
                onClick={() => {
                  setSelectedEvaluation(evaluation);
                  setShowForm(true);
                }}
                data-testid={`button-start-evaluation-${evaluation.id}`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Start Evaluation
              </Button>
            ) : (
              <Button variant="outline" className="w-full" data-testid={`button-view-evaluation-${evaluation.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Evaluation
              </Button>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Project Evaluation</DialogTitle>
            <DialogDescription>{selectedEvaluation?.projectTitle}</DialogDescription>
          </DialogHeader>
          <EvaluationForm
            projectTitle={selectedEvaluation?.projectTitle || ""}
            criteria={criteria}
            onSaveDraft={(data) => {
              toast({ title: "Draft Saved" });
            }}
            onSubmit={(data) => {
              toast({
                title: "Evaluation Submitted",
                description: "The evaluation has been submitted successfully",
              });
              setShowForm(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
