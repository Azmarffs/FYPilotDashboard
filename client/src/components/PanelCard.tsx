import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MapPin, Users, Eye } from "lucide-react";

interface PanelMember {
  name: string;
  role: string;
}

interface PanelCardProps {
  projectTitle: string;
  studentName: string;
  date: string;
  time: string;
  location: string;
  panelMembers: PanelMember[];
  status: "scheduled" | "completed" | "pending";
  onViewDetails: () => void;
}

export function PanelCard({
  projectTitle,
  studentName,
  date,
  time,
  location,
  panelMembers,
  status,
  onViewDetails,
}: PanelCardProps) {
  const statusColors = {
    scheduled: "bg-info/10 text-info border-info/20",
    completed: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <Card className="p-6 hover-elevate" data-testid={`card-panel-${projectTitle.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{projectTitle}</h3>
          <p className="text-sm text-muted-foreground">Presented by: {studentName}</p>
        </div>
        <Badge className={`${statusColors[status]} capitalize`}>{status}</Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{date} at {time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{location}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Panel Members</span>
        </div>
        <div className="space-y-2">
          {panelMembers.map((member, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={onViewDetails} className="w-full" data-testid="button-view-panel-details">
        <Eye className="h-4 w-4 mr-2" />
        View Details
      </Button>
    </Card>
  );
}
