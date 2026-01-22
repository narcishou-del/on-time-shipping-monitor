import { useState } from "react";
import { Ship, Package } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FilterBar from "@/components/dashboard/FilterBar";
import MonitoringSection from "@/components/dashboard/MonitoringSection";
import { bookingFields, loadingFields } from "@/data/mockData";

const Index = () => {
  const [filters, setFilters] = useState({ dateRange: "", supplier: "all" });

  const handleFilter = (newFilters: { dateRange: string; supplier: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4 space-y-6">
        <FilterBar onFilter={handleFilter} />

        <MonitoringSection
          title="订舱信息录入时效监控"
          icon={<Ship className="h-5 w-5 text-primary" />}
          fields={bookingFields}
        />

        <MonitoringSection
          title="装箱信息录入时效监控"
          icon={<Package className="h-5 w-5 text-primary" />}
          fields={loadingFields}
          pieChartTitle="箱个数分布"
        />
      </main>
    </div>
  );
};

export default Index;
