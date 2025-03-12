import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import products from "../data/products";

interface CustomizationOption {
  id: string;
  name: string;
  priceModifier: number;
  thumbnail?: string;
}

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  basePrice: number;
  onAddToCart: (customization: ProductCustomization) => void;
  onRequestQuote: (customization: ProductCustomization) => void;
}

export interface ProductCustomization {
  productId: string;
  productName: string;
  materialType: string;
  colorFinish: string;
  glassPanel: string;
  dimensions: {
    width: number;
    height: number;
    isCustom: boolean;
  };
  totalPrice: number;
}

// Sample customization options
const materialOptions: CustomizationOption[] = [
  {
    id: "mahogany",
    name: "Mahogany",
    priceModifier: 200,
    thumbnail:
      "https://images.unsplash.com/photo-1566312296364-2199206933e5?w=200&q=80",
  },
  {
    id: "narra",
    name: "Narra",
    priceModifier: 150,
    thumbnail:
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=200&q=80",
  },
  {
    id: "oak",
    name: "Oak",
    priceModifier: 100,
    thumbnail:
      "https://images.unsplash.com/photo-1604514463843-9456e0be3dcf?w=200&q=80",
  },
  {
    id: "pine",
    name: "Pine",
    priceModifier: 50,
    thumbnail:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=200&q=80",
  },
  {
    id: "teak",
    name: "Teak",
    priceModifier: 250,
    thumbnail:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=200&q=80",
  },
];

const finishOptions: CustomizationOption[] = [
  {
    id: "natural",
    name: "Natural Wood",
    priceModifier: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1566312296364-2199206933e5?w=200&q=80",
  },
  {
    id: "walnut",
    name: "Walnut",
    priceModifier: 50,
    thumbnail:
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=200&q=80",
  },
  {
    id: "white",
    name: "White",
    priceModifier: 30,
    thumbnail:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=200&q=80",
  },
  {
    id: "black",
    name: "Black",
    priceModifier: 30,
    thumbnail:
      "https://images.unsplash.com/photo-1604514463843-9456e0be3dcf?w=200&q=80",
  },
  {
    id: "custom",
    name: "Custom Stain",
    priceModifier: 100,
    thumbnail:
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=200&q=80",
  },
];

const glassOptions: CustomizationOption[] = [
  { id: "none", name: "No Glass", priceModifier: 0 },
  { id: "clear", name: "Clear Glass", priceModifier: 100 },
  { id: "frosted", name: "Frosted Glass", priceModifier: 150 },
  { id: "stained", name: "Stained Glass", priceModifier: 300 },
];

