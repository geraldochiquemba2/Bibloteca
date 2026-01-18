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
    userName: "Maria Nzinga",
    userType: "estudante",
    bookTitle: "Introdução à Programação em Python",
    loanDate: subDays(new Date(), 3),
    dueDate: addDays(new Date(), 2),
    status: "active",
  },
  {
    id: "2",
    userName: "Prof. António Cassoma",
    userType: "docente",
    bookTitle: "Estruturas de Dados e Algoritmos",
    loanDate: subDays(new Date(), 8),
    dueDate: addDays(new Date(), 7),
    status: "active",
  },
  {
    id: "3",
    userName: "Carlos Mateus",
    userType: "funcionario",
    bookTitle: "Redes de Computadores - 5ª Edição",
    loanDate: subDays(new Date(), 1),
    dueDate: addDays(new Date(), 4),
    status: "active",
  },
  {
    id: "4",
    userName: "João Domingos",
    userType: "estudante",
    bookTitle: "Sistemas Operacionais Modernos",
    loanDate: subDays(new Date(), 2),
    dueDate: addDays(new Date(), 3),
    status: "active",
  },
  {
    id: "5",
    userName: "Prof. Sara Fernandes",
    userType: "docente",
    bookTitle: "Fundamentos de Engenharia de Software",
    loanDate: subDays(new Date(), 5),
    dueDate: addDays(new Date(), 10),
    status: "active",
  },
];

const mockOverdueLoans: Loan[] = [
  {
    id: "6",
    userName: "Ana Kiluange",
    userType: "estudante",
    bookTitle: "Banco de Dados: Conceitos e Projeto",
    loanDate: subDays(new Date(), 7),
    dueDate: subDays(new Date(), 1),
    status: "overdue",
    fine: 500,
  },
  {
    id: "7",
    userName: "Pedro Sakaita",
    userType: "estudante",
    bookTitle: "Segurança de Computadores",
    loanDate: subDays(new Date(), 12),
    dueDate: subDays(new Date(), 4),
    status: "overdue",
    fine: 2000,
  },
  {
    id: "8",
    userName: "Luísa Mendes",
    userType: "funcionario",
    bookTitle: "Inteligência Artificial Moderna",
    loanDate: subDays(new Date(), 9),
    dueDate: subDays(new Date(), 2),
    status: "overdue",
    fine: 1000,
  },
];

const mockReturnedLoans: Loan[] = [
  {
    id: "9",
    userName: "Prof. Miguel Santos",
    userType: "docente",
    bookTitle: "Arquitetura de Computadores",
    loanDate: subDays(new Date(), 18),
    dueDate: subDays(new Date(), 3),
    status: "returned",
  },
  {
    id: "10",
    userName: "Teresa Costa",
    userType: "estudante",
    bookTitle: "Compiladores: Princípios e Práticas",
    loanDate: subDays(new Date(), 14),
    dueDate: subDays(new Date(), 9),
    status: "returned",
  },
  {
    id: "11",
    userName: "Roberto Silva",
    userType: "estudante",
    bookTitle: "Desenvolvimento Web com Django",
    loanDate: subDays(new Date(), 10),
    dueDate: subDays(new Date(), 5),
    status: "returned",
  },
];

import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Loans() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: loans, isLoading } = useQuery<Loan[]>({
    queryKey: ["/api/loans"],
  });

  const activeLoans = loans?.filter(l => l.status === "active") || [];
  const overdueLoans = loans?.filter(l => l.status === "active" && new Date(l.dueDate) < new Date()) || [];
  // Note: Backend might return 'overdue' status explicitly if implemented, but currently it returns 'active' with late dates.
  // Actually, backend has getOverdueLoans logic but /api/loans returns all. Let's rely on status or calculation.
  // Wait, my updated /api/loans returns everything.
  // Let's filter client side for now.

  // Actually, let's fix the overdue logic.
  // If status is active and date is past, it's overdue visually, but status might still be 'active' in DB until a job runs or it's checked.
  // The Mock data had explicit 'overdue' status.
  // Let's stick to status from DB for now, but also check dates.

  const returnedLoans = loans?.filter(l => l.status === "returned") || [];

  const handleReturn = async (id: string) => {
    try {
      await apiRequest("POST", `/api/loans/${id}/return`);
      queryClient.invalidateQueries({ queryKey: ["/api/loans"] });
      toast({ title: "Livro devolvido com sucesso" });
    } catch (error) {
      toast({ title: "Erro ao devolver", variant: "destructive" });
    }
  };

  const handleRenew = async (id: string) => {
    try {
      await apiRequest("POST", `/api/loans/${id}/renew`);
      queryClient.invalidateQueries({ queryKey: ["/api/loans"] });
      toast({ title: "Empréstimo renovado com sucesso" });
    } catch (error) {
      toast({ title: "Erro ao renovar", variant: "destructive" });
    }
  };

  const filterLoans = (loansToFilter: Loan[]) =>
    loansToFilter.filter(
      (loan) =>
        loan.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isLoading) {
    return <div className="p-6">Carregando empréstimos...</div>;
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Empréstimos</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie os empréstimos e devoluções de livros
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-scan-barcode">
            <Scan className="h-4 w-4 mr-2" />
            Digitalizar Código
          </Button>
          <Button data-testid="button-new-loan">
            <Plus className="h-4 w-4 mr-2" />
            Novo Empréstimo
          </Button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar por utilizador ou título do livro..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-loans"
        />
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" data-testid="tab-active-loans">
            Empréstimos Ativos ({mockActiveLoans.length})
          </TabsTrigger>
          <TabsTrigger value="overdue" data-testid="tab-overdue-loans">
            Atrasados ({mockOverdueLoans.length})
          </TabsTrigger>
          <TabsTrigger value="returned" data-testid="tab-returned-loans">
            Devolvidos ({mockReturnedLoans.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <LoanTable
            loans={filterLoans(activeLoans)}
            onReturn={handleReturn}
            onRenew={handleRenew}
            onViewUser={(id) => console.log("Ver utilizador:", id)}
          />
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <LoanTable
            loans={filterLoans(overdueLoans)}
            onReturn={handleReturn}
            onRenew={handleRenew}
            onViewUser={(id) => console.log("Ver utilizador:", id)}
          />
        </TabsContent>

        <TabsContent value="returned" className="space-y-4">
          <LoanTable
            loans={filterLoans(returnedLoans)}
            onViewUser={(id) => console.log("Ver utilizador:", id)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
