import { StatsCard } from "@/components/stats-card";
import { LoanTable, type Loan } from "@/components/loan-table";
import { BookOpen, Users, AlertCircle, BookCopy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addDays, subDays } from "date-fns";

//todo: remove mock functionality
const mockLoans: Loan[] = [
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
    userName: "Ana Kiluange",
    userType: "estudante",
    bookTitle: "Redes de Computadores - 5ª Edição",
    loanDate: subDays(new Date(), 7),
    dueDate: subDays(new Date(), 1),
    status: "overdue",
    fine: 500,
  },
];

const mockMostBorrowed = [
  { title: "Fundamentos de Engenharia de Software", count: 67, category: "Engenharia de Software" },
  { title: "Algoritmos: Teoria e Prática", count: 54, category: "Ciência da Computação" },
  { title: "Sistemas Operacionais Modernos", count: 48, category: "Sistemas Operacionais" },
  { title: "Banco de Dados: Conceitos e Projeto", count: 42, category: "Bases de Dados" },
  { title: "Análise e Projeto de Sistemas", count: 38, category: "Engenharia de Software" },
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel Principal</h1>
        <p className="text-muted-foreground">
          Visão geral das operações e estatísticas da biblioteca
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Livros"
          value="3.842"
          icon={BookOpen}
          description="No acervo"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Empréstimos Ativos"
          value="247"
          icon={BookCopy}
          description="Atualmente emprestados"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Multas Pendentes"
          value="87.500 Kz"
          icon={AlertCircle}
          description="De 34 utilizadores"
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard
          title="Utilizadores Totais"
          value="1.856"
          icon={Users}
          description="Contas ativas"
          trend={{ value: 18, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Livros Mais Emprestados</CardTitle>
            <CardDescription>Top 5 livros este mês</CardDescription>
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
                    <p className="text-xs text-muted-foreground">empréstimos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimos eventos da biblioteca</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Empréstimo", user: "Maria Nzinga", book: "Python Avançado", time: "há 2h" },
                { action: "Devolução", user: "João Domingos", book: "Redes TCP/IP", time: "há 3h" },
                { action: "Multa Paga", user: "Ana Kiluange", amount: "2.500 Kz", time: "há 4h" },
                { action: "Reserva", user: "Pedro Sakaita", book: "Java Enterprise", time: "há 5h" },
                { action: "Empréstimo", user: "Carlos Mateus", book: "Linux Essentials", time: "há 1d" },
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
          <CardTitle>Próximas Devoluções</CardTitle>
          <CardDescription>Livros com devolução prevista nos próximos 7 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <LoanTable
            loans={mockLoans}
            onReturn={(id) => console.log("Devolver empréstimo:", id)}
            onRenew={(id) => console.log("Renovar empréstimo:", id)}
            onViewUser={(id) => console.log("Ver utilizador:", id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
