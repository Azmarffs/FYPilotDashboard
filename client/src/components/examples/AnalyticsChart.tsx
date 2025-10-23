import { AnalyticsChart } from "../AnalyticsChart";

export default function AnalyticsChartExample() {
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
    <div className="p-6">
      <AnalyticsChart title="Project Submission Trends" data={projectData} dataKeys={dataKeys} />
    </div>
  );
}
