import { BookCard } from "../book-card";

export default function BookCardExample() {
  return (
    <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      <BookCard
        id="1"
        title="Engenharia de Software: Uma Abordagem Moderna"
        author="Roger Pressman"
        isbn="978-8563308337"
        category="Computer Science"
        label="white"
        status="available"
        onViewDetails={(id) => console.log("View:", id)}
        onLoan={(id) => console.log("Loan:", id)}
      />
      <BookCard
        id="2"
        title="Algoritmos e Estruturas de Dados"
        author="Thomas Cormen"
        isbn="978-8535236996"
        category="Computer Science"
        label="yellow"
        status="on-loan"
        onViewDetails={(id) => console.log("View:", id)}
      />
      <BookCard
        id="3"
        title="Introdução à Teoria da Computação"
        author="Michael Sipser"
        isbn="978-8522106868"
        category="Theory"
        label="red"
        status="available"
        onViewDetails={(id) => console.log("View:", id)}
      />
    </div>
  );
}
