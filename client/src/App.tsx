import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Login from "@/pages/Login";

import StudentDashboard from "@/pages/StudentDashboard";
import SupervisorRecommendations from "@/pages/student/SupervisorRecommendations";
import SubmitProject from "@/pages/student/SubmitProject";
import MyProjects from "@/pages/student/MyProjects";
import TeamFormation from "@/pages/student/TeamFormation";
import ProgressTracking from "@/pages/student/ProgressTracking";
import StudentNotifications from "@/pages/student/Notifications";
import StudentProfile from "@/pages/student/Profile";

import FacultyDashboard from "@/pages/FacultyDashboard";
import SupervisorRequests from "@/pages/faculty/SupervisorRequests";
import MySupervisedProjects from "@/pages/faculty/MySupervisedProjects";
import Evaluations from "@/pages/faculty/Evaluations";
import PanelAssignments from "@/pages/faculty/PanelAssignments";
import Availability from "@/pages/faculty/Availability";
import Communication from "@/pages/faculty/Communication";
import FacultyProfile from "@/pages/faculty/FacultyProfile";
import Reports from "@/pages/faculty/Reports";

import CommitteeDashboard from "@/pages/CommitteeDashboard";
import PanelGeneration from "@/pages/committee/PanelGeneration";
import ProjectManagement from "@/pages/committee/ProjectManagement";
import Analytics from "@/pages/committee/Analytics";
import EvaluationManagement from "@/pages/committee/EvaluationManagement";
import FacultyManagement from "@/pages/committee/FacultyManagement";
import SystemSettings from "@/pages/committee/SystemSettings";
import Communications from "@/pages/committee/Communications";

import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Role = "student" | "faculty" | "committee";

interface User {
  id: string;
  username: string;
  role: Role;
  fullName: string;
}

function Router({ role }: { role: Role }) {
  if (role === "student") {
    return (
      <Switch>
        <Route path="/" component={StudentDashboard} />
        <Route path="/recommendations" component={SupervisorRecommendations} />
        <Route path="/submit" component={SubmitProject} />
        <Route path="/projects" component={MyProjects} />
        <Route path="/team" component={TeamFormation} />
        <Route path="/progress" component={ProgressTracking} />
        <Route path="/notifications" component={StudentNotifications} />
        <Route path="/profile" component={StudentProfile} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  if (role === "faculty") {
    return (
      <Switch>
        <Route path="/" component={FacultyDashboard} />
        <Route path="/requests" component={SupervisorRequests} />
        <Route path="/supervised" component={MySupervisedProjects} />
        <Route path="/evaluations" component={Evaluations} />
        <Route path="/panels" component={PanelAssignments} />
        <Route path="/availability" component={Availability} />
        <Route path="/communication" component={Communication} />
        <Route path="/profile" component={FacultyProfile} />
        <Route path="/reports" component={Reports} />
        <Route path="/notifications" component={StudentNotifications} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={CommitteeDashboard} />
      <Route path="/panel-generation" component={PanelGeneration} />
      <Route path="/project-management" component={ProjectManagement} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/evaluation-management" component={EvaluationManagement} />
      <Route path="/faculty" component={FacultyManagement} />
      <Route path="/settings" component={SystemSettings} />
      <Route path="/communications" component={Communications} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${userData.fullName}`,
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Login onLoginSuccess={handleLoginSuccess} />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar role={user.role} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div>
                    <h2 className="font-semibold">FYPILOT</h2>
                    <p className="text-xs text-muted-foreground capitalize">{user.role} Portal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right mr-2 hidden sm:block">
                    <p className="text-sm font-medium">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user.username}</p>
                  </div>
                  <ThemeToggle />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLogout}
                    title="Sign Out"
                    data-testid="button-logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </header>
              <main className="flex-1 overflow-auto p-8 bg-background">
                <div className="max-w-7xl mx-auto">
                  <Router role={user.role} />
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
