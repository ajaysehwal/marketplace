import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Pencil, FileJson, FileCode, Eye } from "lucide-react";
import { MonacoEditor } from "@/components/editor";
import { yamlToJson, jsonToYaml } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type EditorMode = "json" | "yaml";

interface ViewSheetProps<T> {
  data: T;
  title: string;
  description?: string;
  onSave: (data: T) => void;
  trigger?: React.ReactNode;
  className?: string;
  defaultMode?: EditorMode;
  readOnly?: boolean;
  validateData?: (data: T) => boolean;
  customActions?: React.ReactNode;
}

export function ViewSheet<T extends Record<string, any>>({
  data,
  title,
  description,
  onSave,
  trigger,
  className,
  defaultMode = "json",
  readOnly = false,
  validateData,
  customActions,
}: ViewSheetProps<T>) {
  const [editMode, setEditMode] = useState<EditorMode>(defaultMode);
  const [editedData, setEditedData] = useState<T>(data);
  const [jsonValue, setJsonValue] = useState<string>(
    JSON.stringify(data, null, 2)
  );
  const [yamlValue, setYamlValue] = useState<string>(
    jsonToYaml(data)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when data changes
  useEffect(() => {
    setEditedData(data);
    setJsonValue(JSON.stringify(data, null, 2));
    setYamlValue(jsonToYaml(data));
    setError(null);
  }, [data]);

  // Handle JSON editor changes
  const handleJsonChange = (value: string | undefined) => {
    if (value) {
      setJsonValue(value);
      try {
        const parsed = JSON.parse(value);
        setEditedData(parsed);
        setError(null);
        // Update YAML when JSON changes
        try {
          setYamlValue(jsonToYaml(parsed));
        } catch (yamlError) {
          console.warn("Error converting to YAML:", yamlError);
          // Don't set error here as JSON is still valid
        }
      } catch (error) {
        setError("Invalid JSON format");
        console.warn("Invalid JSON", error);
      }
    }
  };

  // Handle YAML editor changes
  const handleYamlChange = (value: string | undefined) => {
    if (value) {
      setYamlValue(value);
      try {
        // Only try to parse if the YAML is not empty
        if (value.trim()) {
          const parsed = yamlToJson(value);
          setEditedData(parsed);
          setError(null);
          // Update JSON when YAML changes
          setJsonValue(JSON.stringify(parsed, null, 2));
        } else {
          // Empty YAML is considered valid
          setError(null);
        }
      } catch (error) {
        setError("Invalid YAML format");
        console.warn("Invalid YAML", error);
      }
    }
  };

  // Handle save
  const handleSave = () => {
    if (validateData && !validateData(editedData)) {
      setError("Invalid data format");
      return;
    }
    onSave(editedData);
    setIsOpen(false);
  };

  // Handle format change
  const handleFormatChange = (value: EditorMode) => {
    setEditMode(value);
    setError(null);
  };

  const defaultTrigger = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View {title.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || defaultTrigger}
      </SheetTrigger>
      <SheetContent className="sm:max-w-[800px] overflow-y-auto p-6">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription className="text-base">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Select 
              value={editMode} 
              onValueChange={handleFormatChange}
              disabled={readOnly}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json" className="flex items-center gap-2">
                  <span>JSON</span>
                </SelectItem>
                <SelectItem value="yaml" className="flex items-center gap-2">
                  <span>YAML</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {customActions}
        </div>

        <div className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          )}

          {editMode === "json" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-muted-foreground">JSON Editor</Label>
                <div className="text-xs text-muted-foreground">
                  {jsonValue.split('\n').length} lines
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden shadow-sm bg-background">
                <MonacoEditor
                  value={jsonValue}
                  language="json"
                  height="500px"
                  onChange={handleJsonChange}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    readOnly,
                  }}
                />
              </div>
            </div>
          )}

          {editMode === "yaml" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-muted-foreground">YAML Editor</Label>
                <div className="text-xs text-muted-foreground">
                  {yamlValue.split('\n').length} lines
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden shadow-sm bg-background">
                <MonacoEditor
                  value={yamlValue}
                  language="yaml"
                  height="500px"
                  onChange={handleYamlChange}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    readOnly,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="flex justify-between gap-3 pt-6 border-t mt-6">
          <div className="flex justify-between gap-3"> 
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="min-w-[100px]"
              disabled={readOnly || !!error}
            >
              Save Changes
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
} 