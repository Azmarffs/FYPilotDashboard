import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DuplicateDetectionModalProps {
  open: boolean;
  onClose: () => void;
  currentProject: {
    title: string;
    description: string;
  };
  similarProjects: Array<{
    id: string;
    title: string;
    description: string;
    similarity: number;
    submittedBy: string;
    status: string;
  }>;
  onContinueAnyway: () => void;
  onModifyProject: () => void;
}

export function DuplicateDetectionModal({
  open,
  onClose,
  currentProject,
  similarProjects,
  onContinueAnyway,
  onModifyProject,
}: DuplicateDetectionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-warning" />
            <DialogTitle>Similar Projects Detected</DialogTitle>
          </div>
          <DialogDescription>
            We found {similarProjects.length} project{similarProjects.length !== 1 ? "s" : ""} with similar content. Please review before submitting.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Your Project</h4>
            <Card className="p-4 bg-primary/5 border-primary/20">
              <h5 className="font-semibold">{currentProject.title}</h5>
              <p className="text-sm text-muted-foreground mt-1">{currentProject.description}</p>
            </Card>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Similar Projects Found</h4>
            <div className="space-y-3">
              {similarProjects.map((project) => (
                <Card key={project.id} className="p-4 hover-elevate">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-semibold">{project.title}</h5>
                        <Badge variant="outline" className="text-xs">
                          {project.similarity}% similar
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Submitted by: {project.submittedBy}</span>
                        <span>Status: {project.status}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" data-testid={`button-view-similar-${project.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onModifyProject} data-testid="button-modify-project">
            Modify Project
          </Button>
          <Button variant="outline" onClick={onClose} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={onContinueAnyway} data-testid="button-continue-anyway">
            Continue Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
