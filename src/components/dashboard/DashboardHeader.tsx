import { BarChart3 } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="gradient-header text-header-foreground py-4 px-6 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold">供应商信息录入时效监控看板</h1>
          <p className="text-sm opacity-80">Supplier Information Timeliness Monitoring Dashboard</p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
