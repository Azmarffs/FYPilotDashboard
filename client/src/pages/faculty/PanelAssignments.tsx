import { PanelCard } from "@/components/PanelCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, AlertTriangle, Users, CheckCircle } from "lucide-react";
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

export default function PanelAssignments() {
  const { toast } = useToast();
  const [selectedPanel, setSelectedPanel] = useState<any>(null);
  const [showChangeRequestModal, setShowChangeRequestModal] = useState(false);
  const [showPanelistsModal, setShowPanelistsModal] = useState(false);
  const [changeReason, setChangeReason] = useState("");

  const panels = [
    {
      id: "1",
      projectTitle: "AI-Powered Student Performance Predictor",
      studentName: "John Doe",
      date: "Nov 15, 2025",
      time: "10:00 AM",
      location: "Room 401, CS Building",
      status: "accepted" as const,
      role: "Chair",
      panelMembers: [
        { name: "Dr. Sarah Ahmed", role: "Chair" },
        { name: "Dr. Muhammad Khan", role: "Examiner" },
        { name: "Dr. Ali Hassan", role: "External" },
      ],
    },
    {
      id: "2",
      projectTitle: "Blockchain Document Verification System",
      studentName: "Jane Smith",
      date: "Nov 16, 2025",
      time: "2:00 PM",
      location: "Room 302, CS Building",
      status: "pending" as const,
      role: "Examiner",
      panelMembers: [
        { name: "Dr. Fatima Tariq", role: "Chair" },
        { name: "Dr. Sarah Ahmed", role: "Examiner" },
        { name: "Dr. Hassan Ali", role: "External" },
      ],
    },
    {
      id: "3",
      projectTitle: "Smart Campus IoT Monitoring",
      studentName: "Ahmed Ali",
      date: "Nov 18, 2025",
      time: "11:00 AM",
      location: "Room 201, CS Building",
      status: "conflict" as const,
      role: "External",
      conflictReason: "Another panel scheduled at the same time",
      panelMembers: [
        { name: "Dr. Muhammad Khan", role: "Chair" },
        { name: "Dr. Ali Raza", role: "Examiner" },
        { name: "Dr. Sarah Ahmed", role: "External" },
      ],
    },
  ];

  const stats = {
    total: panels.length,
    accepted: panels.filter(p => p.status === "accepted").length,
    pending: panels.filter(p => p.status === "pending").length,
    conflicts: panels.filter(p => p.status === "conflict").length,
  };

  const handleAccept = (panelId: string) => {
    toast({
      title: "Assignment Accepted",
      description: "You have accepted the panel assignment",
    });
  };

  const handleRequestChange = () => {
    if (!changeReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for the change request",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Change Request Submitted",
      description: "Your request has been sent to the committee",
    });
    setShowChangeRequestModal(false);
    setChangeReason("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Panel Assignments</h1>
        <p className="text-muted-foreground">View and manage your evaluation panel assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Total Assignments</h3>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">{stats.total}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Accepted</h3>
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-success">{stats.accepted}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Pending</h3>
            <Users className="h-5 w-5 text-warning" />
          </div>
          <div className="text-3xl font-bold text-warning">{stats.pending}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Conflicts</h3>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div className="text-3xl font-bold text-destructive">{stats.conflicts}</div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" data-testid="button-export-schedule">
          <Download className="h-4 w-4 mr-2" />
          Export Schedule
        </Button>
      </div>

      <div className="space-y-4">
        {panels.map((panel) => (
          <Card key={panel.id} className="p-6" data-testid={`card-panel-${panel.id}`}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{panel.projectTitle}</h3>
                    <Badge variant={
                      panel.status === "accepted" ? "default" :
                      panel.status === "conflict" ? "destructive" : "outline"
                    } className="capitalize">
                      {panel.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">Student: {panel.studentName}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {panel.date} at {panel.time}
                    </div>
                    <div>{panel.location}</div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary">Your Role: {panel.role}</Badge>
                  </div>
                  {panel.status === "conflict" && panel.conflictReason && (
                    <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-destructive">Schedule Conflict</p>
                          <p className="text-sm text-muted-foreground">{panel.conflictReason}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {panel.status === "pending" && (
                  <Button size="sm" onClick={() => handleAccept(panel.id)} data-testid={`button-accept-${panel.id}`}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept Assignment
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPanel(panel);
                    setShowPanelistsModal(true);
                  }}
                  data-testid={`button-view-panelists-${panel.id}`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Panelists
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPanel(panel);
                    setShowChangeRequestModal(true);
                  }}
                  data-testid={`button-request-change-${panel.id}`}
                >
                  Request Change
                </Button>
                <Button variant="outline" size="sm" data-testid={`button-download-${panel.id}`}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Materials
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showChangeRequestModal} onOpenChange={setShowChangeRequestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Assignment Change</DialogTitle>
            <DialogDescription>
              Please provide a reason for requesting a change to this panel assignment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Reason for Change</Label>
              <Textarea
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                placeholder="E.g., Schedule conflict, lack of expertise in this domain..."
                className="mt-2 min-h-32"
                data-testid="input-change-reason"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangeRequestModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestChange} data-testid="button-submit-change-request">
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPanelistsModal} onOpenChange={setShowPanelistsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Panel Members</DialogTitle>
            <DialogDescription>{selectedPanel?.projectTitle}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {selectedPanel?.panelMembers.map((member: any) => (
              <div key={member.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <Badge variant="outline">{member.role}</Badge>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPanelistsModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
