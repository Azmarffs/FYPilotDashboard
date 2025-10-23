import { ProjectCard } from "../ProjectCard";

export default function ProjectCardExample() {
  const projects = [
    {
      title: "AI-Powered Student Performance Predictor",
      description: "A machine learning system that analyzes student data to predict academic performance and identify at-risk students early.",
      status: "approved" as const,
      supervisor: "Dr. Sarah Ahmed",
      teamMembers: ["John Doe", "Jane Smith", "Ali Hassan"],
      submittedDate: "Oct 15, 2025",
    },
    {
      title: "Blockchain-based Document Verification",
      description: "Decentralized system for verifying academic credentials using blockchain technology.",
      status: "in-progress" as const,
      supervisor: "Dr. Muhammad Khan",
      teamMembers: ["Ahmed Ali", "Sara Khan"],
      submittedDate: "Sep 28, 2025",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          {...project}
          onView={() => console.log("Viewing", project.title)}
          onEdit={() => console.log("Editing", project.title)}
          onDelete={() => console.log("Deleting", project.title)}
        />
      ))}
    </div>
  );
}
