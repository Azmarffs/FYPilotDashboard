import { StatCard } from "@/components/StatCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, Users, Lightbulb, Upload } from "lucide-react";

export default function StudentDashboard() {
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
            <Button className="w-full justify-start h-auto p-4" data-testid="button-get-recommendations">
              <Lightbulb className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Get Supervisor Recommendations</div>
                <div className="text-sm text-primary-foreground/80">Find the perfect match for your project</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-4" data-testid="button-submit-project">
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
            title="AI-Powered Student Performance Predictor"
            description="A machine learning system that analyzes student data to predict academic performance."
            status="approved"
            supervisor="Dr. Sarah Ahmed"
            teamMembers={["John Doe", "Jane Smith", "Ali Hassan"]}
            submittedDate="Oct 15, 2025"
            onView={() => console.log("View project")}
            onEdit={() => console.log("Edit project")}
          />
        </div>
      </div>
    </div>
  );
}
