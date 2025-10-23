import { StatCard } from "@/components/StatCard";
import { ProjectCard } from "@/components/ProjectCard";
import { NotificationItem } from "@/components/NotificationItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Bell, TrendingUp, BookOpen, Clock } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDashboard() {
  const { user } = useAuth();

  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ["/api/projects", { studentId: user?.id }],
    enabled: !!user,
    queryFn: async () => {
      const response = await fetch(`/api/projects?studentId=${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });

  const { data: notifications, isLoading: loadingNotifications } = useQuery({
    queryKey: ["/api/notifications", { userId: user?.id }],
    enabled: !!user,
    queryFn: async () => {
      const response = await fetch(`/api/notifications?userId=${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch notifications");
      return response.json();
    },
  });

  const recentProjects = projects?.slice(0, 3) || [];
  const recentNotifications = notifications?.slice(0, 5) || [];

  const stats = {
    totalProjects: projects?.length || 0,
    approvedProjects: projects?.filter((p: any) => p.status === "approved").length || 0,
    pendingProjects: projects?.filter((p: any) => p.status === "pending").length || 0,
    unreadNotifications: notifications?.filter((n: any) => !n.read).length || 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.fullName?.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Here's an overview of your FYP progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects.toString()}
          icon={FileText}
          trend={stats.totalProjects > 0 ? { value: "Active", positive: true } : undefined}
        />
        <StatCard
          title="Approved Projects"
          value={stats.approvedProjects.toString()}
          icon={TrendingUp}
          trend={{ value: `${stats.totalProjects > 0 ? Math.round((stats.approvedProjects / stats.totalProjects) * 100) : 0}%`, positive: true }}
        />
        <StatCard
          title="Pending Review"
          value={stats.pendingProjects.toString()}
          icon={Clock}
          description="Awaiting approval"
        />
        <StatCard
          title="Notifications"
          value={stats.unreadNotifications.toString()}
          icon={Bell}
          description="Unread messages"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/recommendations">
                <Button className="w-full" variant="outline" data-testid="button-get-recommendations">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Get Supervisor Recommendations
                </Button>
              </Link>
              <Link href="/submit">
                <Button className="w-full" variant="outline" data-testid="button-submit-project">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit New Project
                </Button>
              </Link>
              <Link href="/team">
                <Button className="w-full" variant="outline" data-testid="button-find-team">
                  <Users className="h-4 w-4 mr-2" />
                  Find Team Members
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Projects</CardTitle>
              <Link href="/projects">
                <Button variant="ghost" size="sm" data-testid="link-view-all-projects">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingProjects ? (
                <>
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                </>
              ) : recentProjects.length > 0 ? (
                recentProjects.map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    status={project.status}
                    submittedDate={new Date(project.submittedAt).toLocaleDateString()}
                    supervisor={project.supervisorId || "Not Assigned"}
                    teamMembers={[]}
                    onView={() => {}}
                    onEdit={() => {}}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No projects yet. Submit your first project!</p>
                  <Link href="/submit">
                    <Button className="mt-4" data-testid="button-submit-first-project">Submit Project</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingNotifications ? (
                <>
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                </>
              ) : recentNotifications.length > 0 ? (
                recentNotifications.map((notification: any) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    title={notification.title}
                    message={notification.message}
                    time={new Date(notification.createdAt).toLocaleString()}
                    type={notification.type}
                    read={notification.read}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              )}
              {recentNotifications.length > 0 && (
                <Link href="/notifications">
                  <Button variant="outline" className="w-full" data-testid="link-view-all-notifications">
                    View All Notifications
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Project Completion</span>
                    <span className="font-semibold">
                      {stats.totalProjects > 0 ? Math.round((stats.approvedProjects / stats.totalProjects) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${stats.totalProjects > 0 ? (stats.approvedProjects / stats.totalProjects) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
                <Link href="/progress">
                  <Button variant="outline" className="w-full" data-testid="link-track-progress">
                    Track Detailed Progress
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
