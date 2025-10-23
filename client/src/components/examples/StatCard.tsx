import { StatCard } from "../StatCard";
import { FileText, Clock, CheckCircle, Users } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <StatCard title="Total Projects" value="24" icon={FileText} trend={{ value: "12% from last month", positive: true }} />
      <StatCard title="Pending Approvals" value="8" icon={Clock} description="Awaiting review" />
      <StatCard title="Completed" value="16" icon={CheckCircle} trend={{ value: "3 this week", positive: true }} />
      <StatCard title="Team Members" value="3" icon={Users} description="Active collaborators" />
    </div>
  );
}
