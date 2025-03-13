import { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import CustomizationPanel, { ProductCustomization } from "./CustomizationPanel";
import QuoteRequestForm from "./QuoteRequestForm";
import QuoteSummary from "./QuoteSummary";
import ShoppingCart from "./ShoppingCart";
import DiscountBanner from "./DiscountBanner";
import ContactSection from "./ContactSection";
import TestimonialsSection from "./TestimonialsSection";
import ThemeToggle from "./ThemeToggle";
import products from "../data/products";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Phone,
  Info,
  ShoppingBag,
  Star,
  ArrowRight,
  Award,
  Shield,
  Clock,
  Truck,
} from "lucide-react";

export default function DoorShowcase() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [isQuoteSummaryOpen, setIsQuoteSummaryOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ProductCustomization[]>([]);
  const [currentCustomization, setCurrentCustomization] =
    useState<ProductCustomization | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  // Handle scroll for hiding/showing header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      // Close mobile menu on larger screens
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("woodenDoorsCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("woodenDoorsCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Current active discount
  const currentDiscount = {
    title: "Summer Sale! 15% OFF All Doors",
    description: "Use code SUMMER15 at checkout or request a quote",
    expiryDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    code: "SUMMER15",
  };

  const handleCustomize = (productId: string) => {
    setSelectedProductId(productId);
    setIsCustomizationOpen(true);
  };

  const handleCloseCustomization = () => {
    setIsCustomizationOpen(false);
    setSelectedProductId(null);
    setCurrentCustomization(null);
    setEditingItemIndex(null); // Reset editing index when closing customization panel
  };

  const handleAddToCart = (customization: ProductCustomization) => {
    if (editingItemIndex !== null) {
      // If we're editing an existing item, replace it at the same index
      const newItems = [...cartItems];
      newItems[editingItemIndex] = customization;
      setCartItems(newItems);
      setEditingItemIndex(null); // Reset editing index
    } else {
      // Otherwise add as a new item
      setCartItems([...cartItems, customization]);
    }
  };

  const handleRemoveCartItem = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("woodenDoorsCart");
  };

  const handleRequestQuote = (customization: ProductCustomization) => {
    setCurrentCustomization(customization);
    setIsQuoteFormOpen(true);
  };

  const handleRequestQuoteForCart = (items: ProductCustomization[]) => {
    setIsQuoteSummaryOpen(true);
  };

  const handleEditCartItem = (item: ProductCustomization, index: number) => {
    setSelectedProductId(item.productId);
    setCurrentCustomization(item);
    setEditingItemIndex(index);
    setIsCustomizationOpen(true);
  };

  // Find the selected product
  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
      {/* Discount Banner */}
      <DiscountBanner discount={currentDiscount} />

      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-serif text-primary">WoodenDoors</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">Home</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">Products</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">About</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">Contact</a>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <ShoppingCart 
                items={cartItems} 
                onRemoveItem={handleRemoveCartItem} 
                onClearCart={handleClearCart} 
                onRequestQuote={handleRequestQuoteForCart}
                onEditItem={handleEditCartItem}
              />
              <Button variant="outline" className="hidden md:flex">Get a Quote</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100 dark:border-gray-800">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">Home</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">Products</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">About</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-200">Contact</a>
                <Button variant="outline" className="w-full">Get a Quote</Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow">
        {/* Product Grid */}
        <ProductGrid products={products} onCustomize={handleCustomize} />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-serif">WoodenDoors</h3>
              <p className="text-gray-400 mb-4">Crafting premium wooden doors with exceptional quality and design since 1995.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Classic Doors</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Modern Doors</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Barn Doors</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Custom Designs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Door Hardware</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Our Process</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Shipping & Delivery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Returns Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Warranty Information</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} WoodenDoors. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Customization Panel */}
      {selectedProduct && (
        <CustomizationPanel
          isOpen={isCustomizationOpen}
          onClose={handleCloseCustomization}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          basePrice={selectedProduct.price}
          onAddToCart={handleAddToCart}
          onRequestQuote={handleRequestQuote}
          initialCustomization={currentCustomization}
        />
      )}

      {/* Quote Request Form */}
      <QuoteRequestForm
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
        customization={currentCustomization}
      />

      {/* Quote Summary for Cart Items */}
      <QuoteSummary
        isOpen={isQuoteSummaryOpen}
        onClose={() => setIsQuoteSummaryOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />
    </div>
  )};