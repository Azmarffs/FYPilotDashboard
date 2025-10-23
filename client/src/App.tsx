import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthProvider, useAuth } from "@/lib/auth";

import Login from "@/pages/Login";
import StudentDashboard from "@/pages/StudentDashboard";
import SupervisorRecommendations from "@/pages/student/SupervisorRecommendations";
import SubmitProject from "@/pages/student/SubmitProject";
import MyProjects from "@/pages/student/MyProjects";
import TeamFormation from "@/pages/student/TeamFormation";
import ProgressTracking from "@/pages/student/ProgressTracking";
import StudentNotifications from "@/pages/student/Notifications";

import FacultyDashboard from "@/pages/FacultyDashboard";
import SupervisorRequests from "@/pages/faculty/SupervisorRequests";
import MySupervisedProjects from "@/pages/faculty/MySupervisedProjects";
import Evaluations from "@/pages/faculty/Evaluations";

import CommitteeDashboard from "@/pages/CommitteeDashboard";
import PanelGeneration from "@/pages/committee/PanelGeneration";
import ProjectManagement from "@/pages/committee/ProjectManagement";
import Analytics from "@/pages/committee/Analytics";

import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Role = "student" | "faculty" | "committee";

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
      <Route component={NotFound} />
    </Switch>
  );
}

function AuthenticatedApp() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const role = user.role as Role;

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "4rem",
  };

  function getUserInitials(fullName: string) {
    const names = fullName.split(" ");
    return names.length >= 2 
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : fullName.substring(0, 2).toUpperCase();
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role={role} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div>
                <h2 className="font-semibold">FYPILOT</h2>
                <p className="text-xs text-muted-foreground capitalize">{role} Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getUserInitials(user.fullName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {user.rollNumber && (
                        <p className="text-xs text-muted-foreground">{user.rollNumber}</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} data-testid="button-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-8 bg-background">
            <div className="max-w-7xl mx-auto">
              <Router role={role} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AuthenticatedApp />
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
