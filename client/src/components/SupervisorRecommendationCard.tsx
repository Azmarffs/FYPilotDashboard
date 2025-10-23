import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Send, Bookmark, Info } from "lucide-react";
import { useState } from "react";

interface SupervisorRecommendationCardProps {
  name: string;
  department: string;
  expertise: string[];
  matchScore: number;
  successRate: number;
  projectsSupervised: number;
  onSendRequest: () => void;
  onViewProfile: () => void;
}

export function SupervisorRecommendationCard({
  name,
  department,
  expertise,
  matchScore,
  successRate,
  projectsSupervised,
  onSendRequest,
  onViewProfile,
}: SupervisorRecommendationCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card className="p-6 hover-elevate" data-testid={`card-supervisor-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg bg-primary/10 text-primary">
            {name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-lg" data-testid={`text-supervisor-name-${name.toLowerCase().replace(/\s+/g, "-")}`}>{name}</h3>
              <p className="text-sm text-muted-foreground">{department}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-2xl font-bold text-primary" data-testid={`text-match-score-${name.toLowerCase().replace(/\s+/g, "-")}`}>{matchScore}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Match Score</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {expertise.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {expertise.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{expertise.length - 3} more
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-lg font-semibold">{successRate}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Projects Supervised</p>
              <p className="text-lg font-semibold">{projectsSupervised}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onSendRequest}
              className="flex-1"
              data-testid={`button-send-request-${name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Request
            </Button>
            <Button
              variant="outline"
              onClick={onViewProfile}
              data-testid={`button-view-profile-${name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Info className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              data-testid={`button-save-supervisor-${name.toLowerCase().replace(/\s+/g, "-")}`}
              className={isSaved ? "text-warning" : ""}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-warning" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
