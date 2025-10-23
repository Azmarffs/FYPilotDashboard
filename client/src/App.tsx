import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RoleSelector } from "@/components/RoleSelector";

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
import { useState } from "react";

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

function App() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  if (!selectedRole) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RoleSelector onSelectRole={setSelectedRole} />
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
            <AppSidebar role={selectedRole} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div>
                    <h2 className="font-semibold">FYPILOT</h2>
                    <p className="text-xs text-muted-foreground capitalize">{selectedRole} Portal</p>
                  </div>
                </div>
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto p-8 bg-background">
                <div className="max-w-7xl mx-auto">
                  <Router role={selectedRole} />
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
