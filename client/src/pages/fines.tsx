import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays } from "date-fns";

//todo: remove mock functionality
const mockFines = [
  {
    id: "1",
    userName: "Ana Pereira",
    userEmail: "ana.pereira@isptec.ao",
    bookTitle: "Sistemas Operacionais",
    daysOverdue: 2,
    amount: 1000,
    status: "pending" as const,
    dueDate: subDays(new Date(), 2),
  },
  {
    id: "2",
    userName: "Pedro Santos",
    userEmail: "pedro.santos@isptec.ao",
    bookTitle: "Banco de Dados",
    daysOverdue: 5,
    amount: 2500,
    status: "pending" as const,
    dueDate: subDays(new Date(), 5),
  },
  {
    id: "3",
    userName: "Sofia Martins",
    userEmail: "sofia.martins@isptec.ao",
    bookTitle: "Redes de Computadores",
    daysOverdue: 3,
    amount: 1500,
    status: "paid" as const,
    dueDate: subDays(new Date(), 10),
  },
];

const statusConfig = {
  pending: { text: "Pending", color: "bg-chart-3 text-white" },
  paid: { text: "Paid", color: "bg-chart-2 text-white" },
};

export default function Fines() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFines = mockFines.filter(
    (fine) =>
      fine.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPending = mockFines
    .filter((f) => f.status === "pending")
    .reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = mockFines
    .filter((f) => f.status === "paid")
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fine Management</h1>
        <p className="text-muted-foreground">
          Track and manage overdue fines (500 Kz per day)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{totalPending} Kz</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {mockFines.filter((f) => f.status === "pending").length} users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPaid} Kz</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully collected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">Fines &gt; 2,000 Kz</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by user or book..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-fines"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Days Overdue</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No fines found
                </TableCell>
              </TableRow>
            ) : (
              filteredFines.map((fine) => (
                <TableRow key={fine.id} data-testid={`row-fine-${fine.id}`}>
                  <TableCell>
                    <div>
                      <div className="font-medium" data-testid={`text-user-${fine.id}`}>{fine.userName}</div>
                      <div className="text-sm text-muted-foreground">{fine.userEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell data-testid={`text-book-${fine.id}`}>{fine.bookTitle}</TableCell>
                  <TableCell>{format(fine.dueDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <span className="text-destructive font-medium">{fine.daysOverdue} days</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold" data-testid={`text-amount-${fine.id}`}>{fine.amount} Kz</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[fine.status].color} data-testid={`badge-status-${fine.id}`}>
                      {statusConfig[fine.status].text}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {fine.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => console.log("Mark as paid:", fine.id)}
                        data-testid={`button-mark-paid-${fine.id}`}
                      >
                        Mark as Paid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
