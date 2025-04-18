"use client";
import React, { useState, useEffect } from "react";
import { SlideUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Search, RefreshCw, Plus, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewSheet } from "../../global/ViewSheet";
import { DeleteDialog } from "../../global/DeleteDialog";
import { useRouter } from "next/navigation";
// Define the Upstream type
interface Upstream {
  id: string;
  name: string;
  updatedAt: string;
  status?: "active" | "inactive" | "pending";
}

// Mock data for upstreams
const mockUpstreams: Upstream[] = [
  {
    id: "up-001",
    name: "Payment Gateway",
    updatedAt: "2023-04-15T10:30:00Z",
    status: "active",
  },
  {
    id: "up-002",
    name: "User Authentication",
    updatedAt: "2023-04-14T15:45:00Z",
    status: "active",
  },
  {
    id: "up-003",
    name: "Notification Service",
    updatedAt: "2023-04-13T09:20:00Z",
    status: "inactive",
  },
  {
    id: "up-004",
    name: "Analytics Engine",
    updatedAt: "2023-04-12T14:15:00Z",
    status: "active",
  },
  {
    id: "up-005",
    name: "Content Delivery",
    updatedAt: "2023-04-11T11:30:00Z",
    status: "pending",
  },
  {
    id: "up-006",
    name: "Database Service",
    updatedAt: "2023-04-10T16:45:00Z",
    status: "active",
  },
  {
    id: "up-007",
    name: "Logging Service",
    updatedAt: "2023-04-09T13:20:00Z",
    status: "active",
  },
  {
    id: "up-008",
    name: "Email Service",
    updatedAt: "2023-04-08T09:15:00Z",
    status: "inactive",
  },
];

export const UpstreamsTable: React.FC = () => {
  // State for search, pagination, and data
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [upstreams, setUpstreams] = useState<Upstream[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const router = useRouter();
  const itemsPerPage = 5;

  // Filter upstreams based on search term and status
  const filteredUpstreams = upstreams.filter((upstream) => {
    const matchesSearch =
      upstream.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upstream.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus
      ? upstream.status === selectedStatus
      : true;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUpstreams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUpstreams = filteredUpstreams.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Fetch data (simulated)
  const fetchData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUpstreams(mockUpstreams);
      setIsLoading(false);
    }, 500);
  };

  // Refresh data
  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setUpstreams([...mockUpstreams].sort(() => Math.random() - 0.5)); // Just to show refresh working
      setIsRefreshing(false);
    }, 800);
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle status filter
  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Get status badge
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            Inactive
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pageNumbers.push("ellipsis-start");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <SlideUp delay={0.1}>
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search upstreams..."
                    className="pl-9 h-9 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => handleStatusFilter(null)}
                      >
                        All Statuses
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusFilter("active")}
                      >
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusFilter("inactive")}
                      >
                        Inactive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusFilter("pending")}
                      >
                        Pending
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={refreshData}
                    disabled={isRefreshing}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        isRefreshing ? "animate-spin" : ""
                      }`}
                    />
                    Refresh
                  </Button>
                  <Button
                    size="sm"
                    className="h-9"
                    onClick={() => router.push("/dashboard/upstreams/create")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Upstream
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="font-medium">ID</TableHead>
                        <TableHead className="font-medium">Name</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">
                          Updated At
                        </TableHead>
                        <TableHead className="text-right font-medium">
                          Operations
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUpstreams.length > 0 ? (
                        paginatedUpstreams.map((upstream) => (
                          <TableRow
                            key={upstream.id}
                            className="hover:bg-muted/50"
                          >
                            <TableCell className="font-medium">
                              {upstream.id}
                            </TableCell>
                            <TableCell>{upstream.name}</TableCell>
                            <TableCell>
                              {getStatusBadge(upstream.status)}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                upstream.updatedAt
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <ViewSheet
                                  data={upstream}
                                  title="Upstream"
                                  onSave={() => {}}
                                  description="Edit the upstream configuration"
                                />
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50"
                                      >
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit details</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <DeleteDialog
                                  title={`Delete Upstream (${upstream.name})`}
                                  description="Are you sure you want to delete this upstream?"
                                  onConfirm={() => {}}
                                  buttonText="Delete"
                                  buttonVariant="destructive"
                                  useIconTrigger={true}
                                  iconTooltip="Delete"
                                  iconClassName="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  iconSize="md"
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-24 text-center text-muted-foreground"
                          >
                            No upstreams found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}-
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredUpstreams.length
                    )}{" "}
                    of {filteredUpstreams.length} upstreams
                  </div>

                  {totalPages > 1 && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>

                        {getPageNumbers().map((pageNumber, index) => {
                          if (
                            pageNumber === "ellipsis-start" ||
                            pageNumber === "ellipsis-end"
                          ) {
                            return (
                              <PaginationItem key={`ellipsis-${index}`}>
                                <span className="flex h-9 w-9 items-center justify-center">
                                  ...
                                </span>
                              </PaginationItem>
                            );
                          }

                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                isActive={currentPage === pageNumber}
                                onClick={() =>
                                  handlePageChange(pageNumber as number)
                                }
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
};

export default UpstreamsTable;
