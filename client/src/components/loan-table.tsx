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
import { format, differenceInDays } from "date-fns";

export interface Loan {
  id: string;
  userName: string;
  userType: "docente" | "estudante" | "funcionario";
  bookTitle: string;
  loanDate: Date;
  dueDate: Date;
  status: "active" | "overdue" | "returned";
  fine?: number;
}

interface LoanTableProps {
  loans: Loan[];
  onReturn?: (loanId: string) => void;
  onRenew?: (loanId: string) => void;
  onViewUser?: (loanId: string) => void;
}

const statusConfig = {
  active: { text: "Ativo", color: "bg-chart-2 text-white" },
  overdue: { text: "Atrasado", color: "bg-destructive text-destructive-foreground" },
  returned: { text: "Devolvido", color: "bg-muted text-muted-foreground" },
};

export function LoanTable({ loans, onReturn, onRenew, onViewUser }: LoanTableProps) {
  const getDaysRemaining = (dueDate: Date) => {
    const days = differenceInDays(dueDate, new Date());
    return days;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utilizador</TableHead>
            <TableHead>Título do Livro</TableHead>
            <TableHead>Data de Empréstimo</TableHead>
            <TableHead>Data de Devolução</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Multa</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                Nenhum empréstimo encontrado
              </TableCell>
            </TableRow>
          ) : (
            loans.map((loan) => {
              const daysRemaining = getDaysRemaining(loan.dueDate);
              return (
                <TableRow key={loan.id} data-testid={`row-loan-${loan.id}`}>
                  <TableCell>
                    <div>
                      <div className="font-medium" data-testid={`text-user-${loan.id}`}>{loan.userName}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {loan.userType}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell data-testid={`text-book-${loan.id}`}>{loan.bookTitle}</TableCell>
                  <TableCell>{format(loan.loanDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <div>
                      <div>{format(loan.dueDate, "dd/MM/yyyy")}</div>
                      {loan.status === "active" && (
                        <div className={`text-xs ${daysRemaining < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                          {daysRemaining < 0
                            ? `${Math.abs(daysRemaining)} dias de atraso`
                            : `${daysRemaining} dias restantes`}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[loan.status].color} data-testid={`badge-status-${loan.id}`}>
                      {statusConfig[loan.status].text}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {loan.fine ? (
                      <span className="text-destructive font-medium" data-testid={`text-fine-${loan.id}`}>
                        {loan.fine} Kz
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      {loan.status === "active" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRenew?.(loan.id)}
                            data-testid={`button-renew-${loan.id}`}
                          >
                            Renovar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => onReturn?.(loan.id)}
                            data-testid={`button-return-${loan.id}`}
                          >
                            Devolver
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewUser?.(loan.id)}
                        data-testid={`button-view-user-${loan.id}`}
                      >
                        Ver Utilizador
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
