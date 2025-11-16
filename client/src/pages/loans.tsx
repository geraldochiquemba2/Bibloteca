import { useState } from "react";
import { LoanTable, type Loan } from "@/components/loan-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Scan } from "lucide-react";
import { addDays, subDays } from "date-fns";

//todo: remove mock functionality
const mockActiveLoans: Loan[] = [
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
    userName: "Carlos Lima",
    userType: "funcionario",
    bookTitle: "Redes de Computadores",
    loanDate: subDays(new Date(), 1),
    dueDate: addDays(new Date(), 4),
    status: "active",
  },
];

const mockOverdueLoans: Loan[] = [
  {
    id: "4",
    userName: "Ana Pereira",
    userType: "estudante",
    bookTitle: "Sistemas Operacionais",
    loanDate: subDays(new Date(), 8),
    dueDate: subDays(new Date(), 2),
    status: "overdue",
    fine: 1000,
  },
  {
    id: "5",
    userName: "Pedro Santos",
    userType: "estudante",
    bookTitle: "Banco de Dados",
    loanDate: subDays(new Date(), 12),
    dueDate: subDays(new Date(), 5),
    status: "overdue",
    fine: 2500,
  },
];

const mockReturnedLoans: Loan[] = [
  {
    id: "6",
    userName: "Sofia Martins",
    userType: "docente",
    bookTitle: "Arquitetura de Computadores",
    loanDate: subDays(new Date(), 20),
    dueDate: subDays(new Date(), 5),
    status: "returned",
  },
  {
    id: "7",
    userName: "Miguel Oliveira",
    userType: "estudante",
    bookTitle: "Compiladores",
    loanDate: subDays(new Date(), 15),
    dueDate: subDays(new Date(), 10),
    status: "returned",
  },
];

export default function Loans() {
  const [searchQuery, setSearchQuery] = useState("");

  const filterLoans = (loans: Loan[]) =>
    loans.filter(
      (loan) =>
        loan.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Management</h1>
          <p className="text-muted-foreground">
            Track and manage book loans and returns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-scan-barcode">
            <Scan className="h-4 w-4 mr-2" />
            Scan Barcode
          </Button>
          <Button data-testid="button-new-loan">
            <Plus className="h-4 w-4 mr-2" />
            New Loan
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by user or book title..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-loans"
        />
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" data-testid="tab-active-loans">
            Active Loans ({mockActiveLoans.length})
          </TabsTrigger>
          <TabsTrigger value="overdue" data-testid="tab-overdue-loans">
            Overdue ({mockOverdueLoans.length})
          </TabsTrigger>
          <TabsTrigger value="returned" data-testid="tab-returned-loans">
            Returned ({mockReturnedLoans.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <LoanTable
            loans={filterLoans(mockActiveLoans)}
            onReturn={(id) => console.log("Return loan:", id)}
            onRenew={(id) => console.log("Renew loan:", id)}
            onViewUser={(id) => console.log("View user:", id)}
          />
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <LoanTable
            loans={filterLoans(mockOverdueLoans)}
            onReturn={(id) => console.log("Return loan:", id)}
            onRenew={(id) => console.log("Renew loan:", id)}
            onViewUser={(id) => console.log("View user:", id)}
          />
        </TabsContent>

        <TabsContent value="returned" className="space-y-4">
          <LoanTable
            loans={filterLoans(mockReturnedLoans)}
            onViewUser={(id) => console.log("View user:", id)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
