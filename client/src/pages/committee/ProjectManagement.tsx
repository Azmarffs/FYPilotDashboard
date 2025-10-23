import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CheckCircle, XCircle, AlertCircle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ProjectManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAction, setSelectedAction] = useState<{ type: string; project: any } | null>(null);
  const [feedback, setFeedback] = useState("");

  const [projects, setProjects] = useState<Array<{
    id: string;
    title: string;
    description: string;
    status: "pending" | "approved" | "rejected";
    supervisor?: string;
    teamMembers: string[];
    submittedDate: string;
  }>>([
    {
      id: "1",
      title: "AI-Powered Student Performance Predictor",
      description: "A machine learning system that analyzes student data to predict academic performance.",
      status: "pending",
      teamMembers: ["John Doe", "Jane Smith", "Ali Hassan"],
      submittedDate: "Oct 15, 2025",
    },
    {
      id: "2",
      title: "Blockchain Document Verification",
      description: "Decentralized system for verifying academic credentials using blockchain technology.",
      status: "approved",
      supervisor: "Dr. Muhammad Khan",
      teamMembers: ["Ahmed Ali", "Sara Khan"],
      submittedDate: "Sep 28, 2025",
    },
    {
      id: "3",
      title: "Smart Campus IoT System",
      description: "IoT-based system for monitoring and optimizing campus resources.",
      status: "pending",
      teamMembers: ["Hassan Mahmood", "Fatima Ali"],
      submittedDate: "Oct 22, 2025",
    },
  ]);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = () => {
    if (selectedAction?.project) {
      setProjects(projects.map(p =>
        p.id === selectedAction.project.id ? { ...p, status: "approved" } : p
      ));
      toast({ title: "Project Approved" });
      setSelectedAction(null);
    }
  };

  const handleReject = () => {
    if (selectedAction?.project && feedback) {
      setProjects(projects.map(p =>
        p.id === selectedAction.project.id ? { ...p, status: "rejected" } : p
      ));
      toast({ title: "Project Rejected", description: "Feedback sent to students" });
      setSelectedAction(null);
      setFeedback("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Project Management</h1>
        <p className="text-muted-foreground">Review and manage all FYP submissions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-filter">
            <SelectValue placeholder="Filter by status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id}>
            <ProjectCard
              {...project}
              onView={() => toast({ title: "View Details" })}
            />
            {project.status === "pending" && (
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedAction({ type: "approve", project })}
                  data-testid={`button-approve-${project.id}`}
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-success" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedAction({ type: "modify", project })}
                  data-testid={`button-request-changes-${project.id}`}
                >
                  <AlertCircle className="h-4 w-4 mr-2 text-warning" />
                  Request Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedAction({ type: "reject", project })}
                  data-testid={`button-reject-${project.id}`}
                >
                  <XCircle className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={selectedAction?.type === "approve"} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Project</DialogTitle>
            <DialogDescription>Are you sure you want to approve this project?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAction(null)}>Cancel</Button>
            <Button onClick={handleApprove}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedAction?.type === "reject" || selectedAction?.type === "modify"} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAction?.type === "reject" ? "Reject Project" : "Request Modifications"}
            </DialogTitle>
            <DialogDescription>Provide feedback to the students</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Feedback *</Label>
              <Textarea
                placeholder="Explain your decision..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-24 mt-2"
                data-testid="input-feedback"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAction(null)}>Cancel</Button>
            <Button
              variant={selectedAction?.type === "reject" ? "destructive" : "default"}
              onClick={handleReject}
              disabled={!feedback}
            >
              {selectedAction?.type === "reject" ? "Reject" : "Send Feedback"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
