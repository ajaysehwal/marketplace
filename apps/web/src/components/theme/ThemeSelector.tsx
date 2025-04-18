'use client';
import { CheckIcon, Palette } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const ThemeSelector = () => {
  const { availableThemes, setTheme, activeThemeName } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Palette size={20} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {availableThemes.map((theme, i) => (
          <DropdownMenuItem
            key={i}
            onClick={() => setTheme(theme.name)}
            className="flex cursor-pointer items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: `hsl(${theme.primary})`,
                  border: '1px solid hsla(0, 0%, 100%, 0.2)',
                }}
              />
              {theme.label}
            </div>
            {activeThemeName === theme.name && (
              <CheckIcon className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
