import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Users, BookOpen, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

//todo: remove mock functionality
const mockReports = {
  utilization: {
    totalBooks: 3842,
    activeLoans: 247,
    utilizationRate: 6.4,
    neverBorrowed: 518,
  },
  topCategories: [
    { name: "Ciência da Computação", loans: 189, percentage: 38 },
    { name: "Engenharia de Software", loans: 156, percentage: 31 },
    { name: "Redes e Sistemas", loans: 87, percentage: 17 },
    { name: "Matemática", loans: 42, percentage: 9 },
    { name: "Outros", loans: 26, percentage: 5 },
  ],
  userActivity: {
    mostActive: [
      { name: "Prof. António Cassoma", loans: 67, type: "Docente" },
      { name: "Maria Nzinga", loans: 54, type: "Estudante" },
      { name: "Prof. Sara Fernandes", loans: 48, type: "Docente" },
      { name: "João Domingos", loans: 42, type: "Estudante" },
      { name: "Carlos Mateus", loans: 38, type: "Funcionário" },
    ],
  },
  financial: {
    totalFines: 87500,
    paidFines: 62000,
    pendingFines: 25500,
    blockedUsers: 1,
  },
};

export default function Reports() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios e Análises</h1>
          <p className="text-muted-foreground">
            Métricas de desempenho e estatísticas da biblioteca
          </p>
        </div>
        <Button data-testid="button-export-report">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Utilização</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.utilization.utilizationRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockReports.utilization.activeLoans} de {mockReports.utilization.totalBooks.toLocaleString()} livros
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nunca Emprestados</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.utilization.neverBorrowed}</div>
            <p className="text-xs text-muted-foreground mt-1">Livros sem empréstimo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Multas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.financial.totalFines.toLocaleString()} Kz</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockReports.financial.paidFines.toLocaleString()} Kz cobrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilizadores Bloqueados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.financial.blockedUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Por multas pendentes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Principais Categorias por Empréstimos</CardTitle>
            <CardDescription>Categorias de livros mais populares este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.topCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium truncate">{category.name}</p>
                      <span className="text-sm text-muted-foreground ml-2">
                        {category.loans} empréstimos
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
            <CardTitle>Utilizadores Mais Ativos</CardTitle>
            <CardDescription>Top 5 utilizadores por número de empréstimos</CardDescription>
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
                    <p className="text-xs text-muted-foreground">empréstimos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
          <CardDescription>Cobrança de multas e valores pendentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total de Multas Emitidas</p>
              <p className="text-3xl font-bold">{mockReports.financial.totalFines.toLocaleString()} Kz</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Multas Pagas</p>
              <p className="text-3xl font-bold text-chart-2">{mockReports.financial.paidFines.toLocaleString()} Kz</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((mockReports.financial.paidFines / mockReports.financial.totalFines) * 100).toFixed(1)}% taxa de cobrança
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Multas Pendentes</p>
              <p className="text-3xl font-bold text-destructive">{mockReports.financial.pendingFines.toLocaleString()} Kz</p>
              <p className="text-xs text-muted-foreground mt-1">
                {mockReports.financial.blockedUsers} utilizadores bloqueados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
