import { StatCard } from "@/components/StatCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, Users, Lightbulb, Upload } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const [showProjectModal, setShowProjectModal] = useState(false);

  const project = {
    title: "AI-Powered Student Performance Predictor",
    description: "A machine learning system that analyzes student data to predict academic performance.",
    status: "approved" as const,
    supervisor: "Dr. Sarah Ahmed",
    teamMembers: ["John Doe", "Jane Smith", "Ali Hassan"],
    submittedDate: "Oct 15, 2025",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-muted-foreground">Track your FYP progress and manage your projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="My Projects" value="2" icon={FileText} description="Active projects" />
        <StatCard title="Pending Approvals" value="1" icon={Clock} description="Awaiting review" />
        <StatCard title="Completed Milestones" value="5" icon={CheckCircle} trend={{ value: "2 this week", positive: true }} />
        <StatCard title="Team Members" value="3" icon={Users} description="Collaborators" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
          </div>
          <div className="grid gap-4">
            <Button 
              className="w-full justify-start h-auto p-4" 
              data-testid="button-get-recommendations"
              onClick={() => setLocation("/recommendations")}
            >
              <Lightbulb className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Get Supervisor Recommendations</div>
                <div className="text-sm text-primary-foreground/80">Find the perfect match for your project</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-auto p-4" 
              data-testid="button-submit-project"
              onClick={() => setLocation("/submit")}
            >
              <Upload className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Submit New Project</div>
                <div className="text-sm text-muted-foreground">Start your FYP journey</div>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">My Projects</h2>
          <ProjectCard
            {...project}
            onView={() => setShowProjectModal(true)}
            onEdit={() => setLocation("/projects")}
          />
        </div>
      </div>

      <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>Project Details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Description</Label>
              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
            </div>
            <div>
              <Label className="font-semibold">Supervisor</Label>
              <p className="text-sm text-muted-foreground mt-1">{project.supervisor}</p>
            </div>
            <div>
              <Label className="font-semibold">Team Members</Label>
              <p className="text-sm text-muted-foreground mt-1">{project.teamMembers.join(", ")}</p>
            </div>
            <div>
              <Label className="font-semibold">Status</Label>
              <p className="text-sm text-muted-foreground mt-1 capitalize">{project.status}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProjectModal(false)}>Close</Button>
            <Button onClick={() => {
              setShowProjectModal(false);
              setLocation("/projects");
            }}>View All Projects</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
