
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, Star, Code } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ApiCardProps {
  api: {
    id: string;
    name: string;
    description: string;
    category: string;
    provider: {
      name: string;
      avatar: string;
      verified?: boolean;
    };
    pricing: "free" | "freemium" | "paid";
    users: number;
    rating: number;
    updated: string;
    endpoints: number;
  };
}

const formatNumberWithK = (num: number) => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
};

export const ApiCard = ({ api }: ApiCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Link href={`/api/${api.id}`}>
        <Card className="h-full cursor-pointer card-hover">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <Badge variant={api.pricing === 'free' ? 'secondary' : 'default'} className="mb-2">
                {api.pricing === 'free' ? 'FREE' : api.pricing === 'freemium' ? 'FREEMIUM' : 'PAID'}
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 mr-1" />
                      <span className="text-sm">{api.rating.toFixed(1)}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rating: {api.rating.toFixed(1)}/5</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardTitle className="text-lg font-semibold line-clamp-1">{api.name}</CardTitle>
            <div className="flex items-center mt-1">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={api.provider.avatar} alt={api.provider.name} />
                <AvatarFallback>{api.provider.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardDescription className="line-clamp-1">
                {api.provider.name}
              </CardDescription>
              {api.provider.verified && (
                <Badge variant="outline" className="ml-2 h-5 px-1 bg-blue-500/10 text-blue-500 border-blue-500/20">
                  Verified
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2 h-10">
              {api.description}
            </p>
          </CardContent>
          <CardFooter className="grid grid-cols-3 gap-4 pt-0">
            <div className="flex flex-col items-center text-center">
              <Users className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs font-medium">{formatNumberWithK(api.users)}</span>
              <span className="text-xs text-muted-foreground">Users</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Code className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs font-medium">{api.endpoints}</span>
              <span className="text-xs text-muted-foreground">Endpoints</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs font-medium">{api.updated}</span>
              <span className="text-xs text-muted-foreground">Updated</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};
