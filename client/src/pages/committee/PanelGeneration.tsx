import { PanelGenerationModal } from "@/components/modals/PanelGenerationModal";
import { PanelCard } from "@/components/PanelCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PanelTop, Settings, Download, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PanelGeneration() {
  const { toast } = useToast();
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [panels, setPanels] = useState<any[]>([]);

  const handleGenerate = () => {
    const generatedPanels = [
      {
        id: "1",
        projectTitle: "AI-Powered Student Performance Predictor",
        studentName: "John Doe",
        date: "Nov 15, 2025",
        time: "10:00 AM",
        location: "Room 401, CS Building",
        status: "scheduled" as const,
        panelMembers: [
          { name: "Dr. Sarah Ahmed", role: "Chair" },
          { name: "Dr. Muhammad Khan", role: "Examiner" },
          { name: "Dr. Ali Hassan", role: "External" },
        ],
      },
      {
        id: "2",
        projectTitle: "Blockchain Document Verification",
        studentName: "Jane Smith",
        date: "Nov 16, 2025",
        time: "2:00 PM",
        location: "Room 302, CS Building",
        status: "scheduled" as const,
        panelMembers: [
          { name: "Dr. Fatima Tariq", role: "Chair" },
          { name: "Dr. Ahmed Raza", role: "Examiner" },
          { name: "Dr. Hassan Ali", role: "External" },
        ],
      },
    ];
    setPanels(generatedPanels);
    toast({
      title: "Panels Published",
      description: "Evaluation panels have been generated and published",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Panel Generation</h1>
          <p className="text-muted-foreground">Generate and manage evaluation panels</p>
        </div>
        <Button onClick={() => setShowGenerationModal(true)} data-testid="button-generate-panels">
          <PanelTop className="h-4 w-4 mr-2" />
          Generate Panels
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Total Projects</h3>
            <PanelTop className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-2">45</div>
          <p className="text-sm text-muted-foreground">Awaiting panel assignment</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Available Faculty</h3>
            <Settings className="h-5 w-5 text-info" />
          </div>
          <div className="text-3xl font-bold mb-2">18</div>
          <p className="text-sm text-muted-foreground">Ready for assignment</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Generated Panels</h3>
            <Send className="h-5 w-5 text-success" />
          </div>
          <div className="text-3xl font-bold mb-2">{panels.length}</div>
          <p className="text-sm text-muted-foreground">Published and active</p>
        </Card>
      </div>

      {panels.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Generated Panels</h2>
            <div className="flex gap-2">
              <Button variant="outline" data-testid="button-export">
                <Download className="h-4 w-4 mr-2" />
                Export Schedule
              </Button>
              <Button variant="outline" data-testid="button-send-notifications">
                <Send className="h-4 w-4 mr-2" />
                Send Notifications
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {panels.map((panel) => (
              <PanelCard
                key={panel.id}
                {...panel}
                onViewDetails={() => toast({ title: "View Panel Details" })}
              />
            ))}
          </div>
        </>
      )}

      <PanelGenerationModal
        open={showGenerationModal}
        onClose={() => setShowGenerationModal(false)}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
