import { RequestCard } from "@/components/RequestCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export default function SupervisorRequests() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [requests, setRequests] = useState<Array<{
    id: string;
    studentName: string;
    studentId: string;
    projectTitle: string;
    projectDescription: string;
    requestDate: string;
    status: "pending" | "approved" | "rejected";
  }>>([
    {
      id: "1",
      studentName: "Ahmed Ali",
      studentId: "22I-1234",
      projectTitle: "Smart Campus Navigation System",
      projectDescription: "An AR-based indoor navigation system using computer vision and sensor fusion to guide students across campus facilities.",
      requestDate: "Oct 20, 2025",
      status: "pending",
    },
    {
      id: "2",
      studentName: "Sara Khan",
      studentId: "22I-5678",
      projectTitle: "E-Learning Analytics Platform",
      projectDescription: "A comprehensive analytics dashboard for tracking student engagement and performance in online learning environments.",
      requestDate: "Oct 18, 2025",
      status: "pending",
    },
    {
      id: "3",
      studentName: "Hassan Mahmood",
      studentId: "22I-9012",
      projectTitle: "IoT-based Smart Agriculture",
      projectDescription: "An IoT system for monitoring soil conditions, weather patterns, and automating irrigation for optimal crop yield.",
      requestDate: "Oct 16, 2025",
      status: "approved",
    },
  ]);

  const filteredRequests = requests.filter(r => 
    filter === "all" || r.status === filter
  );

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: "approved" } : r
    ));
    toast({
      title: "Request Approved",
      description: "You are now supervising this project",
    });
  };

  const handleReject = () => {
    if (selectedRequest) {
      setRequests(requests.map(r => 
        r.id === selectedRequest.id ? { ...r, status: "rejected" } : r
      ));
      toast({
        title: "Request Rejected",
        description: "Rejection notification sent to student",
      });
      setShowRejectModal(false);
      setSelectedRequest(null);
      setRejectReason("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Supervision Requests</h1>
        <p className="text-muted-foreground">Review and manage student supervision requests</p>
      </div>

      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-48" data-testid="select-filter">
          <SelectValue placeholder="Filter..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Requests</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            {...request}
            onApprove={() => handleApprove(request.id)}
            onReject={() => {
              setSelectedRequest(request);
              setShowRejectModal(true);
            }}
            onViewDetails={() => setSelectedRequest(request)}
          />
        ))}
      </div>

      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Supervision Request</DialogTitle>
            <DialogDescription>Please provide a reason for rejection</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rejection Reason *</Label>
              <Textarea
                placeholder="Explain why you are rejecting this request..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-24 mt-2"
                data-testid="input-reject-reason"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason}>
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
