import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, User, Eye, Edit, Trash2, MessageSquare } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  status: "draft" | "pending" | "approved" | "rejected" | "in-progress" | "completed";
  supervisor?: string;
  teamMembers: string[];
  submittedDate?: string;
  onView: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProjectCard({
  title,
  description,
  status,
  supervisor,
  teamMembers,
  submittedDate,
  onView,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const statusColors = {
    draft: "bg-muted text-muted-foreground",
    pending: "bg-warning/10 text-warning border-warning/20",
    approved: "bg-success/10 text-success border-success/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
    "in-progress": "bg-info/10 text-info border-info/20",
    completed: "bg-success/10 text-success border-success/20",
  };

  return (
    <Card className="p-6 hover-elevate" data-testid={`card-project-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2" data-testid={`text-project-title-${title.toLowerCase().replace(/\s+/g, "-")}`}>{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <Badge className={`${statusColors[status]} capitalize ml-4`} data-testid={`badge-status-${status}`}>
          {status.replace("-", " ")}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        {supervisor && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Supervisor:</span>
            <span className="font-medium">{supervisor}</span>
          </div>
        )}
        
        {submittedDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Submitted:</span>
            <span>{submittedDate}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {teamMembers.slice(0, 3).map((member, idx) => (
              <Avatar key={idx} className="h-8 w-8 border-2 border-card">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {member.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {teamMembers.length} team member{teamMembers.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onView} className="flex-1" data-testid={`button-view-project-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
        {onEdit && (
          <Button variant="outline" onClick={onEdit} data-testid={`button-edit-project-${title.toLowerCase().replace(/\s+/g, "-")}`}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button variant="ghost" onClick={onDelete} data-testid={`button-delete-project-${title.toLowerCase().replace(/\s+/g, "-")}`}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        )}
        <Button variant="ghost" data-testid={`button-contact-supervisor-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
