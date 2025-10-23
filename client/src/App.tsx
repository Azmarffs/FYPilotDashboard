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
import FacultyDashboard from "@/pages/FacultyDashboard";
import CommitteeDashboard from "@/pages/CommitteeDashboard";
import NotFound from "@/pages/not-found";
import { useState } from "react";

type Role = "student" | "faculty" | "committee";

function Router({ role }: { role: Role }) {
  return (
    <Switch>
      <Route path="/" component={role === "student" ? StudentDashboard : role === "faculty" ? FacultyDashboard : CommitteeDashboard} />
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
