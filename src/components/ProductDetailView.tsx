import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "../data/products";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  MoveHorizontal,
  RotateCcw,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onCustomize: (productId: string) => void;
}

export default function ProductDetailView({
  product,
  isOpen,
  onClose,
  onCustomize,
}: ProductDetailViewProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom and position when a new product is viewed
  useEffect(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, [product]);

  if (!product) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;

      // Calculate boundaries to prevent dragging outside the visible area
      const containerWidth = containerRef.current?.clientWidth || 0;
      const containerHeight = containerRef.current?.clientHeight || 0;
      const imageWidth = (imageRef.current?.naturalWidth || 0) * zoomLevel;
      const imageHeight = (imageRef.current?.naturalHeight || 0) * zoomLevel;

      const maxX = Math.max(0, (imageWidth - containerWidth) / 2);
      const maxY = Math.max(0, (imageHeight - containerHeight) / 2);

      setPosition({
        x: Math.max(-maxX, Math.min(newX, maxX)),
        y: Math.max(-maxY, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleCustomize = () => {
    onCustomize(product.id);
    onClose();
  };

  const discountedPrice = product.discountPercentage
    ? product.price - product.price * (product.discountPercentage / 100)
    : product.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4">
          <div
            className="relative bg-gray-100 rounded-lg overflow-hidden h-[300px] md:h-[400px] flex items-center justify-center"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{
              cursor:
                zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <img
              ref={imageRef}
              src={product.imageUrl}
              alt={product.name}
              className="transition-transform duration-200 select-none"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                maxHeight: "100%",
                maxWidth: "100%",
              }}
              draggable="false"
            />
            <div className="absolute bottom-4 right-4 flex space-x-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="h-8 w-8"
              >
                <ZoomIn size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="h-8 w-8"
              >
                <ZoomOut size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="h-8 w-8"
              >
                <RotateCcw size={16} />
              </Button>
            </div>
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium">
              {Math.round(zoomLevel * 100)}%
            </div>
            {zoomLevel > 1 && (
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs">
                <MoveHorizontal size={14} className="inline mr-1" /> Drag to pan
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-serif mb-2">
                {product.name}
              </h2>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
                    Featured
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3 mb-6">
                {product.discountPercentage ? (
                  <>
                    <span className="text-2xl font-bold text-primary">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Product Details</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex">
                    <span className="font-medium w-32">Material:</span>
                    <span>Premium hardwood</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Dimensions:</span>
                    <span>36" × 80" (Standard)</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Warranty:</span>
                    <span>25 years limited</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Customizable:</span>
                    <span>Yes (size, finish, hardware)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCustomize}
                className="flex-1 bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Customize This Door
              </Button>
              <Button
                onClick={() => {
                  onCustomize(product.id);
                  onClose();
                }}
                variant="secondary"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              >
                Request Quote
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Back
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
