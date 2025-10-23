import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Lightbulb } from "lucide-react";

interface AcceptabilityScoreModalProps {
  open: boolean;
  onClose: () => void;
  score: number;
  factors: Array<{
    name: string;
    status: "pass" | "fail" | "warning";
    message: string;
  }>;
  suggestions: string[];
}

export function AcceptabilityScoreModal({
  open,
  onClose,
  score,
  factors,
  suggestions,
}: AcceptabilityScoreModalProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "High Likelihood";
    if (score >= 60) return "Moderate Likelihood";
    return "Low Likelihood";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Acceptability Analysis</DialogTitle>
          <DialogDescription>AI-powered prediction based on historical data</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center p-6 bg-card rounded-lg">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>{score}%</div>
            <div className="text-lg font-semibold mb-2">{getScoreLabel(score)}</div>
            <Progress value={score} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">Acceptance Probability</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Evaluation Factors</h4>
            <div className="space-y-3">
              {factors.map((factor, idx) => {
                const Icon = factor.status === "pass" ? CheckCircle : factor.status === "fail" ? XCircle : AlertCircle;
                const color = factor.status === "pass" ? "text-success" : factor.status === "fail" ? "text-destructive" : "text-warning";
                
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-card rounded-lg">
                    <Icon className={`h-5 w-5 mt-0.5 ${color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{factor.name}</span>
                        <Badge variant={factor.status === "pass" ? "default" : "outline"} className="text-xs">
                          {factor.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{factor.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {suggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-warning" />
                <h4 className="font-semibold">Improvement Suggestions</h4>
              </div>
              <ul className="space-y-2">
                {suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2 p-2 bg-card rounded">
                    <span className="text-primary font-bold">{idx + 1}.</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
