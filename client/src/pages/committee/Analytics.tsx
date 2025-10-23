import { AnalyticsChart } from "@/components/AnalyticsChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, TrendingUp, Users, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Analytics() {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("6months");

  const projectData = [
    { name: "Jan", submitted: 12, approved: 10, rejected: 2 },
    { name: "Feb", submitted: 15, approved: 13, rejected: 2 },
    { name: "Mar", submitted: 18, approved: 16, rejected: 2 },
    { name: "Apr", submitted: 20, approved: 17, rejected: 3 },
    { name: "May", submitted: 14, approved: 12, rejected: 2 },
    { name: "Jun", submitted: 22, approved: 19, rejected: 3 },
  ];

  const facultyData = [
    { name: "Dr. Ahmed", projects: 8, avgScore: 85 },
    { name: "Dr. Khan", projects: 6, avgScore: 88 },
    { name: "Dr. Ali", projects: 7, avgScore: 82 },
    { name: "Dr. Hassan", projects: 5, avgScore: 90 },
    { name: "Dr. Tariq", projects: 6, avgScore: 86 },
  ];

  const projectKeys = [
    { key: "submitted", color: "hsl(var(--primary))", name: "Submitted" },
    { key: "approved", color: "hsl(142 71% 45%)", name: "Approved" },
    { key: "rejected", color: "hsl(0 84% 60%)", name: "Rejected" },
  ];

  const facultyKeys = [
    { key: "projects", color: "hsl(var(--primary))", name: "Projects" },
    { key: "avgScore", color: "hsl(142 71% 45%)", name: "Avg Score" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive system insights and metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => toast({ title: "Exporting Report..." })} data-testid="button-export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Total Projects</h3>
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-2">101</div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            <span>+12% from last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Approval Rate</h3>
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div className="text-3xl font-bold mb-2">87%</div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            <span>Above target</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Active Faculty</h3>
            <Users className="h-5 w-5 text-info" />
          </div>
          <div className="text-3xl font-bold mb-2">24</div>
          <p className="text-sm text-muted-foreground">Currently supervising</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Avg Review Time</h3>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-2">2.3 days</div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            <span>-15% faster</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Project Submission Trends"
          data={projectData}
          dataKeys={projectKeys}
        />
        <AnalyticsChart
          title="Faculty Performance"
          data={facultyData}
          dataKeys={facultyKeys}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Domains</h3>
        <div className="space-y-4">
          {[
            { domain: "Machine Learning & AI", count: 28, percentage: 85 },
            { domain: "Web Development", count: 22, percentage: 70 },
            { domain: "Mobile Applications", count: 18, percentage: 58 },
            { domain: "Cybersecurity", count: 15, percentage: 48 },
            { domain: "Data Science", count: 12, percentage: 38 },
          ].map((item) => (
            <div key={item.domain} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.domain}</span>
                <span className="text-muted-foreground">{item.count} projects</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
