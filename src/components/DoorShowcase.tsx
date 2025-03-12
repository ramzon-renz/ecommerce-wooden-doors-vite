import { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import CustomizationPanel, { ProductCustomization } from "./CustomizationPanel";
import QuoteRequestForm from "./QuoteRequestForm";
import ShoppingCart from "./ShoppingCart";
import DiscountBanner from "./DiscountBanner";
import ContactSection from "./ContactSection";
import TestimonialsSection from "./TestimonialsSection";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
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
  };

  const handleRequestQuote = (customization: ProductCustomization) => {
    setCurrentCustomization(customization);
    setIsQuoteFormOpen(true);
  };

  const handleRequestQuoteFromCart = (items: ProductCustomization[]) => {
    // For simplicity, we'll just use the first item in the cart
    // In a real application, you would handle multiple items
    if (items.length > 0) {
      setCurrentCustomization(items[0]);
      setIsQuoteFormOpen(true);
    }
  };

  const handleEditCartItem = (item: ProductCustomization, index: number) => {
    // Set the product ID and open the customization panel with pre-filled values
    setSelectedProductId(item.productId);
    setCurrentCustomization(item);
    setIsCustomizationOpen(true);

    // Store the index of the item being edited instead of removing it immediately
    setEditingItemIndex(index);
  };

  // Find the selected product
  const selectedProduct = selectedProductId
    ? products.find((p) => p.id === selectedProductId)
    : null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-200 pt-16 md:pt-20">
      <DiscountBanner discount={currentDiscount} />

      {/* Elegant Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold text-primary dark:text-primary-foreground">
                Wooden Doors
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium transition-colors duration-200 flex items-center gap-1"
              >
                <Home size={18} />
                <span>Home</span>
              </a>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("products");
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium transition-colors duration-200 flex items-center gap-1"
              >
                <ShoppingBag size={18} />
                <span>Products</span>
              </a>
              <div className="relative group">
                <button
                  onClick={() => scrollToSection("products")}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium transition-colors duration-200 flex items-center gap-1"
                >
                  <span>Categories</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-y-auto max-h-[300px] transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-left z-50">
                  {Array.from(
                    new Set(products.map((product) => product.category)),
                  )
                    .sort()
                    .map((category) => (
                      <a
                        key={category}
                        href={`#products-${category.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection("products");
                          // Find and click the corresponding category tab
                          setTimeout(() => {
                            const tabElement = document.querySelector(
                              `[data-value="${category}"]`,
                            );
                            if (tabElement) {
                              (tabElement as HTMLElement).click();
                            }
                          }, 100);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {category}
                      </a>
                    ))}
                </div>
              </div>
              <a
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("testimonials");
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium transition-colors duration-200 flex items-center gap-1"
              >
                <Star size={18} />
                <span>Testimonials</span>
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium transition-colors duration-200 flex items-center gap-1"
              >
                <Info size={18} />
                <span>About</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium transition-colors duration-200 flex items-center gap-1"
              >
                <Phone size={18} />
                <span>Contact</span>
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
              <ShoppingCart
                items={cartItems}
                onRemoveItem={handleRemoveCartItem}
                onClearCart={handleClearCart}
                onRequestQuote={handleRequestQuoteFromCart}
                onEditItem={handleEditCartItem}
              />

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-800 shadow-lg">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              Home
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("products");
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              Products
            </a>
            <div className="px-3 py-2">
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </p>
              <div className="pl-4 space-y-1">
                {Array.from(
                  new Set(products.map((product) => product.category)),
                )
                  .sort()
                  .map((category) => (
                    <a
                      key={category}
                      href={`#products-${category.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("products");
                        setMobileMenuOpen(false);
                        // Find and click the corresponding category tab
                        setTimeout(() => {
                          const tabElement = document.querySelector(
                            `[data-value="${category}"]`,
                          );
                          if (tabElement) {
                            (tabElement as HTMLElement).click();
                          }
                        }, 100);
                      }}
                      className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground"
                    >
                      {category}
                    </a>
                  ))}
              </div>
            </div>
            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("testimonials");
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              Testimonials
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <header
        id="home"
        className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-24 md:py-32 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 sm:px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-fadeIn">
              Craftsmanship Since 1985
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-serif leading-tight animate-fadeIn">
              Elevate Your Home With Premium Wooden Doors
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-light mb-6 sm:mb-10 text-white/90">
              Handcrafted with precision and care, our wooden doors combine
              timeless elegance with exceptional durability.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-medium text-base sm:text-lg px-4 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-effect"
                onClick={() => scrollToSection("products")}
              >
                Explore Collection
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-amber-500 hover:bg-amber-600 text-white border-0 font-medium text-base sm:text-lg px-4 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover-effect"
                onClick={() => scrollToSection("contact")}
              >
                Request Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight size={24} className="rotate-90 text-white/80" />
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </header>

      {/* Features section */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Premium Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Crafted from the finest hardwoods with meticulous attention to
                detail.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                25-Year Warranty
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our confidence in our craftsmanship is backed by an
                industry-leading warranty.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Free Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complimentary white-glove delivery service for all orders over
                $1,500.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Custom Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Personalize every aspect of your door with our expert design
                consultants.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section
          id="products"
          className="py-12 md:py-16 bg-white dark:bg-gray-900"
        >
          <ProductGrid products={products} onCustomize={handleCustomize} />
        </section>

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

        <QuoteRequestForm
          isOpen={isQuoteFormOpen}
          onClose={() => setIsQuoteFormOpen(false)}
          customization={currentCustomization}
        />

        <section id="testimonials">
          <TestimonialsSection />
        </section>

        <section
          id="about"
          className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif dark:text-white">
                  Our Craftsmanship
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Discover the artistry and dedication behind every door we
                  create
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                    alt="Craftsman working on wooden door"
                    className="rounded-lg shadow-xl z-10 relative"
                  />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-lg -z-10"></div>
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-lg -z-10"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 dark:text-white font-serif">
                    Tradition Meets Innovation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    For over three decades, we've been dedicated to creating
                    exceptional wooden doors that stand the test of time. Our
                    master craftsmen combine traditional woodworking techniques
                    with modern precision to deliver doors of unparalleled
                    quality.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Each door is meticulously crafted from sustainably sourced
                    premium hardwoods, ensuring both environmental
                    responsibility and lasting beauty. We take pride in the
                    details, from hand-selected grain patterns to flawless
                    finishes.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Whether you're looking for a statement entrance door,
                    elegant interior doors, or custom solutions for unique
                    spaces, our team is committed to exceeding your expectations
                    with doors that enhance the character and value of your
                    home.
                  </p>

                  <Button
                    className="mt-8"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact Our Design Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-serif">
                Wooden Doors
              </h3>
              <p className="text-gray-400 mb-6">
                Crafting premium wooden doors since 1985. Quality,
                craftsmanship, and customer satisfaction guaranteed.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("home");
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <ArrowRight size={14} />
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("products");
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <ArrowRight size={14} />
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("testimonials");
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <ArrowRight size={14} />
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <ArrowRight size={14} />
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <ArrowRight size={14} />
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe for updates and special offers
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-md text-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <Button className="whitespace-nowrap">Subscribe</Button>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>
              © {new Date().getFullYear()} Wooden Doors. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
