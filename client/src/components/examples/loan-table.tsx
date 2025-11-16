import { LoanTable } from "../loan-table";
import { addDays, subDays } from "date-fns";

export default function LoanTableExample() {
  const mockLoans = [
    {
      id: "1",
      userName: "Maria Silva",
      userType: "estudante" as const,
      bookTitle: "Engenharia de Software",
      loanDate: subDays(new Date(), 3),
      dueDate: addDays(new Date(), 2),
      status: "active" as const,
    },
    {
      id: "2",
      userName: "Ana Pereira",
      userType: "estudante" as const,
      bookTitle: "Redes de Computadores",
      loanDate: subDays(new Date(), 8),
      dueDate: subDays(new Date(), 2),
      status: "overdue" as const,
      fine: 1000,
    },
  ];

  return (
    <div className="p-6">
      <LoanTable
        loans={mockLoans}
        onReturn={(id) => console.log("Return:", id)}
        onRenew={(id) => console.log("Renew:", id)}
        onViewUser={(id) => console.log("View user:", id)}
      />
    </div>
  );
}
