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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//todo: remove mock functionality
const mockUsers = [
  {
    id: "1",
    name: "Maria Nzinga",
    email: "maria.nzinga@isptec.ao",
    type: "estudante" as const,
    currentLoans: 2,
    fines: 0,
    status: "active" as const,
  },
  {
    id: "2",
    name: "Prof. António Cassoma",
    email: "antonio.cassoma@isptec.ao",
    type: "docente" as const,
    currentLoans: 3,
    fines: 0,
    status: "active" as const,
  },
  {
    id: "3",
    name: "Ana Kiluange",
    email: "ana.kiluange@isptec.ao",
    type: "estudante" as const,
    currentLoans: 1,
    fines: 2500,
    status: "blocked" as const,
  },
  {
    id: "4",
    name: "Carlos Mateus",
    email: "carlos.mateus@isptec.ao",
    type: "funcionario" as const,
    currentLoans: 1,
    fines: 0,
    status: "active" as const,
  },
  {
    id: "5",
    name: "Pedro Sakaita",
    email: "pedro.sakaita@isptec.ao",
    type: "estudante" as const,
    currentLoans: 0,
    fines: 1500,
    status: "active" as const,
  },
  {
    id: "6",
    name: "Prof. Sara Fernandes",
    email: "sara.fernandes@isptec.ao",
    type: "docente" as const,
    currentLoans: 4,
    fines: 0,
    status: "active" as const,
  },
  {
    id: "7",
    name: "João Domingos",
    email: "joao.domingos@isptec.ao",
    type: "estudante" as const,
    currentLoans: 1,
    fines: 0,
    status: "active" as const,
  },
  {
    id: "8",
    name: "Luísa Mendes",
    email: "luisa.mendes@isptec.ao",
    type: "funcionario" as const,
    currentLoans: 2,
    fines: 500,
    status: "active" as const,
  },
];

const userTypeConfig = {
  docente: { text: "Docente", limit: "4 livros, 15 dias" },
  estudante: { text: "Estudante", limit: "2 livros, 5 dias" },
  funcionario: { text: "Funcionário", limit: "2 livros, 5 dias" },
};

const statusConfig = {
  active: { text: "Ativo", color: "bg-chart-2 text-white" },
  blocked: { text: "Bloqueado", color: "bg-destructive text-destructive-foreground" },
};

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || user.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Utilizadores</h1>
          <p className="text-muted-foreground">
            Gerencie os utilizadores da biblioteca e seus acessos
          </p>
        </div>
        <Button data-testid="button-add-user">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Utilizador
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome ou email..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-users"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-user-type">
            <SelectValue placeholder="Tipo de Utilizador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="docente">Docente</SelectItem>
            <SelectItem value="estudante">Estudante</SelectItem>
            <SelectItem value="funcionario">Funcionário</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilizador</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Empréstimos Atuais</TableHead>
              <TableHead>Multas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Nenhum utilizador encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} data-testid={`row-user-${user.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium" data-testid={`text-name-${user.id}`}>{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium capitalize">{userTypeConfig[user.type].text}</div>
                      <div className="text-xs text-muted-foreground">
                        {userTypeConfig[user.type].limit}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell data-testid={`text-loans-${user.id}`}>{user.currentLoans}</TableCell>
                  <TableCell>
                    {user.fines > 0 ? (
                      <span className="text-destructive font-medium" data-testid={`text-fines-${user.id}`}>
                        {user.fines} Kz
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[user.status].color} data-testid={`badge-status-${user.id}`}>
                      {statusConfig[user.status].text}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => console.log("Ver utilizador:", user.id)}
                      data-testid={`button-view-${user.id}`}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
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
