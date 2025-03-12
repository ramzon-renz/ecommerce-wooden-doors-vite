import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

export default function PriceRangeFilter({
  minPrice,
  maxPrice,
  onPriceChange,
}: PriceRangeFilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [manualMin, setManualMin] = useState(minPrice.toString());
  const [manualMax, setManualMax] = useState(maxPrice.toString());

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setManualMin(minPrice.toString());
    setManualMax(maxPrice.toString());
  }, [minPrice, maxPrice]);

  const handlePriceChange = (value: number[]) => {
    const [min, max] = value as [number, number];
    setPriceRange([min, max]);
    setManualMin(min.toString());
    setManualMax(max.toString());
  };

  const handleApplyFilter = () => {
    onPriceChange(priceRange[0], priceRange[1]);
  };

  const handleReset = () => {
    setPriceRange([minPrice, maxPrice]);
    setManualMin(minPrice.toString());
    setManualMax(maxPrice.toString());
    setQuickFilters([]);
    onPriceChange(minPrice, maxPrice);
  };

  const handleManualInputChange = () => {
    const min = Math.max(
      minPrice,
      Math.min(parseInt(manualMin) || minPrice, maxPrice),
    );
    const max = Math.min(
      maxPrice,
      Math.max(parseInt(manualMax) || maxPrice, minPrice),
    );

    setPriceRange([min, max]);
    onPriceChange(min, max);
  };

  const applyQuickFilter = (filter: string) => {
    let newFilters = [...quickFilters];

    if (newFilters.includes(filter)) {
      newFilters = newFilters.filter((f) => f !== filter);
    } else {
      newFilters.push(filter);
    }

    setQuickFilters(newFilters);

    // Apply price range based on selected filters
    if (newFilters.length === 0) {
      setPriceRange([minPrice, maxPrice]);
      onPriceChange(minPrice, maxPrice);
      return;
    }

    let min = maxPrice;
    let max = minPrice;

    newFilters.forEach((f) => {
      if (f === "budget") {
        min = Math.min(min, minPrice);
        max = Math.max(max, minPrice + (maxPrice - minPrice) * 0.3);
      } else if (f === "midrange") {
        min = Math.min(min, minPrice + (maxPrice - minPrice) * 0.3);
        max = Math.max(max, minPrice + (maxPrice - minPrice) * 0.7);
      } else if (f === "premium") {
        min = Math.min(min, minPrice + (maxPrice - minPrice) * 0.7);
        max = Math.max(max, maxPrice);
      } else if (f === "sale") {
        // This would ideally filter products with discounts
        // For now, we'll just use a price range
        min = Math.min(min, minPrice);
        max = Math.max(max, minPrice + (maxPrice - minPrice) * 0.5);
      }
    });

    setPriceRange([min, max]);
    setManualMin(min.toString());
    setManualMax(max.toString());
    onPriceChange(min, max);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-5 mb-4 md:mb-6 border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-lg">Price Range</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">
            ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
          </Badge>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 md:mt-5 space-y-4 md:space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={quickFilters.includes("budget") ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors duration-200"
              onClick={() => applyQuickFilter("budget")}
            >
              Budget
            </Badge>
            <Badge
              variant={
                quickFilters.includes("midrange") ? "default" : "outline"
              }
              className="cursor-pointer hover:bg-primary/90 transition-colors duration-200"
              onClick={() => applyQuickFilter("midrange")}
            >
              Mid-range
            </Badge>
            <Badge
              variant={quickFilters.includes("premium") ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors duration-200"
              onClick={() => applyQuickFilter("premium")}
            >
              Premium
            </Badge>
            <Badge
              variant={quickFilters.includes("sale") ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors duration-200"
              onClick={() => applyQuickFilter("sale")}
            >
              On Sale
            </Badge>
          </div>

          <div className="pt-2">
            <Slider
              defaultValue={priceRange}
              min={minPrice}
              max={maxPrice}
              step={50}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label
                htmlFor="min-price"
                className="text-xs text-gray-500 mb-1 block"
              >
                Min Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="min-price"
                  type="number"
                  value={manualMin}
                  onChange={(e) => setManualMin(e.target.value)}
                  onBlur={handleManualInputChange}
                  className="pl-7"
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
            </div>
            <div className="flex-1">
              <Label
                htmlFor="max-price"
                className="text-xs text-gray-500 mb-1 block"
              >
                Max Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="max-price"
                  type="number"
                  value={manualMax}
                  onChange={(e) => setManualMax(e.target.value)}
                  onBlur={handleManualInputChange}
                  className="pl-7"
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1"
              onClick={handleReset}
            >
              <RefreshCw size={14} /> Reset
            </Button>
            <Button size="sm" className="flex-1" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
