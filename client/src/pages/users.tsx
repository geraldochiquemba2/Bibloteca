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
    name: "Maria Silva",
    email: "maria.silva@isptec.ao",
    type: "estudante" as const,
    currentLoans: 2,
    fines: 0,
    status: "active" as const,
  },
  {
    id: "2",
    name: "João Costa",
    email: "joao.costa@isptec.ao",
    type: "docente" as const,
    currentLoans: 3,
    fines: 0,
    status: "active" as const,
  },
  {
    id: "3",
    name: "Ana Pereira",
    email: "ana.pereira@isptec.ao",
    type: "estudante" as const,
    currentLoans: 1,
    fines: 2500,
    status: "blocked" as const,
  },
  {
    id: "4",
    name: "Carlos Lima",
    email: "carlos.lima@isptec.ao",
    type: "funcionario" as const,
    currentLoans: 1,
    fines: 0,
    status: "active" as const,
  },
  {
    id: "5",
    name: "Pedro Santos",
    email: "pedro.santos@isptec.ao",
    type: "estudante" as const,
    currentLoans: 0,
    fines: 1500,
    status: "active" as const,
  },
];

const userTypeConfig = {
  docente: { text: "Docente", limit: "4 books, 15 days" },
  estudante: { text: "Estudante", limit: "2 books, 5 days" },
  funcionario: { text: "Funcionário", limit: "2 books, 5 days" },
};

const statusConfig = {
  active: { text: "Active", color: "bg-chart-2 text-white" },
  blocked: { text: "Blocked", color: "bg-destructive text-destructive-foreground" },
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
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage library users and their access
          </p>
        </div>
        <Button data-testid="button-add-user">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-users"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-user-type">
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
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
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Current Loans</TableHead>
              <TableHead>Fines</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No users found
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
                      onClick={() => console.log("View user:", user.id)}
                      data-testid={`button-view-${user.id}`}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
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
