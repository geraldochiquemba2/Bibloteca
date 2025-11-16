import { useState } from "react";
import { BookCard, type BookLabel, type BookStatus } from "@/components/book-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

//todo: remove mock functionality
const mockBooks = [
  {
    id: "1",
    title: "Fundamentos de Engenharia de Software",
    author: "Roger S. Pressman",
    isbn: "978-85-8055-933-7",
    category: "Engenharia de Software",
    label: "white" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "2",
    title: "Algoritmos: Teoria e Prática",
    author: "Thomas H. Cormen",
    isbn: "978-85-352-3699-6",
    category: "Ciência da Computação",
    label: "white" as BookLabel,
    status: "on-loan" as BookStatus,
  },
  {
    id: "3",
    title: "Redes de Computadores - 6ª Edição",
    author: "Andrew S. Tanenbaum",
    isbn: "978-85-8260-559-2",
    category: "Redes de Computadores",
    label: "yellow" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "4",
    title: "Introdução à Teoria da Computação",
    author: "Michael Sipser",
    isbn: "978-85-221-0686-8",
    category: "Teoria da Computação",
    label: "red" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "5",
    title: "Sistemas Operacionais Modernos",
    author: "Andrew S. Tanenbaum",
    isbn: "978-85-4302-063-1",
    category: "Sistemas Operacionais",
    label: "white" as BookLabel,
    status: "reserved" as BookStatus,
  },
  {
    id: "6",
    title: "Projeto e Implementação de Bases de Dados",
    author: "Carlos Alberto Heuser",
    isbn: "978-85-7780-382-8",
    category: "Bases de Dados",
    label: "white" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "7",
    title: "Introdução à Programação em Python",
    author: "Nilo Ney Coutinho Menezes",
    isbn: "978-85-7522-718-3",
    category: "Programação",
    label: "white" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "8",
    title: "Padrões de Projetos: Soluções Reutilizáveis",
    author: "Erich Gamma",
    isbn: "978-85-7780-701-7",
    category: "Engenharia de Software",
    label: "yellow" as BookLabel,
    status: "on-loan" as BookStatus,
  },
  {
    id: "9",
    title: "Arquitetura de Computadores",
    author: "José Delgado",
    isbn: "978-972-722-756-4",
    category: "Hardware",
    label: "red" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "10",
    title: "Inteligência Artificial: Uma Abordagem Moderna",
    author: "Stuart Russell",
    isbn: "978-85-216-2936-0",
    category: "Inteligência Artificial",
    label: "white" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "11",
    title: "Segurança de Computadores: Princípios e Práticas",
    author: "William Stallings",
    isbn: "978-85-4301-918-5",
    category: "Segurança da Informação",
    label: "white" as BookLabel,
    status: "reserved" as BookStatus,
  },
  {
    id: "12",
    title: "Desenvolvimento Web com Django",
    author: "Osvaldo Santana Neto",
    isbn: "978-85-7522-566-0",
    category: "Desenvolvimento Web",
    label: "yellow" as BookLabel,
    status: "available" as BookStatus,
  },
];

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [labelFilter, setLabelFilter] = useState<string>("all");

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    const matchesLabel = labelFilter === "all" || book.label === labelFilter;
    return matchesSearch && matchesStatus && matchesLabel;
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo de Livros</h1>
          <p className="text-muted-foreground">
            Explore e gerencie o acervo da biblioteca
          </p>
        </div>
        <Button data-testid="button-add-book">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Livro
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por título, autor ou ISBN..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-books"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Estados</SelectItem>
            <SelectItem value="available">Disponível</SelectItem>
            <SelectItem value="on-loan">Emprestado</SelectItem>
            <SelectItem value="reserved">Reservado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={labelFilter} onValueChange={setLabelFilter}>
          <SelectTrigger className="w-[200px]" data-testid="select-label-filter">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Etiqueta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Etiquetas</SelectItem>
            <SelectItem value="white">Empréstimo 5 Dias</SelectItem>
            <SelectItem value="yellow">Empréstimo 1 Dia</SelectItem>
            <SelectItem value="red">Apenas Biblioteca</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline" className="text-xs">
          Total: {filteredBooks.length} livros
        </Badge>
        <Badge variant="outline" className="text-xs">
          Disponíveis: {filteredBooks.filter((b) => b.status === "available").length}
        </Badge>
        <Badge variant="outline" className="text-xs">
          Emprestados: {filteredBooks.filter((b) => b.status === "on-loan").length}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            onViewDetails={(id) => console.log("Ver detalhes:", id)}
            onLoan={(id) => console.log("Criar empréstimo:", id)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum livro encontrado com os critérios selecionados</p>
        </div>
      )}
    </div>
  );
}
