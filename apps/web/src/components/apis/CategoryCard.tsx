
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, CloudCog, BarChart, Database, FileJson, MessageSquareText, Shield, ShoppingCart, Camera, Globe, CreditCard, Activity } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    iconName: string;
    count: number;
    color: string;
  };
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const renderIcon = () => {
    switch (category.iconName) {
      case "CreditCard":
        return <CreditCard className="w-6 h-6 text-white" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-white" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 text-white" />;
      case "CloudCog":
        return <CloudCog className="w-6 h-6 text-white" />;
      case "BarChart":
        return <BarChart className="w-6 h-6 text-white" />;
      case "Database":
        return <Database className="w-6 h-6 text-white" />;
      case "FileJson":
        return <FileJson className="w-6 h-6 text-white" />;
      case "MessageSquareText":
        return <MessageSquareText className="w-6 h-6 text-white" />;
      case "Shield":
        return <Shield className="w-6 h-6 text-white" />;
      case "ShoppingCart":
        return <ShoppingCart className="w-6 h-6 text-white" />;
      case "Camera":
        return <Camera className="w-6 h-6 text-white" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Link to={`/category/${category.id}`}>
        <Card className="overflow-hidden cursor-pointer card-hover">
          <CardContent className="p-6 flex items-center">
            <div 
              className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${category.color}`}
            >
              {renderIcon()}
            </div>
            <div className="ml-4">
              <h3 className="font-medium">{category.name}</h3>
              <Badge variant="secondary" className="mt-1">
                {category.count} APIs
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
