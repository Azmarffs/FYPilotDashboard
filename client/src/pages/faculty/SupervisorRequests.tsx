import { RequestCard } from "@/components/RequestCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
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
  const { user } = useAuth();
  const [filter, setFilter] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const { data: requests, isLoading } = useQuery({
    queryKey: ["/api/supervisor-requests", { facultyId: user?.id }],
    enabled: !!user,
    queryFn: async () => {
      const response = await fetch(`/api/supervisor-requests?facultyId=${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch requests");
      return response.json();
    },
  });

  const updateRequestMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest(`/api/supervisor-requests/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/supervisor-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
  });

  const filteredRequests = requests?.filter((r: any) => 
    filter === "all" || r.status === filter
  ) || [];

  const handleApprove = (id: string) => {
    updateRequestMutation.mutate({ id, status: "accepted" });
    toast({
      title: "Request Approved",
      description: "You are now supervising this project",
    });
  };

  const handleReject = () => {
    if (selectedRequest) {
      updateRequestMutation.mutate({ id: selectedRequest.id, status: "rejected" });
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
          <SelectItem value="accepted">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequests.map((request: any) => (
            <RequestCard
              key={request.id}
              studentName={request.student?.fullName || "Unknown"}
              studentId={request.student?.rollNumber || "N/A"}
              projectTitle={request.project?.title || "Unknown Project"}
              projectDescription={request.project?.description || "No description"}
              requestDate={new Date(request.createdAt).toLocaleDateString()}
              status={request.status}
              onApprove={() => handleApprove(request.id)}
              onReject={() => {
                setSelectedRequest(request);
                setShowRejectModal(true);
              }}
              onViewDetails={() => setSelectedRequest(request)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No {filter !== "all" ? filter : ""} requests found</p>
        </div>
      )}

      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent data-testid="modal-reject-request">
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
            <Button variant="outline" onClick={() => setShowRejectModal(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason} data-testid="button-confirm-reject">
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
