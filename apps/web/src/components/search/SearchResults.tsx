import { ApiCard } from "@/components/apis/ApiCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { allApis } from "@/data/mockData";

interface SearchResultsProps {
  results: typeof allApis;
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export const SearchResults = ({
  results,
  pagination,
  onPageChange,
}: SearchResultsProps) => {
  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    let startPage = Math.max(1, pagination.page - Math.floor(maxVisible / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxVisible - 1);

    // Adjust startPage to show maxVisible pages
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Add first page
    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );

      // Add ellipsis if there's a gap
      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <span className="flex h-9 w-9 items-center justify-center">
              ...
            </span>
          </PaginationItem>
        );
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={pagination.page === i}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add last page
    if (endPage < pagination.totalPages) {
      // Add ellipsis if there's a gap
      if (endPage < pagination.totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <span className="flex h-9 w-9 items-center justify-center">
              ...
            </span>
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => onPageChange(pagination.totalPages)}>
            {pagination.totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm">
        Showing <span className="font-medium">{results.length}</span> results of{" "}
        <span className="font-medium">{pagination.total}</span>
      </div>

      {results.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium mb-2">No APIs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((api) => (
            <ApiCard key={api.id} api={api} />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
                className={
                  pagination.page <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  onPageChange(
                    Math.min(pagination.totalPages, pagination.page + 1)
                  )
                }
                className={
                  pagination.page >= pagination.totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
