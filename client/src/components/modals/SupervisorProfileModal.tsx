import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, Award, BookOpen, TrendingUp } from "lucide-react";

interface SupervisorProfileModalProps {
  open: boolean;
  onClose: () => void;
  supervisor: {
    name: string;
    department: string;
    expertise: string[];
    matchScore: number;
    successRate: number;
    projectsSupervised: number;
    researchAreas: string[];
    publications: number;
    pastProjects: string[];
  };
}

export function SupervisorProfileModal({ open, onClose, supervisor }: SupervisorProfileModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Supervisor Profile</DialogTitle>
          <DialogDescription>Detailed information and statistics</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {supervisor.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{supervisor.name}</h3>
              <p className="text-muted-foreground">{supervisor.department}</p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="text-xl font-bold text-primary">{supervisor.matchScore}%</span>
                <span className="text-sm text-muted-foreground">Match Score</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-card rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold">{supervisor.successRate}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{supervisor.projectsSupervised}</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-info" />
              <div className="text-2xl font-bold">{supervisor.publications}</div>
              <div className="text-sm text-muted-foreground">Publications</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {supervisor.expertise.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Research Areas</h4>
            <div className="flex flex-wrap gap-2">
              {supervisor.researchAreas.map((area) => (
                <Badge key={area} variant="outline">{area}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Past Successful Projects</h4>
            <ul className="space-y-2">
              {supervisor.pastProjects.map((project, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{project}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
