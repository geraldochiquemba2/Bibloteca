import { StatsCard } from "../stats-card";
import { BookOpen } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="p-6 grid gap-4 md:grid-cols-2">
      <StatsCard
        title="Total Books"
        value="2,847"
        icon={BookOpen}
        description="In collection"
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Active Loans"
        value="184"
        icon={BookOpen}
        description="Currently borrowed"
        trend={{ value: 5, isPositive: false }}
      />
    </div>
  );
}
