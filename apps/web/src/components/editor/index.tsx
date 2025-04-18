import React, { useRef, useEffect, useState } from "react";
import { Editor as MonacoEditorComponent, Monaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export interface MonacoEditorProps {
  /**
   * The initial value of the editor
   */
  value: string;
  /**
   * The language of the editor
   * @default "json"
   */
  language?: "json" | "yaml" | "javascript" | "typescript" | "html" | "css" | "markdown" | "plaintext";
  /**
   * The theme of the editor
   * @default "system"
   */
  theme?: "light" | "dark" | "system";
  /**
   * Whether the editor is read-only
   * @default false
   */
  readOnly?: boolean;
  /**
   * The height of the editor
   * @default "300px"
   */
  height?: string;
  /**
   * The width of the editor
   * @default "100%"
   */
  width?: string;
  /**
   * Callback when the editor value changes
   */
  onChange?: (value: string | undefined) => void;
  /**
   * Callback when the editor is mounted
   */
  onMount?: (editor: any, monaco: Monaco) => void;
  /**
   * Additional className for the editor container
   */
  className?: string;
  /**
   * Additional options for the editor
   */
  options?: Record<string, unknown>;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language = "json",
  theme = "system",
  readOnly = false,
  height = "300px",
  width = "100%",
  onChange,
  onMount,
  className,
  options = {},
}) => {
  const editorRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Determine the editor theme based on the system theme
  const editorTheme = theme === "system" 
    ? resolvedTheme === "dark" ? "vs-dark" : "light" 
    : theme === "dark" ? "vs-dark" : "light";

  // Handle editor mount
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Format the editor content on mount
    if (language === "json") {
      try {
        const formattedValue = JSON.stringify(JSON.parse(value), null, 2);
        editor.setValue(formattedValue);
      } catch (error) {
        // If JSON is invalid, keep the original value
        console.warn("Invalid JSON, keeping original value");
      }
    }
    
    // Call the onMount callback if provided
    if (onMount) {
      onMount(editor, monaco);
    }
  };

  // Set up editor options
  const editorOptions = {
    readOnly,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: "on" as const,
    roundedSelection: false,
    scrollbar: {
      vertical: "visible" as const,
      horizontal: "visible" as const,
    },
    automaticLayout: true,
    tabSize: 2,
    wordWrap: "on" as const,
    ...options,
  };

  // Handle theme changes
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("h-[300px] w-full animate-pulse bg-muted", className)} />;
  }

  return (
    <div className={cn("rounded-md border overflow-hidden", className)}>
      <MonacoEditorComponent
        height={height}
        width={width}
        defaultLanguage={language}
        defaultValue={value}
        theme={editorTheme}
        options={editorOptions}
        onChange={onChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default MonacoEditor;
