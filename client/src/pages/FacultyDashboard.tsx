import { StatCard } from "@/components/StatCard";
import { RequestCard } from "@/components/RequestCard";
import { PanelCard } from "@/components/PanelCard";
import { Users, Clock, CheckCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function FacultyDashboard() {
  const { toast } = useToast();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const requests = [
    {
      studentName: "Ahmed Ali",
      studentId: "22I-1234",
      projectTitle: "Smart Campus Navigation System",
      projectDescription: "An AR-based indoor navigation system using computer vision and sensor fusion.",
      requestDate: "Oct 20, 2025",
    },
    {
      studentName: "Sara Khan",
      studentId: "22I-5678",
      projectTitle: "E-Learning Analytics Platform",
      projectDescription: "A comprehensive analytics dashboard for tracking student engagement.",
      requestDate: "Oct 18, 2025",
    },
  ];

  const handleApprove = (studentName: string) => {
    toast({
      title: "Request Approved",
      description: `You have approved ${studentName}'s supervision request`,
    });
  };

  const handleReject = (studentName: string) => {
    toast({
      title: "Request Rejected",
      description: `You have rejected ${studentName}'s supervision request`,
      variant: "destructive",
    });
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Manage supervision requests and evaluation schedules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Supervised Projects" value="8" icon={Users} description="Currently supervising" />
        <StatCard title="Pending Requests" value="3" icon={Clock} description="Awaiting response" />
        <StatCard title="Evaluations" value="2" icon={CheckCircle} description="This week" />
        <StatCard title="Panel Assignments" value="5" icon={Calendar} description="Upcoming" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Pending Supervision Requests</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RequestCard
            {...requests[0]}
            onApprove={() => handleApprove("Ahmed Ali")}
            onReject={() => handleReject("Ahmed Ali")}
            onViewDetails={() => handleViewDetails(requests[0])}
          />
          <RequestCard
            {...requests[1]}
            onApprove={() => handleApprove("Sara Khan")}
            onReject={() => handleReject("Sara Khan")}
            onViewDetails={() => handleViewDetails(requests[1])}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Upcoming Panel Assignments</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PanelCard
            projectTitle="AI-Powered Student Predictor"
            studentName="John Doe"
            date="Nov 15, 2025"
            time="10:00 AM"
            location="Room 401, CS Building"
            status="scheduled"
            panelMembers={[
              { name: "Dr. Sarah Ahmed", role: "Chair" },
              { name: "Dr. Muhammad Khan", role: "Examiner" },
              { name: "Dr. Ali Hassan", role: "External" },
            ]}
            onViewDetails={() => handleViewDetails({ 
              projectTitle: "AI-Powered Student Predictor", 
              studentName: "John Doe",
              projectDescription: "A machine learning system that analyzes student data to predict academic performance and identify at-risk students early.",
              date: "Nov 15, 2025",
              time: "10:00 AM",
              location: "Room 401, CS Building"
            })}
          />
        </div>
      </div>

      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedProject?.projectTitle}</DialogTitle>
            <DialogDescription>Project Details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProject?.studentName && (
              <div>
                <Label className="font-semibold">Student</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedProject.studentName}</p>
              </div>
            )}
            {selectedProject?.studentId && (
              <div>
                <Label className="font-semibold">Student ID</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedProject.studentId}</p>
              </div>
            )}
            {selectedProject?.projectDescription && (
              <div>
                <Label className="font-semibold">Description</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedProject.projectDescription}</p>
              </div>
            )}
            {selectedProject?.requestDate && (
              <div>
                <Label className="font-semibold">Request Date</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedProject.requestDate}</p>
              </div>
            )}
            {selectedProject?.date && (
              <div>
                <Label className="font-semibold">Defense Schedule</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedProject.date} at {selectedProject.time}
                  {selectedProject.location && ` - ${selectedProject.location}`}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
