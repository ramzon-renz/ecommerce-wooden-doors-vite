import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart as CartIcon, Trash2, X, Edit, Check } from "lucide-react";
import { ProductCustomization } from "./CustomizationPanel";

interface ShoppingCartProps {
  items: ProductCustomization[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onRequestQuote: (items: ProductCustomization[]) => void;
  onEditItem?: (item: ProductCustomization, index: number) => void;
}

export default function ShoppingCart({
  items = [],
  onRemoveItem,
  onClearCart,
  onRequestQuote,
  onEditItem,
}: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    setItemCount(items.length);
    setTotalPrice(items.reduce((sum, item) => sum + item.totalPrice, 0));
  }, [items]);

  const handleRequestQuote = () => {
    onRequestQuote(items);
    setIsOpen(false);
  };

  const handleEditItem = (item: ProductCustomization, index: number) => {
    if (onEditItem) {
      onEditItem(item, index);
      // Don't close the cart until user explicitly closes it
      // This prevents the cart item from disappearing if user cancels the edit
    }
  };

  const getMaterialName = (id: string) => {
    const materials: Record<string, string> = {
      mahogany: "Mahogany",
      narra: "Narra",
      oak: "Oak",
      pine: "Pine",
      teak: "Teak",
    };
    return materials[id] || id;
  };

  const getFinishName = (id: string) => {
    const finishes: Record<string, string> = {
      natural: "Natural Wood",
      walnut: "Walnut",
      white: "White",
      black: "Black",
      custom: "Custom Stain",
    };
    return finishes[id] || id;
  };

  const getGlassName = (id: string) => {
    const glasses: Record<string, string> = {
      none: "No Glass",
      clear: "Clear Glass",
      frosted: "Frosted Glass",
      stained: "Stained Glass",
    };
    return glasses[id] || id;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-transparent"
        >
          <CartIcon
            size={22}
            className="text-gray-700 hover:text-primary transition-colors duration-200"
          />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-serif">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <CartIcon size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsOpen(false)}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col max-h-[calc(100vh-10rem)]">
            <div className="flex justify-between items-center py-4">
              <span className="text-sm text-gray-500">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 text-xs"
                onClick={onClearCart}
              >
                Clear All
              </Button>
            </div>

            <ScrollArea className="flex-grow">
              <div className="space-y-4 pr-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 md:p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{item.productName}</h3>
                      <div className="flex space-x-1">
                        {onEditItem && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-500 hover:text-primary hover:bg-gray-100"
                            onClick={() => handleEditItem(item, index)}
                            title="Edit item"
                          >
                            <Edit size={14} />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-500 hover:text-red-500 hover:bg-gray-100"
                          onClick={() => onRemoveItem(index)}
                          title="Remove item"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <p>Material: {getMaterialName(item.materialType)}</p>
                      <p>Finish: {getFinishName(item.colorFinish)}</p>
                      <p>Glass: {getGlassName(item.glassPanel)}</p>
                      <p>
                        Size:
                        {item.dimensions.isCustom
                          ? `${item.dimensions.width}" × ${item.dimensions.height}" (Custom)`
                          : '36" × 80" (Standard)'}
                      </p>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-bold">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                      {hoveredItem === index && onEditItem && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs gap-1 border-primary/30 hover:border-primary"
                          onClick={() => handleEditItem(item, index)}
                        >
                          <Edit size={12} /> Edit Options
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-auto pt-4">
              <Separator className="mb-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping & taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button className="w-full" onClick={handleRequestQuote}>
                  Request Quote
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
