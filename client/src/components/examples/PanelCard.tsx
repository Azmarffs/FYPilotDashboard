import { PanelCard } from "../PanelCard";

export default function PanelCardExample() {
  const panels = [
    {
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
      projectTitle: "Blockchain Document Verification",
      studentName: "Jane Smith",
      date: "Nov 16, 2025",
      time: "2:00 PM",
      location: "Room 302, CS Building",
      status: "pending" as const,
      panelMembers: [
        { name: "Dr. Fatima Tariq", role: "Chair" },
        { name: "Dr. Ahmed Raza", role: "Examiner" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {panels.map((panel) => (
        <PanelCard
          key={panel.projectTitle}
          {...panel}
          onViewDetails={() => console.log("Viewing panel details for", panel.projectTitle)}
        />
      ))}
    </div>
  );
}
