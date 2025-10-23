import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { Badge } from "@/components/ui/badge";
import { Download, BarChart3, TrendingUp, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Reports() {
  const { toast } = useToast();
  const [showCustomReportModal, setShowCustomReportModal] = useState(false);

  const supervisionHistory = [
    { name: "2020", supervised: 4, completed: 4, avgGrade: 3.6 },
    { name: "2021", supervised: 5, completed: 5, avgGrade: 3.7 },
    { name: "2022", supervised: 6, completed: 6, avgGrade: 3.8 },
    { name: "2023", supervised: 5, completed: 5, avgGrade: 3.9 },
    { name: "2024", supervised: 6, completed: 5, avgGrade: 3.8 },
  ];

  const dataKeys = [
    { key: "supervised", color: "hsl(var(--primary))", name: "Supervised" },
    { key: "completed", color: "hsl(142 71% 45%)", name: "Completed" },
  ];

  const stats = {
    totalSupervised: 26,
    currentlySupervising: 6,
    successRate: 96,
    avgCompletionTime: "11.2 months",
  };

  const topProjects = [
    {
      title: "AI-Powered Healthcare Diagnostics",
      student: "Ahmed Ali",
      year: "2023",
      grade: "A+",
      achievements: "Published in IEEE Conference",
    },
    {
      title: "Blockchain Supply Chain Management",
      student: "Sara Khan",
      year: "2023",
      grade: "A",
      achievements: "Won Best FYP Award",
    },
    {
      title: "Smart Traffic Management System",
      student: "John Doe",
      year: "2022",
      grade: "A",
      achievements: "Deployed in pilot program",
    },
  ];

  const handleExportReport = (type: string) => {
    toast({
      title: "Report Exported",
      description: `Your ${type} report has been downloaded`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">View your supervision history and performance metrics</p>
        </div>
        <Button onClick={() => setShowCustomReportModal(true)} data-testid="button-custom-report">
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Total Supervised</h3>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary mb-1">{stats.totalSupervised}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Currently Supervising</h3>
            <TrendingUp className="h-5 w-5 text-info" />
          </div>
          <div className="text-3xl font-bold text-info mb-1">{stats.currentlySupervising}</div>
          <p className="text-xs text-muted-foreground">Active projects</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Success Rate</h3>
            <Award className="h-5 w-5 text-success" />
          </div>
          <div className="text-3xl font-bold text-success mb-1">{stats.successRate}%</div>
          <p className="text-xs text-muted-foreground">Completion rate</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Avg Completion</h3>
            <BarChart3 className="h-5 w-5 text-warning" />
          </div>
          <div className="text-3xl font-bold text-warning mb-1">{stats.avgCompletionTime}</div>
          <p className="text-xs text-muted-foreground">Average time</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Supervision History</h3>
            <Button variant="outline" size="sm" onClick={() => handleExportReport("supervision history")} data-testid="button-export-history">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <AnalyticsChart
            data={supervisionHistory}
            dataKeys={dataKeys}
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Grade Distribution</h3>
            <Button variant="outline" size="sm" onClick={() => handleExportReport("grade distribution")} data-testid="button-export-grades">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">A+ / A</span>
              <div className="flex items-center gap-2">
                <div className="w-48 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success" style={{ width: "65%" }} />
                </div>
                <span className="text-sm font-semibold">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">B+ / B</span>
              <div className="flex items-center gap-2">
                <div className="w-48 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "25%" }} />
                </div>
                <span className="text-sm font-semibold">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">C+ / C</span>
              <div className="flex items-center gap-2">
                <div className="w-48 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning" style={{ width: "8%" }} />
                </div>
                <span className="text-sm font-semibold">8%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Below C</span>
              <div className="flex items-center gap-2">
                <div className="w-48 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive" style={{ width: "2%" }} />
                </div>
                <span className="text-sm font-semibold">2%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Notable Projects</h3>
        </div>
        <div className="space-y-4">
          {topProjects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {project.student} • {project.year}
                  </p>
                </div>
                <Badge>{project.grade}</Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Award className="h-4 w-4 text-warning" />
                {project.achievements}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={showCustomReportModal} onOpenChange={setShowCustomReportModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Custom Report</DialogTitle>
            <DialogDescription>Select report parameters and format</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Report Type</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supervision">Supervision History</SelectItem>
                  <SelectItem value="performance">Student Performance</SelectItem>
                  <SelectItem value="grades">Grade Distribution</SelectItem>
                  <SelectItem value="summary">Overall Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time Period</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Year</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="last-3-years">Last 3 Years</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Export Format</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (XLSX)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomReportModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              handleExportReport("custom");
              setShowCustomReportModal(false);
            }}>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
