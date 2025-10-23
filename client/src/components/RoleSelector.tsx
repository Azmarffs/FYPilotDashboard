import { GraduationCap, Users, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

type Role = "student" | "faculty" | "committee";

interface RoleSelectorProps {
  onSelectRole: (role: Role) => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const roles = [
    {
      id: "student" as Role,
      title: "Student",
      description: "Access supervisor recommendations, submit projects, and track progress",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "faculty" as Role,
      title: "Faculty",
      description: "Manage supervision requests, evaluate projects, and provide feedback",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "committee" as Role,
      title: "FYP Committee",
      description: "Generate panels, manage evaluations, and view system analytics",
      icon: Shield,
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">FYPILOT</h1>
          <p className="text-xl text-muted-foreground">AI-Enhanced FYP Management System</p>
          <p className="text-sm text-muted-foreground mt-2">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="p-6 cursor-pointer transition-all hover-elevate active-elevate-2 group"
                onClick={() => onSelectRole(role.id)}
                data-testid={`button-role-${role.id}`}
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
