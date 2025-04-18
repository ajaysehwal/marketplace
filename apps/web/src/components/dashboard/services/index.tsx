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
import { Pencil, Search, RefreshCw, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewSheet } from "../../global/ViewSheet";
import { DeleteDialog } from "../../global/DeleteDialog";
import { useRouter } from "next/navigation";

// Define the Service type
interface Service {
  id: string;
  name: string;
  description: string;
}

// Mock data for services
const mockServices: Service[] = [
  {
    id: "svc-001",
    name: "User Management",
    description: "Handles user authentication and authorization",
  },
  {
    id: "svc-002",
    name: "Payment Processing",
    description: "Processes payments and transactions",
  },
  {
    id: "svc-003",
    name: "Notification Service",
    description: "Sends notifications and alerts to users",
  },
  {
    id: "svc-004",
    name: "Analytics Engine",
    description: "Processes and analyzes user data",
  },
  {
    id: "svc-005",
    name: "Content Delivery",
    description: "Manages content distribution and delivery",
  },
  {
    id: "svc-006",
    name: "Search Service",
    description: "Provides search functionality across the platform",
  },
  {
    id: "svc-007",
    name: "Logging Service",
    description: "Handles system logging and monitoring",
  },
  {
    id: "svc-008",
    name: "Email Service",
    description: "Manages email communications",
  },
];

export const Services: React.FC = () => {
  // State for search, pagination, and data
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const itemsPerPage = 5;

  // Filter services based on search term
  const filteredServices = services.filter((service) => {
    return (
      service.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Fetch data (simulated)
  const fetchData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setServices(mockServices);
      setIsLoading(false);
    }, 500);
  };

  // Refresh data
  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setServices([...mockServices].sort(() => Math.random() - 0.5));
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
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    <div className="container mx-auto py-2 px-4">
      <SlideUp delay={0.1}>
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    className="pl-9 h-9 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-2">
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
                    onClick={() => router.push("/dashboard/services/create")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
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
                        <TableHead className="font-medium">
                          Description
                        </TableHead>
                        <TableHead className="text-right font-medium">
                          Operations
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedServices.length > 0 ? (
                        paginatedServices.map((service) => (
                          <TableRow
                            key={service.id}
                            className="hover:bg-muted/50"
                          >
                            <TableCell className="font-medium">
                              {service.id}
                            </TableCell>
                            <TableCell>{service.name}</TableCell>
                            <TableCell>{service.description}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <ViewSheet
                                  data={service}
                                  title="Service"
                                  onSave={() => {}}
                                  description="Edit the service configuration"
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
                                  title={`Delete Service (${service.name})`}
                                  description="Are you sure you want to delete this service?"
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
                            colSpan={4}
                            className="h-24 text-center text-muted-foreground"
                          >
                            No services found.
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
                      filteredServices.length
                    )}{" "}
                    of {filteredServices.length} services
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

export default Services;
