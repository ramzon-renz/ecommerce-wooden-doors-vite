import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption =
  | "featured"
  | "price-low-high"
  | "price-high-low"
  | "name-a-z"
  | "name-z-a";

interface SortOptionsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortOptions({ value, onChange }: SortOptionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Sort by:</span>
      <Select
        value={value}
        onValueChange={(val) => onChange(val as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          <SelectItem value="name-a-z">Name: A to Z</SelectItem>
          <SelectItem value="name-z-a">Name: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
