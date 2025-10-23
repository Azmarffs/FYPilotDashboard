import { StatCard } from "@/components/StatCard";
import { RequestCard } from "@/components/RequestCard";
import { PanelCard } from "@/components/PanelCard";
import { Users, Clock, CheckCircle, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function FacultyDashboard() {
  const { user } = useAuth();

  const { data: requests, isLoading: loadingRequests } = useQuery({
    queryKey: ["/api/supervisor-requests", { facultyId: user?.id }],
    enabled: !!user,
    queryFn: async () => {
      const response = await fetch(`/api/supervisor-requests?facultyId=${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch requests");
      return response.json();
    },
  });

  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ["/api/projects", { supervisorId: user?.id }],
    enabled: !!user,
    queryFn: async () => {
      const response = await fetch(`/api/projects?supervisorId=${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });

  const { data: evaluations, isLoading: loadingEvaluations } = useQuery({
    queryKey: ["/api/evaluations", { evaluatorId: user?.id }],
    enabled: !!user,
    queryFn: async () => {
      const response = await fetch(`/api/evaluations?evaluatorId=${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch evaluations");
      return response.json();
    },
  });

  const pendingRequests = requests?.filter((r: any) => r.status === "pending") || [];
  const recentRequests = pendingRequests.slice(0, 2);

  const stats = {
    supervisedProjects: projects?.length || 0,
    pendingRequests: pendingRequests.length,
    evaluations: evaluations?.filter((e: any) => e.status === "pending").length || 0,
    panels: 0,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.fullName?.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">Manage supervision requests and evaluation schedules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Supervised Projects" 
          value={stats.supervisedProjects.toString()} 
          icon={Users} 
          description="Currently supervising" 
        />
        <StatCard 
          title="Pending Requests" 
          value={stats.pendingRequests.toString()} 
          icon={Clock} 
          description="Awaiting response" 
        />
        <StatCard 
          title="Evaluations" 
          value={stats.evaluations.toString()} 
          icon={CheckCircle} 
          description="Pending" 
        />
        <StatCard 
          title="Panel Assignments" 
          value={stats.panels.toString()} 
          icon={Calendar} 
          description="Upcoming" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Pending Supervision Requests</h2>
          <Link href="/requests">
            <Button variant="ghost" size="sm" data-testid="link-view-all-requests">View All</Button>
          </Link>
        </div>
        
        {loadingRequests ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : recentRequests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentRequests.map((request: any) => (
              <RequestCard
                key={request.id}
                studentName={request.student?.fullName || "Unknown"}
                studentId={request.student?.rollNumber || "N/A"}
                projectTitle={request.project?.title || "Unknown Project"}
                projectDescription={request.project?.description || "No description"}
                requestDate={new Date(request.createdAt).toLocaleDateString()}
                status={request.status}
                onApprove={() => {}}
                onReject={() => {}}
                onViewDetails={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No pending supervision requests</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">My Supervised Projects</h2>
        {loadingProjects ? (
          <Skeleton className="h-32" />
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project: any) => (
              <div key={project.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description.substring(0, 100)}...</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  Status: <span className="capitalize">{project.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No supervised projects yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
