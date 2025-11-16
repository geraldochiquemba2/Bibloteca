import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Eye } from "lucide-react";

export type BookLabel = "red" | "yellow" | "white";
export type BookStatus = "available" | "on-loan" | "reserved";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  label: BookLabel;
  status: BookStatus;
  onViewDetails?: (id: string) => void;
  onLoan?: (id: string) => void;
}

const labelConfig = {
  red: { text: "Library Only", color: "bg-destructive text-destructive-foreground" },
  yellow: { text: "1 Day Loan", color: "bg-yellow-500 text-white" },
  white: { text: "5 Day Loan", color: "bg-muted text-muted-foreground" },
};

const statusConfig = {
  available: { text: "Available", color: "bg-chart-2 text-white" },
  "on-loan": { text: "On Loan", color: "bg-chart-3 text-white" },
  reserved: { text: "Reserved", color: "bg-chart-1 text-white" },
};

export function BookCard({
  id,
  title,
  author,
  isbn,
  category,
  label,
  status,
  onViewDetails,
  onLoan,
}: BookCardProps) {
  return (
    <Card className="h-full flex flex-col" data-testid={`card-book-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted flex-shrink-0">
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex gap-1 flex-wrap justify-end">
            <Badge className={labelConfig[label].color} data-testid={`badge-label-${id}`}>
              {labelConfig[label].text}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-base line-clamp-2" data-testid={`text-title-${id}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">
            <span className="font-medium">Author:</span> {author}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">ISBN:</span> {isbn}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">Category:</span> {category}
          </p>
        </div>
        <div className="mt-3">
          <Badge className={statusConfig[status].color} data-testid={`badge-status-${id}`}>
            {statusConfig[status].text}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails?.(id)}
          data-testid={`button-view-${id}`}
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        {status === "available" && label !== "red" && (
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onLoan?.(id)}
            data-testid={`button-loan-${id}`}
          >
            Loan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
