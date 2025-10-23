import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Calendar, Settings, Mail, Database, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SystemSettings() {
  const { toast } = useToast();
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const [deadlines, setDeadlines] = useState({
    proposalSubmission: "2025-10-31",
    literatureReview: "2025-11-15",
    midtermPresentation: "2025-12-15",
    finalSubmission: "2026-01-31",
    defenseSchedule: "2026-02-15",
  });

  const [constraints, setConstraints] = useState({
    maxStudentsPerSupervisor: "8",
    minPanelMembers: "3",
    maxPanelMembers: "5",
    minGapBetweenDefenses: "30",
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup Created",
      description: "Database backup has been created successfully",
    });
    setShowBackupModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">System Settings</h1>
          <p className="text-muted-foreground">Configure system parameters and preferences</p>
        </div>
        <Button onClick={handleSaveSettings} data-testid="button-save-settings">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="deadlines" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="deadlines" data-testid="tab-deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="constraints" data-testid="tab-constraints">Constraints</TabsTrigger>
          <TabsTrigger value="roles" data-testid="tab-roles">Roles</TabsTrigger>
          <TabsTrigger value="rubrics" data-testid="tab-rubrics">Rubrics</TabsTrigger>
          <TabsTrigger value="templates" data-testid="tab-templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="deadlines" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Important Deadlines</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Proposal Submission Deadline</Label>
                  <Input
                    type="date"
                    value={deadlines.proposalSubmission}
                    onChange={(e) => setDeadlines({...deadlines, proposalSubmission: e.target.value})}
                    className="mt-2"
                    data-testid="input-deadline-proposal"
                  />
                </div>
                <div>
                  <Label>Literature Review Deadline</Label>
                  <Input
                    type="date"
                    value={deadlines.literatureReview}
                    onChange={(e) => setDeadlines({...deadlines, literatureReview: e.target.value})}
                    className="mt-2"
                    data-testid="input-deadline-literature"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Midterm Presentation Deadline</Label>
                  <Input
                    type="date"
                    value={deadlines.midtermPresentation}
                    onChange={(e) => setDeadlines({...deadlines, midtermPresentation: e.target.value})}
                    className="mt-2"
                    data-testid="input-deadline-midterm"
                  />
                </div>
                <div>
                  <Label>Final Submission Deadline</Label>
                  <Input
                    type="date"
                    value={deadlines.finalSubmission}
                    onChange={(e) => setDeadlines({...deadlines, finalSubmission: e.target.value})}
                    className="mt-2"
                    data-testid="input-deadline-final"
                  />
                </div>
              </div>
              <div>
                <Label>Defense Schedule Announcement</Label>
                <Input
                  type="date"
                  value={deadlines.defenseSchedule}
                  onChange={(e) => setDeadlines({...deadlines, defenseSchedule: e.target.value})}
                  className="mt-2"
                  data-testid="input-deadline-defense"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="constraints" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">System Constraints</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Maximum Students per Supervisor</Label>
                  <Input
                    type="number"
                    value={constraints.maxStudentsPerSupervisor}
                    onChange={(e) => setConstraints({...constraints, maxStudentsPerSupervisor: e.target.value})}
                    className="mt-2"
                    data-testid="input-max-students"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum number of students a faculty can supervise simultaneously
                  </p>
                </div>
                <div>
                  <Label>Minimum Panel Members</Label>
                  <Input
                    type="number"
                    value={constraints.minPanelMembers}
                    onChange={(e) => setConstraints({...constraints, minPanelMembers: e.target.value})}
                    className="mt-2"
                    data-testid="input-min-panel"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum number of faculty required in an evaluation panel
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Maximum Panel Members</Label>
                  <Input
                    type="number"
                    value={constraints.maxPanelMembers}
                    onChange={(e) => setConstraints({...constraints, maxPanelMembers: e.target.value})}
                    className="mt-2"
                    data-testid="input-max-panel"
                  />
                </div>
                <div>
                  <Label>Minimum Gap Between Defenses (minutes)</Label>
                  <Input
                    type="number"
                    value={constraints.minGapBetweenDefenses}
                    onChange={(e) => setConstraints({...constraints, minGapBetweenDefenses: e.target.value})}
                    className="mt-2"
                    data-testid="input-gap-defenses"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum time gap between consecutive defenses
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Role Permissions</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Student Role</h4>
                <div className="space-y-2 pl-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Submit projects
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    View recommendations
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Form teams
                  </label>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Faculty Role</h4>
                <div className="space-y-2 pl-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Review projects
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Submit evaluations
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Manage supervised projects
                  </label>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Committee Role</h4>
                <div className="space-y-2 pl-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Generate panels
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Manage faculty
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    Configure system settings
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="rubrics" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Evaluation Rubrics</h3>
              <Button variant="outline" size="sm">Add Criterion</Button>
            </div>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Technical Implementation</h4>
                  <span className="text-sm text-muted-foreground">40%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Quality of code, architecture, and technical execution
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Innovation & Creativity</h4>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Originality and innovative approach to problem-solving
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Presentation & Documentation</h4>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Quality of presentation, documentation, and communication
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Project Completion</h4>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Completeness and functionality of deliverables
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Email Templates</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Project Approval Email</Label>
                <Textarea
                  className="mt-2 min-h-32"
                  defaultValue="Dear {student_name}, Your project '{project_title}' has been approved..."
                  data-testid="input-template-approval"
                />
              </div>
              <div>
                <Label>Defense Notification Email</Label>
                <Textarea
                  className="mt-2 min-h-32"
                  defaultValue="Dear {student_name}, Your FYP defense is scheduled for {date} at {time}..."
                  data-testid="input-template-defense"
                />
              </div>
              <div>
                <Label>Panel Assignment Email</Label>
                <Textarea
                  className="mt-2 min-h-32"
                  defaultValue="Dear Dr. {faculty_name}, You have been assigned to evaluate '{project_title}'..."
                  data-testid="input-template-panel"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Database Management</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowBackupModal(true)} data-testid="button-backup">
            <Database className="h-4 w-4 mr-2" />
            Backup Database
          </Button>
          <Button variant="outline" onClick={() => setShowResetModal(true)} data-testid="button-reset">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </Card>

      <Dialog open={showBackupModal} onOpenChange={setShowBackupModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backup Database</DialogTitle>
            <DialogDescription>Create a backup of all system data</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will create a complete backup of all projects, users, and system settings.
              The backup file will be downloaded to your computer.
            </p>
            <div>
              <Label>Backup Name</Label>
              <Input className="mt-2" placeholder="backup-2025-11-10" data-testid="input-backup-name" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleBackup} data-testid="button-confirm-backup">
              Create Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset to Defaults</DialogTitle>
            <DialogDescription>This will reset all settings to default values</DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm font-semibold text-destructive">Warning: This action cannot be undone</p>
            <p className="text-sm text-muted-foreground mt-1">
              All custom settings will be lost and replaced with default values.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              toast({ title: "Settings Reset", description: "All settings have been reset to defaults" });
              setShowResetModal(false);
            }}>
              Reset Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
