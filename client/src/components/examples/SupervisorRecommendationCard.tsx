import { SupervisorRecommendationCard } from "../SupervisorRecommendationCard";

export default function SupervisorRecommendationCardExample() {
  const supervisors = [
    {
      name: "Dr. Sarah Ahmed",
      department: "Computer Science",
      expertise: ["Machine Learning", "AI", "Data Science", "Neural Networks"],
      matchScore: 95,
      successRate: 92,
      projectsSupervised: 24,
    },
    {
      name: "Dr. Muhammad Khan",
      department: "Software Engineering",
      expertise: ["Web Development", "Cloud Computing", "DevOps"],
      matchScore: 88,
      successRate: 87,
      projectsSupervised: 18,
    },
  ];

  return (
    <div className="space-y-4 p-6">
      {supervisors.map((supervisor) => (
        <SupervisorRecommendationCard
          key={supervisor.name}
          {...supervisor}
          onSendRequest={() => console.log("Request sent to", supervisor.name)}
          onViewProfile={() => console.log("Viewing profile of", supervisor.name)}
        />
      ))}
    </div>
  );
}
