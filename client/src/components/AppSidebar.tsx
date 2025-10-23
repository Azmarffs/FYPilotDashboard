import {
  Home,
  Lightbulb,
  FileText,
  Users,
  BarChart3,
  Bell,
  Settings,
  CheckSquare,
  Calendar,
  ClipboardList,
  Award,
  PanelTop,
  Database,
  Mail,
  GraduationCap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";

type Role = "student" | "faculty" | "committee";

interface AppSidebarProps {
  role: Role;
}

export function AppSidebar({ role }: AppSidebarProps) {
  const [location] = useLocation();

  const studentItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Supervisor Recommendations", url: "/recommendations", icon: Lightbulb },
    { title: "Submit Project", url: "/submit", icon: FileText },
    { title: "Team Formation", url: "/team", icon: Users },
    { title: "My Projects", url: "/projects", icon: ClipboardList },
    { title: "Progress Tracking", url: "/progress", icon: BarChart3 },
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Profile", url: "/profile", icon: Settings },
  ];

  const facultyItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Supervisor Requests", url: "/requests", icon: Mail },
    { title: "My Supervised Projects", url: "/supervised", icon: ClipboardList },
    { title: "Evaluations", url: "/evaluations", icon: CheckSquare },
    { title: "Panel Assignments", url: "/panels", icon: PanelTop },
    { title: "Schedule", url: "/schedule", icon: Calendar },
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Profile", url: "/profile", icon: Settings },
  ];

  const committeeItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Panel Generation", url: "/panel-generation", icon: PanelTop },
    { title: "Project Management", url: "/project-management", icon: Database },
    { title: "Evaluation Management", url: "/evaluation-management", icon: Award },
    { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
    { title: "Faculty Management", url: "/faculty", icon: Users },
    { title: "System Settings", url: "/settings", icon: Settings },
    { title: "Communications", url: "/communications", icon: Mail },
  ];

  const items = role === "student" ? studentItems : role === "faculty" ? facultyItems : committeeItems;

  const roleColors = {
    student: "from-blue-500 to-blue-600",
    faculty: "from-purple-500 to-purple-600",
    committee: "from-teal-500 to-teal-600",
  };

  const roleNames = {
    student: "Student Portal",
    faculty: "Faculty Portal",
    committee: "Committee Portal",
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roleColors[role]} flex items-center justify-center`}>
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">FYPILOT</h2>
            <p className="text-xs text-muted-foreground">{roleNames[role]}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
