import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Filter } from "lucide-react";
import PriceRangeFilter from "./PriceRangeFilter";
import SortOptions, { SortOption } from "./SortOptions";
import ProductDetailView from "./ProductDetailView";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  imageUrl: string;
  category: string;
  featured?: boolean;
}

interface ProductGridProps {
  products: Product[];
  onCustomize: (id: string) => void;
}

export default function ProductGrid({
  products = [],
  onCustomize,
}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentMinPrice, setCurrentMinPrice] = useState(0);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(0);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  // Extract unique categories and sort them alphabetically
  // Limit to a reasonable number to avoid overflow
  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))).sort(),
  ];

  // Initialize price range based on products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => {
        // Use discounted price if available
        if (product.discountPercentage) {
          return (
            product.price - product.price * (product.discountPercentage / 100)
          );
        }
        return product.price;
      });

      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));

      setMinPrice(min);
      setMaxPrice(max);
      setCurrentMinPrice(min);
      setCurrentMaxPrice(max);
    }
  }, [products]);

  // Filter products by search term and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Calculate actual price (with discount if applicable)
    const actualPrice = product.discountPercentage
      ? product.price - product.price * (product.discountPercentage / 100)
      : product.price;

    const matchesPrice =
      actualPrice >= currentMinPrice && actualPrice <= currentMaxPrice;

    return matchesSearch && matchesPrice;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPercentage
      ? a.price - a.price * (a.discountPercentage / 100)
      : a.price;

    const priceB = b.discountPercentage
      ? b.price - b.price * (b.discountPercentage / 100)
      : b.price;

    switch (sortOption) {
      case "price-low-high":
        return priceA - priceB;
      case "price-high-low":
        return priceB - priceA;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      case "featured":
      default:
        // Featured items first, then sort by name
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
    }
  });

  const handlePriceChange = (min: number, max: number) => {
    setCurrentMinPrice(min);
    setCurrentMaxPrice(max);
  };

  const handleViewDetails = (productId: string) => {
    const product = products.find((p) => p.id === productId) || null;
    setSelectedProduct(product);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 gap-4">
        <h2 className="text-3xl font-bold font-serif dark:text-white">
          Explore Our Collection
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search doors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden"
          >
            <SlidersHorizontal size={18} />
          </Button>
          <div className="hidden sm:block">
            <SortOptions value={sortOption} onChange={setSortOption} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Filters sidebar - visible on larger screens or when toggled on mobile */}
        <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Filter size={18} className="text-primary" /> Filters
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentMinPrice(minPrice);
                  setCurrentMaxPrice(maxPrice);
                  setSortOption("featured");
                }}
              >
                Reset All
              </Button>
            </div>

            <PriceRangeFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
            />

            <div className="sm:hidden">
              <SortOptions value={sortOption} onChange={setSortOption} />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="All" className="mb-8" id="product-categories">
            <TabsList className="mb-6 flex flex-wrap justify-center bg-transparent gap-2">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  data-value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-3 sm:px-6 py-2 transition-all duration-200 dark:text-gray-300 dark:data-[state=active]:text-white text-sm sm:text-base whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                {sortedProducts.filter(
                  (product) =>
                    category === "All" || product.category === category,
                ).length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                    <div className="p-8">
                      <Search
                        size={48}
                        className="mx-auto text-gray-300 mb-4"
                      />
                      <h3 className="text-xl font-medium mb-2 dark:text-white">
                        No matching products
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        We couldn't find any products that match your current
                        filters.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setCurrentMinPrice(minPrice);
                          setCurrentMaxPrice(maxPrice);
                          setSortOption("featured");
                        }}
                      >
                        Reset all filters
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {sortedProducts
                      .filter(
                        (product) =>
                          category === "All" || product.category === category,
                      )
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          {...product}
                          onCustomize={onCustomize}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Product Detail View */}
      <ProductDetailView
        product={selectedProduct}
        isOpen={isDetailViewOpen}
        onClose={handleCloseDetailView}
        onCustomize={onCustomize}
      />
    </div>
  );
}
