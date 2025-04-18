
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";
import { ThemeSelector } from "./ThemeSelector";

export const ThemeShowcase = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="space-y-6 py-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Current Theme: {currentTheme.label}
        </h2>
        <p className="text-muted-foreground mb-4">
          Experience how your selected theme affects the UI components
        </p>
        <div className="flex justify-center mb-8">
          <ThemeSelector />
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>This is how cards look in this theme</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Cards are used to group related content and actions.</p>
          </CardContent>
          <CardFooter>
            <Button>Primary Action</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Buttons & Badges</CardTitle>
            <CardDescription>Interactive elements styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Colors Palette</CardTitle>
            <CardDescription>Theme color showcase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary"></div>
                <span className="text-xs">Primary</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-secondary"></div>
                <span className="text-xs">Secondary</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-accent"></div>
                <span className="text-xs">Accent</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <span className="text-xs">Muted</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
