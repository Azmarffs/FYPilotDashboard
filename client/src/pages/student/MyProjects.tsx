import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
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

export default function MyProjects() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const projects = [
    {
      id: "1",
      title: "AI-Powered Student Performance Predictor",
      description: "A machine learning system that analyzes student data to predict academic performance and identify at-risk students early.",
      status: "approved" as const,
      supervisor: "Dr. Sarah Ahmed",
      teamMembers: ["John Doe", "Jane Smith", "Ali Hassan"],
      submittedDate: "Oct 15, 2025",
      feedback: "Excellent project proposal with clear objectives and methodology. Looking forward to seeing the implementation.",
    },
    {
      id: "2",
      title: "Blockchain-based Document Verification",
      description: "Decentralized system for verifying academic credentials using blockchain technology.",
      status: "in-progress" as const,
      supervisor: "Dr. Muhammad Khan",
      teamMembers: ["Ahmed Ali", "Sara Khan"],
      submittedDate: "Sep 28, 2025",
      feedback: "Good progress on the smart contract implementation. Please focus on the user interface next.",
    },
    {
      id: "3",
      title: "Smart Campus IoT System",
      description: "An IoT-based system for monitoring and optimizing campus resources including energy and water usage.",
      status: "draft" as const,
      teamMembers: ["John Doe", "Michael Brown"],
      submittedDate: undefined,
    },
  ];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">Manage and track your FYP submissions</p>
        </div>
        <Button data-testid="button-new-project">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-projects"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-status">
            <SelectValue placeholder="Filter by status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onView={() => setSelectedProject(project)}
            onEdit={project.status === "draft" ? () => toast({ title: "Edit Project" }) : undefined}
            onDelete={project.status === "draft" ? () => {
              setSelectedProject(project);
              setShowDeleteModal(true);
            } : undefined}
          />
        ))}
      </div>

      <Dialog open={!!selectedProject && !showDeleteModal} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>Project Details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Description</Label>
              <p className="text-sm text-muted-foreground mt-1">{selectedProject?.description}</p>
            </div>
            {selectedProject?.supervisor && (
              <div>
                <Label className="font-semibold">Supervisor</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedProject.supervisor}</p>
              </div>
            )}
            {selectedProject?.feedback && (
              <div>
                <Label className="font-semibold">Feedback</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedProject.feedback}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedProject(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>This action cannot be undone. Are you sure?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              setShowDeleteModal(false);
              setSelectedProject(null);
              toast({ title: "Project Deleted" });
            }}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
