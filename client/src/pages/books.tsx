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
    title: "Engenharia de Software: Uma Abordagem Moderna",
    author: "Roger Pressman",
    isbn: "978-8563308337",
    category: "Computer Science",
    label: "white" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "2",
    title: "Algoritmos e Estruturas de Dados",
    author: "Thomas Cormen",
    isbn: "978-8535236996",
    category: "Computer Science",
    label: "white" as BookLabel,
    status: "on-loan" as BookStatus,
  },
  {
    id: "3",
    title: "Redes de Computadores",
    author: "Andrew Tanenbaum",
    isbn: "978-8582605592",
    category: "Networking",
    label: "yellow" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "4",
    title: "Introdução à Teoria da Computação",
    author: "Michael Sipser",
    isbn: "978-8522106868",
    category: "Theory",
    label: "red" as BookLabel,
    status: "available" as BookStatus,
  },
  {
    id: "5",
    title: "Sistemas Operacionais Modernos",
    author: "Andrew Tanenbaum",
    isbn: "978-8543020631",
    category: "Operating Systems",
    label: "white" as BookLabel,
    status: "reserved" as BookStatus,
  },
  {
    id: "6",
    title: "Banco de Dados: Projeto e Implementação",
    author: "Carlos Alberto Heuser",
    isbn: "978-8577803828",
    category: "Databases",
    label: "white" as BookLabel,
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
          <h1 className="text-3xl font-bold tracking-tight">Book Catalog</h1>
          <p className="text-muted-foreground">
            Browse and manage library collection
          </p>
        </div>
        <Button data-testid="button-add-book">
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, author, or ISBN..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-books"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="on-loan">On Loan</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={labelFilter} onValueChange={setLabelFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-label-filter">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Label" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Labels</SelectItem>
            <SelectItem value="white">5 Day Loan</SelectItem>
            <SelectItem value="yellow">1 Day Loan</SelectItem>
            <SelectItem value="red">Library Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline" className="text-xs">
          Total: {filteredBooks.length} books
        </Badge>
        <Badge variant="outline" className="text-xs">
          Available: {filteredBooks.filter((b) => b.status === "available").length}
        </Badge>
        <Badge variant="outline" className="text-xs">
          On Loan: {filteredBooks.filter((b) => b.status === "on-loan").length}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            onViewDetails={(id) => console.log("View details:", id)}
            onLoan={(id) => console.log("Create loan:", id)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
