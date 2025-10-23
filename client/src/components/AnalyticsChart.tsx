import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AnalyticsChartProps {
  title: string;
  data: Array<{
    name: string;
    [key: string]: string | number;
  }>;
  dataKeys: Array<{
    key: string;
    color: string;
    name: string;
  }>;
}

export function AnalyticsChart({ title, data, dataKeys }: AnalyticsChartProps) {
  return (
    <Card className="p-6" data-testid={`card-chart-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
          {dataKeys.map((key) => (
            <Bar key={key.key} dataKey={key.key} fill={key.color} name={key.name} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
