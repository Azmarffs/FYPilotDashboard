import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Download, Send, Trophy } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EvaluationManagement() {
  const { toast } = useToast();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedDefense, setSelectedDefense] = useState<any>(null);

  const defenses = [
    {
      id: "1",
      projectTitle: "AI-Powered Student Performance Predictor",
      studentName: "John Doe",
      studentId: "22I-2646",
      date: "Nov 15, 2025",
      time: "10:00 AM",
      location: "Room 401, CS Building",
      status: "scheduled" as const,
      panel: ["Dr. Sarah Ahmed", "Dr. Muhammad Khan", "Dr. Ali Hassan"],
      result: null,
    },
    {
      id: "2",
      projectTitle: "Blockchain Document Verification",
      studentName: "Jane Smith",
      studentId: "22I-2515",
      date: "Nov 16, 2025",
      time: "2:00 PM",
      location: "Room 302, CS Building",
      status: "scheduled" as const,
      panel: ["Dr. Fatima Tariq", "Dr. Ahmed Raza", "Dr. Hassan Ali"],
      result: null,
    },
    {
      id: "3",
      projectTitle: "Smart Campus IoT Monitoring",
      studentName: "Ahmed Ali",
      studentId: "22I-2716",
      date: "Nov 10, 2025",
      time: "11:00 AM",
      location: "Room 201, CS Building",
      status: "completed" as const,
      panel: ["Dr. Muhammad Khan", "Dr. Ali Raza", "Dr. Sarah Ahmed"],
      result: {
        grade: "A",
        score: 88,
        remarks: "Excellent implementation and presentation",
      },
    },
  ];

  const stats = {
    scheduled: defenses.filter(d => d.status === "scheduled").length,
    completed: defenses.filter(d => d.status === "completed").length,
    pending: defenses.filter(d => !d.date).length,
  };

  const handleScheduleDefense = () => {
    toast({
      title: "Defense Scheduled",
      description: "Defense has been scheduled and notifications sent",
    });
    setShowScheduleModal(false);
  };

  const handleReschedule = () => {
    toast({
      title: "Defense Rescheduled",
      description: "Defense has been rescheduled successfully",
    });
    setShowRescheduleModal(false);
  };

  const handleEnterResults = () => {
    toast({
      title: "Results Saved",
      description: "Evaluation results have been recorded",
    });
    setShowResultsModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Evaluation Management</h1>
          <p className="text-muted-foreground">Schedule and manage FYP defense evaluations</p>
        </div>
        <Button onClick={() => setShowScheduleModal(true)} data-testid="button-schedule-defense">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Schedule Defense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Scheduled</h3>
            <CalendarIcon className="h-5 w-5 text-info" />
          </div>
          <div className="text-3xl font-bold text-info">{stats.scheduled}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Completed</h3>
            <Trophy className="h-5 w-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-success">{stats.completed}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Pending</h3>
            <Clock className="h-5 w-5 text-warning" />
          </div>
          <div className="text-3xl font-bold text-warning">{stats.pending}</div>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" data-testid="button-export-schedule">
          <Download className="h-4 w-4 mr-2" />
          Export Schedule
        </Button>
        <Button variant="outline" onClick={() => setShowCertificateModal(true)} data-testid="button-generate-certificates">
          <Trophy className="h-4 w-4 mr-2" />
          Generate Certificates
        </Button>
      </div>

      <div className="space-y-4">
        {defenses.map((defense) => (
          <Card key={defense.id} className="p-6" data-testid={`card-defense-${defense.id}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{defense.projectTitle}</h3>
                  <Badge variant={defense.status === "completed" ? "default" : "outline"} className="capitalize">
                    {defense.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {defense.studentName} ({defense.studentId})
                </p>
                {defense.date && (
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {defense.date} at {defense.time}
                    </div>
                    <div>{defense.location}</div>
                  </div>
                )}
                <div className="mt-3">
                  <p className="text-sm font-semibold mb-1">Panel Members:</p>
                  <div className="flex flex-wrap gap-2">
                    {defense.panel.map((member) => (
                      <Badge key={member} variant="secondary" className="text-xs">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
                {defense.result && (
                  <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-semibold">Grade: {defense.result.grade}</p>
                        <p className="text-xs text-muted-foreground">Score: {defense.result.score}/100</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">{defense.result.remarks}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {defense.status === "scheduled" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedDefense(defense);
                      setShowRescheduleModal(true);
                    }}
                    data-testid={`button-reschedule-${defense.id}`}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedDefense(defense);
                      setShowResultsModal(true);
                    }}
                    data-testid={`button-enter-results-${defense.id}`}
                  >
                    Enter Results
                  </Button>
                </>
              )}
              {defense.status === "completed" && (
                <Button variant="outline" size="sm" data-testid={`button-view-results-${defense.id}`}>
                  View Full Results
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Defense</DialogTitle>
            <DialogDescription>Set up a defense evaluation for a project</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Project</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">AI Student Predictor - John Doe</SelectItem>
                  <SelectItem value="2">Blockchain Verification - Jane Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input type="date" className="mt-2" data-testid="input-defense-date" />
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" className="mt-2" data-testid="input-defense-time" />
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <Input className="mt-2" placeholder="Room number or virtual link" data-testid="input-defense-location" />
            </div>
            <div>
              <Label>Panel Assignment</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select panel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="panel1">Panel 1 (Dr. Sarah, Dr. Khan, Dr. Hassan)</SelectItem>
                  <SelectItem value="panel2">Panel 2 (Dr. Fatima, Dr. Ahmed, Dr. Ali)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleDefense} data-testid="button-confirm-schedule">
              Schedule & Notify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Defense</DialogTitle>
            <DialogDescription>{selectedDefense?.projectTitle}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>New Date</Label>
                <Input type="date" className="mt-2" data-testid="input-reschedule-date" />
              </div>
              <div>
                <Label>New Time</Label>
                <Input type="time" className="mt-2" data-testid="input-reschedule-time" />
              </div>
            </div>
            <div>
              <Label>Reason for Rescheduling</Label>
              <Textarea className="mt-2" placeholder="Explain the reason..." data-testid="input-reschedule-reason" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleReschedule} data-testid="button-confirm-reschedule">
              Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showResultsModal} onOpenChange={setShowResultsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enter Evaluation Results</DialogTitle>
            <DialogDescription>{selectedDefense?.projectTitle}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Final Grade</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Total Score</Label>
                <Input type="number" className="mt-2" placeholder="0-100" data-testid="input-score" />
              </div>
            </div>
            <div>
              <Label>Evaluation Comments</Label>
              <Textarea className="mt-2 min-h-32" placeholder="Overall assessment and remarks..." data-testid="input-comments" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResultsModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnterResults} data-testid="button-save-results">
              Save Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCertificateModal} onOpenChange={setShowCertificateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Certificates</DialogTitle>
            <DialogDescription>Create certificates for completed projects</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Projects</Label>
              <p className="text-sm text-muted-foreground mt-2">
                {stats.completed} completed projects eligible for certificates
              </p>
            </div>
            <div>
              <Label>Certificate Template</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard FYP Certificate</SelectItem>
                  <SelectItem value="honors">Honors Certificate</SelectItem>
                  <SelectItem value="excellence">Certificate of Excellence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCertificateModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({ title: "Certificates Generated", description: "Certificates have been created" });
              setShowCertificateModal(false);
            }}>
              <Download className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
