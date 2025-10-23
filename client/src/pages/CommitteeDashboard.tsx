import { StatCard } from "@/components/StatCard";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, Users, PanelTop, BarChart3 } from "lucide-react";

export default function CommitteeDashboard() {
  const projectData = [
    { name: "Jan", submitted: 12, approved: 10, rejected: 2 },
    { name: "Feb", submitted: 15, approved: 13, rejected: 2 },
    { name: "Mar", submitted: 18, approved: 16, rejected: 2 },
    { name: "Apr", submitted: 20, approved: 17, rejected: 3 },
    { name: "May", submitted: 14, approved: 12, rejected: 2 },
  ];

  const dataKeys = [
    { key: "submitted", color: "hsl(var(--primary))", name: "Submitted" },
    { key: "approved", color: "hsl(142 71% 45%)", name: "Approved" },
    { key: "rejected", color: "hsl(0 84% 60%)", name: "Rejected" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Committee Dashboard</h1>
        <p className="text-muted-foreground">Manage projects, panels, and system analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value="45" icon={FileText} trend={{ value: "8% from last month", positive: true }} />
        <StatCard title="Pending Reviews" value="12" icon={Clock} description="Awaiting approval" />
        <StatCard title="Active Panels" value="18" icon={PanelTop} description="Scheduled" />
        <StatCard title="Faculty Members" value="24" icon={Users} description="Available" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
          <div className="grid gap-4">
            <Button className="w-full justify-start h-auto p-4" data-testid="button-generate-panels">
              <PanelTop className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Generate Evaluation Panels</div>
                <div className="text-sm text-primary-foreground/80">AI-powered optimal panel assignment</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-4" data-testid="button-view-analytics">
              <BarChart3 className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-semibold">View Detailed Analytics</div>
                <div className="text-sm text-muted-foreground">Comprehensive system insights</div>
              </div>
            </Button>
          </div>
        </div>

        <div>
          <AnalyticsChart title="Project Submission Trends" data={projectData} dataKeys={dataKeys} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Approval Rate</h3>
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-success mb-2">87%</div>
          <p className="text-sm text-muted-foreground">Above target of 80%</p>
        </div>
        
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Avg. Review Time</h3>
            <Clock className="h-5 w-5 text-info" />
          </div>
          <div className="text-3xl font-bold text-info mb-2">2.3 days</div>
          <p className="text-sm text-muted-foreground">Faster than last month</p>
        </div>
        
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Faculty Utilization</h3>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary mb-2">92%</div>
          <p className="text-sm text-muted-foreground">Well balanced</p>
        </div>
      </div>
    </div>
  );
}
