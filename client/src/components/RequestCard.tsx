import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, FileText, Check, X, Info } from "lucide-react";

interface RequestCardProps {
  studentName: string;
  studentId: string;
  projectTitle: string;
  projectDescription: string;
  requestDate: string;
  status?: "pending" | "approved" | "rejected";
  onApprove: () => void;
  onReject: () => void;
  onViewDetails: () => void;
}

export function RequestCard({
  studentName,
  studentId,
  projectTitle,
  projectDescription,
  requestDate,
  status = "pending",
  onApprove,
  onReject,
  onViewDetails,
}: RequestCardProps) {
  return (
    <Card className="p-6 hover-elevate" data-testid={`card-request-${studentId}`}>
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-primary">
            {studentName.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-semibold">{studentName}</h3>
              <p className="text-sm text-muted-foreground">{studentId}</p>
            </div>
            {status !== "pending" && (
              <Badge variant={status === "approved" ? "default" : "destructive"} className="capitalize">
                {status}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">Project Title</span>
          </div>
          <p className="text-sm pl-6">{projectTitle}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground line-clamp-2 pl-6">{projectDescription}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground pl-6">
          <Clock className="h-4 w-4" />
          <span>Requested on {requestDate}</span>
        </div>
      </div>

      {status === "pending" ? (
        <div className="flex gap-2">
          <Button variant="outline" onClick={onViewDetails} data-testid={`button-view-request-${studentId}`}>
            <Info className="h-4 w-4 mr-2" />
            Details
          </Button>
          <Button onClick={onApprove} className="flex-1" data-testid={`button-approve-${studentId}`}>
            <Check className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button variant="destructive" onClick={onReject} data-testid={`button-reject-${studentId}`}>
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      ) : (
        <Button variant="outline" onClick={onViewDetails} className="w-full" data-testid={`button-view-request-${studentId}`}>
          <Info className="h-4 w-4 mr-2" />
          View Details
        </Button>
      )}
    </Card>
  );
}
