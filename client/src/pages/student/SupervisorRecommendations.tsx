import { SupervisorRecommendationCard } from "@/components/SupervisorRecommendationCard";
import { SupervisorProfileModal } from "@/components/modals/SupervisorProfileModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Search, SlidersHorizontal, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function SupervisorRecommendations() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedSupervisor, setSelectedSupervisor] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("match");
  const [projectKeywords, setProjectKeywords] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [selectedForRequest, setSelectedForRequest] = useState<any>(null);

  const { data: recommendations, isLoading, refetch } = useQuery({
    queryKey: ["/api/recommendations", { keywords: projectKeywords }],
    enabled: !!projectKeywords,
    queryFn: async () => {
      const response = await fetch(`/api/recommendations?projectKeywords=${encodeURIComponent(projectKeywords)}`);
      if (!response.ok) throw new Error("Failed to fetch recommendations");
      return response.json();
    },
  });

  const { data: facultyProfiles, isLoading: loadingFaculty } = useQuery({
    queryKey: ["/api/faculty-profiles"],
  });

  const sendRequestMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/supervisor-requests", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Request Sent",
        description: `Your supervision request has been sent successfully`,
      });
      setShowRequestModal(false);
      setRequestMessage("");
      setSelectedForRequest(null);
      queryClient.invalidateQueries({ queryKey: ["/api/supervisor-requests"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send request",
        variant: "destructive",
      });
    },
  });

  const displayProfiles = recommendations || facultyProfiles || [];

  const filteredSupervisors = displayProfiles
    .filter((profile: any) =>
      profile.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.expertise?.some((e: string) => e.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a: any, b: any) => {
      if (sortBy === "match") return (b.matchScore || 50) - (a.matchScore || 50);
      if (sortBy === "success") return (b.successRate || 0) - (a.successRate || 0);
      return 0;
    });

  const handleSendRequest = (profile: any) => {
    setSelectedForRequest(profile);
    setShowRequestModal(true);
  };

  const submitRequest = () => {
    if (!selectedForRequest || !user) return;

    sendRequestMutation.mutate({
      studentId: user.id,
      facultyId: selectedForRequest.userId,
      projectId: "temp-project-id",
      status: "pending",
      message: requestMessage,
      matchScore: selectedForRequest.matchScore || 0,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Supervisor Recommendations</h1>
        <p className="text-muted-foreground">AI-powered matching based on your project requirements</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-supervisors"
          />
        </div>
        <Input
          placeholder="Enter project keywords (comma-separated)"
          value={projectKeywords}
          onChange={(e) => setProjectKeywords(e.target.value)}
          className="flex-1"
          data-testid="input-project-keywords"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-sort">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Match Score</SelectItem>
            <SelectItem value="success">Success Rate</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => refetch()} data-testid="button-refresh">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {isLoading || loadingFaculty ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : filteredSupervisors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSupervisors.map((profile: any) => (
            <SupervisorRecommendationCard
              key={profile.id}
              name={profile.user?.fullName || "Unknown"}
              department={profile.user?.department || "N/A"}
              expertise={profile.expertise || []}
              matchScore={profile.matchScore || 50}
              successRate={profile.successRate || 0}
              projectsSupervised={profile.currentStudents || 0}
              onViewProfile={() => setSelectedSupervisor(profile)}
              onSendRequest={() => handleSendRequest(profile)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {projectKeywords
              ? "No matching supervisors found. Try different keywords."
              : "Enter project keywords to get AI-powered recommendations."}
          </p>
        </div>
      )}

      <SupervisorProfileModal
        open={!!selectedSupervisor}
        onClose={() => setSelectedSupervisor(null)}
        supervisor={selectedSupervisor}
        onSendRequest={() => {
          handleSendRequest(selectedSupervisor);
          setSelectedSupervisor(null);
        }}
      />

      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent data-testid="modal-send-request">
          <DialogHeader>
            <DialogTitle>Send Supervisor Request</DialogTitle>
            <DialogDescription>
              Send a supervision request to {selectedForRequest?.user?.fullName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                data-testid="input-request-message"
                placeholder="Explain why you'd like this supervisor..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestModal(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button
              onClick={submitRequest}
              disabled={sendRequestMutation.isPending}
              data-testid="button-send-request"
            >
              {sendRequestMutation.isPending ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
