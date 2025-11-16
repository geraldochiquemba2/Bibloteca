import { StatsCard } from "@/components/stats-card";
import { LoanTable, type Loan } from "@/components/loan-table";
import { BookOpen, Users, AlertCircle, BookCopy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addDays, subDays } from "date-fns";

//todo: remove mock functionality
const mockLoans: Loan[] = [
  {
    id: "1",
    userName: "Maria Silva",
    userType: "estudante",
    bookTitle: "Engenharia de Software",
    loanDate: subDays(new Date(), 3),
    dueDate: addDays(new Date(), 2),
    status: "active",
  },
  {
    id: "2",
    userName: "João Costa",
    userType: "docente",
    bookTitle: "Algoritmos e Estruturas de Dados",
    loanDate: subDays(new Date(), 10),
    dueDate: addDays(new Date(), 5),
    status: "active",
  },
  {
    id: "3",
    userName: "Ana Pereira",
    userType: "estudante",
    bookTitle: "Redes de Computadores",
    loanDate: subDays(new Date(), 8),
    dueDate: subDays(new Date(), 2),
    status: "overdue",
    fine: 1000,
  },
];

const mockMostBorrowed = [
  { title: "Engenharia de Software", count: 45, category: "Computer Science" },
  { title: "Algoritmos Avançados", count: 38, category: "Computer Science" },
  { title: "Gestão de Projetos", count: 32, category: "Management" },
  { title: "Bases de Dados", count: 29, category: "Computer Science" },
  { title: "Arquitectura de Computadores", count: 26, category: "Hardware" },
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of library operations and statistics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          icon={BookCopy}
          description="Currently borrowed"
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard
          title="Pending Fines"
          value="45,000 Kz"
          icon={AlertCircle}
          description="From 23 users"
          trend={{ value: 8, isPositive: false }}
        />
        <StatsCard
          title="Total Users"
          value="1,234"
          icon={Users}
          description="Active accounts"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Most Borrowed Books</CardTitle>
            <CardDescription>Top 5 books this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMostBorrowed.map((book, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg">{book.count}</p>
                    <p className="text-xs text-muted-foreground">loans</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest library events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Loan", user: "Maria Silva", book: "Eng. Software", time: "2h ago" },
                { action: "Return", user: "João Costa", book: "Redes", time: "3h ago" },
                { action: "Fine Paid", user: "Ana Pereira", amount: "1,500 Kz", time: "5h ago" },
                { action: "Reservation", user: "Pedro Santos", book: "Algoritmos", time: "6h ago" },
                { action: "Loan", user: "Carlos Lima", book: "Bases de Dados", time: "1d ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span> - {activity.user}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {"book" in activity && activity.book}
                      {"amount" in activity && activity.amount}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Due Dates</CardTitle>
          <CardDescription>Books due in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <LoanTable
            loans={mockLoans}
            onReturn={(id) => console.log("Return loan:", id)}
            onRenew={(id) => console.log("Renew loan:", id)}
            onViewUser={(id) => console.log("View user:", id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
