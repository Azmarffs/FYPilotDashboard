import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Upload, X, UserPlus, AlertCircle, Save, Send } from "lucide-react";

interface ProjectSubmissionFormProps {
  onCheckDuplicates: (title: string, description: string) => void;
  onSubmit: (data: any) => void;
  onSaveDraft: (data: any) => void;
}

export function ProjectSubmissionForm({ onCheckDuplicates, onSubmit, onSaveDraft }: ProjectSubmissionFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState<string[]>(["John Doe"]);
  const [documents, setDocuments] = useState<string[]>([]);

  const handleCheckDuplicates = () => {
    if (title && description) {
      onCheckDuplicates(title, description);
    }
  };

  return (
    <Card className="p-6" data-testid="form-project-submission">
      <h3 className="text-2xl font-bold mb-6">Submit New Project</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project-title">Project Title *</Label>
          <Input
            id="project-title"
            placeholder="Enter your project title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="input-project-title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-description">Project Description *</Label>
          <Textarea
            id="project-description"
            placeholder="Provide a detailed description of your project, including objectives, methodology, and expected outcomes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-32"
            data-testid="input-project-description"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleCheckDuplicates}
            disabled={!title || !description}
            data-testid="button-check-duplicates"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Check for Duplicates
          </Button>
        </div>

        <div className="space-y-3">
          <Label>Team Members</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {teamMembers.map((member, idx) => (
              <Badge key={idx} variant="secondary" className="text-sm px-3 py-1.5">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {member.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {member}
                {idx > 0 && (
                  <button
                    onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== idx))}
                    className="ml-2 hover:text-destructive"
                    data-testid={`button-remove-member-${idx}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm" data-testid="button-add-member">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        <div className="space-y-3">
          <Label>Supporting Documents</Label>
          {documents.length > 0 && (
            <div className="space-y-2 mb-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-card rounded border">
                  <span className="text-sm">{doc}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDocuments(documents.filter((_, i) => i !== idx))}
                    data-testid={`button-remove-doc-${idx}`}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDocuments([...documents, `Document_${documents.length + 1}.pdf`])}
            data-testid="button-upload-document"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onSaveDraft({ title, description, teamMembers, documents })}
            data-testid="button-save-draft"
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button
            onClick={() => onSubmit({ title, description, teamMembers, documents })}
            className="flex-1"
            disabled={!title || !description}
            data-testid="button-submit-project"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Project
          </Button>
        </div>
      </div>
    </Card>
  );
}
