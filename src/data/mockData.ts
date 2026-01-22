// Mock data for the dashboard

export const suppliers = [
  "东方海运",
  "远洋物流",
  "中海集运",
  "马士基",
  "达飞轮船",
  "长荣海运",
  "阳明海运",
  "万海航运",
];

// Booking info fields
export const bookingFields = [
  { key: "mblNo", label: "MBL NO" },
  { key: "vesselVoyage", label: "船名航次" },
  { key: "portOpenTime", label: "开港时间" },
  { key: "portCloseTime", label: "截港时间" },
  { key: "etd", label: "预计离港时间" },
  { key: "eta", label: "预计到港时间" },
];

// Loading info fields
export const loadingFields = [
  { key: "expectedLoadTime", label: "预计装箱时间" },
  { key: "licensePlate", label: "车牌号" },
  { key: "containerNo", label: "箱号" },
  { key: "sealNo", label: "封号" },
  { key: "phoneNo", label: "手机号" },
];

// Generate random timeliness data for bar chart
export const generateBarChartData = (field: string) => {
  return suppliers.map((supplier) => ({
    supplier,
    days: Math.floor(Math.random() * 5) + 1,
    average: 2.5,
  }));
};

// Generate pie chart data
export const generatePieChartData = () => {
  const notEntered = Math.floor(Math.random() * 30) + 10;
  const beforeLoading = Math.floor(Math.random() * 40) + 30;
  const afterLoading = 100 - notEntered - beforeLoading;
  
  return [
    { name: "未录入", value: notEntered, color: "hsl(0, 84%, 60%)" },
    { name: "装箱前录入", value: beforeLoading, color: "hsl(142, 76%, 36%)" },
    { name: "装箱后录入", value: afterLoading, color: "hsl(38, 92%, 50%)" },
  ];
};

// Generate detailed mock data for export
export const generateDetailedData = (field: string, count: number = 100) => {
  const statuses = ["未录入", "装箱前录入", "装箱后录入"];
  return Array.from({ length: count }, (_, i) => ({
    id: `BK${String(i + 1).padStart(6, "0")}`,
    supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
    field,
    entryDays: Math.floor(Math.random() * 5) + 1,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  }));
};
