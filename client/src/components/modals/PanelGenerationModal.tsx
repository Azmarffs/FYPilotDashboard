import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, Settings } from "lucide-react";
import { useState } from "react";

interface PanelGenerationModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: () => void;
}

export function PanelGenerationModal({ open, onClose, onGenerate }: PanelGenerationModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string>("");
  const [completed, setCompleted] = useState(false);

  const startGeneration = () => {
    setIsGenerating(true);
    setProgress(0);
    setCompleted(false);

    const stages = [
      { label: "Analyzing project requirements...", duration: 1000 },
      { label: "Matching faculty expertise...", duration: 1500 },
      { label: "Optimizing panel assignments...", duration: 2000 },
      { label: "Resolving conflicts...", duration: 1200 },
      { label: "Finalizing panels...", duration: 800 },
    ];

    let currentProgress = 0;
    let stageIndex = 0;

    const runStage = () => {
      if (stageIndex < stages.length) {
        setStage(stages[stageIndex].label);
        const increment = 100 / stages.length;
        
        setTimeout(() => {
          currentProgress += increment;
          setProgress(currentProgress);
          stageIndex++;
          runStage();
        }, stages[stageIndex].duration);
      } else {
        setIsGenerating(false);
        setCompleted(true);
      }
    };

    runStage();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Panel Generation</DialogTitle>
          <DialogDescription>
            {!isGenerating && !completed && "Configure and generate evaluation panels automatically"}
            {isGenerating && "Generating optimal panel assignments..."}
            {completed && "Panel generation completed successfully"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!isGenerating && !completed && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <div className="p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Available Faculty</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Panel Size</span>
                  <Badge>3 members</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Constraint Optimization</span>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Expertise Matching</span>
                  <Badge variant="outline">AI-Powered</Badge>
                </div>
              </div>
            </div>
          )}

          {(isGenerating || completed) && (
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              
              {isGenerating && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{stage}</span>
                </div>
              )}

              {completed && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Generation Complete!</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-success/10 rounded-lg text-center">
                      <div className="text-2xl font-bold text-success">45</div>
                      <div className="text-xs text-muted-foreground">Panels Created</div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">96%</div>
                      <div className="text-xs text-muted-foreground">Match Score</div>
                    </div>
                    <div className="p-3 bg-info/10 rounded-lg text-center">
                      <div className="text-2xl font-bold text-info">0</div>
                      <div className="text-xs text-muted-foreground">Conflicts</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {!isGenerating && !completed && (
            <>
              <Button variant="outline" onClick={onClose} data-testid="button-cancel">
                Cancel
              </Button>
              <Button variant="outline" data-testid="button-configure">
                <Settings className="h-4 w-4 mr-2" />
                Configure Constraints
              </Button>
              <Button onClick={startGeneration} data-testid="button-generate-panels">
                Generate Panels
              </Button>
            </>
          )}
          {completed && (
            <>
              <Button variant="outline" onClick={() => console.log("Preview panels")} data-testid="button-preview">
                Preview Panels
              </Button>
              <Button onClick={() => {
                onGenerate();
                onClose();
              }} data-testid="button-publish">
                Publish Panels
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
