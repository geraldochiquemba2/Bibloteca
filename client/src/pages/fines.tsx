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
    userName: "Ana Kiluange",
    userEmail: "ana.kiluange@isptec.ao",
    bookTitle: "Banco de Dados: Conceitos e Projeto",
    daysOverdue: 5,
    amount: 2500,
    status: "pending" as const,
    dueDate: subDays(new Date(), 5),
  },
  {
    id: "2",
    userName: "Pedro Sakaita",
    userEmail: "pedro.sakaita@isptec.ao",
    bookTitle: "Segurança de Computadores",
    daysOverdue: 4,
    amount: 2000,
    status: "pending" as const,
    dueDate: subDays(new Date(), 4),
  },
  {
    id: "3",
    userName: "Luísa Mendes",
    userEmail: "luisa.mendes@isptec.ao",
    bookTitle: "Inteligência Artificial Moderna",
    daysOverdue: 2,
    amount: 1000,
    status: "pending" as const,
    dueDate: subDays(new Date(), 2),
  },
  {
    id: "4",
    userName: "Roberto Silva",
    userEmail: "roberto.silva@isptec.ao",
    bookTitle: "Redes de Computadores - 5ª Edição",
    daysOverdue: 3,
    amount: 1500,
    status: "paid" as const,
    dueDate: subDays(new Date(), 15),
  },
  {
    id: "5",
    userName: "Teresa Costa",
    userEmail: "teresa.costa@isptec.ao",
    bookTitle: "Sistemas Operacionais Modernos",
    daysOverdue: 1,
    amount: 500,
    status: "paid" as const,
    dueDate: subDays(new Date(), 12),
  },
];

const statusConfig = {
  pending: { text: "Pendente", color: "bg-chart-3 text-white" },
  paid: { text: "Pago", color: "bg-chart-2 text-white" },
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
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Multas</h1>
        <p className="text-muted-foreground">
          Acompanhe e gerencie as multas por atraso (500 Kz por dia)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{totalPending.toLocaleString()} Kz</div>
            <p className="text-xs text-muted-foreground mt-1">
              De {mockFines.filter((f) => f.status === "pending").length} utilizadores
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pago Este Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPaid.toLocaleString()} Kz</div>
            <p className="text-xs text-muted-foreground mt-1">Cobrado com sucesso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilizadores Bloqueados</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">Multas &gt; 2.000 Kz</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar por utilizador ou livro..."
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
              <TableHead>Utilizador</TableHead>
              <TableHead>Título do Livro</TableHead>
              <TableHead>Data de Devolução</TableHead>
              <TableHead>Dias de Atraso</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Nenhuma multa encontrada
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
                    <span className="text-destructive font-medium">{fine.daysOverdue} dias</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold" data-testid={`text-amount-${fine.id}`}>{fine.amount.toLocaleString()} Kz</span>
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
                        onClick={() => console.log("Marcar como pago:", fine.id)}
                        data-testid={`button-mark-paid-${fine.id}`}
                      >
                        Marcar como Pago
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
