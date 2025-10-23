import { AcceptabilityScoreModal } from "../modals/AcceptabilityScoreModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AcceptabilityScoreModalExample() {
  const [open, setOpen] = useState(false);

  const factors = [
    {
      name: "Technical Feasibility",
      status: "pass" as const,
      message: "Project scope is technically achievable within the given timeframe",
    },
    {
      name: "Innovation Level",
      status: "pass" as const,
      message: "Demonstrates significant innovation and originality",
    },
    {
      name: "Resource Requirements",
      status: "warning" as const,
      message: "May require additional hardware resources - consider optimization",
    },
    {
      name: "Team Composition",
      status: "pass" as const,
      message: "Team has complementary skills for project requirements",
    },
  ];

  const suggestions = [
    "Include more specific technical implementation details in your proposal",
    "Add a detailed timeline with milestones and deliverables",
    "Consider using cloud resources instead of specialized hardware to reduce costs",
  ];

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>View Acceptability Score</Button>
      <AcceptabilityScoreModal
        open={open}
        onClose={() => setOpen(false)}
        score={82}
        factors={factors}
        suggestions={suggestions}
      />
    </div>
  );
}