export default function CustomizationPanel({
  isOpen,
  onClose,
  productId,
  productName,
  basePrice,
  onAddToCart,
  onRequestQuote,
  initialCustomization,
}: CustomizationPanelProps & { initialCustomization?: ProductCustomization }) {
  const [activeTab, setActiveTab] = useState("material");
  const [materialType, setMaterialType] = useState(
    initialCustomization?.materialType || materialOptions[0].id,
  );
  const [colorFinish, setColorFinish] = useState(
    initialCustomization?.colorFinish || finishOptions[0].id,
  );
  const [glassPanel, setGlassPanel] = useState(
    initialCustomization?.glassPanel || glassOptions[0].id,
  );
  const [isCustomSize, setIsCustomSize] = useState(
    initialCustomization?.dimensions.isCustom || false,
  );
  const [width, setWidth] = useState(
    initialCustomization?.dimensions.width || 36,
  ); // inches
  const [height, setHeight] = useState(
    initialCustomization?.dimensions.height || 80,
  ); // inches
  const [totalPrice, setTotalPrice] = useState(
    initialCustomization?.totalPrice || basePrice,
  );

  // Calculate total price whenever customizations change
  useEffect(() => {
    let price = basePrice;

    // Add material price
    const selectedMaterial = materialOptions.find((m) => m.id === materialType);
    if (selectedMaterial) price += selectedMaterial.priceModifier;

    // Add finish price
    const selectedFinish = finishOptions.find((f) => f.id === colorFinish);
    if (selectedFinish) price += selectedFinish.priceModifier;

    // Add glass price
    const selectedGlass = glassOptions.find((g) => g.id === glassPanel);
    if (selectedGlass) price += selectedGlass.priceModifier;

    // Add custom size price if applicable
    if (isCustomSize) {
      // Add 15% for custom sizing
      price += price * 0.15;
    }

    setTotalPrice(price);
  }, [
    basePrice,
    materialType,
    colorFinish,
    glassPanel,
    isCustomSize,
    width,
    height,
  ]);

  const handleAddToCart = () => {
    const customization: ProductCustomization = {
      productId,
      productName,
      materialType,
      colorFinish,
      glassPanel,
      dimensions: {
        width,
        height,
        isCustom: isCustomSize,
      },
      totalPrice,
    };

    onAddToCart(customization);
    onClose();
  };

  const handleRequestQuote = () => {
    const customization: ProductCustomization = {
      productId,
      productName,
      materialType,
      colorFinish,
      glassPanel,
      dimensions: {
        width,
        height,
        isCustom: isCustomSize,
      },
      totalPrice,
    };

    onRequestQuote(customization);
    onClose();
  };

  // Find the product image
  const productImage =
    products.find((p) => p.id === productId)?.imageUrl ||
    "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Customize Your {productName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
            <img
              src={productImage}
              alt={productName}
              className="max-h-[400px] object-contain rounded-md"
            />
          </div>

          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="material">Material</TabsTrigger>
                <TabsTrigger value="finish">Finish</TabsTrigger>
                <TabsTrigger value="glass">Glass</TabsTrigger>
                <TabsTrigger value="size">Size</TabsTrigger>
              </TabsList>

              <TabsContent value="material" className="space-y-4">
                <h3 className="font-medium mb-4">Select Material Type</h3>
                <RadioGroup
                  value={materialType}
                  onValueChange={setMaterialType}
                  className="grid grid-cols-2 gap-4"
                >
                  {materialOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
                      <RadioGroupItem
                        value={option.id}
                        id={`material-${option.id}`}
                      />
                      <div className="grid gap-1.5">
                        <Label
                          htmlFor={`material-${option.id}`}
                          className="font-medium"
                        >
                          {option.name}
                        </Label>
                        {option.thumbnail && (
                          <img
                            src={option.thumbnail}
                            alt={option.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        )}
                        <p className="text-sm text-gray-500">
                          +${option.priceModifier.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>

              <TabsContent value="finish" className="space-y-4">
                <h3 className="font-medium mb-4">Select Color Finish</h3>
                <RadioGroup
                  value={colorFinish}
                  onValueChange={setColorFinish}
                  className="grid grid-cols-2 gap-4"
                >
                  {finishOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
                      <RadioGroupItem
                        value={option.id}
                        id={`finish-${option.id}`}
                      />
                      <div className="grid gap-1.5">
                        <Label
                          htmlFor={`finish-${option.id}`}
                          className="font-medium"
                        >
                          {option.name}
                        </Label>
                        {option.thumbnail && (
                          <img
                            src={option.thumbnail}
                            alt={option.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        )}
                        <p className="text-sm text-gray-500">
                          +${option.priceModifier.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>

              <TabsContent value="glass" className="space-y-4">
                <h3 className="font-medium mb-4">Select Glass Panel</h3>
                <RadioGroup
                  value={glassPanel}
                  onValueChange={setGlassPanel}
                  className="grid grid-cols-2 gap-4"
                >
                  {glassOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
                      <RadioGroupItem
                        value={option.id}
                        id={`glass-${option.id}`}
                      />
                      <div className="grid gap-1.5">
                        <Label
                          htmlFor={`glass-${option.id}`}
                          className="font-medium"
                        >
                          {option.name}
                        </Label>
                        <p className="text-sm text-gray-500">
                          +${option.priceModifier.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>

              <TabsContent value="size" className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Label htmlFor="custom-size" className="font-medium">
                    Custom Size
                  </Label>
                  <input
                    type="checkbox"
                    id="custom-size"
                    checked={isCustomSize}
                    onChange={(e) => setIsCustomSize(e.target.checked)}
                    className="rounded"
                  />
                </div>

                {isCustomSize ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (inches): {width}"</Label>
                      <Slider
                        id="width"
                        min={24}
                        max={48}
                        step={1}
                        value={[width]}
                        onValueChange={(value) => setWidth(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">Height (inches): {height}"</Label>
                      <Slider
                        id="height"
                        min={72}
                        max={96}
                        step={1}
                        value={[height]}
                        onValueChange={(value) => setHeight(value[0])}
                      />
                    </div>

                    <p className="text-sm text-amber-600">
                      Custom sizing adds 15% to the total price
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p className="font-medium">Standard Size</p>
                    <p className="text-sm text-gray-600">36" × 80"</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-8 p-4 bg-gray-100 rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Price:</span>
                <span className="text-xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="sm:order-1">
            Cancel
          </Button>
          <Button
            onClick={handleRequestQuote}
            variant="secondary"
            className="sm:order-2"
          >
            Request Quote
          </Button>
          <Button
            onClick={handleAddToCart}
            className="sm:order-3 bg-primary/90 hover:bg-primary transition-colors duration-200"
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
