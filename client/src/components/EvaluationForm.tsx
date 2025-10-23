import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Save, Send } from "lucide-react";

interface EvaluationCriterion {
  id: string;
  name: string;
  description: string;
  maxScore: number;
}

interface EvaluationFormProps {
  projectTitle: string;
  criteria: EvaluationCriterion[];
  onSaveDraft: (data: any) => void;
  onSubmit: (data: any) => void;
}

export function EvaluationForm({ projectTitle, criteria, onSaveDraft, onSubmit }: EvaluationFormProps) {
  const [scores, setScores] = useState<Record<string, number>>(
    criteria.reduce((acc, c) => ({ ...acc, [c.id]: c.maxScore / 2 }), {})
  );
  const [comments, setComments] = useState<Record<string, string>>({});
  const [overallComments, setOverallComments] = useState("");

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const maxTotalScore = criteria.reduce((sum, c) => sum + c.maxScore, 0);

  return (
    <Card className="p-6" data-testid="form-evaluation">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Evaluation Form</h3>
        <p className="text-muted-foreground">{projectTitle}</p>
      </div>

      <div className="space-y-6">
        {criteria.map((criterion) => (
          <div key={criterion.id} className="space-y-3 p-4 bg-card rounded-lg border">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label className="text-base font-semibold">{criterion.name}</Label>
                <p className="text-sm text-muted-foreground mt-1">{criterion.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">
                  {scores[criterion.id]?.toFixed(1) || 0}
                </span>
                <span className="text-muted-foreground">/{criterion.maxScore}</span>
              </div>
            </div>

            <Slider
              value={[scores[criterion.id] || 0]}
              onValueChange={([value]) => setScores({ ...scores, [criterion.id]: value })}
              max={criterion.maxScore}
              step={0.5}
              className="py-2"
              data-testid={`slider-${criterion.id}`}
            />

            <Textarea
              placeholder="Comments for this criterion..."
              value={comments[criterion.id] || ""}
              onChange={(e) => setComments({ ...comments, [criterion.id]: e.target.value })}
              className="min-h-20"
              data-testid={`input-comment-${criterion.id}`}
            />
          </div>
        ))}

        <div className="space-y-3">
          <Label className="text-base font-semibold">Overall Comments</Label>
          <Textarea
            placeholder="Provide overall feedback and recommendations..."
            value={overallComments}
            onChange={(e) => setOverallComments(e.target.value)}
            className="min-h-32"
            data-testid="input-overall-comments"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
          <span className="font-semibold">Total Score</span>
          <span className="text-3xl font-bold text-primary">
            {totalScore.toFixed(1)} / {maxTotalScore}
          </span>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onSaveDraft({ scores, comments, overallComments })} data-testid="button-save-draft">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => onSubmit({ scores, comments, overallComments })} className="flex-1" data-testid="button-submit-evaluation">
            <Send className="h-4 w-4 mr-2" />
            Submit Evaluation
          </Button>
        </div>
      </div>
    </Card>
  );
}
