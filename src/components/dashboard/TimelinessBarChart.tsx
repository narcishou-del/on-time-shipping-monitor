import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface TimelinessBarChartProps {
  data: Array<{
    supplier: string;
    days: number;
    average: number;
  }>;
}

const TimelinessBarChart = ({ data }: TimelinessBarChartProps) => {
  const averageValue = data.length > 0 
    ? data.reduce((sum, item) => sum + item.days, 0) / data.length 
    : 0;

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="supplier"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            label={{
              value: "录入天数",
              angle: -90,
              position: "insideLeft",
              fill: "hsl(var(--muted-foreground))",
              fontSize: 12,
            }}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value: number) => [`${value} 天`, "录入天数"]}
          />
          <Legend />
          <ReferenceLine
            y={averageValue}
            stroke="hsl(var(--chart-danger))"
            strokeDasharray="5 5"
            label={{
              value: `平均: ${averageValue.toFixed(1)}天`,
              position: "right",
              fill: "hsl(var(--chart-danger))",
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="days"
            name="录入天数"
            fill="hsl(var(--chart-primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelinessBarChart;
