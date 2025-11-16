import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Users, BookOpen, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

//todo: remove mock functionality
const mockReports = {
  utilization: {
    totalBooks: 2847,
    activeLoans: 184,
    utilizationRate: 6.5,
    neverBorrowed: 342,
  },
  topCategories: [
    { name: "Computer Science", loans: 156, percentage: 42 },
    { name: "Mathematics", loans: 89, percentage: 24 },
    { name: "Physics", loans: 67, percentage: 18 },
    { name: "Engineering", loans: 45, percentage: 12 },
    { name: "Other", loans: 15, percentage: 4 },
  ],
  userActivity: {
    mostActive: [
      { name: "João Costa", loans: 45, type: "Docente" },
      { name: "Maria Silva", loans: 38, type: "Estudante" },
      { name: "Carlos Lima", loans: 32, type: "Funcionário" },
      { name: "Ana Pereira", loans: 28, type: "Estudante" },
      { name: "Pedro Santos", loans: 25, type: "Docente" },
    ],
  },
  financial: {
    totalFines: 45000,
    paidFines: 32500,
    pendingFines: 12500,
    blockedUsers: 5,
  },
};

export default function Reports() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Library performance metrics and insights
          </p>
        </div>
        <Button data-testid="button-export-report">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.utilization.utilizationRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockReports.utilization.activeLoans} of {mockReports.utilization.totalBooks} books
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Never Borrowed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.utilization.neverBorrowed}</div>
            <p className="text-xs text-muted-foreground mt-1">Books never checked out</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fines</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.financial.totalFines} Kz</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockReports.financial.paidFines} Kz collected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.financial.blockedUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Due to outstanding fines</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Categories by Loans</CardTitle>
            <CardDescription>Most popular book categories this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.topCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium truncate">{category.name}</p>
                      <span className="text-sm text-muted-foreground ml-2">
                        {category.loans} loans
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                  <Badge variant="outline">{category.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Active Users</CardTitle>
            <CardDescription>Top 5 users by loan count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.userActivity.mostActive.map((user, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.type}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg">{user.loans}</p>
                    <p className="text-xs text-muted-foreground">loans</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Fine collection and outstanding amounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Fines Issued</p>
              <p className="text-3xl font-bold">{mockReports.financial.totalFines} Kz</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Paid Fines</p>
              <p className="text-3xl font-bold text-chart-2">{mockReports.financial.paidFines} Kz</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((mockReports.financial.paidFines / mockReports.financial.totalFines) * 100).toFixed(1)}% collection rate
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Pending Fines</p>
              <p className="text-3xl font-bold text-destructive">{mockReports.financial.pendingFines} Kz</p>
              <p className="text-xs text-muted-foreground mt-1">
                {mockReports.financial.blockedUsers} users blocked
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
