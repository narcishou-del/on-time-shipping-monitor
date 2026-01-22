import { useState, useMemo } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimelinessBarChart from "./TimelinessBarChart";
import TimelinessPieChart from "./TimelinessPieChart";
import { generateBarChartData, generatePieChartData, generateDetailedData } from "@/data/mockData";
import { toast } from "sonner";

interface Field {
  key: string;
  label: string;
}

interface MonitoringSectionProps {
  title: string;
  icon: React.ReactNode;
  fields: Field[];
  pieChartTitle?: string;
}

const MonitoringSection = ({ title, icon, fields, pieChartTitle = "业务票数分布" }: MonitoringSectionProps) => {
  const [activeTab, setActiveTab] = useState(fields[0]?.key || "");

  const barChartData = useMemo(() => generateBarChartData(activeTab), [activeTab]);
  const pieChartData = useMemo(() => generatePieChartData(), [activeTab]);

  const handleExport = (fieldKey: string) => {
    const data = generateDetailedData(fieldKey);
    const csv = [
      ["ID", "供应商", "字段", "录入天数", "状态", "创建日期"].join(","),
      ...data.map((row) =>
        [row.id, row.supplier, row.field, row.entryDays, row.status, row.createDate].join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fieldKey}_report_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("报表导出成功", {
      description: `已导出 ${fields.find(f => f.key === fieldKey)?.label} 数据`,
    });
  };

  return (
    <div className="dashboard-card animate-fade-in">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="flex-wrap h-auto gap-1">
            {fields.map((field) => (
              <TabsTrigger
                key={field.key}
                value={field.key}
                className="text-sm"
              >
                {field.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport(activeTab)}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            导出报表
          </Button>
        </div>

        {fields.map((field) => (
          <TabsContent key={field.key} value={field.key} className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="chart-container">
                <div className="flex items-center gap-2 mb-4">
                  <FileSpreadsheet className="h-4 w-4 text-primary" />
                  <h3 className="font-medium text-foreground">
                    供应商录入时效对比
                  </h3>
                </div>
                <TimelinessBarChart data={barChartData} />
              </div>

              <div className="chart-container">
                <div className="flex items-center gap-2 mb-4">
                  <FileSpreadsheet className="h-4 w-4 text-primary" />
                  <h3 className="font-medium text-foreground">
                    {pieChartTitle}
                  </h3>
                </div>
                <TimelinessPieChart data={pieChartData} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MonitoringSection;
