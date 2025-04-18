import React from "react";
import { DashboardStats, ApiData } from "../types";
import { SlideUp, StaggerContainer, CardHover } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Globe,
  Activity,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  LucideIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockApis, mockUsages } from "../mocks/mockData";

export const Dashboard: React.FC = () => {
  const apis = mockApis;
  const usages = mockUsages;

  const stats: DashboardStats = {
    totalApis: apis.length,
    publishedApis: apis.filter((api) => api.status === "published").length,
    totalRequests: apis.reduce((sum, api) => sum + api.requests, 0),
    activeConsumers: usages.filter((usage) => usage.status === "active").length,
    averageRating: apis.reduce((sum, api) => sum + api.rating, 0) / apis.length,
  };

  const draftApis = apis.filter((api) => api.status === "draft");

  // Calculate completion percentage for each API
  const getApiCompletion = (api: ApiData) => {
    // This is a mock calculation - in a real app, you'd check actual fields
    const requiredFields = [
      "name",
      "version",
      "description",
      "endpoints",
      "authentication",
    ];
    const completedFields = requiredFields.filter(
      (field) =>
        api[field as keyof ApiData] &&
        String(api[field as keyof ApiData]).length > 0
    );
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
  }: {
    title: string;
    value: number | string;
    icon: LucideIcon;
    trend?: "up" | "down";
    trendValue?: string;
  }) => (
    <CardHover>
      <div className="p-6 rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && trendValue && (
              <div
                className={`flex items-center mt-2 text-sm ${
                  trend === "up" ? "text-success" : "text-destructive"
                }`}
              >
                {trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {trendValue}
              </div>
            )}
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </CardHover>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SlideUp delay={0.1}>
            <StatCard
              title="Total APIs"
              value={stats.totalApis}
              icon={Globe}
              trend="up"
              trendValue="12% from last month"
            />
          </SlideUp>
          <SlideUp delay={0.2}>
            <StatCard
              title="Published APIs"
              value={stats.publishedApis}
              icon={Activity}
              trend="up"
              trendValue="8% from last month"
            />
          </SlideUp>
          <SlideUp delay={0.3}>
            <StatCard
              title="Active Consumers"
              value={stats.activeConsumers}
              icon={Users}
              trend="up"
              trendValue="15% from last month"
            />
          </SlideUp>
          <SlideUp delay={0.4}>
            <StatCard
              title="Average Rating"
              value={stats.averageRating.toFixed(1)}
              icon={Star}
              trend="up"
              trendValue="0.3 from last month"
            />
          </SlideUp>
        </div>

        <div className="mt-8">
          <SlideUp delay={0.5}>
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Total API Requests</h2>
              <div className="text-3xl font-bold text-primary">
                {stats.totalRequests.toLocaleString()}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Across all your published APIs
              </div>
            </div>
          </SlideUp>
        </div>

        {draftApis.length > 0 && (
          <div className="mt-8">
            <SlideUp delay={0.6}>
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Draft APIs</h2>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {draftApis.length} in progress
                  </Badge>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {draftApis.map((api) => {
                      const completion = getApiCompletion(api);
                      return (
                        <TableRow key={api.id}>
                          <TableCell className="font-medium">
                            {api.name}
                          </TableCell>
                          <TableCell>{api.version}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={completion}
                                className="h-2 w-24"
                              />
                              <span className="text-xs text-muted-foreground">
                                {completion}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(api.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              Draft
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" className="h-8">
                              <FileText className="w-4 h-4 mr-1" />
                              Complete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </SlideUp>
          </div>
        )}

        <div className="mt-8">
          <SlideUp delay={0.7}>
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                API Publishing Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium">Complete Documentation</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ensure your API has comprehensive documentation with
                      examples and clear descriptions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-medium">Version Your APIs</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Use semantic versioning to manage API changes and maintain
                      backward compatibility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <ExternalLink className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Test Before Publishing</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Run thorough tests to ensure your API works as expected
                      before making it public.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Monitor Usage</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track API usage patterns to identify potential
                      improvements and optimize performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>
      </StaggerContainer>
    </div>
  );
};
