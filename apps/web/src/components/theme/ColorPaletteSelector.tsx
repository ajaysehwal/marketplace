import { Paintbrush } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const colorPalettes = [
  { name: 'blue', label: 'Blue', primary: '221 83% 53%' },
  { name: 'purple', label: 'Purple', primary: '262 83% 58%' },
  { name: 'green', label: 'Green', primary: '142 71% 45%' },
  { name: 'red', label: 'Red', primary: '0 84% 60%' },
  { name: 'amber', label: 'Amber', primary: '38 92% 50%' },
  { name: 'pink', label: 'Pink', primary: '330 81% 60%' },
  { name: 'teal', label: 'Teal', primary: '172 66% 50%' },
  { name: 'indigo', label: 'Indigo', primary: '244 75% 52%' },
];

export const ColorPaletteSelector = () => {
  const { updatePrimaryColor } = useTheme();

  const changeColorPalette = (primaryColor: string) => {
    updatePrimaryColor(primaryColor);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Paintbrush size={20} />
          <span className="sr-only">Change color palette</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <div className="grid grid-cols-4 gap-1 p-2">
          {colorPalettes.map((palette) => (
            <button
              key={palette.name}
              className="border-muted flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-all hover:scale-110"
              style={{ backgroundColor: `hsl(${palette.primary})` }}
              onClick={() => changeColorPalette(palette.primary)}
              title={palette.label}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
