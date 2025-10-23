import { ProjectCard } from "@/components/ProjectCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users, Clock, CheckCircle } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function MySupervisedProjects() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [feedback, setFeedback] = useState("");

  const projects = [
    {
      id: "1",
      title: "AI-Powered Student Performance Predictor",
      description: "A machine learning system that analyzes student data to predict academic performance.",
      status: "in-progress" as const,
      teamMembers: ["John Doe", "Jane Smith", "Ali Hassan"],
      submittedDate: "Oct 15, 2025",
      progress: 65,
    },
    {
      id: "2",
      title: "Smart Campus Navigation System",
      description: "An AR-based indoor navigation system using computer vision.",
      status: "in-progress" as const,
      teamMembers: ["Ahmed Ali", "Sara Khan"],
      submittedDate: "Oct 20, 2025",
      progress: 45,
    },
    {
      id: "3",
      title: "E-Learning Analytics Platform",
      description: "A comprehensive analytics dashboard for tracking student engagement.",
      status: "in-progress" as const,
      teamMembers: ["Hassan Mahmood"],
      submittedDate: "Oct 18, 2025",
      progress: 30,
    },
  ];

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">My Supervised Projects</h1>
        <p className="text-muted-foreground">Manage and monitor your supervised student projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Total Projects</h3>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-2">{projects.length}</div>
          <p className="text-sm text-muted-foreground">Currently supervising</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Avg. Progress</h3>
            <Clock className="h-5 w-5 text-info" />
          </div>
          <div className="text-3xl font-bold mb-2">
            {Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length)}%
          </div>
          <p className="text-sm text-muted-foreground">Across all projects</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">On Track</h3>
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div className="text-3xl font-bold mb-2">
            {projects.filter(p => (p.progress || 0) >= 40).length}
          </div>
          <p className="text-sm text-muted-foreground">Projects progressing well</p>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="space-y-3">
            <ProjectCard
              {...project}
              onView={() => toast({ title: "View Project Details" })}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedProject(project);
                  setShowFeedbackModal(true);
                }}
                data-testid={`button-feedback-${project.id}`}
              >
                Provide Feedback
              </Button>
              <Button variant="outline" data-testid={`button-meeting-${project.id}`}>
                Schedule Meeting
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>{selectedProject?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Your Feedback</Label>
              <Textarea
                placeholder="Provide constructive feedback to your students..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-32 mt-2"
                data-testid="input-feedback"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Feedback Sent",
                  description: "Your feedback has been sent to the students",
                });
                setShowFeedbackModal(false);
                setFeedback("");
              }}
            >
              Send Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
