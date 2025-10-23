import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Upload, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ProgressTracking() {
  const { toast } = useToast();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);

  const milestones = [
    {
      id: "1",
      title: "Project Proposal Submission",
      description: "Submit detailed project proposal with objectives and methodology",
      dueDate: "Oct 15, 2025",
      status: "completed" as const,
      completedDate: "Oct 14, 2025",
    },
    {
      id: "2",
      title: "Literature Review",
      description: "Complete comprehensive literature review and submit report",
      dueDate: "Nov 1, 2025",
      status: "completed" as const,
      completedDate: "Oct 30, 2025",
    },
    {
      id: "3",
      title: "System Design & Architecture",
      description: "Finalize system architecture and design documents",
      dueDate: "Nov 20, 2025",
      status: "in-progress" as const,
      progress: 65,
    },
    {
      id: "4",
      title: "Prototype Development",
      description: "Develop working prototype with core features",
      dueDate: "Dec 15, 2025",
      status: "pending" as const,
    },
    {
      id: "5",
      title: "Final Implementation",
      description: "Complete implementation with all features and testing",
      dueDate: "Jan 30, 2026",
      status: "pending" as const,
    },
  ];

  const completedMilestones = milestones.filter(m => m.status === "completed").length;
  const overallProgress = (completedMilestones / milestones.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Progress Tracking</h1>
        <p className="text-muted-foreground">Track your project milestones and deliverables</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Overall Progress</h3>
          <span className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-3 mb-2" />
        <p className="text-sm text-muted-foreground">
          {completedMilestones} of {milestones.length} milestones completed
        </p>
      </Card>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Card
            key={milestone.id}
            className={`p-6 ${milestone.status === "in-progress" ? "border-primary" : ""}`}
            data-testid={`card-milestone-${milestone.id}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {milestone.status === "completed" ? (
                  <CheckCircle className="h-6 w-6 text-success" />
                ) : milestone.status === "in-progress" ? (
                  <div className="h-6 w-6 rounded-full border-4 border-primary" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  <Badge
                    variant={
                      milestone.status === "completed"
                        ? "default"
                        : milestone.status === "in-progress"
                        ? "outline"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {milestone.status.replace("-", " ")}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {milestone.dueDate}</span>
                  </div>
                  {milestone.completedDate && (
                    <span>Completed: {milestone.completedDate}</span>
                  )}
                </div>

                {milestone.status === "in-progress" && milestone.progress !== undefined && (
                  <div className="mb-3">
                    <Progress value={milestone.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{milestone.progress}% complete</p>
                  </div>
                )}

                {milestone.status !== "completed" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedMilestone(milestone);
                      setShowUploadModal(true);
                    }}
                    data-testid={`button-upload-${milestone.id}`}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Deliverable
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Milestone Deliverable</DialogTitle>
            <DialogDescription>{selectedMilestone?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>File Upload</Label>
              <Input type="file" className="mt-2" data-testid="input-file" />
            </div>
            <div>
              <Label>Notes (Optional)</Label>
              <Textarea
                placeholder="Add any notes or comments..."
                className="min-h-20 mt-2"
                data-testid="input-notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Deliverable Uploaded",
                  description: "Your milestone deliverable has been submitted",
                });
                setShowUploadModal(false);
              }}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
