"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, MoreVertical, Edit, Trash, Archive, Eye } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Define API types
interface Api {
  id: string;
  name: string;
  description: string;
  version: string;
  status: "published" | "draft" | "archived";
  category: string;
  pricing: {
    type: "free" | "paid" | "freemium";
    price?: number;
  };
  subscribers: number;
  createdAt: string;
  updatedAt: string;
}
export default function ApisPage() {
  const router = useRouter();
  const [apis, setApis] = useState<Api[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft" | "archived">("all");

  // Filter APIs based on active tab
  const filteredApis = apis.filter(api => {
    if (activeTab === "all") return true;
    return api.status === activeTab;
  });

  // Handle API actions
  const handleViewApi = (id: string) => {
    router.push(`/dashboard/apis/${id}`);
  };

  const handleEditApi = (id: string) => {
    router.push(`/dashboard/apis/${id}/edit`);
  };

  const handlePublishApi = (id: string) => {
    setApis(prevApis => 
      prevApis.map(api => 
        api.id === id ? { ...api, status: "published" } : api
      )
    );
    toast.success("API published successfully");
  };

  const handleArchiveApi = (id: string) => {
    setApis(prevApis => 
      prevApis.map(api => 
        api.id === id ? { ...api, status: "archived" } : api
      )
    );
    toast.success("API archived successfully");
  };

  const handleDeleteApi = (id: string) => {
    setApis(prevApis => prevApis.filter(api => api.id !== id));
    toast.success("API deleted successfully");
  };

  // if (isLoading) {
  //   return <ApisSkeleton />;
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My APIs</h1>
        <Button asChild>
          <Link href="/dashboard/apis/create">
            <Plus className="h-4 w-4 mr-2" />
            Create New API
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All APIs</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredApis.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  {activeTab === "all" 
                    ? "You haven't created any APIs yet."
                    : `You don't have any ${activeTab} APIs.`}
                </p>
                {activeTab !== "all" && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab("all")}
                  >
                    View all APIs
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredApis.map(api => (
                <ApiCard 
                  key={api.id}
                  api={api}
                  onView={() => handleViewApi(api.id)}
                  onEdit={() => handleEditApi(api.id)}
                  onPublish={() => handlePublishApi(api.id)}
                  onArchive={() => handleArchiveApi(api.id)}
                  onDelete={() => handleDeleteApi(api.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// API Card Component
interface ApiCardProps {
  api: Api;
  onView: () => void;
  onEdit: () => void;
  onPublish: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

function ApiCard({ api, onView, onEdit, onPublish, onArchive, onDelete }: ApiCardProps) {
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "archived":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{api.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              v{api.version} • {api.category}
            </p>
          </div>
          <Badge className={getStatusColor(api.status)}>
            {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {api.description}
        </p>
        
        <div className="flex items-center justify-between text-sm mb-4">
          <div>
            <span className="font-medium">{api.subscribers}</span> subscribers
          </div>
          <div>
            {api.pricing.type === "free" ? (
              <span className="text-green-500">Free</span>
            ) : (
              <span>${api.pricing.price}/mo</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Updated {formatDate(api.updatedAt)}
          </p>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onView}
              title="View API"
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="More actions">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                {api.status === "draft" && (
                  <DropdownMenuItem onClick={onPublish}>
                    <Eye className="h-4 w-4 mr-2" />
                    Publish
                  </DropdownMenuItem>
                )}
                {api.status === "published" && (
                  <DropdownMenuItem onClick={onArchive}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={onDelete}
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ApisSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-6 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-24" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 