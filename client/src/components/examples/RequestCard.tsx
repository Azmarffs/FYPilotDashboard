import { RequestCard } from "../RequestCard";

export default function RequestCardExample() {
  const requests = [
    {
      studentName: "Ahmed Ali",
      studentId: "22I-1234",
      projectTitle: "Smart Campus Navigation System",
      projectDescription: "An AR-based indoor navigation system using computer vision and sensor fusion to guide students across campus facilities.",
      requestDate: "Oct 20, 2025",
      status: "pending" as const,
    },
    {
      studentName: "Sara Khan",
      studentId: "22I-5678",
      projectTitle: "E-Learning Analytics Platform",
      projectDescription: "A comprehensive analytics dashboard for tracking student engagement and performance in online learning environments.",
      requestDate: "Oct 18, 2025",
      status: "approved" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {requests.map((request) => (
        <RequestCard
          key={request.studentId}
          {...request}
          onApprove={() => console.log("Approving request from", request.studentName)}
          onReject={() => console.log("Rejecting request from", request.studentName)}
          onViewDetails={() => console.log("Viewing details for", request.studentName)}
        />
      ))}
    </div>
  );
}
