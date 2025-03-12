import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  imageUrl: string;
  category: string;
  featured?: boolean;
  onCustomize: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  discountPercentage = 0,
  imageUrl,
  category,
  featured = false,
  onCustomize = () => {},
  onViewDetails = () => {},
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice =
    discountPercentage > 0 ? price - price * (discountPercentage / 100) : price;

  return (
    <Card
      className="overflow-hidden transition-all duration-300 h-full flex flex-col bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48 sm:h-56 md:h-64 bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          loading="lazy"
        />
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 right-3 bg-red-500 font-medium px-2.5 py-1">
            {discountPercentage}% OFF
          </Badge>
        )}
        <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary font-medium px-2.5 py-1">
          {category}
        </Badge>
        {featured && (
          <Badge className="absolute bottom-3 right-3 bg-amber-500 font-medium px-2.5 py-1">
            Featured
          </Badge>
        )}

        {/* Quick action buttons - always visible on mobile, appear on hover for desktop */}
        <div className="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full h-10 w-10 p-0 bg-white hover:bg-white/90 text-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(id);
            }}
            title="View details"
          >
            <Eye size={18} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full h-10 w-10 p-0 bg-primary hover:bg-primary/90 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onCustomize(id);
            }}
            title="Customize"
          >
            <Pencil size={18} />
          </Button>
        </div>
      </div>
      <CardContent
        className="flex-grow p-3 sm:p-4 md:p-5 cursor-pointer"
        onClick={() => onViewDetails(id)}
      >
        <h3 className="text-xl font-semibold mb-2 font-serif dark:text-white group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center space-x-2">
          {discountPercentage > 0 && (
            <span className="text-gray-500 dark:text-gray-400 line-through">
              ${price.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-primary dark:text-primary-foreground">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 md:p-5 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-200 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors duration-200"
          onClick={() => onViewDetails(id)}
        >
          <Eye size={16} className="mr-2" /> View
        </Button>
        <Button
          className="flex-1 bg-primary hover:bg-primary/90 transition-colors duration-200"
          onClick={() => onCustomize(id)}
        >
          <Pencil size={16} className="mr-2" /> Customize
        </Button>
      </CardFooter>
    </Card>
  );
}
