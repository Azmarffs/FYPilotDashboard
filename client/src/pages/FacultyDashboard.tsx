import { StatCard } from "@/components/StatCard";
import { RequestCard } from "@/components/RequestCard";
import { PanelCard } from "@/components/PanelCard";
import { Users, Clock, CheckCircle, Calendar } from "lucide-react";

export default function FacultyDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Manage supervision requests and evaluation schedules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Supervised Projects" value="8" icon={Users} description="Currently supervising" />
        <StatCard title="Pending Requests" value="3" icon={Clock} description="Awaiting response" />
        <StatCard title="Evaluations" value="2" icon={CheckCircle} description="This week" />
        <StatCard title="Panel Assignments" value="5" icon={Calendar} description="Upcoming" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Pending Supervision Requests</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RequestCard
            studentName="Ahmed Ali"
            studentId="22I-1234"
            projectTitle="Smart Campus Navigation System"
            projectDescription="An AR-based indoor navigation system using computer vision and sensor fusion."
            requestDate="Oct 20, 2025"
            onApprove={() => console.log("Approved")}
            onReject={() => console.log("Rejected")}
            onViewDetails={() => console.log("View details")}
          />
          <RequestCard
            studentName="Sara Khan"
            studentId="22I-5678"
            projectTitle="E-Learning Analytics Platform"
            projectDescription="A comprehensive analytics dashboard for tracking student engagement."
            requestDate="Oct 18, 2025"
            onApprove={() => console.log("Approved")}
            onReject={() => console.log("Rejected")}
            onViewDetails={() => console.log("View details")}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Upcoming Panel Assignments</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PanelCard
            projectTitle="AI-Powered Student Predictor"
            studentName="John Doe"
            date="Nov 15, 2025"
            time="10:00 AM"
            location="Room 401, CS Building"
            status="scheduled"
            panelMembers={[
              { name: "Dr. Sarah Ahmed", role: "Chair" },
              { name: "Dr. Muhammad Khan", role: "Examiner" },
              { name: "Dr. Ali Hassan", role: "External" },
            ]}
            onViewDetails={() => console.log("View panel details")}
          />
        </div>
      </div>
    </div>
  );
}
