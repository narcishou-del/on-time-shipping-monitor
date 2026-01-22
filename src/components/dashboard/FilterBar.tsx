import { useState } from "react";
import { Calendar, Search, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { suppliers } from "@/data/mockData";

interface FilterBarProps {
  onFilter: (filters: { dateRange: string; supplier: string }) => void;
}

const FilterBar = ({ onFilter }: FilterBarProps) => {
  const [dateRange, setDateRange] = useState("");
  const [supplier, setSupplier] = useState("all");

  const handleSearch = () => {
    onFilter({ dateRange, supplier });
  };

  return (
    <div className="dashboard-card p-4 animate-fade-in">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">放号日期:</span>
          <Input
            type="date"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-40"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">供应商:</span>
          <Select value={supplier} onValueChange={setSupplier}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="选择供应商" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部供应商</SelectItem>
              {suppliers.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSearch} className="gap-2">
          <Search className="h-4 w-4" />
          查询
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
