import { Button } from "@/components/ui/button";

interface QuestionCountPickerProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  options?: number[];
}

const DEFAULT_OPTIONS = [10, 20, 30, 40, 50];

export default function QuestionCountPicker({ value, onChange, max, options = DEFAULT_OPTIONS }: QuestionCountPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((n) => {
        const disabled = n > max;
        const isSelected = value === n && !disabled;
        const variant = disabled ? "outline" : isSelected ? "hero" : "secondary";
        return (
          <Button
            key={n}
            size="sm"
            variant={variant as any}
            disabled={disabled}
            onClick={() => onChange(n)}
            aria-pressed={isSelected}
            aria-label={`Play ${n} questions`}
            className="hover-scale"
          >
            {n}
          </Button>
        );
      })}
    </div>
  );
}
